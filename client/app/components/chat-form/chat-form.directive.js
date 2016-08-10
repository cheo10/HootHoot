angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',
    scope: {},

    controller: function($scope, currentUser, store, MessageService, Globals) {//declare and link up currentuser and main factory messageService!!!
      $scope.senderId = Globals.userId;
      $scope.selections = Globals.selections;
      $scope.messageText = '';

      $scope.sendMessage = function() {
        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';
      }
    }
  };
});

