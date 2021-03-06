/**
 * @description
 * This service communicates with the backend and the json data files.
 * This service should be the only way to communcicate with the backend and the json data files.
 * This service does not have any dependencies so it can by used by any service or controller
**/

app.service("Network", function($http, $q, Notifications, $rootScope) {

  var net = this;
  /**
  * @description
  * Does a post request to RFE.
  * This function handles the responses and any errors
  * @param {string} callName The name of the call
  * @param {object} params the parameters that should be sent with the request
  * @param {integer} urgency The urgency of the request. This gets passed to the notification if the call fails
  * @param {boolean} returnError If this is true, the error will be returned.
  * By default, the function will handle the error notification
  * This only counts for status 0 errors. If the http status is not 200 then this function will still handle the error
  * @returns {object|boolean|string}
  * The JSON parsed response that was returned from RFE. False if there was an error unless returnError is true, then it will return the error string
  **/
  this.post = function (callName, params, urgency, returnError) {
    var deferred = $q.defer();
    if (!params) params = {};
    if (this.visitorToken) params.visitorToken = this.visitorToken;
    if (this.loginToken) params.loginToken = this.loginToken;
    var configs = {'Content-Type': 'application/json'};
    $http.post('@BACKENDURL@' + callName, params, configs).then(function(response) {
      if (!response.data.error) {
        deferred.resolve(response.data.data);
      } else {
        if (response.data.error == 'LOGIN_TOKEN_EXPIRED') {
          net.account.logout();
        }
        if (!returnError) {
          Notifications.add(response.data.error, "bad", urgency);
          deferred.resolve(false);
        } else deferred.resolve({ error: response.data.error });
      }
    }, function(err) {
      if (!returnError) {
        Notifications.add("error", "bad", urgency);
        deferred.resolve(false);
      } else deferred.resolve({ error: err });
    });
    return deferred.promise;
  };

});
