'use strict';
define([
	'angular',
], function(angular) {
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('locloud.user', {
				url: "user",
				views: {
					'main' : {
						templateUrl: 'controller/user/templates/layout.html',
					},
					'user-list@locloud.user' : {
						templateUrl: 'controller/user/templates/list.html',
						controller: 'UserListController'
					}
				},
				data:{
					is_granted: ["ROLE_ADMIN"]
				}
			})
			.state('locloud.user.edit', {
				url: "/edit/:id",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/user/templates/form.html',
						controller: 'UserEditController'
					}
				},
				data:{
					is_granted: ["ROLE_ADMIN"]
				}
			})
			.state('locloud.user.create', {
				url: "/create",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/user/templates/form.html',
						controller: 'UserCreateController'
					}
				},
				data:{
					is_granted: ["ROLE_ADMIN"]
				}
			});
			
	}]
});
