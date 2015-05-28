'use strict';
define([
	'angular',
	'json!controller/bien/forms/bien.json',
], function(angular, formBien) {
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', Create];

	function Create($scope, $http, baseUrl, ngNotify, $state){
		$scope = angular.extend($scope, formBien);
		$scope.title = 'Créer un bien';
		$scope.sci = {};


		$scope.onSubmit = function(form) {
    		// First we broadcast an event so all fields validate themselves
    		$scope.$broadcast('schemaFormValidate');

    		// Then we check if the form is valid
    		if (form.$valid) {
				$http.
		      		post(baseUrl+'/sci/create', $scope.sci, {withCredentials:true}).
		      		success(function (data, status, headers, config) {

						if(data.status){
							ngNotify.set('La SCI a bien été enregistré', 'success');
							$state.go('locloud.sci');
						}
		      		})
			      	.error(function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
			      	});
    		}
		};
	}
});
