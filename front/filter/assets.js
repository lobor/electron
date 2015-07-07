'use strict';
define([
	'angular',
	'uiRouter',

	// controller
	'controller/auth/auth',
	'controller/home/home',
	'controller/menu/menu',
	'controller/sci/sci',
	'controller/lot/lot',
	'controller/locataire/locataire',
	'controller/user/user',
	'controller/install/install',
], function(angular) {
	return ['baseUrl', function(baseUrl) {
		return function(assets) {
		    assets = assets || '';
		    return baseUrl + assets.url + assets.image;
		  };
	}];
});
