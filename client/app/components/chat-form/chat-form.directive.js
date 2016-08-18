(function() {
  'use strict';

  angular
    .module('chatformdirective', ['theApp', 'ui.bootstrap'])
    .directive('chatform', chatform);

  function chatform() {
    var directive = {
      restrict: "E",
      replace: true,
      templateUrl: 'app/components/chat-form/chat-form.html',
      controller: chatformController
    };

    return directive;
  }

  chatformController.$inject = ['$scope', 'MessageService', 'Globals', 'DataService', 'CommandService'];

  function chatformController($scope, MessageService, Globals, DataService, CommandService) {
      $scope.senderId = DataService.getCurrentUserId();
      $scope.selections = Globals.selections;
      $scope.commands = CommandService.commands;

      $scope.messageText = '';

      $scope.getCommands = getCommands;
      $scope.onSelect = onSelect;
      $scope.matchCommand = matchCommand;
      $scope.sendMessage = sendMessage;

      function getCommands() {
        CommandService.getCommands();
      }

      function onSelect(item) {
        $scope.selections.command = item;
      }

      function matchCommand(viewValue) {
        var results = [];
        if(viewValue[0] !== '/') {
          return results;
        }

        $scope.commands.forEach(function(command) {
          if(viewValue === command.name.substr(0, viewValue.length)) {
            results.push(command);
          }
        })

        return results;
      }

      function sendMessage() {
        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';
      }
    }
})();
