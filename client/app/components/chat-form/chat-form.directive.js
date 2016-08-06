angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',
    scope: {},

    controller: function($scope, currentUser, MessageService) {//declare and link up currentuser and main factory messageService!!!
      $scope.uuid = currentUser;
      $scope.messageContent = '';

      $scope.sendMessage = function() {
        MessageService.sendChat($scope.messageContent);
        $scope.messageContent = '';
      }
    }
  };
});