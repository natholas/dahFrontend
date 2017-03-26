app.service('Entrepreneurs', function(Network, Entrepreneur) {

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
      if (!this.entrepreneurs[entrepreneurs[i].id])
        this.entrepreneurs[entrepreneurs[i].id] = new Entrepreneur(entrepreneurs[i]);
      else this.entrepreneurs[entrepreneurs[i].id].updateData(entrepreneurs[i]);
    }
  }

  this.init();

});
