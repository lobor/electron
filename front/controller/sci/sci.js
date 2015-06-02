'use strict';
define([
	'angular',
	'controller/sci/config/routes',
	'controller/sci/views/create',
	'controller/sci/views/list',
	'controller/sci/views/edit',
	'controller/sci/views/showMenuRow',
	'angular-grid',
	'angular-schema-form-material',
], function(angular, routesSci, CreateController, ListController, EditController, ShowMenuRowController) {
	angular.module('locloud.sci', ['angularGrid', 'schemaForm', 'schemaForm-datepicker'])
		.config(routesSci)
		.controller('SciCreateController', CreateController)
		.controller('SciListController', ListController)
		.controller('SciEditController', EditController)
		.controller('ShowMenuRowController', ShowMenuRowController);
});
