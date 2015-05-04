'use strict';
define([
	'angular',
	'uiRouter',

	// controller
	'controller/login/login',
	'controller/home/home',
	'controller/menu/menu',
	'controller/sci/sci',
], function(angular) {
	return ['$locationProvider', '$httpProvider', '$stateProvider', '$provide', function($locationProvider, $httpProvider, $stateProvider, $provide) {
		$stateProvider.
			state('locloud', {
				url:'/',
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
			state('locloud.login', {
				url: "login",
				views: {
					'container@':{
						templateUrl: 'controller/login/templates/login.html',
						controller: 'LoginController'
					},
				},
			}).
			state('locloud.sci', {
				url: "sci",
				views: {
					'main' : {
						templateUrl: 'controller/sci/templates/layout.html',
					},
					'sci-menu@locloud.sci' : {
						templateUrl: 'controller/sci/templates/menu.html',
						controller: 'SciMenuController'
					},
					'sci-list@locloud.sci' : {
						templateUrl: 'controller/sci/templates/list.html',
						controller: 'SciListController'
					}
				},
			}).
			state('locloud.sci.create', {
				url: "/create",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/create.html',
						controller: 'SciCreateController'
					}
				},
			}).
			state('locloud.sci.edit', {
				url: "/edit/:id",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/create.html',
						controller: 'SciEditController'
					}
				},
			}).
			state('locloud.home', {
				url: "home",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/home/templates/home.html',
						controller: 'HomeController'
					},
				},
			}).
			state('locloud.logout',{
				url: "logout",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/login/templates/login.html',
						controller: 'LogoutController'
					},
				},
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

		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		var interceptor = ['$location', '$q', '$injector', '$window', function($location, $q, $injector, $window) {
			return {
				responseError: function(rejection) {
					switch (rejection.status){
						case 302:
							break;
						case 401:
							$injector.get('$state').go('locloud.login');
							break;
						case 404:
							$injector.get('$state').go('locloud.error404');
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
