'use strict';
define([
	'angular',
	'controller/bien/config/routes',
	'controller/bien/views/list',
	'controller/bien/views/create',
	'controller/bien/views/edit',
	'angular-grid',
	'bootstrap-decorator',
], function(angular, routes, ListController, CreateController, EditController) {
	angular.module('locloud.bien', ['angularGrid','schemaForm'])
		.config(routes)
		.controller('BienListController', ListController)
		.controller('BienCreateController', CreateController)
		.controller('BienEditController', EditController);
});
