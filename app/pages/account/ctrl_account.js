app.controller('accountCtrl', function($scope, Account) {

  $scope.Account = Account;
  $scope.orderLimit = 3;
  $scope.entrepreneurLimit = 3;

  $scope.getTemplate = function () {
    return Account.loginToken ? 'pages/account/account.html' : 'pages/404/404.html';
  };

});
