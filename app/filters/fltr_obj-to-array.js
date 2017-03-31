app.filter('objToArray', function(Currency) {
  return function(obj) {
    return Object.keys(obj).map(function (key) {return obj[key];});
  }
});
