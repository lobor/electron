'use strict';
define([
	'angular',
	'controller/sci/config/routes',
	'controller/sci/views/create',
	'controller/sci/views/list',
	'controller/sci/views/edit',
	'angular-grid',
	'ObjectPath',
	'angular-schema-form',
	'bootstrap-decorator',
	'angular-schema-form-datepicker',
	'dialog',
], function(angular, routesSci, CreateController, ListController, EditController) {
	angular.module('locloud.sci', ['angularGrid', 'schemaForm', 'dialogs.main'])
		.config(routesSci)
		.controller('SciCreateController', CreateController)
		.controller('SciListController', ListController)
		.controller('SciEditController', EditController);
});
