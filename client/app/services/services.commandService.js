(function() {
  'use strict';

  angular
    .module('services')
    .factory('CommandService', CommandService);

  CommandService.$inject = ['DataService'];

  function CommandService(DataService) {
    var service = {
      commands: {},
      getCommands: getCommands,
      createCommand: createCommand
    };

    return service;

    function getCommands() {
      DataService.getCommands()
        .then(consumeCommands);

      function consumeCommands(commands) {
        angular.extend(service.commands, commands);
        console.log(service.commands)
      }
    }

    function createCommand(command) {
      command.parameters = command.parameters.replace(/, /g, ',');

      DataService.createCommand(command);
    }

    function dispatchCommand() {
      //DataService.
    }
  }
})();
