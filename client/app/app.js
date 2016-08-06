var app = angular.module('theApp', [
  'auth0',
  'angular-storage',
  'angular-jwt',
  'ngRoute',
  'loginController',
  'signupController',
  'chatformdirective',
  'chatsingledirective',
  'chatlistdirective',
  'userpicdirective',
  'services'
  ])

app.config(['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider',
  function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

    $routeProvider
    .when('/', {
      templateUrl: 'login/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'signup/signup.html',
      controller: 'signupController'

    })
    .when('/chat', {
      templateUrl: 'app/views/chat.html',
      controller: ''
      // requiresLogin: true
    })

    authProvider.init({
    domain: 'jeffreylamwork.auth0.com',
    clientID: 'RdSGwryXzBL0bEHYoPasF9KX0hMwROjN',
    loginUrl: '/'
    });

    authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store', 'socket',
      function($location, profilePromise, idToken, store, socket) {

        console.log("Login Success");
        profilePromise.then(function(profile) {
          store.set('profile', profile);
          store.set('token', idToken);

          socket.emit('registered', profile.nickname);
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

app.value('currentUser', Math.floor(Math.random() * 1000000));


app.run(['auth', function(auth) {
    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
}]);

