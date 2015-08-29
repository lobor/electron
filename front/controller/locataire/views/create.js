define([
	'angular',
	'json!controller/locataire/forms/locataire.json',
	'jquery'
], function (angular, formLocataire, $) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', '$element', Create];

	function Create ($scope, $http, baseUrl, $state, ngNotify, $element) {
		$scope.validation = formLocataire;
		$scope.typeOption = [{
				"value": "Particulier",
				"label": "Particulier"
			},
			{
				"value": "Société / Autre",
				"label": "Société / Autre"
			}];
		$scope.civiliteOption = [{
			"value": "mlle",
			"label": "Mlle"
			},
			{
				"value": "mme",
				"label": "Mme"
			},
			{
				"value": "m",
				"label": "M."
			}];
		$scope.locataire = {};
  }
});
