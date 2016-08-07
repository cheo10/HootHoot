angular.module('services', [])
  .factory('socket', function () {
    return io.connect();
  });
