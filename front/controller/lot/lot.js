'use strict';
define([
	'angular',
	'controller/lot/config/routes',
	'controller/lot/views/list',
	'controller/lot/views/create',
	'controller/lot/views/edit',
	'angular-grid',
	'angular-schema-form-material',
	'ng-file-upload'
], function (angular, routes, ListController, CreateController, EditController) {
	angular.module('locloud.lot', ['angularGrid', 'schemaForm', 'schemaForm-file-upload', 'ngFileUpload', 'ngMaterial'])
		.config(routes)
		.controller('LotListController', ListController)
		.controller('LotCreateController', CreateController)
		.controller('LotEditController', EditController);
});
