var Sequelize = require('sequelize');
var db = new Sequelize('hoot','root','');

//define models we need
var User = db.define('User', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

User.sync();

var Message = db.define('Message', {
  body: Sequelize.STRING,
  senderId: Sequelize.STRING,
  parentMessageId: Sequelize.STRING,
  originChannelId: Sequelize.STRING,
});

Message.sync();

var Table = db.define('Table', {
  name: Sequelize.STRING,
});

Table.sync();

var GroupRoom = db.define('GroupRoom', {
  name: Sequelize.STRING,
  isActive: Sequelize.STRING
});

GroupRoom.sync();

var Contacts = db.define('Contacts', {
  name: Sequelize.STRING,
  isActive: Sequelize.STRING
});

Contacts.sync();


// Declare Relationships between Models
User.hasMany(Message);
Message.belongsTo(User);


exports.Contacts = Contacts;
exports.GroupRoom = GroupRoom;
exports.Table = Table;
exports.Message = Message;
exports.User = User;


