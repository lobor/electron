'use strict';
define([
	'angular',
	'controller/install/config/routes',
	'controller/install/views/verif',
	'controller/install/views/create',
], function(angular, routesInstall, verifView, createView) {
	angular
		.module('locloud.install', [])
		.config(routesInstall)
		.controller('VerifController', verifView)
		.controller('CreateController', createView);
});
