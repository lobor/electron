'use strict';
define([
	'angular',
], function(angular) {
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			// bien immobilier
			.state('locloud.bien', {
				url: "biens",
				views: {
					'main' : {
						templateUrl: 'controller/bien/templates/layout.html',
					},
					'bien-menu@locloud.bien' : {
						templateUrl: 'controller/bien/templates/menu.html',
						controller: 'BienMenuController'
					},
					'bien-list@locloud.bien' : {
						templateUrl: 'controller/bien/templates/list.html',
						controller: 'BienListController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			})
			.state('locloud.bien.create', {
				url: "/create",
				views: {
					'main@locloud' : {
						templateUrl: 'controller/bien/templates/form.html',
						controller: 'BienCreateController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			});
	}]
});
