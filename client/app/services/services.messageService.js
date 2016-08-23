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
      processText: processText,
      markAllRead: markAllRead
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

    function markAllRead(senderId) {
      var toUpdate = [];

      service.chats.map(function(chat) {
        if(chat.senderId === senderId && !chat.isRead) {
          chat.isRead = 1;
          toUpdate.push(chat.id);
        }
      })

      SocketService.markRead(toUpdate)
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
      }
      if(message.body.indexOf('/embed') >= 0) {
        message.body = message.body.split('http').join('[:iframe:]http') + '[:iframe:]'
        SocketService.sendMessage(message);
      }
      if(message.body.indexOf('youtube.com/watch') >= 0) {
        message.body = message.body.split('/watch?v=').join('/embed/');
        message.body = message.body.split('http').join('[:iframe:]http') + '[:iframe:]'
        SocketService.sendMessage(message);
      }
       else {
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
          close: '" height = "50%"; width="50%">'
        },
        '[:video:]': {
          open: '<video controls="controls" src="',
          close: '"height = "300px"></video>'
        },
        '[:audio:]': {
          open: '<audio controls="controls" src="',
          close: '"></audio>'
        },
        '[:frame:]': {
          open: 'Let\'s look at ',
          action: function(str) {
            if(gotRecentMessages) { Globals.selections.frame = str };
          }
        },
        '[:iframe:]': {
          open: '<iframe width="640" height="360" src="',
          close: '" frameborder="0" allowfullscreen></iframe>'
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
      // debugger;
      service.chats.push(message);
    }
  }
})();