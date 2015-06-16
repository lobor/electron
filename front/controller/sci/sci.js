define([
	'angular',
	'controller/sci/config/routes',
	'controller/sci/views/create',
	'controller/sci/views/list',
	'controller/sci/views/edit',
	'controller/sci/views/showMenuRow',
	'angular-grid',
	'angular-schema-form-material',
	'material-wizard'
], function(angular, routesSci, CreateController, ListController, EditController, ShowMenuRowController) {
	'use strict';
	angular.module('locloud.sci', ['angularGrid', 'schemaForm', 'schemaForm-datepicker', 'material.wizard'])
		.config(routesSci)
		.controller('SciCreateController', CreateController)
		.controller('SciListController', ListController)
		.controller('SciEditController', EditController)
		.controller('ShowMenuRowController', ShowMenuRowController);
});
