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


		$scope.onSubmit = function(form) {
    		// First we broadcast an event so all fields validate themselves
    		$scope.$broadcast('schemaFormValidate');

    		// Then we check if the form is valid
    		if (form.$valid) {
				var sciData = angular.extend({},$scope.sci);
				sciData.associes = [];
				sciData.date_immatriculation = moment(sciData.date_immatriculation, 'DD/MM/YYYY');
				$http
		      		.post(baseUrl+'/scis', sciData, {withCredentials:true})
		      		.then(function (data, status, headers, config) {
						if(data.status){
							ngNotify.set('La SCI a bien été enregistré', 'success');
						}
						return data;
					}, function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
		      		})
			      	.then(function (response){
						$state.go('locloud.sci');
						console.log(response);
					});


				// $http.
				//     		post(baseUrl+'/scis', $scope.sci, {withCredentials:true}).
				//     		success(function (data, status, headers, config) {
				//
				// 		if(data.status){
				// 			ngNotify.set('La SCI a bien été enregistré', 'success');
				// 			$state.go('locloud.sci');
				// 		}
				//     		})
			    //   	.error(function (data, status, headers, config) {
				// 		ngNotify.set('Une erreur est apparu', 'error');
			    //   	});
    		}
		};
	}
});
