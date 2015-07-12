define([
	'angular',
	'uiRouter',

	// controller
	'controller/auth/auth',
	'controller/home/home',
	'controller/menu/menu',
	'controller/sci/sci',
	'controller/lot/lot',
	'controller/locataire/locataire',
	'controller/user/user',
	'controller/install/install',
], function(angular) {
	'use strict';
	return ['$locationProvider', '$httpProvider', '$stateProvider', '$provide', '$mdThemingProvider', function($locationProvider, $httpProvider, $stateProvider, $provide, $mdThemingProvider) {
		// console.log(ngMaterialProvider);

		$stateProvider.
			state('locloud', {
				url:'/',
				abstract:true,
				views: {
					'container' : {
						templateUrl: 'layout.html',
						controller: 'ResponsiveController'
					},
					'menu@locloud' : {
						templateUrl: 'controller/menu/templates/menu.html',
						controller: 'MenuController'
					},
				}
			}).
			state('locloud.unauthorized', {
				url: "unauthorized",
				views: {
					'main' : {
						templateUrl: 'controller/common/templates/unauthorized.html',
					},
				},
				data:{
		          	is_granted: ["ROLE_GUEST"]
		       	}
			}).

			// Dashboard
			state('locloud.home', {
				url: "home",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/home/templates/home.html',
						controller: 'HomeController'
					},
				},
				data:{
		          	is_granted: ["ROLE_USER","ROLE_ADMIN"]
		       	}
			}).





			state('locloud.error500', {
				views: {
					'main@locloud' : {
						templateUrl: 'controller/common/error/templates/500.html',
						controller: 'Error500Controller'
					},
				},
			});

		// config rest html 5
		$locationProvider.html5Mode(true);
		$httpProvider.defaults.useXDomain = true;
		// $httpProvider.defaults.withCredentials = true;
		// $httpProvider.defaults.origin = 'http://www.locloud.com';

		$mdThemingProvider.alwaysWatchTheme(true);

		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		var interceptor = ['$location', '$q', '$injector', '$window', 'cfpLoadingBar', function($location, $q, $injector, $window, cfpLoadingBar) {
			return {
				responseError: function(rejection) {
					$injector.get('cfpLoadingBar').complete();
					switch (rejection.status){
						case 401:
							$injector.get('$state').go('logout');
							break;
						case 404:
						case 400:
						case 500:
						case 302:
							break;
						default:
							$injector.get('ngNotify').set('Le serveur ne reponds pas', 'error');
							break;
					}
					return $q.reject(rejection);
				}
			};
		}];
		$httpProvider.interceptors.push(interceptor);
	}];
});
