app.directive('featuredEntrepreneur', function() {
  return {
    templateUrl: 'directives/featured-entrepreneur/featured-entrepreneur.html',
    scope: {status: '='},
    controller: function($scope, Entrepreneurs) {
      Entrepreneurs.returnWhenLoaded().then(function() {
        $scope.entrepreneur = randomProperty(Entrepreneurs[$scope.status]);
      });
      Entrepreneurs.needEntrepreneurData($scope.status);
    }
  }
});
