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

        if($scope.messageText.match(/\/reddit\s\w+/)) {
          var subreddit = $scope.messageText.match(/\/reddit\s+(\w+)/)[1]
          console.log(subreddit);
          var arr = [];
          return $http({
              url: '/api/reddit/' + subreddit,
              method: "GET",
          }).then(function(res) {

              var title = res.data.data.children[0].data.title;
              var url = res.data.data.children[0].data.url;
              var messageText = title + " " + url;

        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, messageText);

          })
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
