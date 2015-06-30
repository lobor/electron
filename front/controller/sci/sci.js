define([
	'angular',
	'controller/sci/config/routes',
	'controller/sci/views/create',
	'controller/sci/views/list',
	'controller/sci/views/edit',
	'controller/sci/views/showMenuRow',
	'angular-grid',
	'angular-multi-step-form'
], function(angular, routesSci, CreateController, ListController, EditController, ShowMenuRowController) {
	'use strict';
	angular.module('locloud.sci', ['angularGrid', 'multiStepForm'])
		.config(routesSci)
		.controller('SciCreateController', CreateController)
		.controller('SciListController', ListController)
		.controller('SciEditController', EditController)
		.controller('ShowMenuRowController', ShowMenuRowController);
});
