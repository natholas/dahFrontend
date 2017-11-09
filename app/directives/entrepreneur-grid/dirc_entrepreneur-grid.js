app.directive('entrepreneurGrid', function(Entrepreneurs) {
  return {
    templateUrl: 'directives/entrepreneur-grid/entrepreneur-grid.html',
    scope: {},
    controller: function($scope, Entrepreneurs) {
      $scope.gridItems = [];

      Entrepreneurs.getentrepreneurs('LIVE').then(function (response) {
        if (response) $scope.addItems(response);
      });
      Entrepreneurs.getentrepreneurs('FUNDED').then(function (response) {
        if (response) $scope.addItems(response);
      });

      $scope.addItems = function(date) {
        date = randomizeArray(objToArray(date));
        var items = [];
        for (var item of date) if (item.image) items.push(item);
        $scope.gridItems = randomizeArray($scope.gridItems.concat(items.splice(0, 8)));
      }
    }
  }
});
