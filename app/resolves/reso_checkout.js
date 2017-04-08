app.factory('ResolveCheckout', function(Bootloader, Entrepreneurs, $route, Storage) {
  return function() {
    return Bootloader.returnWhenLoaded().then(function() {
      return Entrepreneurs.getEntrepreneur($route.current.params.entrepreneurId*1).then(function(response) {
        var entrepreneur = response;
        var amount = $route.current.params.investmentAmount*1;
        if (entrepreneur && amount) {
          if (entrepreneur.stillNeeded < amount) {
            amount = entrepreneur.stillNeeded*1;
          }
          var tempOrderData = Storage.get('tempOrderData');
          Storage.remove('tempOrderData');
          return {
            entrepreneur: entrepreneur,
            amount: amount,
            donationAmount: tempOrderData ? tempOrderData.donationAmount : 2,
            message: tempOrderData ? tempOrderData.message : '',
            user: {}
          }
        }
        return null;
      });
    });
  }
});
