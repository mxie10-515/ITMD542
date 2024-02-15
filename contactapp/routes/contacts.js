var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactFileRepository');


/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
    // view template: contact.pug , js objs
  res.render('contacts',{title:'list of contacts including First Name, Last Name, Email Address',contacts:data}); 
});

/* form of Create a new contact */
router.get('/add', function(req, res, next) {
    // view template: contacts_add.pug 
  res.render('contacts_add',{title:'Create a new contact'}); 
});

/* submit Create a new contact */
router.post('/add', function(req, res, next) {
    // view template: contacts_add.pug 
  console.log(req.body);

  // parameter validation

  if (req.body.firstName.trim() === '') {
    res.render('contacts_add', { title: 'Create a new contact', msg: 'The First Name cannot be empty'});
  } else if (req.body.lastName.trim() === '') {
    res.render('contacts_add', { title: 'Create a new contact', msg: 'The Last Name cannot be empty'});
  } else{
    contactsRepo.create({firstName:req.body.firstName.trim(),lastName:req.body.lastName.trim(),
      emailAddress:req.body.emailAddress.trim(),notes:req.body.notes.trim()})
    res.redirect('/contacts');
  }
});


// /contacts/id
router.get('/:uuid', function(req, res, next) {
    // view template: contactDetail.pug , js objs
    const contact = contactsRepo.findById(req.params.uuid);
    if(contact){
      res.render('contactDetail',{title:'Single contact with detailed information',contact:contact}); 

    }else{
      res.redirect('/contacts');
    }
  });

  /* Delete a Contact */
  router.get('/:uuid/delete', function(req, res, next) {
    // view template: contact_delete.pug , js objs
    const contact = contactsRepo.findById(req.params.uuid);
    if(contact){
      res.render('contacts_delete',{title:'delete contact ',contact:contact}); 

    }else{
      res.redirect(`/contacts/${contact.contactId}`);
    }
  });

  /* Delete a Contact */
  router.post('/:uuid/delete', function(req, res, next) {
    // action for delete
    contactsRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
  });


  /* Edit a Contact */
  router.get('/:uuid/edit', function(req, res, next) {
    // view template: contact_delete.pug , js objs
    const contact = contactsRepo.findById(req.params.uuid);
    if(contact){
      res.render('contacts_edit',{title:'Edit this contact ',contact:contact}); 

    }else{
      res.redirect(`/contacts`);
    }
  });


  /* submit Edit a contact */
router.post('/:uuid/edit', function(req, res, next) {
// actions for edit
 
// parameter validation
if (req.body.firstName.trim() === ''||req.body.lastName.trim() === ''||req.body.emailAddress.trim() === ''||req.body.notes.trim() === '') {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', { title: 'Edit this contact', msg: 'All Fileds can not be empty',contact:contact});
} else{
  const updatedContact = updateContact(
    req.params.uuid,
    req.body.firstName,
    req.body.lastName,
    req.body.emailAddress,
    req.body.notes
  );
  contactsRepo.update(updatedContact);
  res.redirect('/contacts');
}
});

// Function for update fields in current contact 
function updateContact(id,firstName,lastName,emailAddress,notes){
  const contact = contactsRepo.findById(id);
  contact.firstName = firstName;
  contact.lastName= lastName;
  contact.emailAddress = emailAddress;
  contact.notes= notes;
  contact.dateModified = new Date();
  return contact;
}



module.exports = router;
