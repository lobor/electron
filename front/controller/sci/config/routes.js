define([
	'angular',
	'text!controller/sci/templates/layout.html',
	'text!controller/sci/templates/list.html',
	'text!controller/sci/templates/form.html'
], function(angular, LayoutTpl, ListTpl, FormTpl) {
	'use strict';
	return ['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('locloud.sci', {
				url: "sci",
				views: {
					'main@locloud' : {
						template: LayoutTpl,
					},
					'sci-list@locloud.sci' : {
						template: ListTpl,
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
						template: FormTpl,
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
						template: FormTpl,
						controller: 'SciEditController'
					}
				},
				data:{
					is_granted: ["ROLE_USER"]
				}
			});
	}]
});
