'use strict';
define([
	'angular',
	'controller/auth/config/routes',
	'controller/auth/views/login',
	'controller/auth/views/logout',
], function(angular, routesAuth, loginView, logoutView) {
	angular
		.module('locloud.login', [])
		.config(routesAuth)
		.controller('LoginController', loginView)
		.controller('LogoutController', logoutView);
});
