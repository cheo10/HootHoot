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
  'mainCtrl',
  'chat',
  'ngSanitize'
  ])

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
