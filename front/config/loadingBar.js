define([
	'angular',
], function(angular) {
	'use strict';
	return ['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
	}];
});
