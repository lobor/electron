define([
	'angular',
	'config/routes',
	'config/stateRoutes',
	'config/loadingBar',
	'config/datepicker',

	'crAcl',
	'uiRouter',

	'angularCookie',
	'angular-loading-bar',
	'angular-material',
	'ng-notify',
	'angularBootstrapTpl',
	'imgLiquid',
	'angular-jwt',
	'angular-form-for',
	'tota11y',
	'decoratorForm/formFor/material/file-field',
], function (angular, $routes, $stateRoutes, $loadingBar) {
	'use strict';
	return angular
		.module('locloud', [
			'ui.router',
			'cr.acl',
			'angular-loading-bar',
			'ngNotify',
			'mgcrea.ngStrap',
			'ngMaterial',
			'locloud.login',
			'locloud.home',
			'locloud.menu',
			'locloud.sci',
			'locloud.lot',
			'locloud.locataire',
			'locloud.user',
			'locloud.install',
			'angular-jwt',
			'formFor',
			'formFor.materialTemplates',
		])
		.run($stateRoutes)
		.config($routes)
		.config($loadingBar)
		.config(['$httpProvider','jwtInterceptorProvider', function Config($httpProvider, jwtInterceptorProvider) {

			// // Please note we're annotating the function so that the $injector works when the file is minified
			jwtInterceptorProvider.tokenGetter = [function () {
			// 	myService.doSomething();
				return localStorage.getItem('id_token');
			}];

			$httpProvider.interceptors.push('jwtInterceptor');
		}])
		.constant('baseUrl', window.location.origin + ':3000')
		.directive('imgliquid', function () {
			return {
				restrict: 'A',
				link: function (scope, element, attr) {
					element.imgLiquid();
					if (!element.find('img').attr('src')) {
						var reader = new FileReader();
						var file = scope.file;
						reader.onloadend = function () {
							element.css('background-image', 'url("' + reader.result + '")');
						};

						if (file) {
							reader.readAsDataURL(file);
						}
					}
				}
			};
		});
});
