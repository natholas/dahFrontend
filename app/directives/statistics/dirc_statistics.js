app.directive('statistics', function() {
  return {
    templateUrl: 'directives/statistics/statistics.html',
    controller: function($scope, Statistics) {
      $scope.statistics = Statistics;
    }
  };
});
