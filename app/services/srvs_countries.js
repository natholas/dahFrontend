app.service('Countries', function(Network, Storage, $q) {

  this.data = {};
  var count = this;

  this.getCountry = function (countryId) {
    var deferred = $q.defer();
    if (this.data[countryId]) deferred.resolve(this.data[countryId]);
    else {
      var params = {countryId: countryId};
      Network.post('end/getcountrydetails', params).then(function(response) {
        if (response) {
          count.data[countryId] = response.country;
          deferred.resolve(count.data[countryId]);
        }
        else return {};
      });
    }
    return deferred.promise;
  };

});
