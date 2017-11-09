app.directive('entrepreneurs', function() {
  return {
    templateUrl: 'directives/entrepreneurs/entrepreneurs.html',
    scope: {status: '='},
    controller: function($scope, Entrepreneurs) {
      $scope.data = Entrepreneurs;
      $scope.$watch('status', function() {
        Entrepreneurs.needEntrepreneurData($scope.status);
      })
    }
  }
});
