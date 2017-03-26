app.directive('header', function() {
  return {
    limit: 'A',
    templateUrl: 'directives/header/header.html',
    controller: function($scope, Account, $timeout) {
      $scope.account = Account;
      $scope.scrolled = (window.pageYOffset > 50);
      $timeout();
      document.addEventListener('scroll', function() {
        $scope.scrolled = (window.pageYOffset > 50);
        $timeout();
      })
    }
  }
});
