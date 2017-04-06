app.directive('location', function(Countries) {
  return {
    templateUrl: 'directives/location/location.html',
    scope: {countryId: '='},
    controller: function($scope, Network) {
      Countries.getCountry($scope.countryId).then(function(response) {
        $scope.country = response;
      });
    }
  }
});
