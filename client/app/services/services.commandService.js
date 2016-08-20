(function() {
  'use strict';

  angular
    .module('services')
    .factory('CommandService', CommandService);

  CommandService.$inject = ['DataService', 'Globals'];

  function CommandService(DataService, Globals) {
    var service = {
      commands: [],
      getCommands: getCommands,
      createCommand: createCommand,
      dispatchCommand: dispatchCommand
    };

    return service;

    function getCommands() {
      DataService.getCommands()
        .then(consumeCommands);

      function consumeCommands(commands) {
        commands = commands.map(function(command) {
          command.parameters = command.parameters.split(',');
          return command;
        });

        angular.extend(service.commands, commands);
      }
    }

    function createCommand(command) {
      command.parameters = command.parameters.replace(/, /g, ',');

      DataService.createCommand(command);
    }

    function dispatchCommand(message) {
      var command = Globals.selections.command;
      var params = stringToParams(message.body);

      if(command.includeLocation) {
        getLocation(params);
      }

      return DataService.dispatchCommand(command.postUrl, params)
        .then(function(response) {
          message.body = response.text;
          return message;
        });

      function stringToParams(str) {
        return str.split(' ').slice(1).reduce(function(paramObj, userInput, i) {
          var currentParam = command.parameters[i];

          if(currentParam[0] === '[') {
            var paramName = currentParam.substr(1, currentParam.length-2);

            paramObj[paramName] = userInput;
          }

          return paramObj;
        }, {});
      }

      function getLocation(params) {
        DataService.getLocation(attachLocation);

        function attachLocation(location) {
          params.myLocation = location;
        }
      }
    }
  }
})();