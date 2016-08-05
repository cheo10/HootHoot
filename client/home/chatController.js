angular.module('chatController',['theApp'])

.controller('chatController', ['$scope', '$window', '$location', function($scope, $window, $location) {
  var chatMessage = {
    'messageId': '',
    'message': '',
    'senderId': '',
    'originChannel': '',
    'channels': [],
  };

  $scope.logout = function() {
  store.remove('profile');
  store.remove('token');
  $location.path('/login');
  };

}]);
