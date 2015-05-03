'use strict';
define([
	'angular',
	'angularCookie',
	'uiRouter',
], function(angular, ngCookie) {
	angular.module('locloud.login', ['ui.router', 'ngCookies']).
	controller('LoginController', ['$scope', '$http', '$window', 'baseUrl', '$rootScope', '$state', '$cookies', '$cookieStore', function($scope, $http, $window, baseUrl, $rootScope, $state, $cookies, $cookieStore) {

		$scope.user = {email: 'lionel.bertrand@ymail.com'};
  		$scope.message = '';

		$scope.submit = function () {
		    $http.
      		post(baseUrl+'/auth/authenticate', $scope.user, {withCredentials:true}).
      		success(function (data, status, headers, config) {
				if(data.status){
					// $state.go('locloud.home',null,{
					//   reload: true, notify: true
					// });
					$window.location.reload();
				}
      		})
	      	.error(function (data, status, headers, config) {
		        // Erase the token if the user fails to log in
		        delete $window.sessionStorage.token;

		        // Handle login errors here
		        $scope.message = 'Error: Invalid user or password';
	      	});
		};

	}]).
	controller('LogoutController', ['$state', function($state) {
		document.cookie = 'Auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		$state.go('locloud.login');
	}]);
});
