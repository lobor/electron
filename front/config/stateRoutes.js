'use strict';

define([
	'angular',
	'uiRouter',
	'angularCookie',
], function(){
	return ['$rootScope', '$state', '$controller', '$q', '$window', '$http', 'baseUrl', 'ngNotify', 'crAcl', 'jwtHelper', function($rootScope, $state, $controller, $q, $window, $http, baseUrl, ngNotify, crAcl, jwtHelper){
		ngNotify.config({
		    theme: 'pure',
		    position: 'top',
		    duration: 3000,
		});

		if($window.sessionStorage.role){
			crAcl.setRole($window.sessionStorage.role);
		}

		crAcl.setInheritanceRoles({
			"ROLE_TEST" : ["ROLE_USER","ROLE_GUEST"],
			"ROLE_ADMIN" : ["ROLE_USER", "ROLE_TEST"]
		});

		crAcl.setRedirect("login");
		if(!$window.location.pathname.match('install')){
			var idToken = localStorage.getItem('id_token');
			if(idToken){
				if(idToken && !jwtHelper.isTokenExpired(idToken) && $window.location.pathname.match('login')){
					$state.go('locloud.home');
				}
				else if(jwtHelper.isTokenExpired(idToken)){
					$state.go('login');
				}
			}
			else{
				if($window.sessionStorage.role){
					$window.sessionStorage.removeItem('role');
				}
				$state.go('login');
				// crAcl.setRole('ROLE_GUEST');
			}
			// }).
			// error(function(data, status, headers, config){
			// 	if($window.sessionStorage.role){
			// 		$window.sessionStorage.removeItem('role');
			// 	}
			// 	crAcl.setRole('ROLE_GUEST');
			// 	$state.go('login');
			// });
		}
	}];
});
