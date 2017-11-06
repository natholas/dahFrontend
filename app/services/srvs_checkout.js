app.service('Checkout', function(Network, Account, Storage, Notifications) {

  this.checkingOut = false;
  var check = this;

  this.init = function (order) {
    if (this.checkingOut || Account.signingUp || Account.loggingIn) return;
    this.checkingOut = true;
    if (Account.loginToken) this.doOrder(order);
    else {
      Account.signup(
        order.user.emailAddress.toLowerCase(),
        order.user.nickname,
        order.user.address,
        order.user.password,
        'PUBLIC'
      ).then(function(response) {
        if (response) {
          Account.login(
            order.user.emailAddress.toLowerCase(),
            order.user.password
          ).then(function(response) {
            if (response) check.doOrder(order);
            else check.checkingOut = false;
          });
        }
        else check.checkingOut = false;
      });
    }
  };

  this.doOrder = function (order) {
    var params = {
      entrepreneurId: order.entrepreneur.id,
      amount: order.amount*1,
      donationAmount: order.donationAmount,
      message: order.message ? order.message : ''
    };
    Storage.set('tempOrderData', params, true);
    Network.post('end/ordercomplete', params, 5, true).then(function(response) {
      check.checkingOut = false;
      if (response && !response.error) {
        Storage.set('orderData', order, true);
        window.location = response.RedirectUrl;
      }
      else Notifications.add('Your order could not be processed. Please try again later.', 'bad');
    });
  }

});
