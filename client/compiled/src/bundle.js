webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	module.exports = __webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports) {

	angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
	  return {
	    restrict: "E",
	    replace: true,
	    templateUrl: 'app/components/chat-form/chat-form.html',

	    controller: function($scope, currentUser, store, MessageService, Globals) {//declare and link up currentuser and main factory messageService!!!
	      $scope.senderId = Globals.userId;
	      $scope.selections = Globals.selections;

	      $scope.messageText = '';

	      //load weather using your lat/lng coordinates
	      navigator.geolocation.getCurrentPosition(function(position) {
	        $scope.loadWeather(position.coords.latitude+','+position.coords.longitude);
	      });


	      $scope.loadWeather = function(location, woeid) {
	        $.simpleWeather({
	          location: location,
	          woeid: woeid,
	          unit: 'f',
	          success: function(weather) {
	            html = '<h2 id="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';

	            $("#weather").html(html);
	          },
	          error: function(error) {
	            $("#weather").html('<p>'+error+'</p>');
	          }
	        });
	      }

	      $scope.sendMessage = function() {

	        if($scope.messageText.match(/\/weather/)) {
	          $scope.messageText = document.getElementById("temp").innerHTML.split('</i> ')[1];
	        }

	        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
	        $scope.messageText = '';
	      }
	    }
	  };
	});



/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module('chatlistdirective', ['theApp']).directive('chatlist', function() {
	  return {
	    restrict: "E",
	    replace: true,
	    templateUrl: 'app/components/chat-list/chat-list.html',
	    scope: {
	      list: '=chatlist'
	    },
	    link: function(scope, element) {
	      scope.$watchCollection('list', function() {
	        var $list = element.find('.chatScroll');
	        var scrollHeight = $list.prop('scrollHeight');
	        $list.prop('scrollTop', scrollHeight);
	      });
	    },

	    controller: function($timeout, $scope, MessageService, socket, Globals) {
	      // var scrolled = false;
	      // function updateScroll(){
	      //     if(!scrolled){
	      //         var element = document.getElementById("chatScroll");
	      //         element.scrollTop = element.scrollHeight;
	      //     }
	      // }

	      // $("#chatScroll").on('scroll', function(){
	      //     scrolled=true;
	      // });



	      $scope.chats = MessageService.chats;

	      $scope.selections = Globals.selections;

	      $scope.getRecentMessages = function () {
	        MessageService.getRecentMessages();
	      }

	      $scope.filterById = function (message) {
	        if (Globals.selections.recipient) {
	          var recipient = Globals.selections.recipient.id;

	          return message.recipientId === recipient || message.senderId === recipient;
	        }
	      }

	      socket.on('get message', function () {
	        $scope.$apply();
	      })

	      socket.on('get ride', function () {
	        $scope.$apply();
	      })
	    }
	  };
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	angular.module('chatsingledirective', ['theApp']).directive('chatsingle', function(MessageService) {
	  return {
	    restrict: "E",
	    templateUrl: 'app/components/chat-single/chat-single.html',
	    scope: {
	      sender: '@', //???
	      body: '@',
	      date: '@',
	      type: '@'
	    }
	  }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	angular.module('contactlistdirective', ['theApp']).directive('contactlist', function() {
	  return {
	    restrict: "E",
	    templateUrl: 'app/components/contact-list/contact-list.html',
	    scope: {

	    },
	    controller: function($rootScope, $scope, ContactService, Globals) {

	      var hardcodeUser = 'nahee';

	      $scope.contacts = ContactService.contacts;

	      $scope.addContact = function (newContactEmail) {
	        ContactService.createContact(newContactEmail);
	      };

	      $scope.getAllContacts = function() {
	        ContactService.getAllContacts();
	      };

	      $scope.deleteContact = function (contact){
	        ContactService.deleteContact(contact);
	      };

	      $scope.setSelectedRecipient = function (recipient) {
	        Globals.setSelectedRecipient(recipient);
	      };
	    }
	  };
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	angular.module('contactsingledirective', ['theApp']).directive('contactsingle', function(ContactService) {
	  return {
	    restrict: "E",
	    templateUrl: 'app/components/contact-single/contact-single.html',
	    scope: {
	      name: '@',
	      channel: '@',
	      isactive: '@'
	    }
	  };
	});


/***/ },
/* 6 */
/***/ function(module, exports) {

	angular.module('grouplistdirective', ['theApp']).directive('grouplist', function() {
	  return {
	    restrict: "E",
	    templateUrl: 'app/components/group-list/group-list.html',
	    controller: function($rootScope, $scope, GroupService) {
	      var hardcodeUser = 'nahee';
	      $scope.click = false;
	      $scope.groupFriends = [];
	      $scope.searchGroupFriends = GroupService.searchGroupFriends;
	      $scope.showGroup = function () {
	        $scope.click = true;
	      };
	      $scope.sendGroup = function () {
	        GroupService.sendGroup($scope.addGroupNames, $scope.groupFriends);
	      };
	      $scope.createGroup = function (name) {
	        $scope.groupFriends.push(name);
	      };
	      $scope.findContacts = function() {
	        GroupService.findContacts();
	      };
	      $scope.AddContact = function (){
	        GroupService.AddContact();
	      };
	    }
	  };
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	angular.module('groupsingledirective', ['theApp']).directive('groupsingle', function(GroupService) {
	  return {
	    restrict: "E",
	    templateUrl: 'app/components/group-single/group-single.html',
	    scope: {
	      name: '@',
	      channel: '@',
	      status: '@'
	    }
	  };
	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	angular.module('services', [])
	  .factory('socket', function () {
	    return io.connect();
	  })
	  .factory('Globals', function () {
	    var userId = +localStorage.getItem('userId');
	    console.log('id: ', userId)
	    var selections = {};

	    var setSelectedRecipient = function (recipient) {
	      selections.recipient = recipient;
	    }

	    return {
	      selections: selections,
	      setSelectedRecipient: setSelectedRecipient,
	      userId: userId
	    }
	  })
	  .factory('GroupService', ['$http', '$rootScope',
	    function GroupServiceFactory ($http, $rootScope) {
	    var searchGroupFriends = [
	      {
	        name: "Abby Diggity",
	        isActive: true,
	        channel: "Facebook"
	      },
	      {
	        name: "Forrest Labrum",
	        isActive: false,
	        channel: "Skype"
	      },
	      {
	        name: "Jeff Lam",
	        isActive: true,
	        channel: "Gchat"
	      }
	    ];

	    var results = window.sessionStorage.token;
	    var findContacts = function(userOne, userTwo) {

	      return $http({
	        method: 'POST',
	        url: '/contacts',
	        headers: {'Content-Type': 'application/json', 'x-access-token': results},
	        data: {userOne: userOne, userTwo:userTwo}
	      })
	      .then(function (resp){
	        console.log('SUCCESSS POST' + resp.data);
	        contacts.push(resp.data);
	      })
	      .catch(function(resp){
	        console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
	      });
	    };
	    var sendGroup = function(groupName, groupMembers) {
	      /*var results = window.localStorage.token;
	      return $http({
	        method: 'POST',
	        url: '/groupRoom',
	        headers: {'Content-Type': 'application/json', 'x-access-token': results},
	        data: {groupName: groupName, groupMembers:groupMembers}
	      })
	      .then(function (resp){
	        console.log('SUCCESSS POST' + resp.data);
	        contacts.push(resp.data);
	      })
	      .catch(function(resp){
	        console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
	      });*/
	    };
	      return {
	        sendGroup: sendGroup,
	        findContacts:findContacts,
	        searchGroupFriends:searchGroupFriends
	      };
	    }
	  ])
	  .factory('ContactService', ['$http', '$rootScope',
	    function ContactServiceFactory ($http, $rootScope) {
	      var contacts = [];
	      var results = window.localStorage.token;

	      var createContact = function(newContactEmail) {
	        return $http({
	          method: 'POST',
	          url: '/contacts',
	          headers: {'Content-Type': 'application/json'},
	          data: {newContactEmail: newContactEmail}
	        })
	        .then(function (resp){
	          contacts.push(resp.data);
	        })
	        .catch(function(resp){
	          console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
	        });
	      };

	      var getAllContacts = function() {
	        return $http({
	          method: 'GET',
	          url: '/contacts',
	          headers: {'Content-Type': 'application/json'},
	        })
	        .then(function (resp){
	          for (var i = 0; i < resp.data.length; i++) {
	            contacts.push(resp.data[i]);
	          }
	        });
	      };

	      var deleteContact = function(contactId) {
	        return $http({
	          method: 'DELETE',
	          url: '/contacts',
	          headers: {'Content-Type': 'application/json'},
	          data: { contact: contactId }
	        })
	        .then(function (resp){
	          for (var i = 0; i < contacts.length; i++) {
	            if (contacts[i].id === resp.data) {
	              contacts.splice(i, 1);
	              break;
	            }
	          }
	        });
	      };

	      return {
	        contacts: contacts,
	        createContact: createContact,
	        getAllContacts: getAllContacts,
	        deleteContact: deleteContact
	      };
	    }
	  ])
	  .factory('MessageService', ['$window','$timeout','$http', '$rootScope', 'currentUser', 'socket',
	    function MessageServiceFactory($window, $timeout, $http, $rootScope, currentUser, socket, store){
	      var chats = [];

	      var getRecentMessages = function () {
	        return $http({
	          method: 'GET',
	          url: '/message',
	          headers: {'Content-Type': 'application/json'},
	        })
	        .then(function(resp) {
	          resp.data.forEach(function(message) {
	            chats.push(message);
	          });
	        });
	      }

	      var sendMessage = function(sender, recipient, messageText) {

	        if(messageText.search(/^\/yelp /) > -1){  // '/yelp tacos around 22101'  or '/yelp pizza around la'
	          var queryArr = messageText.replace(/^\/yelp /, '').split('around');
	          var foodQuery = queryArr[0].trim(); //tacos or pizza
	          var locationQuery = queryArr[1].trim(); //22101 or la
	          // searchYelp(foodQuery, locationQuery);
	          $window.open('https://www.yelp.com/search?find_desc=' +
	            foodQuery +'&find_loc=' + locationQuery, '_blank');
	        };
	        if(messageText.search(/^\/wiki /) > -1){  //giphy search
	          var wikiQuery = messageText.replace(/^\/wiki /, '').replace(/ /gi, '_').trim();
	          $window.open('https://en.wikipedia.org/wiki/Special:Search/' + wikiQuery, '_blank');
	        };

	        var message = {
	          'senderId': sender,
	          'recipientId': recipient,
	          'body': messageText,
	          'recipientType': 'U'
	        };

	        socket.emit('send message', message);
	      };

	      socket.on('get message', function (message) {
	        chats.push(message);

	      });

	      var searchYelp = function(searchTerm) {
	        return $http({
	          method: 'POST',
	          url: '/api/yelp',
	          headers: {'Content-Type': 'application/json'},
	          data: {searchTerm: searchTerm}
	        })
	        .then(function (resp){
	          return resp.data;
	        })
	        .catch(function(resp){
	          console.log("THIS IS AN ERROR" + JSON.stringify(resp.data));
	        });
	      };

	      socket.on('get ride', function (message) {
	        chats.push(message)
	      })

	      return {
	        sendMessage: sendMessage,
	        searchYelp:searchYelp,
	        getRecentMessages: getRecentMessages,
	        chats: chats
	      };
	    }
	  ]);


/***/ },
/* 9 */
/***/ function(module, exports) {

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
	  'contactsingledirective',
	  'contactlistdirective',
	  'groupsingledirective',
	  'grouplistdirective',
	  'services',
	  'mainCtrl'
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
	      controller: 'signupController',
	      // authenticate: true
	    })

	    authProvider.init({
	    domain: 'jeffreylamwork.auth0.com',
	    clientID: 'RdSGwryXzBL0bEHYoPasF9KX0hMwROjN',
	    loginUrl: '/'
	    });

	    authProvider.on('loginSuccess', ['$location', '$http', 'profilePromise', 'idToken', 'store', 'socket',
	      function($location, $http, profilePromise, idToken, store, socket) {

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
	              socket.emit('registered', localStorage.userId);
	            } else {
	              $location.path('/');
	            }
	          })
	          .then(function() {
	            $location.path('/chat');
	          });

	          socket.emit('registered', profile.nickname);
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
	.controller('mainCtrl', function($scope,$window,$location) {

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

	app.value('currentUser', Math.floor(Math.random() * 1000000));

	app.factory('checker', function($http, $location, $window) {
	    var isAuth = function() {
	    return !!$window.sessionStorage.getItem('token');

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
	.run(function($rootScope, $location, checker, $window, socket, store) {
	  var profile = store.get('profile');
	  var userid =  profile ? profile.nickname : $window.localStorage.getItem('userId');

	  if (checker.isAuth()) {
	    socket.emit('registered', userid);
	  }

	  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
	    if($location.path() == '/' || $location.path() == '/signup') {
	      console.log('This page does not need authentication')
	    }else if(!checker.isAuth()){
	            console.log('not authenticated')
	            $location.path('/');
	    }
	  });
	});

	app.run(['auth', function(auth) {
	    // This hooks all auth events to check everything as soon as the app starts
	    auth.hookEvents();
	}]);



/***/ },
/* 10 */
/***/ function(module, exports) {

	angular.module('loginController', ['theApp'])

	.controller('loginController', ['$scope', '$http', 'auth', '$location','$window', 'socket', function($scope, $http, auth, $location, $window, socket) {

	  //$scope.auth = auth;

	  $scope.auth = auth;

	  $scope.login = function(email, password) {
	    return $http({
	      method: 'POST',
	      url: '/',
	      data: {email: email, password: password}
	    })
	    .then(function (resp) {
	      if(resp.data.token) {
	        $window.sessionStorage.setItem('token', resp.data.token);
	        $window.localStorage.setItem('token', resp.data.token);
	        $window.localStorage.setItem('userId', resp.data.id)
	        $window.localStorage.setItem('email', resp.data.email);
	        $scope.id = $window.localStorage.getItem('userId');
	        socket.emit('registered', $scope.id);
	        $location.path('/chat');
	      } else {
	        $location.path('/');
	      }
	    });
	  };

	}]);

/***/ },
/* 11 */
/***/ function(module, exports) {

	angular.module('signupController', ['theApp'])

	.controller('signupController', function($scope, auth, $window, $http) {

	  $scope.signUp = function(firstName, lastName, username, email, password) {
	    $http({
	      method: 'POST',
	      url: '/signup',
	      data: {
	        firstname: firstName,
	        lastname: lastName,
	        email: email,
	        password: password
	      }
	    })
	    console.log('sent post req from signup controller');
	  };
	});


/***/ }
]);