define([
	'angular',
	'controller/sci/config/routes',
	'controller/sci/views/create',
	'controller/sci/views/list',
	'controller/sci/views/edit',
	'angular-grid',
	'angular-multi-step-form'
], function(angular, routesSci, CreateController, ListController, EditController) {
	'use strict';
	angular.module('locloud.sci', ['angularGrid', 'multiStepForm'])
		.config(routesSci)
		.controller('SciCreateController', CreateController)
		.controller('SciListController', ListController)
		.controller('SciEditController', EditController);
});
