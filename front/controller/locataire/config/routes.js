define([
	'angular',
	'text!controller/locataire/templates/layout.html',
	'text!controller/locataire/templates/list.html',
	'text!controller/locataire/templates/form.html',
], function(angular, LayoutTpl, ListTpl, FormTpl) {
	'use strict';
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('locloud.locataire', {
				url: "locataire",
				views: {
					'main@locloud' : {
						template: LayoutTpl,
					},
					'locataire-list@locloud.locataire' : {
						template: ListTpl,
						controller: 'LocataireListController'
					}
				},
				data:{
					is_granted: ["ROLE_USER","ROLE_ADMIN"]
				}
			})
			.state('locloud.locataire.create', {
				url: "/create",
				views: {
					'main@locloud' : {
						template: FormTpl,
						controller: 'LocataireCreateController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			});
			// .state('locloud.locataire.edit', {
			// 	url: "/edit/:id",
			// 	views: {
			// 		'main@locloud' : {
			// 			template: FormTpl,
			// 			controller: 'SciEditController'
			// 		}
			// 	},
			// 	data:{
			// 		is_granted: ["ROLE_USER"]
			// 	}
			// });
	}]
});
