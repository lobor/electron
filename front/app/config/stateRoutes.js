'use strict';

define([
	'angular',
	'uiRouter',
	'angularCookie',
], function(){
	return ['$rootScope', '$state', '$controller', '$q', '$cookieStore', '$cookies', function($rootScope, $state, $controller, $q, $cookieStore, $cookies){
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			$rootScope.login = '';
			// console.log($cookies.Auth);
	    	if (!$cookies.Auth && toState.url != 'login') {
	      		event.preventDefault();
				$state.go('locloud.login');
	    	}
			else if($cookies.Auth && toState.url == 'login'){
				event.preventDefault();
				$state.go('locloud.home');
			}

			if(toState.url == 'login'){
				$rootScope.login = 'login';
			}
		});

	}];
});
