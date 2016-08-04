angular.module('loginController', ['theApp'])

.controller('loginController', ['$scope', 'auth', '$location', function($scope, auth, $location) {
  $scope.auth = auth;

  $scope.login = function() {

  };

  $scope.logout = function() {

  };


}]);
