angular.module('chatlistdirective', ['theApp','luegg.directives']).directive('chatlist', function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-list/chat-list.html',
    scope: {
      list: '=chatlist'
    },
    link: function(scope, element) {
      scope.$watchCollection('list', function() {
        var $list = element.find('.chatScroll');
        var scrollHeight = $list.prop('scrollHeight');
        $list.prop('scrollTop', scrollHeight);
      });
    },

    controller: function($timeout, $scope, MessageService, socket, Globals) {

      $scope.chats = MessageService.chats;

      $scope.selections = Globals.selections;

      $scope.getRecentMessages = function () {
        MessageService.getRecentMessages();
      }

      $scope.filterById = function (message) {
        if (Globals.selections.recipient) {
          var recipient = Globals.selections.recipient.id;

          return message.recipientId === recipient || message.senderId === recipient;
        }
      }

      socket.on('get message', function () {
        $scope.$apply();
      })

      socket.on('get ride', function () {
        $scope.$apply();
      })
    }
  };
});