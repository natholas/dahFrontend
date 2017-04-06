app.directive('investorMessages', function() {
  return {
    templateUrl: 'directives/investor-messages/investor-messages.html',
    scope: {entrepreneur: '=data'},
    controller: function($scope, Network) {
      if (!$scope.entrepreneur || $scope.entrepreneur.messages) return;
      $scope.entrepreneur.getMessages();
    }
  }
});
