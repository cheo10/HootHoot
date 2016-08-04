var app = angular.module('theApp', [
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ngRoute',
  'loginController',
  'signupController',
  'chatController'
  ])

app.config(['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider',
  function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

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
      controller: 'chatController',
      requiresLogin: true
    })

    authProvider.init({
    domain: 'jeffreylamwork.auth0.com',
    clientID: 'RdSGwryXzBL0bEHYoPasF9KX0hMwROjN',
    loginUrl: '/'
    });

    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store',
      function($location, profilePromise, idToken, store) {

        console.log("Login Success");
        profilePromise.then(function(profile) {
          store.set('profile', profile);
          store.set('token', idToken);
        });

        $location.path('/chat');
    }]);

    //Called when login fails
    authProvider.on('loginFailure', function($location) {
      alert("Error");
      $location.path('/');
    });

    //Angular HTTP Interceptor function
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
      return store.get('token');
    }];

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');
  }]);

  app.controller('mainCtrl', function($scope){
      $scope.message = "hi";
    })

  app.run(['auth', function(auth) {
    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
    }]);

