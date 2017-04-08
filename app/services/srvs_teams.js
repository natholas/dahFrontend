app.service('Teams', function(Network, Storage, $q) {

  this.data = {};
  var teams = this;

  this.getTeam = function (teamId) {
    var deferred = $q.defer();
    if (this.data[teamId]) deferred.resolve(this.data[teamId]);
    else {
      var params = {teamId: teamId};
      Network.post('end/getteamdetails', params).then(function(response) {
        if (response) {
          teams.data[teamId] = response.team;
          deferred.resolve(teams.data[teamId]);
        }
        else return {};
      });
    }
    return deferred.promise;
  };

});
