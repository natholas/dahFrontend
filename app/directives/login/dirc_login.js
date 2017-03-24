app.directive('login', function() {
  return {
    limit: 'A',
    templateUrl: 'directives/login/login.html',
    controller: function($scope, Network) {
      $scope.loginData = {};
      $scope.login = function () {
        Network.post('end/login', $scope.loginData).then(function(response) {
          if (response) $scope.loginData = {};
        });
      }
    }
  }
});
