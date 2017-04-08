app.controller('confirmationCtrl', function($scope, Account, $routeParams, Notifications, Storage) {

  $scope.getTemplate = function () {
    if ($scope.order) return 'pages/confirmation/confirmation.html'
    else if (Account.loginToken && Account.orders[$routeParams.orderId*1]) {
      $scope.order = Account.orders[$routeParams.orderId*1];
      Storage.remove('tempOrderData');
      return 'pages/confirmation/confirmation.html';
    }
    return 'pages/404/404.html';
  };


});
