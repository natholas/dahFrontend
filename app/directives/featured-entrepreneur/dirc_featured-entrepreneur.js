app.directive('featuredEntrepreneur', function() {
  return {
    templateUrl: 'directives/featured-entrepreneur/featured-entrepreneur.html',
    scope: {status: '='},
    controller: function($scope, Entrepreneurs) {

      try {
        Entrepreneurs.needEntrepreneurData($scope.status).then(function() {
          $scope.entrepreneur = randomProperty(Entrepreneurs[$scope.status]);
        });
      }
      catch(err) {
        Entrepreneurs.returnWhenLoaded().then(function() {
          $scope.entrepreneur = randomProperty(Entrepreneurs[$scope.status]);
        });
      }
    }
  }
});
