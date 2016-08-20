(function() {
  'use strict';

  angular
  .module('chatsingledirective', ['theApp'])
  .directive('chatsingle', chatsingle);

  function chatsingle(MessageService) {
    var directive = {
      restrict: "E",
      templateUrl: 'app/components/chat-single/chat-single.html',
      scope: {
        sender: '@', //???
        body: '@',
        date: '@',
        type: '@',
        url: '@',
        video: '@',
        audio: '@'
      }
    }
    return directive;
  }
})();