const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const db = new sqlite3.Database('./data/contact.db');

// Function to generate the uuid
function generateContactId() {
  let uuid = crypto.randomBytes(16).toString('hex');
  return uuid;
}

// Function to create a new contact
function generateContact(firstName, lastName, emailAddress, notes) {
  // generate unique random uuid
  const contactId = generateContactId();

  // Get the current system time
  const currentTime = new Date();
   // Convert the Date object to a string
   const dateString = currentTime.toISOString();

  // Create the contact object
  const contact = {
    contactId,
    firstName,
    lastName,
    emailAddress,
    notes,
    dateCreated:  dateString,
    dateModified: dateString
  };

  return contact;
}

const repo = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM contacts", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  create: (contact) => {
    const newContact = generateContact(contact.firstName, contact.lastName, contact.emailAddress, contact.notes);
    db.run(`INSERT INTO contacts(contactId, firstName, lastName, emailAddress, notes, dateCreated, dateModified) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [newContact.contactId, newContact.firstName, newContact.lastName, newContact.emailAddress, newContact.notes, newContact.dateCreated, newContact.dateModified]);
  },

  findById: (uuid) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM contacts WHERE contactId = ?", [uuid], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  deleteById: (uuid) => {
    db.run("DELETE FROM contacts WHERE contactId = ?", [uuid]);
  },

  update: (contact) => {
    db.run(`UPDATE contacts SET firstName = ?, lastName = ?, emailAddress = ?, notes = ?, dateModified = ? WHERE contactId = ?`,
      [contact.firstName, contact.lastName, contact.emailAddress, contact.notes, new Date().toISOString(), contact.contactId]);
  }
}

// Initialize the database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts(
    contactId TEXT PRIMARY KEY,
    firstName TEXT,
    lastName TEXT,
    emailAddress TEXT,
    notes TEXT,
    dateCreated TEXT,
    dateModified TEXT
  )`);
});

module.exports = repo;