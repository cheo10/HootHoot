angular.module('theApp').directive.('chatForm', function () {
  return {
    restrict: "E",
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

