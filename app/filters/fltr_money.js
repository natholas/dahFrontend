app.filter('money', function(Currency) {
  return function(amount) {
    var amount = (amount * Currency.current.exchangeRate).toFixed(2);
    amount = amount % 1 == 0 ? amount + '.-' : amount;
    return Currency.current.sign + amount;
  }
});
