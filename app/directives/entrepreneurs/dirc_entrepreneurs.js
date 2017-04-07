app.directive('entrepreneurs', function() {
  return {
    templateUrl: 'directives/entrepreneurs/entrepreneurs.html',
    scope: {status: '='},
    controller: function($scope, Entrepreneurs) {
      $scope.data = Entrepreneurs;
      Entrepreneurs.needEntrepreneurData($scope.status);
    }
  }
});
