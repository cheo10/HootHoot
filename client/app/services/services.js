angular.module('services', [])
  .factory('socket', function () {
    return io.connect();
  })
  .factory('ContactService', ['$http', '$rootScope',
    function ContactServiceFactory ($http, $rootScope) {
      var contacts = [
        {
          name: "Abby Diggity",
          isActive: true,
          channel: "Facebook"
        },
        {
          name: "Forrest Labrum",
          isActive: false,
          channel: "Skype"
        },
        {
          name: "Jeff Lam",
          isActive: true,
          channel: "Gchat"
        }
      ];

      var findOrCreateContacts = function(userOne, userTwo) {
        var results = window.localStorage.token;
        return $http({
          method: 'POST',
          url: '/contacts',
          headers: {'Content-Type': 'application/json', 'x-access-token': results},
          data: {userOne: userOne, userTwo:userTwo}
        })
        .then(function (resp){
          console.log('SUCCESSS POST' + resp.data);
          contacts.push(resp.data);
        })
        .catch(function(resp){
          console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
        });
      };

      var getAllContacts = function() {
        return $http({
          method: 'GET',
          url: '/contacts',
          headers: {'Content-Type': 'application/json'},
        })
        .then(function (resp){
          return resp.data;
        });
      };

      var deleteContact = function () {};

      return {
        contacts: contacts,
        findOrCreateContacts: findOrCreateContacts,
        getAllContacts: getAllContacts,
        deleteContact: deleteContact
      };
    }
  ])
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
    }
  ]);
