'use strict';
define([
	'angular',
], function(angular) {
	return ['$state', '$http', 'baseUrl', 'crAcl', '$window', LogoutController];

	function LogoutController($state, $http, baseUrl, crAcl, $window){
		localStorage.removeItem('id_token');
		$window.sessionStorage.removeItem('role');
		crAcl.setRole('ROLE_GUEST');
		$state.go('login',null,{
			reload: true, notify: true
		});
		// $http
		// 	.get(baseUrl+'/user/logout')
		// 	.success(function (data, status, headers, config) {
		// 		localStorage.setItem('id_token', false);
		// 		$state.go('login',{
		// 	      reload: true, inherit: false, notify: false
		// 	    });
		// 	})
		// 	.error(function (data, status, headers, config) {});
	}
});
