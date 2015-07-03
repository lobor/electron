define([
	'angular',
	'controller/auth/config/routes',
	'controller/auth/views/login',
	'controller/auth/views/logout',
	'uiRouter',
], function(angular, routesAuth, loginView, logoutView) {
	'use strict';
	angular
		.module('locloud.login', ['ui.router'])
		.config(routesAuth)
		.controller('LoginController', loginView)
		.controller('LogoutController', logoutView);
});
