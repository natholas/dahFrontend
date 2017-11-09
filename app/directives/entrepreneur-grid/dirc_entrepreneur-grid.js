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

      $scope.addItems = function(data) {
        data = randomizeArray(objToArray(data));
        var items = [];
        for (var i in data) if (data[i].image) items.push(data[i]);
        $scope.gridItems = randomizeArray($scope.gridItems.concat(items.splice(0, 8)));
      }
    }
  }
});
