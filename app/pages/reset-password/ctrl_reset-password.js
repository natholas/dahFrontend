app.controller('resetPasswordCtrl', function($scope, Account, Notifications, $location) {

  $scope.reset = function () {
    if ($scope.resetting) return;
    $scope.resetting = true;
    Account.resetPassword($location.search().resetToken, $scope.newPassword).then(function(response) {
      $scope.resetting = false;
      if (response) {
        Notifications.add('Saved', 'good');
        $location.path('/');
      }
    });
  };

});
