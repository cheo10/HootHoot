var Sequelize = require('sequelize');

var db = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://hoot:hoot@localhost/hoot');

var MessageRecipient = db.define('MessageRecipient', {
  recipientId: Sequelize.INTEGER,
  recipientGroupId: Sequelize.INTEGER,
  messageId: Sequelize.INTEGER,
  isRead: Sequelize.BOOLEAN
});

module.exports = MessageRecipient;
