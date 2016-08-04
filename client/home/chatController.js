angular.module('chatController',['theApp'])

.controller('chatController', ['$scope', '$window', '$location', function($scope, $window, $location) {
  var chatMessage = {
    'messageId': '',
    'message': '',
    'senderId': '',
    'originChannel': '',
    'channels': [],
  };

}]);