app.factory('Entrepreneur', function (Network, $timeout) {

  var Entrepreneur = function(data) {
    this.updateData(data);
  }

  Entrepreneur.prototype.updateData = function (data) {
    this.id = data.entrepreneurId;
    this.name = data.name;
    this.status = data.status;
    this.description = data.description;
    this.dob = new Date(data.dob);
    this.dob.setTime(this.dob.getTime() + 1000 * 3600 * 12 + this.dob.getTimezoneOffset()*60*1000);
    this.city = data.city;
    this.countryId = data.countryId;
    this.amountNeeded = data.amountNeeded.toFixed(2);
    this.totalInvested = data.totalInvested ? data.totalInvested.toFixed(2) : 0;
    this.stillNeeded = (data.amountNeeded - this.totalInvested).toFixed(2);
    this.teamId = data.teamId;
    this.createdTime = data.createdTime;
    this.fundedTime = data.fundedTime;
    this.teamName = data.teamName;
    this.countryName = data.countryName;
    this.image = data.image;
    this.parentId = data.parentId;
    this.type = data.type;
    this.children = [];
    if (!this.orders) this.orders = {};
    if (!this.accountInvestment) this.accountInvestment = 0;
    if (this.status == 'FUNDED') this.getChildren();
    if (this.parentId) this.getParent();
  };

  Entrepreneur.prototype.getMessages = function () {
    var params = {entrepreneurId: this.id}, entr = this;
    Network.post('end/getinvestormessages', params).then(function(response) {
      if (response) {
        entr.messages = response.messages;
        entr.countInvestors(response.messages)
      }
    });
  };

  Entrepreneur.prototype.countInvestors = function (messages) {
    var investors = [];
    for (var i in messages) {
      if (investors.indexOf(messages[i].userId) < 0)
        investors.push(messages[i].userId);
    }
    this.investorCount = investors.length;
  };

  Entrepreneur.prototype.getChildren = function () {
    var params = { entrepreneurId: this.id }, entr = this;
    Network.post('end/getchildren', params).then(function (response) {
      if (response) {
        for (var i in response.children) {
          entr.entrepreneurs.getEntrepreneur(response.children[i]).then(function (data) {
            if (data) {
              data.parent = entr;
              entr.children.push(data);
            }
          })
        }
      }
    });
  };

  Entrepreneur.prototype.getParent = function () {
    var entr = this;
    $timeout(function() {
      entr.entrepreneurs.getEntrepreneur(entr.parentId);
    });
  };

  Entrepreneur.prototype.totalReinvested = function () {
    var total = 0;
    var count = 0;
    for (var i in this.children) {
      total += this.children[i].amountNeeded*1;
      count += 1;
      var out = this.children[i].totalReinvested();
      total += out.total;
      count += out.count;
    }
    return {total: total, count: count};
  };

  return Entrepreneur;

});
