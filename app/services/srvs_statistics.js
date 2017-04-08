app.service("Statistics", function(Network, Storage) {

  var stats = this;

  this.get = function () {
    Network.post('end/statistics').then(function(response) {
      stats.data = response;
    });
  };

  this.get();

});
