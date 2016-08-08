angular.module('contactlistdirective', ['theApp']).directive('contactlist', function() {
  return {
    restrict: "E",
    templateUrl: 'app/components/contact-list/contact-list.html',
    scope: {

    },
    controller: function($rootScope,$scope, ContactService) {
      $scope.contacts = [];
      $scope.getContacts = function (PersonLoggedIn) {
        $scope.contacts.push(ContactService.findOrCreateContacts(PersonLoggedIn));
      };
    }
  };
});