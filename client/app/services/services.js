angular.module('services', [])
  .factory('socket', function () {
    return io.connect();
  })
  .factory('Globals', function () {
    var userId = +localStorage.getItem('userId');
    console.log('id: ', userId)
    var selections = {};

    var setSelectedRecipient = function (recipient) {
      selections.recipient = recipient;
    }

    return {
      selections: selections,
      setSelectedRecipient: setSelectedRecipient,
      userId: userId
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

    var results = window.sessionStorage.token;
    var findContacts = function(userOne, userTwo) {

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
      /*var results = window.localStorage.token;
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
      });*/
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
      var results = window.localStorage.token;

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
  .factory('MessageService', ['$timeout','$window', '$http', '$rootScope', 'currentUser', 'socket',
    function MessageServiceFactory($timeout, $window, $http, $rootScope, currentUser, socket, store){
      var chats = [];

      var getRecentMessages = function () {
        return $http({
          method: 'GET',
          url: '/message',
          headers: {'Content-Type': 'application/json'},
        })
        .then(function(resp) {
          resp.data.forEach(function(message) {
            chats.push(message);
          });
          console.log(chats);
        });
      }

      var sendMessage = function(sender, recipient, messageText) {
        if(messageText.search(/^\/yelp /) > -1){  // '/yelp tacos around 22101'  or '/yelp pizza around la'
          var queryArr = messageText.replace(/^\/yelp /, '').split('around');
          var foodQuery = queryArr[0].trim(); //tacos or pizza
          var locationQuery = queryArr[1].trim(); //22101 or la
          // searchYelp(foodQuery, locationQuery);
          $window.open('https://www.yelp.com/search?find_desc=' +
            foodQuery +'&find_loc=' + locationQuery, '_blank');
        };
        var message = {
          'senderId': sender,
          'recipientId': recipient,
          'body': messageText,
          'recipientType': 'U'
        };

        socket.emit('send message', message);
      };

      socket.on('get message', function (message) {
        chats.push(message);

      });

      var searchYelp = function(searchTerm) {
        return $http({
          method: 'POST',
          url: '/api/yelp',
          headers: {'Content-Type': 'application/json'},
          data: {searchTerm: searchTerm}
        })
        .then(function (resp){
          return resp.data;
        })
        .catch(function(resp){
          console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
        });
      };
      return {
        sendMessage: sendMessage,
        searchYelp:searchYelp,
        getRecentMessages: getRecentMessages,
        chats: chats
      };
    }
  ]);
