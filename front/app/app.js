'use strict';

define([
	'angular',
	'uiRouter',
	'crAcl',
	'angularCookie',
	'angularUi',
	'angular-loading-bar',
	'ng-notify',

	'config/routes',
	'config/stateRoutes',

], function(angular, uiRouter, crAcl, ngCookie, uiBootstrap, loadingBar, ngNotify, $routes, $stateRoutes) {
	// Declare app level module which depends on views, and components
	return angular.module('locloud', [
		'ui.bootstrap',
		'ui.router',
		'cr.acl',
		'angular-loading-bar',
		'ngNotify',
		'locloud.login',
		'locloud.home',
		'locloud.menu',
		'locloud.sci',
		'locloud.bien',
		'locloud.locataire',
	]).
	run($stateRoutes).
	config($routes).
	config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.includeSpinner = false;
	}]).
	constant('baseUrl', window.location.origin + ':3000');
});
