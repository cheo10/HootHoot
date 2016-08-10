angular.module('services', [])
  .factory('socket', function () {
    return io.connect();
  })
  .factory('Globals', function () {
    var selections = {};

    var setSelectedRecipient = function (recipient) {
      selections.recipient = recipient;
    }

    return {
      selections: selections,
      setSelectedRecipient: setSelectedRecipient
    }
  })
  .factory('GroupService', ['$http', '$rootScope',
    function GroupServiceFactory ($http, $rootScope) {
    var searchGroupFriends = [
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

    var findContacts = function(userOne, userTwo) {
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
    var sendGroup = function(groupName, groupMembers) {
      var results = window.localStorage.token;
      return $http({
        method: 'POST',
        url: '/groupRoom',
        headers: {'Content-Type': 'application/json', 'x-access-token': results},
        data: {groupName: groupName, groupMembers:groupMembers}
      })
      .then(function (resp){
        console.log('SUCCESSS POST' + resp.data);
        contacts.push(resp.data);
      })
      .catch(function(resp){
        console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
      });
    };
      return {
        sendGroup: sendGroup,
        findContacts:findContacts,
        searchGroupFriends:searchGroupFriends
      };
    }
  ])
  .factory('ContactService', ['$http', '$rootScope',
    function ContactServiceFactory ($http, $rootScope) {
      var contacts = [];

      var createContact = function(newContactEmail) {
        return $http({
          method: 'POST',
          url: '/contacts',
          headers: {'Content-Type': 'application/json'},
          data: {newContactEmail: newContactEmail}
        })
        .then(function (resp){
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
          for (var i = 0; i < resp.data.length; i++) {
            contacts.push(resp.data[i]);
          }
        });
      };

      var deleteContact = function(contactId) {
        return $http({
          method: 'DELETE',
          url: '/contacts',
          headers: {'Content-Type': 'application/json'},
          data: { contact: contactId }
        })
        .then(function (resp){
          for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].id === resp.data) {
              contacts.splice(i, 1);
              break;
            }
          }
        });
      };

      return {
        contacts: contacts,
        createContact: createContact,
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
