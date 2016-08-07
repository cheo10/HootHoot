angular.module('chatlistdirective', ['theApp']).directive('chatlist', function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-list/chat-list.html',

    link: function(scope, element, attrs, ctrl) {
      var element = angular.element(element);
      var init = function() {};
      init();
    },

    controller: function($scope, MessageService, socket) {
      $scope.scrollToBottom = function() {
        var uuidLastChat = _.last($scope.chats).uuid;
        $anchorScroll(uuidLastChat);
      };

      $scope.listDidRender = function() {
        $scope.scrollToBottom();
      };

      $scope.chats = MessageService.chats;
    }
  };
});