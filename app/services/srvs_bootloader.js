app.service("Bootloader", function(Network, $q) {

  this.visitorToken;

  this.init = function () {
    var deferred = $q.defer();
    if (this.visitorToken) deferred.resolve(this.visitorToken);
    else Network.post('end/bootloader').then(function(response) {
      if (response) $q.defer(response.visitorToken);
      this.visitorToken = Network.visitorToken = response.visitorToken;
    });
    return deferred.promise;
  }


});
