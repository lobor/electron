'use strict';
define([
	'angular',
	'controller/user/config/routes',
	'controller/user/views/list',
	'controller/user/views/create',
	'controller/user/views/edit',
], function(angular, routes, ListController, CreateController, EditController) {

	angular.module('locloud.user', ['angularGrid'])
		.config(routes)
		.controller('UserListController', ListController)
		.controller('UserEditController', EditController)
		.controller('UserCreateController', CreateController);
});
