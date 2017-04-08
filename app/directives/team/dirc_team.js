app.directive('team', function(Teams) {
  return {
    templateUrl: 'directives/team/team.html',
    scope: {teamId: '='},
    controller: function($scope, Network) {
      Teams.getTeam($scope.teamId).then(function(response) {
        $scope.team = response;
      });
    }
  }
});
