angular.module('chatformdirective', ['theApp']).directive('chatform', function () {
  return {
    restrict: "E",
    replace: true,
    templateUrl: 'app/components/chat-form/chat-form.html',

    controller: function($scope, $http, currentUser, store, MessageService, Globals, DataService) {//declare and link up currentuser and main factory messageService!!!
      $scope.senderId = DataService.getCurrentUserId();
      $scope.selections = Globals.selections;

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


        if($scope.messageText.match(/\/reddit\s\w+/)) {
          var subreddit = $scope.messageText.match(/\/reddit\s+(\w+)/)[1]
          console.log(subreddit);
          var arr = [];
          return $http({
              url: '/api/reddit/' + subreddit,
              method: "GET",
          }).then(function(res) {
            for(var i = 0; i < res.data.data.children.length; i++) {
              var title = res.data.data.children[i].data.title;
              var url = res.data.data.children[i].data.url;
              arr.push({title: title, url: url})
            }
              var messageText = arr.map(function(each){
                return each.title + '\n' + each.url;
              }).join('\n');


        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, messageText);

          })
        }

        MessageService.sendMessage($scope.senderId, $scope.selections.recipient.id, $scope.messageText);
        $scope.messageText = '';
      }
    }
  };
});

