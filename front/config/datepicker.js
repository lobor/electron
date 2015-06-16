'use strict';
define([
	'angular',
], function(angular) {
	return ['$mdThemingProvider', function($mdThemingProvider) {
		$mdThemingProvider.theme('datePickerTheme').primaryPalette('teal');
	}];
});
