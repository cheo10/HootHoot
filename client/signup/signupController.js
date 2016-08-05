angular.module('signupController', ['theApp'])

.controller('signupController', function($scope, auth, $window, $http) {

  $scope.signUp = function(firstName, lastName, username, email, password) {
    $http({
      method: 'POST',
      url: '/signup',
      data: {
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        password: password
      }
    })
    console.log('sent post req from signup controller');
  };
});
