app.directive('videoHeroBanner', function() {
  return {
    limit: 'E',
    templateUrl: 'directives/video-hero-banner/video-hero-banner.html',
    controller: function($scope) {
      $scope.showScroll = true;
      document.addEventListener('scroll', function() {
        if (document.body.scrollTop > 0) {
          $scope.$apply(function () {
            $scope.showScroll = false;
          });
        } else {
          $scope.$apply(function () {
            $scope.showScroll = true;
          });
        }
      });
    }
  }
});
