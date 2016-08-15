var Sequelize = require('sequelize');
var User = require('../user/userModel.js');
var db = require('../config/db.js')

var Contacts = db.define('Contacts', {
  userOne: Sequelize.INTEGER,
  userTwo: Sequelize.INTEGER,
});

Contacts.addContact = function(userOneId, userTwoEmail) {
  var contact;

  return User.findOne({ where: { email: userTwoEmail } })
    .then(function (newContact) {
      contact = { id: newContact.id, firstname: newContact.firstname, lastname: newContact.lastname };
      return Contacts.create({ userOne: userOneId, userTwo: contact.id })
    .then(function (createdContact) {
      return new Promise(function (resolve, reject) { resolve(contact) });
    });
  });
}

Contacts.getContacts = function(user) {
  return db.query(`select u.id, u.email, u.firstname, u.lastname, u.isActive
                    from Users u
                    where u.id in (select userTwo from Contacts where userOne=:user)`,
    { replacements: { user: user }, type: db.QueryTypes.SELECT });
}

Contacts.deleteContact = function(userOne, userTwo) {
  return Contacts.destroy({ where: { userOne: userOne, userTwo: userTwo } });
}

Contacts.sync();
module.exports = Contacts;
