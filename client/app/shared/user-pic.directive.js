angular.module('theApp').directive('userPic' function() {
  return {
    restrict: "E",
    template: '< img src= "{{userPicUrl}}" alt="{{uuid}}" class="circle" >',

    controller: function($scope){
      $scope.userPicUrl = '../images/person-flat.png';
    }
  };
});