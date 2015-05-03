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
					'@' : {
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
					'main@locloud' : {
						templateUrl: 'controller/login/templates/login.html',
						controller: 'LoginController'
					},
				},
				data: {
					requireLogin: false
				}
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
				data: {
					requireLogin: false
				}
			}).
			state('locloud.sci.create', {
				url: "/create",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/create.html',
						controller: 'SciCreateController'
					}
				},
				data: {
					requireLogin: false
				}
			}).
			state('locloud.sci.edit', {
				url: "/edit/:id",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/create.html',
						controller: 'SciEditController'
					}
				},
				data: {
					requireLogin: false
				}
			}).
			state('locloud.home', {
				url: "home",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/home/templates/home.html',
						controller: 'HomeController'
					},
				},
				data: {
					requireLogin: true
				}
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
				data: {
					requireLogin: false
				}
			});

		// config rest html 5
		$locationProvider.html5Mode(true);
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;

		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
			return {
				responseError: function(rejection) {
					console.log(this);
					switch (rejection.status){
						case '302':
							break;
						case '401':
							break;
						case '404':
							break;
						case '500':
							$state.go('locloud.error500');
							break;
						default:
							$state.go('locloud.error500');
							console.log('toto');
							break;
					}
					return $q.reject(rejection);
				}
			};
		    // function success(response) {
			// 	console.log('toto');
		    //     return response;
		    // }
			//
		    // function error(response) {
			// 	console.log('toto');
		    //     if(response.status === 401) {
		    //         $injector.get('$state').transitionTo('public.login');
		    //         return $q.reject(response);
		    //     }
		    //     else {
		    //         return $q.reject(response);
		    //     }
		    // }
			//
		    // return function(promise) {
		    //     return promise.then(success, error);
		    // }
		}];

		$httpProvider.interceptors.push(interceptor);

		// $provide.factory('errorInterceptor', function($q, $state) {
			//  	return {
			//    	responseError: function(rejection) {
			// 		switch (rejection.status){
			// 			case '302':
			// 				break;
			// 			case '401':
			// 				break;
			// 			case '404':
			// 				break;
			// 			case '500':
			// 				$state.go('locloud.error500');
			// 				break;
			// 			default:
			// 				$state.go('locloud.error500');
			// 				console.log('toto');
			// 				break;
			// 		}
			//       	return $q.reject(rejection);
		    // 	}
			//  	};
		// });
		//
		// 	$httpProvider.interceptors.push('errorInterceptor');
	}]
});
