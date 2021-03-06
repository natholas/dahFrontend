app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'pages/home/home.html'
  })
  .when('/about', {
    templateUrl: 'pages/about/about.html'
  })
  .when('/entrepreneurs', {
    templateUrl: 'pages/entrepreneurs/entrepreneurs.html'
  })
  .when('/success-stories', {
    templateUrl: 'pages/success-stories/success-stories.html'
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
  .when('/checkout/:entrepreneurId/:investmentAmount', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'checkoutCtrl',
    resolve: {
      order: function(ResolveCheckout) {
        return ResolveCheckout().then(function(response) {
          return response;
        });
      }
    }
  })
  .when('/confirmation/:orderId', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'confirmationCtrl'
  })
  .when('/paymentfailed', {
    template: '',
    controller: 'paymentFailedCtrl'
  })
  .when('/confirmemail', {
    templateUrl: 'pages/confirm-email/confirm-email.html'
  })
  .when('/resetpassword', {
    templateUrl: 'pages/reset-password/reset-password.html',
    controller: 'resetPasswordCtrl'
  })
  .when('/account', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'accountCtrl'
  })
  .when('/account/profile', {
    template: '<div ng-include="getTemplate()"></div>',
    controller: 'profileCtrl'
  })
  .when('/terms', {
    templateUrl: 'pages/terms/terms.html'
  })

  .otherwise({
    templateUrl: 'pages/404/404.html'
  });
});
