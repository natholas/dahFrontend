app.factory('Entrepreneur', function() {

  var Entrepreneur = function(data) {
    this.updateData(data);
  }

  Entrepreneur.prototype.updateData = function (data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.dob = new Date(data.dob);
    this.city = data.city;
    this.countryId = data.countryId;
    this.amountNeeded = data.amountNeeded;
    this.teamId = data.teamId;
    this.createdTime = data.createdTime;
    this.fundedTime = data.fundedTime;
    this.teamName = data.teamName;
    this.countryName = data.countryName;
    this.totalInvested = data.totalInvested;
  };

  return Entrepreneur;

})
