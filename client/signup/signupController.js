angular.module('signupController', ['theApp'])

.controller('signupController', function($scope, auth, $window, $http) {

  $scope.signUp = function(firstName, lastName, username, email, password) {
    $http({
      method: 'POST',
      url: '/signup',
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: password
    })
    console.log(firstName, lastName, username, email, password);
  };
});
