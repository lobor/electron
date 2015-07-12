if (window.__karma__) {
	// var allTestFiles = [];
	// var TEST_REGEXP = /Spec\.js$/;
	//
	// var pathToModule = function (path) {
	// 	return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	// };
	//
	// Object.keys(window.__karma__.files).forEach(function (file) {
	// 	if (TEST_REGEXP.test(file)) {
	// 		// Normalize paths to RequireJS module names.
	// 		allTestFiles.push(pathToModule(file));
	// 	}
	// });

	var tests = [];

	var TEST_REGEXP = /Spec\.js$/;
	for (var file in window.__karma__.files) {
		if (window.__karma__.files.hasOwnProperty(file)) {
			if (TEST_REGEXP.test(file)) {
				tests.push(file);
			}
		}
	}
}

require.config({
	paths: {
		'text': 'bower_components/requirejs-plugins/lib/text',
		'json': 'bower_components/requirejs-plugins/src/json',
		'angular': 'bower_components/angular/angular',
		'uiRouter': 'bower_components/angular-ui-router/release/angular-ui-router',
		'angularCookie': 'bower_components/angular-cookies/angular-cookies',
		'angular-loading-bar': 'bower_components/angular-loading-bar/build/loading-bar',
		'angular-grid': 'bower_components/ag-grid/dist/angularGrid.min',
		'angular-sanitize': 'bower_components/angular-sanitize/angular-sanitize.min',
		'jquery': 'bower_components/jquery/dist/jquery.min',
		'ng-notify': 'bower_components/ng-notify/dist/ng-notify.min',
		'crAcl': 'bower_components/cr-acl/cr-acl',
		'angularBootstrap': 'bower_components/angular-strap/dist/angular-strap.min',
		'angularBootstrapTpl': 'bower_components/angular-strap/dist/angular-strap.tpl.min',
		'angular-animate': 'bower_components/angular-animate/angular-animate.min',
		'moment': 'bower_components/moment/min/moment-with-locales.min',
		'angular-aria': 'bower_components/angular-aria/angular-aria.min',
		'angular-material': 'bower_components/angular-material/angular-material.min',
		'ng-flow': 'bower_components/ng-flow/dist/ng-flow-standalone',
		'ng-file-upload-shim': 'bower_components/ng-file-upload/dist/ng-file-upload-shim.min',
		'ng-file-upload': 'bower_components/ng-file-upload/dist/ng-file-upload.min',
		'imgLiquid': 'bower_components/imgLiquid/js/imgLiquid',
		'angular-jwt': 'bower_components/angular-jwt/dist/angular-jwt.min',
		'angular-multi-step-form': 'bower_components/angular-multi-step-form/dist/angular-multi-step-form.min',
		'angular-form-for': 'bower_components/angular-form-for/dist/form-for',
		'angular-form-for-material': 'bower_components/angular-form-for/dist/form-for.material-templates',
		'tota11y': 'bower_components/tota11y/build/tota11y.min',
		'material-calendar': 'bower_components/material-calendar/dist/angular-material-calendar'
	},
	shim: {
		'jquery': {
			'exports': '$'
		},
		'moment': {
			'exports': 'moment'
		},
		'angular': {
			'exports': 'angular',
			deps: ['jquery']
		},
		'uiRouter': ['angular'],
		'angular-jwt': ['angular'],
		'angular-animate': ['angular'],
		'angular-loading-bar': ['angular'],
		'angularCookie': ['angular'],
		'ng-notify': ['angular'],
		'angular-material': ['angular', 'angular-aria', 'angular-animate'],
		'angular-grid': ['angular'],
		'angular-aria': ['angular'],
		'angular-sanitize': ['angular'],
		'angularBootstrapTpl': ['angular', 'angularBootstrap'],
		'angularBootstrap': ['angular', 'angular-animate'],
		'crAcl': ['angular'],
		'material-calendar': ['angular'],
		'ng-flow': ['angular'],
		'angular-multi-step-form': ['angular'],
		'ng-file-upload-shim': ['angular'],
		'angular-form-for-material': ['angular'],
		'angular-form-for': ['angular', 'angular-form-for-material'],
		'ng-file-upload': ['angular', 'ng-file-upload-shim'],
		'imgLiquid': ['jquery'],
	},
	priority: [
		'angular'
	],
	deps: window.__karma__ ? tests : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base' : '',
	config: {
		moment: {
			noGlobal: true
		}
	}
});

require([
	'angular',
	'app'
], function (angular, app) {
	"use strict";
	angular.element(document.getElementsByTagName('html')[0]);
	angular.element().ready(function () {

		// bootstrap the app manually
		angular.bootstrap(document, ['locloud']);
	});
});
