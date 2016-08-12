var db = require('../db');
var jwt = require('jsonwebtoken');

module.exports = {

  contacts: {
    get: function(req, res) {
      var user = req.decoded;

      db.Contacts.getContacts(user.id)
      .then(function(contacts) {
        res.json(contacts);
      });
    },
    post: function(req, res) {
      var user = req.decoded;

      db.Contacts.addContact(user.id, req.body.newContactEmail)
        .then(function(createdContact) {
          res.json(createdContact);
        });
    },
    delete: function(req, res) {
      var user = req.decoded;

      db.Contacts.deleteContact(user.id, req.body.contact)
        .then(function(deletedContact) {
          res.json(deletedContact);
        });
    }
  }
}
