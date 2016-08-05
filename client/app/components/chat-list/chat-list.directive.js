angular.module('theApp').directive('chatList', function($timeout, $anchorScroll, MessageService, ngNotify) {
  return {
    restrict: "E",
    templateUrl: 'app/components/chat-list/chat-list.html',

    link: function(scope, element, attrs, ctrl) {
      var element = angular.element(element);
      var init = function() {};
      init();
    },

    controller: function($scope) {
      $scope.chats = MessageService;

      $scope.scrollToBottom = function() {
        var uuidLastChat = _.last($scope.chats).uuid;
        $anchorScroll(uuidLastChat);
      };

      $scope.listDidRender = function() {
        $scope.scrollToBottom();
      };
    }
  };
});