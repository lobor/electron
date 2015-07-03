'use strict';
define([
	'angular',
], function(angular) {
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			// lot immobilier
			.state('locloud.lot', {
				url: "lots",
				views: {
					'main' : {
						templateUrl: 'controller/lot/templates/layout.html',
					},
					'lot-menu@locloud.lot' : {
						templateUrl: 'controller/lot/templates/menu.html',
						controller: 'LotMenuController'
					},
					'lot-list@locloud.lot' : {
						templateUrl: 'controller/lot/templates/list.html',
						controller: 'LotListController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			})
			.state('locloud.lot.create', {
				url: "/create",
				views: {
					'main@locloud': {
						templateUrl: 'controller/lot/templates/form.html',
						controller: 'LotCreateController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			})
			.state('locloud.lot.edit', {
				url: "/edit/:id",
				views: {
					'main@locloud': {
						templateUrl: 'controller/lot/templates/form.html',
						controller: 'LotEditController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			});
	}]
});
