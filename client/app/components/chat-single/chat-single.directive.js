angular.module('theApp').directive('chatSingle', function(MessageService) {
  return {
    restrict: "E",
    templateUrl: 'app/components/chat-single/chat-single.html',
    scope: {
      senderUuid: '@', //???
      content: '@',
      date: '@'
    }
  };
};