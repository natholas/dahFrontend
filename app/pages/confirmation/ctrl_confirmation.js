app.controller('confirmationCtrl', function($scope, Account, $routeParams, Notifications) {

  $scope.getTemplate = function () {
    if ($scope.order) return 'pages/confirmation/confirmation.html'
    else if (Account.loginToken && Account.orders[$routeParams.orderId*1]) {
      $scope.order = Account.orders[$routeParams.orderId*1];
      console.log($scope.order);
      return 'pages/confirmation/confirmation.html';
    }
    return 'pages/404/404.html';
  };


});
