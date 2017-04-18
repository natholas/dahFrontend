app.service("Account", function(Network, Storage, Order, Entrepreneurs, $timeout, Bootloader) {

  var acc = this;
  this.loginToken = null;
  this.role = null;
  this.userDetails = null;
  this.orders = {};
  this.investedEntrepreneurs = {};
  this.loggingIn = false;
  this.signingUp = false;
  this.gettingOrders = false;

  Network.account = this;
  Entrepreneurs.account = this;

  this.init = function () {
    if (data = Storage.get('loginData')) {
      acc.loginToken = Network.loginToken = data.loginToken;
      acc.role = data.role;
      acc.userDetails = data.userDetails;
      acc.getOrders();
    }
  }

  this.login = function (emailAddress, password) {
    if (this.loggingIn) return;
    this.loggingIn = true;
    var params = {
      emailAddress: emailAddress,
      password: password
    }
    return Network.post('end/login', params).then(function(response) {
      acc.loggingIn = false;
      if (response) {
        acc.loginToken = Network.loginToken = response.loginToken;
        acc.role = response.role;
        acc.userDetails = response.userDetails;
        acc.save();
        acc.getOrders();
        ga('send', 'event', 'account', 'login', 'success');
      }
      else ga('send', 'event', 'account', 'login', 'failed');
      return response;
    });
  };

  this.logout = function () {
    this.loginToken = null;
    this.role = null;
    this.userDetails = null;
    this.orders = {};
    this.investedEntrepreneurs = {};
    for (var i in Entrepreneurs.entrepreneurs) {
      Entrepreneurs.entrepreneurs[i].orders = {};
      Entrepreneurs.entrepreneurs[i].accountInvestment = 0;
    }
    Storage.remove('loginData');
    ga('send', 'event', 'account', 'logout', 'success');
  };

  this.signup = function (emailAddress, nickname, address, password, publicStatus) {
    if (this.signingUp) return;
    this.signingUp = true;
    var params = {
      emailAddress: emailAddress,
      nickname: nickname,
      address: address,
      password: password,
      publicStatus: publicStatus
    }
    return Network.post('end/signup', params).then(function(response) {
      acc.signingUp = false;
      if (response) ga('send', 'event', 'account', 'signup', 'success');
      else ga('send', 'event', 'account', 'signup', 'failed');
      return response;
    });
  };

  this.sendResetEmail = function (emailAddress) {
    if (this.sendingResetEmail) return;
    this.sendingResetEmail = true;
    var params = {
      emailAddress: emailAddress
    }
    return Network.post('end/sendpasswordreset', params).then(function(response) {
      acc.sendingResetEmail = false;
      if (response) ga('send', 'event', 'account', 'sendreset', 'success');
      else ga('send', 'event', 'account', 'sendreset', 'failed');
      return response;
    });
  }

  this.resetPassword = function (token, newPassword) {
    if (this.resetting) return;
    this.resetting = true;
    var params = {
      passwordResetToken: token,
      newPassword: newPassword,
    }
    return Network.post('end/resetpassword', params).then(function(response) {
      acc.resetting = false;
      if (response) ga('send', 'event', 'account', 'resetpassword', 'success');
      else ga('send', 'event', 'account', 'resetpassword', 'failed');
      return response;
    });
  }

  this.getOrders = function () {
    if (this.gettingOrders || !this.loginToken) return;
    this.gettingOrders = true;

    Network.post('end/getorders').then(function(response) {
      acc.gettingOrders = false;
      if (response) {
        acc.processOrders(response.orders, acc.orders);
      }
    });
  };

  this.processOrders = function (newOrders, orders) {
    for (var i in newOrders)
      orders[newOrders[i].orderId] = new Order(newOrders[i], this);
  };

  this.linkOrdersToNewEntrepreneur = function (entrepreneur) {
    for (var i in this.orders) {
      this.orders[i].linkSelfToNewEntrepreneurs(entrepreneur);
    }
  };

  this.update = function (params) {
    return Network.post('end/updateprofile', params).then(function(response) {
      if (response) {
        for (var i in acc.userDetails)
          if (params[i]) acc.userDetails[i] = params[i];
        acc.save();
        if (response) ga('send', 'event', 'account', 'update', 'success');
      }
      return response;
    });
  };

  this.save = function () {
    Storage.set('loginData', {
      loginToken: acc.loginToken,
      role: acc.role,
      userDetails: acc.userDetails
    });
  }

  Bootloader.returnWhenLoaded().then(function() {
    acc.init();
  });

});
