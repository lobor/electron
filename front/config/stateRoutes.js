'use strict';

define([
	'angular',
	'uiRouter',
	'angularCookie',
], function(){
	return ['$rootScope', '$state', '$controller', '$q', '$window', '$http', 'baseUrl', 'ngNotify', 'crAcl', function($rootScope, $state, $controller, $q, $window, $http, baseUrl, ngNotify, crAcl){
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

		crAcl.setRedirect("locloud.unauthorized");

		$http.get(baseUrl+'/auth/check')
		.success(function (data, status, headers, config) {
			if(data.status && $window.location.pathname.match('login')){
				$state.go('locloud.home');
			}
			else if(!data.status){
				$state.go('login');
			}
		}).
		error(function(data, status, headers, config){
			if($window.sessionStorage.role){
				$window.sessionStorage.removeItem('role');
			}
			crAcl.setRole('ROLE_GUEST');
			$state.go('login');
		});
	}];
});
