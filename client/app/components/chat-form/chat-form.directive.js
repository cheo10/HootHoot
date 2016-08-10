angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',
<<<<<<< HEAD
=======
    scope: {},
<<<<<<< HEAD
>>>>>>> Add forrest's changes

    controller: function($scope, currentUser, store, MessageService, Globals) {//declare and link up currentuser and main factory messageService!!!
      $scope.senderId = Globals.userId;
      $scope.selections = Globals.selections;
<<<<<<< HEAD

=======
=======
    controller: function($scope, currentUser, store, MessageService) {//declare and link up currentuser and main factory messageService!!!
      $scope.senderId = localStorage.getItem('userId');
      $scope.recipient = $scope.senderId === 'Forrest Labrum' ? 'Chris Heo' : 'Forrest Labrum';
>>>>>>> Add yelp form directive and setups to get yelp api data
>>>>>>> Add forrest's changes
      $scope.messageText = '';

      //load weather using your lat/lng coordinates
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.loadWeather(position.coords.latitude+','+position.coords.longitude);
      });


      $scope.loadWeather = function(location, woeid) {
        $.simpleWeather({
          location: location,
          woeid: woeid,
          unit: 'f',
          success: function(weather) {
            html = '<h2 id="temp"><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';

            $("#weather").html(html);
          },
          error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
          }
        });
      }

      $scope.sendMessage = function() {

        if($scope.messageText.match(/\/weather/)) {
          $scope.messageText = document.getElementById("temp").innerHTML.split('</i> ')[1];
        }

        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';

      };
    },
  };
});

