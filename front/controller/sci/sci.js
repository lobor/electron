'use strict';
define([
	'angular',
	'controller/sci/config/routes',
	'controller/sci/views/create',
	'controller/sci/views/list',
	'controller/sci/views/edit',
	'angular-grid',
	'angular-schema-form-material',
], function(angular, routesSci, CreateController, ListController, EditController) {
	angular.module('locloud.sci', ['angularGrid', 'schemaForm', 'schemaForm-datepicker'])
		.config(routesSci)
		.controller('SciCreateController', CreateController)
		.controller('SciListController', ListController)
		.controller('SciEditController', EditController);
});
