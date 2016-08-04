var app = angular.module('theApp', [
  'ngRoute',
  'loginController',
  'signupController'
  ])

  app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'client/login/login.html',
      controller: 'loginController'
      // requiresLogin: true
    })
    .when('/signup', {
      templateUrl: 'client/signup/signup.html',
      controller: 'signupController'

    })
    .when('/chat', {
      templateUrl: 'client/home/chat.html',
      controller: 'chatController'
    })
  })

  app.controller('mainCtrl', function($scope){
    $scope.message = "hi";
  })