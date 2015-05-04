'use strict';

define([
	'angular',
	'uiRouter',
	'angularCookie',
], function(){
	return ['$rootScope', '$state', '$controller', '$q', '$window', '$http', 'baseUrl', function($rootScope, $state, $controller, $q, $window, $http, baseUrl){
		$http.get(baseUrl+'/auth/check')
		.success(function (data, status, headers, config) {
			if(data.status){
				$state.go('locloud.home');
			}
			else{
				$state.go('locloud.login');
			}
			// $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			// 	console.log(data.status);
			// 	if(data.status){
			// 		$state.go('locloud.home');
			// 	}
			//
			// 	$rootScope.login = '';
		    // 	// if (!$window.sessionStorage || (!$window.sessionStorage.token && toState.url != 'login')) {
			// 	//     		event.preventDefault();
			// 	// 	$state.go('locloud.login');
		    // 	// }
			// 	// else if($window.sessionStorage && $window.sessionStorage.token && toState.url == 'login'){
			// 	// 	event.preventDefault();
			// 	// 	$state.go('locloud.home');
			// 	// }
			// 	//
			// });
		}).
		error(function(data, status, headers, config){
			$state.go('locloud.login');
		});
	}];
});
