'use strict';
define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'moment'
], function(angular, sciForm, moment) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', Create];

	function Create($scope, $http, baseUrl, ngNotify, $state){
		$scope = angular.extend($scope, sciForm);
		$scope.title_form_sci = 'Créer une SCI';
		$scope.sci = {};

		$scope.onSubmit = Submit;

		function Submit(form) {
    		// First we broadcast an event so all fields validate themselves
    		$scope.$broadcast('schemaFormValidate');
    		// Then we check if the form is valid
    		if (form.$valid) {
				var sciData = angular.extend({},$scope.sci);

				// sciData.associes = [];
				sciData.date_immatriculation = moment(sciData.date_immatriculation, 'DD MMMM YYYY', 'fr');
				$http
		    		.post(baseUrl+'/scis', sciData, {withCredentials:true})
		    		.then(function (data, status, headers, config) {
						if(data.data.status){
							ngNotify.set('La SCI a bien été enregistré', 'success');
						}
						else{
							ngNotify.set('Une erreur est apparu', 'error');
						}
						return data;
					}, function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
						return false;
				    		})
			      	.then(function (response){
						if(response.data.status){
							$state.go('locloud.sci');
						}
					});
    		}
		};
	}
});
