'use strict';
define([
	'angular',
	'uiRouter',

	// controller
	'controller/auth/auth',
	'controller/home/home',
	'controller/menu/menu',
	'controller/sci/sci',
	'controller/bien/bien',
	'controller/locataire/locataire',
	'controller/user/user',
	'controller/install/install',
], function(angular) {
	return ['$locationProvider', '$httpProvider', '$stateProvider', '$provide', '$mdThemingProvider', function($locationProvider, $httpProvider, $stateProvider, $provide, $mdThemingProvider) {
		$stateProvider.
			state('locloud', {
				url:'/',
				abstract:true,
				views: {
					'container' : {
						templateUrl: 'layout.html',
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

			// Locataire
			state('locloud.locataire', {
				url: "locataires",
				views: {
					'main' : {
						templateUrl: 'controller/locataire/templates/layout.html',
					},
					'locataire-menu@locloud.locataire' : {
						templateUrl: 'controller/locataire/templates/menu.html',
						controller: 'LocataireMenuController'
					},
					'locataire-list@locloud.locataire' : {
						templateUrl: 'controller/locataire/templates/list.html',
						controller: 'LocataireListController'
					}
				},
				data:{
		          	is_granted: ["ROLE_USER"]
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
		$httpProvider.defaults.withCredentials = true;

		$mdThemingProvider.alwaysWatchTheme(true);

		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		var interceptor = ['$location', '$q', '$injector', '$window', 'cfpLoadingBar', function($location, $q, $injector, $window, cfpLoadingBar) {
			return {
				responseError: function(rejection) {
					$injector.get('cfpLoadingBar').complete();
					// cfpLoadingBar;
					switch (rejection.status){
						case 302:
							break;
						case 401:
							$injector.get('$state').go('login');
							break;
						case 404:
							// $injector.get('$state').go('locloud.error404');
							break;
						case 500:
							// $injector.get('$state').go('locloud.error500');
							break;
						default:
						// console.log(rejection.status);
						// 	$injector.get('$state').go('locloud.error500')
							break;
					}
					return $q.reject(rejection);
				}
			};
		}];

		$httpProvider.interceptors.push(interceptor);
	}]
});
