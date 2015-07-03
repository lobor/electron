define([
	'angular',
], function(angular) {
	'use strict';
	return ['$mdThemingProvider', function($mdThemingProvider) {
		$mdThemingProvider.theme('datePickerTheme').primaryPalette('teal');
	}];
});
