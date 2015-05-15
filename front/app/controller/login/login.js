'use strict';
define([
	'angular',
	'angularCookie',
	'uiRouter',
], function(angular, ngCookie) {
	angular.module('locloud.login', ['ui.router', 'ngCookies']).
	controller('LoginController', ['$scope', '$http', '$window', 'baseUrl', '$rootScope', '$state', '$cookies', '$cookieStore', function($scope, $http, $window, baseUrl, $rootScope, $state, $cookies, $cookieStore) {
		$rootScope.login = 'login';
		$scope.user = {email: 'lionel.bertrand@ymail.com'};
  		$scope.message = '';

		$scope.submit = function () {
			$scope.message = '';
			$scope.styleAlert = '';
		    $http.
	      		post(baseUrl+'/login', $scope.user, {withCredentials:true}).
	      		success(function (data, status, headers, config) {
					if(!data.error){
						$state.go('locloud.home',null,{
						  reload: true, notify: true
						});
						// $window.location.reload();
						// $window.sessionStorage.token = data.token;
					}
					else{
						switch(data.errorCode){
							// 001 => not password or email
							case '001':
								$scope.message = 'Champs email et mot de passe obligatoires';
								$scope.styleAlert = 'alert alert-danger';
								break;

							// 002 => email not find
							case '002':
								$scope.message = 'Aucun compte associé à cet email';
								$scope.styleAlert = 'alert alert-danger';
								break;

							// 003 => password incorrect
							case '003':
								$scope.message = 'Mot de passe incorrect';
								$scope.styleAlert = 'alert alert-danger';
								break;
						}
					}
	      		})
		      	.error(function (data, status, headers, config) {
			        // Erase the token if the user fails to log in
			        // delete $window.sessionStorage.token;

			        // Handle login errors here
			        $scope.message = 'Error: Invalid user or password';
		      	});
		};

	}]).
	controller('LogoutController', ['$state', '$http', 'baseUrl', function($state, $http, baseUrl) {
		$http.
			get(baseUrl+'/logout').
			success(function (data, status, headers, config) {
				$state.go('locloud.login');
			})
			.error(function (data, status, headers, config) {
			});
	}]).
	controller('CheckAuthController', ['$state', '$http', 'baseUrl', function($state, $http, baseUrl) {
		// console.log($state);
		// console.log($state.$current);
		// $http.get(baseUrl+'/auth/check')
		// .success(function (data, status, headers, config) {
		// }).
		// error(function(data, status, headers, config){
		// 	$state.go('locloud.login');
		// });
	}]);
});
