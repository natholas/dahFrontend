app.controller('profileCtrl', function($scope, Account, Notifications) {

  $scope.Account = Account;
  $scope.dummyPassword = 'XXXXXXXXXXXXXXXX';

  $scope.getTemplate = function () {
    if (Account.loginToken && !$scope.newUserDetails) {
      $scope.reset();
    }
    return Account.loginToken ? 'pages/profile/profile.html' : 'pages/404/404.html';
  };

  $scope.reset = function() {
    $scope.newUserDetails = angular.copy(Account.userDetails);
    $scope.newUserDetails.password = $scope.dummyPassword;
  };

  $scope.update = function () {
    var params = {};
    for (var i in $scope.newUserDetails) {
      if ($scope.newUserDetails[i] != Account.userDetails[i]) {
        params[i] = $scope.newUserDetails[i];
      }
    }
    delete params.repeatPassword;
    if (params.password == $scope.dummyPassword) delete params.password;

    if (!Object.size(params)) return;

    Account.update(params).then(function(response) {
      if (response) {
        Notifications.add('saved', 'good');
        $scope.reset();
      }
    });

  };

});
