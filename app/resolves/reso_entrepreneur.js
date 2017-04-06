app.factory('ResolveEntrepreneur', function(Bootloader, Entrepreneurs, $route) {
  return function() {
    return Bootloader.returnWhenLoaded().then(function() {
      return Entrepreneurs.getEntrepreneur($route.current.params.entrepreneurId*1).then(function(response) {
        return response;
      });
    })
  }
});
