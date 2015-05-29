'use strict';

define([
	'angular',
	'config/routes',
	'config/stateRoutes',

	'crAcl',
	'uiRouter',

	'angularCookie',
	'angular-loading-bar',
	'angular-material',
	'ng-notify',
	'angularBootstrapTpl',
	'angular-material-components'



], function(angular, $routes, $stateRoutes) {
	angular
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
			'locloud.bien',
			'locloud.locataire',
			'locloud.user',
			'locloud.install'
		])
		.run($stateRoutes)
		.config($routes)
		.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	    	cfpLoadingBarProvider.includeSpinner = false;
		}])
		.config(function($mdThemingProvider) {
	  		$mdThemingProvider.theme('datePickerTheme').primaryPalette('teal');
		})
		.constant('baseUrl', window.location.origin + ':3000');

	angular
		.module("schemaForm")
		.run(["$templateCache", function($templateCache) {
			$templateCache.put("directives/decorators/materialDesign/datepicker.html","<md-input-container class=\"schema-form-{{form.type}} {{form.htmlClass}}\">  <mdc-date-picker model=\"$$value$$\" label=\"{{form.title}}\" dialog-md-theme=\"datePickerTheme\"/>  </md-input-container>\n");
		}]);

	angular
		.module('schemaForm-datepicker', ['schemaForm', 'ngMaterial.components'])
		.config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {
		    var picker = function(name, schema, options) {
		    	if ((schema.type === 'string' || schema.type === 'number') && schema.format == 'datepicker') {
		      		var f = schemaFormProvider.stdFormObj(name, schema, options);
			   		options.lookup[sfPathProvider.stringify(options.path)] = f;
		      		return f;
		    	}
		  	};

		    schemaFormProvider.defaults.string.unshift(picker);

		    schemaFormDecoratorsProvider.addMapping('materialDecorator', 'datepicker', 'directives/decorators/materialDesign/datepicker.html');
		    schemaFormDecoratorsProvider.createDirective('datepicker', 'directives/decorators/materialDesign/datepicker.html');
		}]);

	return angular;
});
