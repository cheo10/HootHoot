var io = require('./server').io;
var db = require('./db');
var request = require('request');
var connectedUsers = {};
var accessToken = process.env.WIT;

var register = function(profile) {
  db.User.isActive(profile);

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

        return message;
      })
      .then(function (message) {

        request.get({ url: 'https://api.wit.ai/message', qs: { v: '20160810', q: message.body },
          auth: { bearer: accessToken } }, function (err, resp) {
            var entities = JSON.parse(resp.body).entities;

            if (entities.location) {
              var loc = entities.location.reduce((loc, piece) => loc === '' ? loc + piece.value : loc + ` ${piece.value}`, '');

              loc = `https://m.uber.com/ul?client_id=xvr7xvjsRimtJsq6Xl_MJ4vJK-lwZsK1&action=setPickup&pickup=my_location&dropoff=${encodeURI(loc)}`

              connectedUsers[sender].emit('get ride', { body: loc, recipientId: message.recipientId, recipientType: 'E' })
            }
          });
  });
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
    db.User.isNotActive(socket.userId);
    delete connectedUsers[socket.userId];
  })
};
