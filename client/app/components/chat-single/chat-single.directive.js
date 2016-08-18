angular.module('chatsingledirective', ['theApp']).directive('chatsingle', function(MessageService) {
  return {
    restrict: "E",
    templateUrl: 'app/components/chat-single/chat-single.html',
    scope: {
      sender: '@', //???
      body: '@',
      date: '@',
      type: '@'
    }
  }
});