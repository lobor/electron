'use strict';
define([
	'angular',
], function(angular) {
	return ['$state', '$http', 'baseUrl', 'crAcl', LogoutController];

	function LogoutController($state, $http, baseUrl, crAcl){
		$http
			.get(baseUrl+'/user/logout')
			.success(function (data, status, headers, config) {
				crAcl.setRole('ROLE_GUEST');
				$state.go('login',{
			      reload: true, inherit: false, notify: false
			    });
			})
			.error(function (data, status, headers, config) {});
	}
});
