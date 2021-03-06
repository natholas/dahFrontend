app.factory("Order", function(Entrepreneurs) {

  var Order = function(data, account) {
    this.id = data.orderId;
    this.amount = data.amount;
    this.donationAmount = data.donationAmount;
    this.entrepreneurId = data.entrepreneurId;
    this.message = data.message;
    this.orderTime = new Date(data.orderTime);
    this.status = data.status;
    this.amount = data.amount;
    this.displayText = data.displayText;
    this.getEntrepreneur(account);
  };

  Order.prototype.getEntrepreneur = function (account) {
    var order = this;
    Entrepreneurs.getEntrepreneur(order.entrepreneurId).then(function(response) {
      if (response) {
        order.entrepreneur = response;
        order.linkOrderToEntrepreneur(account);
      }
    });
  };

  Order.prototype.linkOrderToEntrepreneur = function (account) {
    this.entrepreneur.orders[this.id] = this;
    this.entrepreneur.accountInvestment += this.amount;
    account.investedEntrepreneurs[this.entrepreneur.id] = this.entrepreneur;
  };

  Order.prototype.linkSelfToNewEntrepreneurs = function (entrepreneur) {
    
  }

  return Order;
});
