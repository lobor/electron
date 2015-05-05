'use strict';

define([
	'angular',
	'uiRouter',
	'angularCookie',
	'angularUi',
	'angular-loading-bar',

	'config/routes',
	'config/stateRoutes',

], function(angular, uiRouter, ngCookie, uiBootstrap, loadingBar, $routes, $stateRoutes) {
	// Declare app level module which depends on views, and components
	return angular.module('locloud', [
		'ui.bootstrap',
		'ui.router',
		'angular-loading-bar',
		'locloud.login',
		'locloud.home',
		'locloud.menu',
		'locloud.sci',
	]).
	run($stateRoutes).
	config($routes).
	config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.includeSpinner = false;
	}]).
	constant('baseUrl', window.location.origin + ':3000');
});
