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
      var escapeMap = {
        "<": "&lt;",
        ">": "&gt;"
      };

      var tags = {
        '[:link:]': {
          open: '<a href="$val">',
          close: '</a>'
        },
        '[:img:]': {
          open: '<img src="',
          close: '">'
        },
        '[:frame:]': {
          open: 'Let\'s look at ',
          action: function(str) {
            if(gotRecentMessages) { Globals.selections.frame = str };
          }
        }
      }

      return text.replace(/[<>]/g, escape)
        .replace(/(\[:.*:\])(.*)(\1)/g, interpretMarkup);

      function escape(s) {
        return escapeMap[s];
      }

      function interpretMarkup(s, foundTag, content) {
        var tag = tags[foundTag];

        if(!tag) {
          return foundTag + content + foundTag;
        }

        if(tag.action) {
          tag.action(content);
        }

        var processed = tag.close ? tag.open + content + tag.close : tag.open + content;

        return processed.replace('$val', content);
      }
    }

    function addMessageToList(message) {
      message.body = processText(message.body);
      service.chats.push(message);
    }
  }
})();
