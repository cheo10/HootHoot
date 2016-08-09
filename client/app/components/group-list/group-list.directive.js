angular.module('grouplistdirective', ['theApp']).directive('contactlist', function() {
  return {
    restrict: "E",
    templateUrl: 'app/components/group-list/group-list.html',
    scope: {

    },
    controller: function($rootScope, $scope, ContactService) {

      var hardcodeUser = 'nahee';

      $scope.contacts = ContactService.contacts;

      $scope.addContact = function (hardcodeUser, newContact) {
        // the user who is signed in
        ContactService.findOrCreateContacts(hardcodeUser,newContact);
      };

      $scope.getAllContacts = function() {
        ContactService.getAllContacts();
      };

      $scope.deleteContact = function (){
        ContactService.deleteContact();
      };
    }
  };
});