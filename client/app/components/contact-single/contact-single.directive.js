angular.module('contactsingledirective', ['theApp']).directive('contactlist', function() {
  return {
    restrict: "E",
    templateUrl: 'app/components/contact-single/contact-single.html',
    scope: {

    },
    controller: function($scope, ContactService) {

    }
  };
});