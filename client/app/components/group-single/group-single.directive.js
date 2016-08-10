angular.module('groupsingledirective', ['theApp']).directive('groupsingle', function(GroupService) {
  return {
    restrict: "E",
    templateUrl: 'app/components/group-single/group-single.html',
    scope: {
      name: '@',
      channel: '@',
      status: '@'
    }
  };
});
