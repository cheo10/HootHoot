var io = require('./server').io;
var db = require('./db');
var Wit = require('./wit');
var connectedUsers = {};

var register = function(profile) {
  connectedUsers[profile] = this;
  this.userId = profile;
}

var isConnected = function(userId) {
  return userId in connectedUsers;
}

exports.newConnection =  function (socket) {
  socket.on('registered', register.bind(socket));

  socket.on('send message', function (message) {
    var sender = message.senderId;
    var recipient = message.recipientId;
    var recipientType = message.recipientType;

    db.Message.addMessage(message)
      .then(function (result) {
        message.messageCreated = result.createdAt;

        if (recipientType === 'G') {
          io.to(recipient).emit('get message', message);
        } else if (recipientType === 'U') {
          connectedUsers[sender].emit('get message', message);
          if (isConnected(recipient)) {
            connectedUsers[recipient].emit('get message', message);
          }
        }
      })


    /*Wit.process(message.body)
          .then(function (resp) {
            console.log(resp)
          })*/



  });

  socket.on('create group', function (group) {
    group.push(socket.userId);
    // create group in database
    db.GroupRoom.addGroup(group)
      .then(function(group) {
        // tell each member in group to listen for messages on that group id
        group.forEach(function (participant) {
          if(isConnected(participant)){
            connectedUsers[participant].emit('join group', group);
          }
        })
      });
  });

  socket.on('disconnect', function() {
    delete connectedUsers[socket.userId];
  })
};
