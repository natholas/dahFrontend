app.directive('header', function() {
  return {
    limit: 'A',
    templateUrl: 'directives/header/header.html',
    controller: function($scope, Account) {
      $scope.account = Account;
    }
  }
});
