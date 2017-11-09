app.directive('subEntrepreneur', function() {
  return {
    templateUrl: 'directives/sub-entrepreneur/sub-entrepreneur.html',
    scope: {entrepreneur: '=data'}
  }
});
