angular.module('contactsdirective', ['theApp']).directive('contacts', function(MessageService) {
  return {
    restrict: "E",
    templateUrl: 'app/components/contacts/contacts.html',
    scope: {

    }
  };
});