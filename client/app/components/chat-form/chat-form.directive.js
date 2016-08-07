angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',
    scope: {},

    controller: function($scope, currentUser, store, MessageService) {//declare and link up currentuser and main factory messageService!!!
      $scope.senderId = store.get('profile').nickname;
      $scope.recipient = $scope.senderId === 'Forrest Labrum' ? 'Chris Heo' : 'Forrest Labrum';
      $scope.messageText = '';

      $scope.sendMessage = function() {
        MessageService.sendMessage($scope.senderId, $scope.recipient, $scope.messageText);
        $scope.messageText = '';
      }
    }
  };
});

