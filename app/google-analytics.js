(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-73395677-2', 'auto');

app.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeSuccess', function() {
    // if ($location.host() == 'dev.dah.local') return;
    ga('set', 'page', $location.path());
    ga('send', 'pageview');
  });
});
