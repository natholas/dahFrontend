app.controller('checkoutCtrl', function($scope, order, Checkout, Account) {

  $scope.order = order;
  $scope.Checkout = Checkout;
  $scope.Account = Account;

  $scope.donationAmounts = [0, 1, 2, 5, 10, 50, 100, 500, 1000];
  $scope.amounts = [10, 15, 20, 50, 100, 150, 200, 1000];

  if ($scope.amounts.indexOf($scope.order.amount) < 0) {
    $scope.order.amount = $scope.amounts[0];
  }

  $scope.getTemplate = function () {
    return order ? 'pages/checkout/checkout.html' : 'pages/404/404.html';
  };


});
