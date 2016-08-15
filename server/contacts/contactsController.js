var jwt = require('jsonwebtoken');
var Contacts = require('./contactsModel.js')

module.exports = {

  contacts: {
    get: function(req, res) {
      var user = req.decoded;

      Contacts.Contacts.getContacts(user.id)
      .then(function(contacts) {
        res.json(contacts);
      });
    },
    post: function(req, res) {
      var user = req.decoded;

      Contacts.Contacts.addContact(user.id, req.body.newContactEmail)
        .then(function(createdContact) {
          res.json(createdContact);
        });
    },
    delete: function(req, res) {
      var user = req.decoded;

      Contacts.Contacts.deleteContact(user.id, req.body.contact)
        .then(function(deletedContact) {
          res.json(deletedContact);
        });
    }
  }
}
