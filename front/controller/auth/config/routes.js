'use strict';
define([
	'angular',
], function(angular) {
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			// Login
			.state('login', {
				url: "login",
				views: {
					'container@':{
						templateUrl: 'controller/auth/templates/login.html',
						controller: 'LoginController'
					},
				},
				data:{
		          	is_granted: ["ROLE_GUEST"]
		       	}
			})

			// Logout
			.state('logout',{
				url: "logout",
				views: {
					'container@' : {
						controller: 'LogoutController'
					},
				},
				data:{
		          	is_granted: ["ROLE_USER"]
		       	}
			});
	}]
});
