(function() {
  'use strict';

  angular
    .module('services')
    .factory('SocketService', SocketService);

  SocketService.$inject = ['$rootScope', 'DataService'];

  function SocketService($rootScope, DataService) {
    var service = {
      addListeners: addListeners,
      sendMessage: sendMessage,
      register: register
    }

    return service;

    var socket;

    function addListeners(socket) {
      socket.on('get message', function(message) {
        $rootScope.$apply(function() {
          $rootScope.$broadcast('get message', message);
        });
      });
    }

    function sendMessage(message) {
      socket.emit('send message', message);
    }

    function register() {
      socket = io.connect();

      addListeners(socket);
      socket.emit('registered', DataService.getCurrentUserId());
    }
  }
})();
