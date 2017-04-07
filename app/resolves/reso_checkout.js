app.factory('ResolveCheckout', function(Bootloader, Entrepreneurs, $route) {
  return function() {
    return Bootloader.returnWhenLoaded().then(function() {
      return Entrepreneurs.getEntrepreneur($route.current.params.entrepreneurId*1).then(function(response) {
        var entrepreneur = response;
        var amount = $route.current.params.investmentAmount*1;
        if (entrepreneur && amount) {
          if (entrepreneur.stillNeeded < amount) {
            amount = entrepreneur.stillNeeded*1;
          }
          return {
            entrepreneur: entrepreneur,
            amount: amount,
            donationAmount: 2,
            user: {}
          }
        }
        return null;
      });
    });
  }
});
