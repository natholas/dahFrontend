app.service('Entrepreneurs', function(Network, Entrepreneur, $interval, $q, Bootloader) {

  var entr = this;
  this.entrepreneurs = {};

  this.init = function() {
    Network.post('end/getentrepreneurs').then(function(response) {
      if (response) {
        entr.processEntrepreneurData(response.entrepreneurs);
      }
    });
  };

  this.processEntrepreneurData = function (entrepreneurs) {
    for (var i in entrepreneurs) {
      if (!this.entrepreneurs[entrepreneurs[i].entrepreneurId])
        this.entrepreneurs[entrepreneurs[i].entrepreneurId] = new Entrepreneur(entrepreneurs[i]);
      else this.entrepreneurs[entrepreneurs[i].entrepreneurId].updateData(entrepreneurs[i]);
    }
    this.dataLoaded = true;
  };

  this.returnWhenLoaded = function () {
    var deferred = $q.defer();
    var interval = $interval(function() {
      if (entr.dataLoaded) {
        $interval.cancel(interval);
        deferred.resolve();
      }
    }, 20);
    return deferred.promise;
  };

  Bootloader.returnWhenLoaded().then(function() {
    entr.init();
  });

});
