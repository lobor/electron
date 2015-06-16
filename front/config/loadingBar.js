'use strict';
define([
	'angular',
], function(angular) {
	return ['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
	}];
});
