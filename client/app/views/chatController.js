(function() {
  'use strict';

  angular
    .module('chat', ['theApp'])
    .controller('chatController', chatController)

  chatController.$inject = ['$scope', 'Globals', '$sce'];

  function chatController($scope, Globals, $sce) {
    $scope.$watch(function() { return Globals.selections.frame; }, function(val) {
        $scope.frame = $sce.trustAsResourceUrl(Globals.selections.frame);
    }, true);
  }
})();