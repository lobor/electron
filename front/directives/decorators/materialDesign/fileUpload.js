'use strict';
define([
	'angular',
	'text!directives/decorators/materialDesign/templates/fileUpload.html',
	'angular-schema-form'
], function (angular, fileUploadTpl) {
	angular
		.module('schemaForm')
		.run(['$templateCache', function ($templateCache) {
			$templateCache.put("directives/decorators/bootstrap/upload/file_upload.html", fileUploadTpl);
		}]);

	angular
		.module('schemaForm-file-upload', ['schemaForm', 'mgcrea.ngStrap'])
		.config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
				// Add to the bootstrap directive
				schemaFormDecoratorsProvider.addMapping('materialDecorator', 'file_upload', 'directives/decorators/bootstrap/upload/file_upload.html');
				schemaFormDecoratorsProvider.createDirective('file_upload', 'directives/decorators/bootstrap/upload/file_upload.html');
			}])
		.directive('thumbnail', ['$compile', function ($compile) {
			return {
				restrict: 'AE',
				template: '<div imgLiquid data-fill="true" ng-model="imgLiquid"><img src="" /></div>',
				link: function (scope, element, attributes) {

					var reader  = new FileReader();
					var file = scope.file;
					reader.onloadend = function () {
						scope.imgLiquid = reader.result;
						element.find('img').attr('src', reader.result);
					};

					if (file) {
						reader.readAsDataURL(file);
					}
				}
			};
		}]);
});
