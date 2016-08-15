var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var db = new Sequelize(process.env.CLEARDB_DATABASE_URL || 'mysql://hoot:hoot@localhost/hoot');

var Message = db.define('Message', {
  body: Sequelize.STRING,
  senderId: Sequelize.INTEGER,
  parentMessageId: Sequelize.INTEGER,
  originChannelId: Sequelize.INTEGER,
});

var MessageRecipient = db.define('MessageRecipient', {
  recipientId: Sequelize.INTEGER,
  recipientGroupId: Sequelize.INTEGER,
  messageId: Sequelize.INTEGER,
  isRead: Sequelize.BOOLEAN
});

Message.addMessage = function(message) {
  return Message.create({body: message.body, senderId: message.senderId})
    .then(function (messageResult) {
      return MessageRecipient.create({recipientId: message.recipientId, messageId: messageResult.id, isRead: false })
    });
}

Message.getRecent = function(user) {
  return db.query(`select m.senderId, mr.recipientId, m.body, "U" recipientType, m.createdAt messageCreated
    from MessageRecipients mr
    join Messages m on m.id=mr.messageId
    where m.senderId=:user or mr.recipientId=:user
    order by m.id desc
    limit 250`,
    { replacements: { user: user }, type: db.QueryTypes.SELECT });
}

module.exports.Message = Message;