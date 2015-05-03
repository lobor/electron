'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	paths: {
		"text": 'bower_components/requirejs-plugins/lib/text',
		"json": 'bower_components/requirejs-plugins/src/json',
		"angular": 'bower_components/angular/angular',
		"angularMocks": 'bower_components/angular-mocks/angular-mocks',
		"angularUi": 'bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
		"uiRouter": 'bower_components/angular-ui-router/release/angular-ui-router',
		"angularCookie": 'bower_components/angular-cookies/angular-cookies',
		"angular-loading-bar": 'bower_components/angular-loading-bar/build/loading-bar',
		"angular-grid":'bower_components/ag-grid/dist/angularGrid.min',
		"angular-schema-form":'bower_components/angular-schema-form/dist/schema-form.min',
		"angular-sanitize":'bower_components/angular-sanitize/angular-sanitize.min',
		"ObjectPath":'bower_components/objectpath/lib/ObjectPath',
		"tv4":'bower_components/tv4/tv4',
		"bootstrap-decorator":'bower_components/angular-schema-form/dist/bootstrap-decorator',
		"angular-schema-form-datepicker":'bower_components/angular-schema-form-datepicker/bootstrap-datepicker',
		"jquery":'bower_components/jquery/dist/jquery.min',
		"picker":'bower_components/pickadate/lib/picker',
		"pickadate":'bower_components/pickadate/lib/picker.date',
		"angular-notify":'bower_components/angular-notify/dist/angular-notify.min',



		// Form
		// "formsAddSci":"json!controller/sci/forms/addSci"
	},
	shim: {
		'jquery': {
			"exports":"$"
		},
		'angular' : {
			'exports' : 'angular',
			deps:['jquery']
		},
		'uiRouter': ['angular'],
		'angularUi': ['angular'],
		'angular-loading-bar': ['angular'],
		'angularCookie': ['angular'],
		'angular-notify': ['angular'],
		'angular-grid': ['angular'],
		'angular-schema-form-datepicker': ['angular', 'pickadate'],
		'angular-schema-form'  : ['angular', 'angular-sanitize', 'ObjectPath', 'tv4'],
		'bootstrap-decorator'  : ['angular-schema-form'],
		'picker': ['jquery'],
		'pickadate': {
	        deps: ['jquery', 'picker'],
	        exports: 'DatePicker'
	    },
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/app' : '',
});

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['locloud']);
		});
	}
);
