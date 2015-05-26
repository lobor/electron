'use strict';

define([
	'angular',
	'config/routes',
	'config/stateRoutes',

	'crAcl',
	'uiRouter',

	'angularCookie',
	'angular-loading-bar',
	'ng-notify',
	'angularBootstrapTpl'



], function(angular, $routes, $stateRoutes, crAcl) {
	
	// Declare app level module which depends on views, and components
	return angular.module('locloud', [
		'ui.router',
		'cr.acl',
		'angular-loading-bar',
		'ngNotify',
		'mgcrea.ngStrap',
		'locloud.login',
		'locloud.home',
		'locloud.menu',
		'locloud.sci',
		'locloud.bien',
		'locloud.locataire',
		'locloud.user',
		'locloud.install'
	]).
	run($stateRoutes).
	config($routes).
	config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.includeSpinner = false;
	}]).
	constant('baseUrl', window.location.origin + ':3000');
});
