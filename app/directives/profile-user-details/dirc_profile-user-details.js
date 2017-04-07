app.directive('profileUserDetails', function() {
  return {
    templateUrl: 'directives/profile-user-details/profile-user-details.html',
    scope: {data: '=', dummyPassword: '='}
  };
});
