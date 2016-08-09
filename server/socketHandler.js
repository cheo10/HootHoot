var io = require('./server').io;
var db = require('./db');
var connectedUsers = {};
var socketToUser = {};

var register = function(profile) {
  connectedUsers[profile] = this;
<<<<<<< d9d0c94a4e93e53079784adf1d362c21adfc6400
  this.userId = profile;
=======
  socketToUser[this.id] = profile;
>>>>>>> Fix merge conflict
}

var isConnected = function(userId) {
  return userId in connectedUsers;
}

exports.newConnection =  function (socket) {
  socket.on('registered', register.bind(socket));

  socket.on('send message', function (message) {
    var recipient = message.recipientId;
    var recipientType = message.recipientType;

    if (recipientType === 'G') {
      io.to(recipient).emit('get message', message);
    } else if (recipientType === 'U') {
      if (isConnected(recipient)) {
        connectedUsers[recipient].emit('get message', message);
      }
    }

    db.Message.addMessage(message);

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
<<<<<<< d9d0c94a4e93e53079784adf1d362c21adfc6400
    delete connectedUsers[socket.userId];
=======
    var user = socketToUser[socket.id];
    delete connectedUsers[user];
    delete socketToUser[socket.id];
>>>>>>> Fix merge conflict
  })
};


