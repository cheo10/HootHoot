(function() {
  'use strict';

  angular
    .module('app.logout', ['theApp'])
    .controller('logoutController', logoutController);

  logoutController.$inject = ['$scope', '$window', '$location' , 'SocketService'];

  function logoutController($scope, $window, $location, SocketService) {

    $scope.logout = logout;

    function logout() {
      $window.localStorage.removeItem('token');
      $window.sessionStorage.removeItem('token');
      $window.localStorage.removeItem('profile');
      $window.localStorage.removeItem('username');
      $window.localStorage.removeItem('userId');
      $window.localStorage.removeItem('recipient');
      $window.localStorage.removeItem('email');
      $window.location.href = '/';
    }
  }
})();
