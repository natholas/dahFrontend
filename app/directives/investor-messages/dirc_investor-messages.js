app.directive('investorMessages', function() {
  return {
    templateUrl: 'directives/investor-messages/investor-messages.html',
    scope: {entrepreneur: '=data'},
    controller: function($scope, Network) {
      if (!$scope.entrepreneur) return;
      var params = {
        entrepreneurId: $scope.entrepreneur.id
      };
      Network.post('end/getinvestormessages', params).then(function(response) {
        if (response) {
          $scope.messages = response.messages;
          $scope.countInvestors(response.messages)
        }
      });

      $scope.countInvestors = function (messages) {
        var investors = [];
        for (var i in messages) {
          if (investors.indexOf(messages[i].userId) < 0)
            investors.push(messages[i].userId);
        }
        $scope.entrepreneur.investorCount = investors.length;
      };
    }
  }
});
