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
      $scope.startTalking = startTalking;

      $scope.messageText = '';

      $scope.getCommands = getCommands;
      $scope.onSelect = onSelect;
      $scope.matchCommand = matchCommand;
      $scope.sendMessage = sendMessage;
      $scope.getMedia = getMedia;
      $scope.isChrome = webkitSpeechRecognition !== undefined;


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

      function getMedia() {
        var fd = new FormData(document.querySelector(".foorm"));
        var fileType = document.querySelector('[type="file"]').files[0].type.slice(-3);
        $.ajax({
          url: "/upload/" + fileType,
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
          success: function(data) {
            var result = JSON.parse(data);
            if(result.resource_type === 'image') {
              result.secure_url = '[:img:]' + result.secure_url + '[:img:]'
            }
            if(result.format === 'mp4' || result.format === 'AVI') {
              result.secure_url = '[:video:]' + result.secure_url + '[:video:]'
            }
            if(result.format === 'mp3' || result.format === 'WAV') {
              result.secure_url = '[:audio:]' + result.secure_url + '[:audio:]'
            }

            MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, result.secure_url);
          },
          error: function(err) {
            console.log(err);
          }
        })
      }

      function startTalking() {
        var recognition = new webkitSpeechRecognition();
        recognition.onresult = function(event) {
          $scope.messageText = event.results[0][0].transcript;
          $scope.$apply();
        }
        recognition.start();
      }

      function sendMessage() {
        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';
      }

    }
})();
