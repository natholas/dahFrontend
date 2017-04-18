app.directive('address', function(Address, $timeout) {
  return {
    scope: {data: '=', predictions: '='},
    require: 'ngModel',
    link: function(scope, el, attr, ngModelController) {

      scope.predictions = []

      scope.$watch('data.address', function() {
        if (!scope.data.address) return
        if (scope.findInPredictions(scope.data.address)) {
          scope.predictions = []
          ngModelController.$setValidity('addressValid', true);
          return
        }
        ngModelController.$setValidity('addressValid', false);
        scope.oldInput = scope.data.address
        $timeout.cancel(scope.timer)
        scope.timer = $timeout(function () {
          if (scope.oldInput == scope.data.address) {
            scope.lookup()
          }
        }, 300);
      }, true)

      scope.lookup = function() {
        if (scope.lookingUp) return
        scope.lookingUp = true
        scope.predictions = []
        Address.lookup(scope.data.address).then(function(response) {
          scope.lookingUp = false
          if (response) {
            scope.predictions = response.predictions.map(function(prediction) {
              return {
                pick: scope.pickAddress,
                description: prediction.description
              }
            })
            if (scope.findInPredictions(scope.data.address)) {
              scope.predictions = []
              ngModelController.$setValidity('addressValid', true);
              return
            }
          }
        })
      }

      scope.pickAddress = function(address) {
        scope.data.address = address;
      }

      scope.findInPredictions = function (address) {
        for (var i in scope.predictions) {
          if (scope.predictions[i].description == address) return true
        }
      }

    }
  }
})
