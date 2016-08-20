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
    controller: function($timeout, $scope, MessageService, Globals, $rootScope) {

      $scope.chats = [];

      $scope.selections = Globals.selections;

      $scope.getRecentMessages = function () {
        MessageService.getRecentMessages();
      }

      $scope.$watch(function() { return MessageService.chats; }, function(val) {
        $scope.chats = val;
      }, true);

      $rootScope.$on('get message', function(e, message) {
          MessageService.addMessageToList(message)});

      $scope.filterById = function (message) {
        if (Globals.selections.recipient) {
          var recipient = Globals.selections.recipient.id;

          return message.recipientId === recipient || message.senderId === recipient;
        }
      }
    }
  };
});