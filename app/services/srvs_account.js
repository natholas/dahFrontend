app.service("Account", function(Network, Storage) {

  var acc = this;
  this.loginToken = null;
  this.role = null;
  this.userDetails = null;

  this.data = {};

  this.login = function () {
    this.data.emailAddress = this.data.emailAddress.toLowerCase();
    Network.post('end/login', this.data).then(function(response) {
      if (response) {
        acc.data = {};
        acc.loginToken = Network.loginToken = response.loginToken;
        acc.role = response.role;
        acc.userDetails = response.userDetails;
        Storage.set('loginData', {
          loginToken: acc.loginToken,
          role: acc.role,
          userDetails: acc.userDetails
        }, true);
      }
    });
  };

  if (data = Storage.get('loginData')) {
    acc.loginToken = data.loginToken;
    acc.role = data.role;
    acc.userDetails = data.userDetails;
  }

});
