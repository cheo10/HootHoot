angular.module('loginController', ['theApp'])

.controller('loginController', ['$scope', '$http', 'auth', '$location','$window', function($scope, $http, auth, $location, $window) {

  $scope.auth = auth;

  $scope.login = function(username, password) {
    return $http({
      method: 'POST',
      url: '/',
      data: {username: username, password: password}
    })
    .then(function (resp) {
      if(resp.data.token) {
        $window.localStorage.setItem('com.hoot', resp.data.token);
        $window.localStorage.setItem('com.username', resp.data.username);
        $window.localStorage.setItem('com.userId', resp.data.id)
        $scope.username = $window.localStorage.getItem('com.username');
        $scope.id = $window.localStorage.getItem('com.userId');
        $location.path('/chat');
      } else {
        $location.path('/');
      }
    });
  };

}]);