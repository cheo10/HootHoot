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
  'services',
  'mainCtrl'
  ])

app.config(['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider',
  function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

    $routeProvider
    .when('/', {
      templateUrl: 'login/login.html',
      controller: 'loginController',

    })
    .when('/signup', {
      templateUrl: 'signup/signup.html',
      controller: 'signupController',

    })
    .when('/chat', {
      templateUrl: 'app/views/chat.html',
      controller: '',
      authenticate: true
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

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AttachTokens');
  }])

angular.module('mainCtrl', ['theApp'])
.controller('mainCtrl', function($scope,$window,$location) {

  $scope.logout = function() {
    $window.localStorage.removeItem('id');
    $window.localStorage.removeItem('profile');
    $window.localStorage.removeItem('token');
    $window.localStorage.removeItem('username');
    $location.path('/');
  };
})

app.value('currentUser', Math.floor(Math.random() * 1000000));

app.factory('Authentication', function($http, $location, $window) {
    var isAuth = function() {
    return !!$window.localStorage.getItem('token');
  };

  return {
    isAuth: isAuth
  }

})

app.factory('AttachTokens', function($window) {
  //$http interceptor to stop outgoing requests
  //look in local storage and find user's token
  //add to header so server can validate request
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('token');
      if(jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function($rootScope, $location, Authentication) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (!Authentication.isAuth()) {
      console.log('not authenticated')
      $location.path('/signup');
    }
  });
});

app.run(['auth', function(auth) {
    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
}]);

