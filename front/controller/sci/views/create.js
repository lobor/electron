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
    		if (form.$valid) {
				var sciData = angular.extend({},$scope.sci);
				sciData.date_immatriculation = moment(sciData.date_immatriculation, 'DD MMMM YYYY');

				angular.forEach(sciData.associes, function(associe, key){
					sciData.associes[key].birthday = moment(associe.birthday, 'DD MMMM YYYY');

				});

				$http
		    		.post(baseUrl+'/scis', sciData)
		    		.then(function (data, status, headers, config) {
							if(data.data.sci){
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
						if(response.data.sci){
							$state.go('locloud.sci');
						}
					});
    		}
		};
	}
});
