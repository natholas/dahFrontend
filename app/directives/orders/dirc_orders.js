app.directive('orders', function() {
  return {
    limit: 'E',
    templateUrl: 'directives/orders/orders.html',
    scope: {orders: '=data', limit: '=?'}
  }
});
