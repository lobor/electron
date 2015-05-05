'use strict';

define([
	'angular',
	'uiRouter',
	'angularCookie',
], function(){
	return ['$rootScope', '$state', '$controller', '$q', '$window', '$http', 'baseUrl', function($rootScope, $state, $controller, $q, $window, $http, baseUrl){
		// console.log($state);
		// console.log($state.$current);
		// console.log($window.location.pathname.match('login'));
		$http.get(baseUrl+'/auth/check')
		.success(function (data, status, headers, config) {
		//
		// 	// console.log($state.includes('locloud.login'));
			if(data.status && $window.location.pathname.match('login')){
				$state.go('locloud.home');
			}
			else if(!data.status){
				$state.go('locloud.login');
			}
		// 	// $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		// 	// 	console.log(data.status);
		// 	// 	if(data.status){
		// 	// 		$state.go('locloud.home');
		// 	// 	}
		// 	//
		// 	// 	$rootScope.login = '';
		//     // 	// if (!$window.sessionStorage || (!$window.sessionStorage.token && toState.url != 'login')) {
		// 	// 	//     		event.preventDefault();
		// 	// 	// 	$state.go('locloud.login');
		//     // 	// }
		// 	// 	// else if($window.sessionStorage && $window.sessionStorage.token && toState.url == 'login'){
		// 	// 	// 	event.preventDefault();
		// 	// 	// 	$state.go('locloud.home');
		// 	// 	// }
		// 	// 	//
		// 	// });
		}).
		error(function(data, status, headers, config){
			$state.go('locloud.login');
		});
	}];
});
