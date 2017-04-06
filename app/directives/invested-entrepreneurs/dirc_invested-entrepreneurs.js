app.directive('investedEntrepreneurs', function() {
  return {
    limit: 'E',
    templateUrl: 'directives/invested-entrepreneurs/invested-entrepreneurs.html',
    scope: {investedEntrepreneurs: '=data', limit: '=?'}
  }
});
