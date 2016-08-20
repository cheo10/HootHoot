(function() {
  'use strict';

  angular
    .module('services')
    .factory('MessageService', MessageService);

  MessageService.$inject = ['SocketService', 'DataService', 'CommandService', 'Globals'];

  function MessageService(SocketService, DataService, CommandService, Globals) {
    var service = {
      chats: [],
      sendMessage: sendMessage,
      getRecentMessages: getRecentMessages,
      addMessageToList: addMessageToList,
      processText: processText
    };

    var gotRecentMessages = false;

    return service;

    function getRecentMessages() {
      DataService.getRecentMessages()
        .then(consumeMessages);

      function consumeMessages(messages) {
        messages.forEach(addMessageToList);
        gotRecentMessages = true;
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

    function processText(text) {
      var frame = text.match(/^\[:frame:\](.*)\[:frame:\]$/);

      if(frame) {
        if(gotRecentMessages) { Globals.selections.frame = frame[1] };
        return 'Let\'s look at ' + frame[1];
      }

      return text;
    }

    function addMessageToList(message) {
      message.body = processText(message.body);
      service.chats.push(message);
    }
  }
})();