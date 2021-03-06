app.service('Entrepreneurs', function(Network, Entrepreneur, $interval, $q, Bootloader) {

  var entr = this;
  this.entrepreneurs = {};
  this.getting = {};
  this.needed = {};
  this.LIVE = {};
  this.FUNDED = {};

  this.getentrepreneurs = function(status) {
    var params = {status: status};
    return Network.post('end/getentrepreneurs', params).then(function(response) {
      if (response) {
        return entr.processEntrepreneurData(response.entrepreneurs, status);
      }
    });
  };

  this.processEntrepreneurData = function (entrepreneurs, status) {
    for (var i in entrepreneurs) {
      if (!this.entrepreneurs[entrepreneurs[i].entrepreneurId]) {
        this.entrepreneurs[entrepreneurs[i].entrepreneurId] = new Entrepreneur(entrepreneurs[i]);
        this.entrepreneurs[entrepreneurs[i].entrepreneurId].entrepreneurs = this;
        entr.account.linkOrdersToNewEntrepreneur(this.entrepreneurs[entrepreneurs[i].entrepreneurId]);
      }
      else {
        this.entrepreneurs[entrepreneurs[i].entrepreneurId].updateData(entrepreneurs[i]);
      }
      this[status][entrepreneurs[i].entrepreneurId] = this.entrepreneurs[entrepreneurs[i].entrepreneurId];
    }
    this.dataLoaded = true;
    return this[status];
  };

  this.returnWhenLoaded = function (id) {
    var deferred = $q.defer();
    var interval = $interval(function() {
      if ((id && entr.entrepreneurs[id]) || (!id && entr.dataLoaded)) {
        $interval.cancel(interval);
        deferred.resolve();
      }
    }, 20);
    return deferred.promise;
  };

  this.getEntrepreneur = function (entrepreneurId) {
    if (this.getting[entrepreneurId]) {
      return this.returnWhenLoaded(entrepreneurId).then(function() {
        return entr.entrepreneurs[entrepreneurId];
      });
    } else {
      this.getting[entrepreneurId] = true;
      var params = {entrepreneurId: entrepreneurId};
      return Network.post('end/getentrepreneur', params).then(function(response) {
        if (response) {
          entr.entrepreneurs[entrepreneurId] = new Entrepreneur(response);
          entr.entrepreneurs[entrepreneurId].entrepreneurs = entr;
          entr.account.linkOrdersToNewEntrepreneur(entr.entrepreneurs[entrepreneurId]);
          return entr.entrepreneurs[entrepreneurId];
        }
        else return false;
      });
    }
  };

  this.needEntrepreneurData = function (status) {
    if (this.needed[status]) return;
    this.needed[status] = true;
    return Bootloader.returnWhenLoaded().then(function() {
      return entr.getentrepreneurs(status);
    });
  };

});
