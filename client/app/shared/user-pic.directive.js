angular.module('userpicdirective', ['theApp']).directive('userpic', function() {
  return {
    restrict: "E",
    template: '<div class="user-pic"><img src="{{userPicUrl}}" alt="{{uuid}}" class="circle"></div>',

    controller: function($scope, store){
      $scope.userPicUrl = store.get('profile').picture;
    }
  };
});