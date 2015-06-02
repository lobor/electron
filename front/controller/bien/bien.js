'use strict';
define([
	'angular',
	'controller/bien/config/routes',
	'controller/bien/views/list',
	'controller/bien/views/create',
	'controller/bien/views/edit',
	'angular-grid',
	'angular-schema-form-material',
], function(angular, routes, ListController, CreateController, EditController) {
	angular.module('locloud.bien', ['angularGrid', 'schemaForm', 'ngMaterial'])
		.config(routes)
		.controller('BienListController', ListController)
		.controller('BienCreateController', CreateController)
		.controller('BienEditController', EditController);
});
