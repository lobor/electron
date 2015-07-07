define([
	'angular',
	'controller/auth/config/routes',
	'controller/auth/views/login',
	'controller/auth/views/logout',
	'factory/Auth',
	'uiRouter',
], function(angular, routesAuth, loginView, logoutView, AuthService) {
	'use strict';
	angular
		.module('locloud.login', ['ui.router'])
		.config(routesAuth)
		.controller('LoginController', loginView)
		.controller('LogoutController', logoutView)
		.factory('AuthService', AuthService);
});
