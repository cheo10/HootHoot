angular.module('services', [])
  .factory('socket', function () {
    return io.connect();
  })
  .factory('ContactService', ['$http', '$rootScope', function ($http, $rootScope) {
    function findOrCreateContacts (userId, username){
      return $http({
        method: 'POST',
        url: '/contacts',
        headers: {'Content-Type': 'application/json'},
        data: {userId: userId, username:username}
      })
      .then(function (resp){
        return resp.data;
      });
    }

    return {
      findOrCreateContacts: findOrCreateContacts
    };
  }])
  .factory('MessageService', ['$rootScope', 'currentUser', 'socket',
    function MessageServiceFactory($rootScope, currentUser, socket, store){
      var chats = [];

      var sendMessage = function(sender, recipient, messageText) {
        var message = {
          'senderId': sender,
          'recipientId': recipient,
          'body': messageText,
          'recipientType': 'U',
          'messageCreated': Date.now()
        }

        socket.emit('send message', message);
        appendMessage(message);
      };

      var appendMessage = function(message) {
        console.log('appending message from you');

        chats.push(message);
      };

      socket.on('get message', function (data) {
        console.log('receiving from server');
        appendMessage(data);
      });

      return {
        sendMessage: sendMessage,
        chats: chats
      };
  }]);
