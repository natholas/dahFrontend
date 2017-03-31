app.directive('entrepreneurDetails', function() {
  return {
    templateUrl: 'directives/entrepreneur-details/entrepreneur-details.html',
    scope: {entrepreneur: '=data'}
  }
});
