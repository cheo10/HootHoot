angular.module('loginController', ['theApp'])

.controller('loginController', ['$scope', '$http', 'auth', '$location','$window', 'socket', function($scope, $http, auth, $location, $window, socket) {

  $scope.auth = auth;

  $scope.login = function(email, password) {
    return $http({
      method: 'POST',
      url: '/',
      data: {email: email, password: password}
    })
    .then(function (resp) {
      if(resp.data.token) {
        $window.localStorage.setItem('token', resp.data.token);
        $window.localStorage.setItem('userId', resp.data.id)
        $scope.id = $window.localStorage.getItem('userId');
        socket.emit('registered', $scope.id);
        $location.path('/chat');
      } else {
        $location.path('/');
      }
    });
  };

}]);