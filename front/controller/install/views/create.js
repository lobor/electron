'use strict';
define([
	'angular',
	'json!controller/user/forms/user.json',
], function(angular, userForm) {
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', CreateController];

	function CreateController($scope, $http, baseUrl, $state, ngNotify){
		// Active la validation de la confirmation du mot de passe
		userForm.form[0].items[4].validationMessage = {'notMatch': "Les mots de passe de correspondent pas"};
		userForm.form[0].items[4].$validators = {
			notMatch: function(value) {
	        	if ($scope.user.password != value) {
	          		return false;
	        	}
	        	return true
	      	}
		};




		$scope = angular.extend($scope, userForm);
		$scope.user = {};

		$scope.onSubmit = function(form) {
    		// First we broadcast an event so all fields validate themselves
    		$scope.$broadcast('schemaFormValidate');

    		// Then we check if the form is valid
    		if (form.$valid) {

				var data = angular.extend({}, $scope.user);
				delete data.password_confirm;

				$http
	    			.post(baseUrl+'/install/create', data)
		    		.success(function (data, status, headers, config) {
						if(data.user){
							ngNotify.set('L\'utilisateur a bien été enregistré', 'success');
							$state.go('locloud.user');
						}
						else{
							ngNotify.set('Une erreur est apparu', 'error');
						}
		    		})
		      	.error(function (data, status, headers, config) {
							ngNotify.set('Une erreur est apparu', 'error');
		      	});
    		}
		};
	};
});
