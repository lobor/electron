define([
	'angular',
	'text!decoratorForm/formFor/material/templates/file-field.html',
	'angular-form-for'
], function(angular, fileTemplate) {
	'use strict';
	angular
		.module('formFor')
		.directive('fileField', ['FieldHelper', function(FieldHelper){
		  	return {
				require: '^formFor',
				restrict: 'EA',
			    template: fileTemplate,
				scope: {
					attribute: '@',
					debounce: '@?',
					disable: '=',
					focused: '&?',
					blurred: '&?',
					help: '@?',
					iconAfterClicked: '&?',
					iconBeforeClicked: '&?',
					placeholder: '@?',
					rows: '=?'
				},
				link: function($scope, $element, $attributes, formForController, $log, $timeout, $document){
					var $document_ = $document;
		            var $log_ = $log;
		            var $timeout_ = $timeout;
		            var fieldHelper_ = FieldHelper;
					if (!$scope.attribute) {
		                $log_.error('Missing required field "attribute"');
		                return;
		            }
		            // Expose textField attributes to textField template partials for easier customization (see issue #61)
		            $scope.attributes = $attributes;
					$scope.labelButton = $attributes.labelButton;
		            $scope.tabIndex = $attributes.tabIndex || 0;
		            if ($attributes.hasOwnProperty('autofocus')) {
		                $timeout_(function () {
		                    $element.find($scope.multiline ? 'textarea' : 'input')[0].focus();
		                });
		            }
		            fieldHelper_.manageLabel($scope, $attributes, false);
		            fieldHelper_.manageFieldRegistration($scope, $attributes, formForController);
				}
			};
		}])
		.directive('thumbnail', ['$compile', function ($compile) {
			return {
				restrict: 'AE',
				template: '<div imgLiquid data-fill="true" ng-model="imgLiquid"><img src="" /></div>',
				link: function (scope, element, attributes) {
					var file = scope.file;
					var modelParent = scope.$parent.$parent;
					if(!modelParent.photo){
						modelParent.photo = [];
					}

					modelParent.photo.push(file);
					var reader  = new FileReader();
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
