app.service("Account", function(Network, Storage) {

  var acc = this;
  this.loginToken = null;
  this.role = null;
  this.userDetails = null;

  this.loggingIn = false;
  this.signingUp = false;

  this.data = {};

  this.init = function () {
    if (data = Storage.get('loginData')) {
      acc.loginToken = Network.loginToken = data.loginToken;
      acc.role = data.role;
      acc.userDetails = data.userDetails;
    }
  }

  this.login = function (emailAddress, password) {
    console.log(emailAddress, password);
    if (this.loggingIn) return;
    this.loggingIn = true;
    var params = {
      emailAddress: emailAddress,
      password: password
    }
    return Network.post('end/login', params).then(function(response) {
      acc.loggingIn = false;
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
      else {
        // TODO: Need to add error stuff
        console.error('NEED TO ADD ERROR STUFF');
      }
      return response;
    });
  };

  this.logout = function () {
    this.loginToken = null;
    this.role = null;
    this.userDetails = null;
    Storage.remove('loginData');
  };

  this.signup = function (emailAddress, password, nickname, publicStatus) {
    if (this.signingUp) return;
    this.signingUp = true;
    var params = {
      emailAddress: emailAddress,
      password: password,
      nickname: nickname,
      publicStatus: publicStatus
    }

    return Network.post('end/signup', params).then(function(response) {
      acc.signingUp = false;
      return response;
    });

  };

  this.init();



});
