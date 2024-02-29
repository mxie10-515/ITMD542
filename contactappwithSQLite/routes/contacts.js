var express = require('express');
var router = express.Router();
const contactsDataBaseRepo = require('../src/contactDataBaseRepository');

/* GET contacts listing. */
router.get('/', async function (req, res, next) {
  const data = await contactsDataBaseRepo.findAll();
  res.render('contacts', { title: 'list of contacts including First Name, Last Name, Email Address', contacts: data });
});

/* get the form of Create a new contact */
router.get('/add', function (req, res, next) {
  res.render('contacts_add', { title: 'Create a new contact' });
});

/* submit Create a new contact */
router.post('/add', function (req, res, next) {
  // parameter validation
  if (req.body.firstName.trim() === '') {
    res.render('contacts_add', { title: 'Create a new contact', msg: 'The First Name cannot be empty' });
  } else if (req.body.lastName.trim() === '') {
    res.render('contacts_add', { title: 'Create a new contact', msg: 'The Last Name cannot be empty' });
  } else {
    contactsDataBaseRepo.create({
      firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(),
      emailAddress: req.body.emailAddress.trim(), notes: req.body.notes.trim()
    })
    res.redirect('/contacts');
  }
});

// /contacts/id
router.get('/:uuid', async function (req, res, next) {
  const contact = await contactsDataBaseRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contactDetail', { title: 'Single contact with detailed information', contact: contact });
  } else {
    res.redirect('/contacts');
  }
});

/* get a to be Deleted Contact */
router.get('/:uuid/delete', async function (req, res, next) {
  const contact = await contactsDataBaseRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contacts_delete', { title: 'delete contact ', contact: contact });
  } else {
    res.redirect(`/contacts/${contact.contactId}`);
  }
});

/* Delete a Contact */
router.post('/:uuid/delete', function (req, res, next) {
  contactsDataBaseRepo.deleteById(req.params.uuid);
  res.redirect('/contacts');
});

/* Edit a Contact */
router.get('/:uuid/edit', async function (req, res, next) {
  const contact = await contactsDataBaseRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contacts_edit', { title: 'Edit this contact ', contact: contact });
  } else {
    res.redirect(`/contacts`);
  }
});

/* submit Edit a contact */
router.post('/:uuid/edit', async function (req, res, next) {
  // parameter validation
  if (req.body.firstName.trim() === '') {
    const contact = await contactsDataBaseRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit this contact', msg: 'First Name can not be empty', contact: contact });
  } else if (req.body.lastName.trim() === '') {
    const contact = await contactsDataBaseRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit this contact', msg: 'Last Name can not be empty', contact: contact });
  } else {
    const updatedContact = await updateContact(
      req.params.uuid,
      req.body.firstName,
      req.body.lastName,
      req.body.emailAddress,
      req.body.notes
    );
    
    await contactsDataBaseRepo.update(updatedContact);
    res.redirect('/contacts');
  }
});

// Function for update fields in current contact 
async function updateContact(id, firstName, lastName, emailAddress, notes) {
  const contact = await contactsDataBaseRepo.findById(id);
  contact.firstName = firstName;
  contact.lastName = lastName;
  contact.emailAddress = emailAddress;
  contact.notes = notes;
  contact.dateModified = new Date();
  return contact;
}





module.exports = router;
