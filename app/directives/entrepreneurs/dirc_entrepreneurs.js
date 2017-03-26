app.directive('entrepreneurs', function() {
  return {
    templateUrl: 'directives/entrepreneurs/entrepreneurs.html',
    controller: function($scope, Entrepreneurs) {
      $scope.data = Entrepreneurs;
    }
  }
});
