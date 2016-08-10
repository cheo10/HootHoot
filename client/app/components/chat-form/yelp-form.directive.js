angular.module('yelpformdirective', ['theApp']).directive('yelpform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',
    scope: {},
    controller: function($scope, YelpService) {


    },
  };
});
