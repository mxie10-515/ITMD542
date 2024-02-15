const crypto = require('crypto');
const fs = require('fs');
const path= require('path');


const db = new Map();
let contactIdCounter = 100;

// Function to generate the next contact ID
function generateContactId() {
    contactIdCounter+=10;
    return contactIdCounter.toString();
}

// Function to create a new contact
function generateContact(firstName, lastName, emailAddress, notes) {
    // generate unique random uuid
    const contactId = generateContactId(); 

    // Get the current system time

    const currentTime = new Date();
    // Create the contact object
    const contact = {
        contactId,
        firstName,
        lastName,
        emailAddress,
        notes,
        dateCreated: currentTime,
        dateModified: currentTime
    };


    return contact;
}

// load data from file 
const loadData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../data/contact.json'));
  try {
    const contactArray = JSON.parse(jsonData);
    contactArray.forEach((element) => {
      const currentContact = {
        contactId: element[0],
        firstName: element[1].firstName,
        lastName: element[1].lastName,
        emailAddress: element[1].emailAddress,
        notes: element[1].notes,
        dateCreated: element[1].dateCreated,
        dateModified: element[1].dateModified
      };

      db.set(element[0], currentContact);
    });
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// save data to file
const saveData = () => {
    const jsonData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname,'../data/contact.json'),jsonData);
};




const repo = {
    findAll: () => Array.from(db.values()),
    create: (contact) =>{

        const newContact = generateContact(contact.firstName,contact.lastName,contact.emailAddress,contact.notes);
        db.set(newContact.contactId,newContact);
        saveData();
    },

   findById:(uuid) => db.get(uuid),

   deleteById:(uuid) => {
    db.delete(uuid);
    saveData();
  },

   update:(contact) => { 
    db.set(contact.contactId,contact);
    saveData();
   }
}

loadData();

module.exports = repo;