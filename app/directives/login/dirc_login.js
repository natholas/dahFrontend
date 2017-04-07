app.directive('login', function() {
  return {
    limit: 'A',
    templateUrl: 'directives/login/login.html',
    controller: function($scope, Account, Notifications) {

      $scope.sendResetEmail = function (emailAddress) {
        if ($scope.sendingResetEmail) return;
        $scope.sendingResetEmail = true;
        Account.sendResetEmail(emailAddress).then(function(response) {
          $scope.sendingResetEmail = false;
          if (response) {
            $scope.forgot = false;
            $scope.reset = true;
            Notifications.add('Please check your email', 'good');
          }
        });
      }

    }
  }
});
