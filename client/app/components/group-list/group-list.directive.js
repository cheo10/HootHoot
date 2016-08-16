angular.module('grouplistdirective', ['theApp']).directive('grouplist', function() {
  return {
    restrict: "E",
    templateUrl: 'app/components/group-list/group-list.html',
    controller: function($rootScope, $scope, GroupService) {
      var hardcodeUser = 'nahee';
      $scope.click = false;
      $scope.groupFriends = [];
      $scope.searchGroupFriends = GroupService.searchGroupFriends;

      $scope.sendGroup = function () {
        GroupService.sendGroup($scope.addGroupNames, $scope.groupFriends);
      };
      $scope.createGroup = function (name) {
        $scope.groupFriends.push(name);
      };
      $scope.findContacts = function() {
        GroupService.findContacts();
      };
      $scope.AddContact = function (){
        GroupService.AddContact();
      };
    }
  };
});