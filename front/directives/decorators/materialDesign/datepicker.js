'use strict';
define([
	'angular',
	'uiRouter',

	'angular-schema-form-material',
	'angular-schema-form-material'
], function(angular) {
	angular
		.module("schemaForm")
		.run(["$templateCache", function($templateCache) {
			$templateCache.put("directives/decorators/materialDesign/datepicker.html","<md-input-container class=\"schema-form-{{form.type}} {{form.htmlClass}}\">  <mdc-date-picker  aria-label model=\"$$value$$\" label=\"{{form.title}}\" locale=\"fr\" dialog-md-theme=\"datePickerTheme\"/>  </md-input-container>\n");
			$templateCache.put("decorators/material/select.html","<md-select ng-model=\"$$value$$\" placeholder=\"{{form.title}}\" ><md-option ng-repeat=\"item in form.titleMap\" value=\"{{item.value}}\">{{item.name}}</md-option></md-select>");
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

			moment.locale('fr');

		    schemaFormProvider.defaults.string.unshift(picker);

		    schemaFormDecoratorsProvider.addMapping('materialDecorator', 'datepicker', 'directives/decorators/materialDesign/datepicker.html');
		    schemaFormDecoratorsProvider.createDirective('datepicker', 'directives/decorators/materialDesign/datepicker.html');
		}]);
});
