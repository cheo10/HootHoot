angular.module('contactsingledirective', ['theApp']).directive('contactsingle', function(ContactService) {
  return {
    restrict: "E",
    templateUrl: 'app/components/contact-single/contact-single.html',
    scope: {
      name: '@',
      channel: '@',
      status: '@'
    }
  };
});
