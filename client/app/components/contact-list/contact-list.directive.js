angular.module('contactlistdirective', ['theApp']).directive('contactlist', function() {
  return {
    restrict: "E",
    templateUrl: 'app/components/contact-list/contact-list.html',
    scope: {

    },
    controller: function($rootScope, $scope, ContactService) {

      var hardcodeUser = 'nahee';

      $scope.contacts = ContactService.contacts;

      $scope.addContact = function (newContactEmail) {
        ContactService.createContact(newContactEmail);
      };

      $scope.getAllContacts = function() {
        ContactService.getAllContacts();
      };

      $scope.deleteContact = function (contact){
        ContactService.deleteContact(contact);
      };
    }
  };
});