app.service("Bootloader", function(Network, $q, Storage) {

  this.visitorToken;

  this.init = function () {
    var deferred = $q.defer();
    if (this.visitorToken) deferred.resolve(this.visitorToken);
    else if (token = Storage.get('visitorToken')) {
      this.visitorToken = Network.visitorToken = token;
      deferred.resolve(this.visitorToken);
    }
    else Network.post('end/bootloader').then(function(response) {
      if (response) $q.defer(response.visitorToken);
      this.visitorToken = Network.visitorToken = response.visitorToken;
      Storage.set('visitorToken', this.visitorToken, true);
    });
    return deferred.promise;
  }


});
