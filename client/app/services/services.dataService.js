(function() {
  'use strict';

  angular
    .module('services')
    .factory('DataService', DataService);

  DataService.$inject = ['$http', '$exceptionHandler'];

  function DataService($http) {
    var service = {
      getCurrentUserId: getCurrentUserId,
      getContacts: getContacts,
      createContact: createContact
    }

    return service;

    function getCurrentUserId() {
      return +localStorage.getItem('userId');
    }

    function getContacts() {
      return $http.get('/contacts')
        .then(requestComplete)
        .catch(errorHandler('getContacts'));
    }

    function createContact(newContactEmail) {
      return $http.post('/contacts', {newContactEmail: newContactEmail})
        .then(requestComplete)
        .catch(errorHandler('createContact'));
    }

    function deleteContact(contactId) {
      return $http({
        url: '/contacts',
        method: 'DELETE',
        data: { contact: contactId }
      }).then(requestComplete)
        .catch(errorHandler('deleteContact'));
    }

    function getRecentMessages() {
      return $http.get('/message')
        .then(requestComplete)
        .catch(errorHandler('getRecentMessages'));
    }

    function requestComplete(response) {
      return response.data;
    }

    function errorHandler(requestName){
      return function(e) {
        $exceptionHandler('An error has occured in ' + requestName + '.\nHTTP error: ' + e + ' (' + e + ')');
      }
    }
  }
})();