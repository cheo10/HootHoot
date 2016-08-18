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

    return service;

    function getRecentMessages() {
      DataService.getRecentMessages()
        .then(consumeMessages);

      function consumeMessages(messages) {
        messages.forEach(addMessageToList);
      }
    }
    function processText(text) {
      // var frame = text.match(/^\[:frame:\](.*)\[:frame:\]$/);

      if(text.indexOf('[:frame:]') > -1) {
        Globals.selections.frame = text.substring(10,text.length - 10);
        console.log(Globals.selections.frame);
        return 'Let\'s look at ' + text.substring(10,text.length - 10);
      }

      return text;
    }
    function sendMessage(sender, recipient, messageText) {
      var message = {
        'senderId': sender,
        'recipientId': recipient,
        'body': JSON.stringify(messageText),
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
      while(true) {
        try{
          message.body = JSON.parse(message.body);
        }
        catch(e) {
          break;
        }
      }
      service.chats.push(message);
    }
  }
})();