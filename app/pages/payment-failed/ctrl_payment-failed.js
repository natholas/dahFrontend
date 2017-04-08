app.controller('paymentFailedCtrl', function($scope, Storage, $location, Notifications) {

  var tempOrderData = Storage.get('tempOrderData');

  if (tempOrderData) {
    $location.path('/checkout/' + tempOrderData.entrepreneurId + '/' + tempOrderData.amount);
    Notifications.add('Payment failed or cancelled, please try again', 'bad');
  }

});
