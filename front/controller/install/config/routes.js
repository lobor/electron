'use strict';
define([
	'angular',
], function(angular) {
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			// Login
			.state('install', {
				url: "/install",
				views: {
					'container@':{
						templateUrl: 'controller/install/templates/verif.html',
						controller: 'VerifController'
					},
				},
				data:{
		          	is_granted: ["ROLE_GUEST"]
		       	}
			})
			.state('install.createUser',{
				url:'/install/createuser',
				views:{
					'container@':{
						templateUrl: 'controller/install/templates/create.html',
						controller: 'CreateController'
					}
				}
			});
	}]
});
