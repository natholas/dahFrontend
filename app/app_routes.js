app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home/home.html'
  })
  .otherwise({
    templateUrl: 'pages/404/404.html'
  });
});
