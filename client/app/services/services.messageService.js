(function() {
  'use strict';

  angular
    .module('services')
    .factory('MessageService', MessageService);

  MessageService.$inject = ['SocketService', 'DataService', 'CommandService'];

  function MessageService(SocketService, DataService, CommandService) {
    var service = {
      chats: [],
      sendMessage: sendMessage,
      getRecentMessages: getRecentMessages,
      addMessageToList: addMessageToList
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

      if(message.body[0] === '/') {
        CommandService.dispatchCommand(message)
          .then(function(processed) {
            SocketService.sendMessage(processed);
          })
      } else {
        SocketService.sendMessage(message);
      }
    };

    function addMessageToList(message) {
      service.chats.push(message);
    }
  }
})();