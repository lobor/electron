'use strict';
define([
	'angular',
], function(angular) {
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('locloud.sci', {
				url: "sci",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/layout.html',
					},
					'sci-list@locloud.sci' : {
						templateUrl: 'controller/sci/templates/list.html',
						controller: 'SciListController'
					}
				},
				data:{
					is_granted: ["ROLE_USER","ROLE_ADMIN"]
				}
			})
			.state('locloud.sci.create', {
				url: "/create",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/form.html',
						controller: 'SciCreateController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			})
			.state('locloud.sci.edit', {
				url: "/edit/:id",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/sci/templates/form.html',
						controller: 'SciEditController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			});
	}]
});
