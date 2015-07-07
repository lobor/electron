'use strict';
define([
	'angular',
	'controller/locataire/config/routes',
	'controller/locataire/views/list',
	'controller/locataire/views/create',
	'angular-grid',
], function(angular, routesLocataire, ListController, CreateController) {
	angular.module('locloud.locataire', ['angularGrid'])
	.config(routesLocataire)
	.controller('LocataireListController', ListController)
	.controller('LocataireCreateController', CreateController);
});
