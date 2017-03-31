app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home/home.html'
  })
  .when('/entrepreneurs', {
    templateUrl: 'pages/entrepreneurs/entrepreneurs.html'
  })
  .when('/entrepreneur/:entrepreneurId', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'entrepreneurCtrl',
    resolve: {
      entrepreneur: function(ResolveEntrepreneur) {
        return ResolveEntrepreneur().then(function(response) {
          return response;
        });
      }
    }
  })
  .otherwise({
    templateUrl: 'pages/404/404.html'
  });
});
