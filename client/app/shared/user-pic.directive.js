angular.module('userpicdirective', ['theApp']).directive('userpic', function() {
  return {
    restrict: "E",
    template: '<div class="user-pic"><img src="app/images/personMale.png" alt="{{senderId}}" class="circle userpic"></div>',

    controller: function($scope, store){
      $scope.userPicUrl = localStorage.getItem('picUrl') || 'app/images/personMale.png';
    }
  };
});