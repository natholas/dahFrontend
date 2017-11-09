app.controller('entrepreneurCtrl', function($scope, entrepreneur) {

  $scope.getTemplate = function () {
    $scope.entrepreneur = entrepreneur;
    return entrepreneur ? 'pages/entrepreneur/entrepreneur.html' : 'pages/404/404.html';
  }

});
