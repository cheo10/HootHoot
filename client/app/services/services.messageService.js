(function() {
  'use strict';

  angular
    .module('services')
    .factory('MessageService', MessageService);

  MessageService.$inject = ['$window', '$http', 'SocketService'];

  function MessageService($window, $http, SocketService) {
    var service = {
      chats: [],
      sendMessage: sendMessage,
      searchYelp:searchYelp,
      getRecentMessages: getRecentMessages
    };

    return service;

    function getRecentMessages() {
      DataService.getRecentMessages()
        .then(consumeMessages);

      function consumeMessages(messages) {
        messages.forEach(addMessageToList);
      }
    }

    function sendMessage(sender, recipient, messageText) {
      var message = {
        'senderId': sender,
        'recipientId': recipient,
        'body': messageText,
        'recipientType': 'U'
      };

      SocketService.sendMessage(message);
    };

    function addMessageToList(message) {
      service.chats.push(message);
    }
  }
})();