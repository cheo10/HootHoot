(function() {
  'use strict';

  angular
    .module('services')
    .factory('Globals', Globals);

  function Globals() {
    var service = {
      selections: {},
      setSelectedRecipient: setSelectedRecipient,
      webcam: false,
      camroom: ""
    }

    return service;

    function setSelectedRecipient(recipient) {
      service.selections.recipient = recipient;
    }
  }
})();