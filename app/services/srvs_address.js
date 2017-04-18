app.service('Address', function(Network) {
  this.lookup = function(searchString) {
    var params = {
      searchString: searchString
    }
    return Network.post('end/addresslookup', params).then(function(response) {
      return response
    })
  }
})
