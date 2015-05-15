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

		crAcl.setInheritanceRoles({
	    	"ROLE_ADMIN" : ["ROLE_USER"]
	  	});

		crAcl.setRedirect("locloud.unauthorized");

		$http.get(baseUrl+'/auth/check')
		.success(function (data, status, headers, config) {
			if(data.status && $window.location.pathname.match('login')){
				$state.go('locloud.home');
			}
			else if(!data.status){
				$state.go('locloud.login');
			}
		}).
		error(function(data, status, headers, config){
			$state.go('locloud.login');
		});
	}];
});
