var app = angular.module('theApp', [
  'app.config',
  'app.login',
  'app.logout',
  'app.signup',
  'app.chatBox',
  'app.contacts',
  'commandController',
  'userpicdirective',
  'services',
  'chat',
  'ngSanitize'
  ])

app.config(['$routeProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider',
  function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {

    $routeProvider
    .when('/', {
      templateUrl: 'app/components/home/home.html',
      // controller: 'homedirective'
    })
    .when('/login', {
      templateUrl: 'login/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'signup/signup.html',
      controller: 'signupController'
    })
    .when('/chat', {
      templateUrl: 'app/views/chat.html',
      controller: 'chatController',
      // authenticate: true
    })
    .when('/commands', {
      templateUrl: 'app/components/commands/commands.html',
      controller: 'commandController'
    })

    authProvider.init({
    domain: 'jeffreylamwork.auth0.com',
    clientID: 'RdSGwryXzBL0bEHYoPasF9KX0hMwROjN',
    loginUrl: '/'
    });

    authProvider.on('loginSuccess', ['$location', '$http', 'profilePromise', 'idToken', 'store', 'SocketService',
      function($location, $http, profilePromise, idToken, store, SocketService) {

        console.log("Login Success");
        profilePromise.then(function(profile) {
          store.set('profile', profile);
          store.set('token', idToken);
          $location.path('/chat');
          var name = JSON.parse(window.localStorage.profile).name.split(" ");

          //after successul signin with auth, we will create a token
          return $http({
            method: 'POST',
            url: '/auth',
            data: {email: JSON.parse(window.localStorage.profile).email, firstname: name[0], lastname: name[1] }
          })
          .then(function (resp) {
            if(resp.data.token) {
              sessionStorage.setItem('token', resp.data.token);
              localStorage.setItem('userId', resp.data.id);
            } else {
              $location.path('/');
            }
          })
          .then(function() {
            $location.path('/chat');
          });

          SocketService.register();
        });
    }]);

    //Called when login fails
    authProvider.on('loginFailure', function($location) {
      alert("Error");
      $location.path('/');
    });

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');

    $httpProvider.interceptors.push('AttachTokens');
  }])

angular.module('mainCtrl', ['theApp'])
.controller('mainCtrl', function($scope,$window,$location, SocketService) {
  $scope.logout = function() {
    $window.localStorage.removeItem('token');
    $window.sessionStorage.removeItem('token');
    $window.localStorage.removeItem('profile');
    $window.localStorage.removeItem('username');
    $window.localStorage.removeItem('userId');
    $window.localStorage.removeItem('recipient');
    $window.localStorage.removeItem('email');
    $window.location.href = '/';
  };
})

app.factory('checker', function($http, $location, $window) {
    var isAuth = function() {
    return !!$window.sessionStorage.getItem('token');

  };

  return {
    isAuth: isAuth
  }

})
>>>>>>> (refactor) prep for demo
app.factory('AttachTokens', function($window) {
  //$http interceptor to stop outgoing requests
  //look in local storage and find user's token
  //add to header so server can validate request
  var attach = {
    request: function(object) {
      var jwt = $window.sessionStorage.getItem('token');
      if(jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
