app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home/home.html'
  })
  .when('/entrepreneurs', {
    templateUrl: 'pages/entrepreneurs/entrepreneurs.html'
  })
  .otherwise({
    templateUrl: 'pages/404/404.html'
  });
});
