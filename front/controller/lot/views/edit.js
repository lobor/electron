'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', '$stateParams', Edit];

	function Edit($scope, $http, baseUrl, ngNotify, $state, $stateParams, dialogs){
		$scope.title_form_sci = 'Éditer une SCI';
		$http.
			get(baseUrl+'/sci/get', {params:$stateParams}, {withCredentials:true}).
			success(function (data, status, headers, config) {

				if(data.status){
					// console.log(data.results);
					$scope = angular.extend($scope, formSci);
					$scope.sci = data.results;
					// console.log($scope.sci = {});
				}
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});

			$scope.deleteUser = function(modelValue,form){
				console.log(modelValue,form);
				var dlg = dialogs.confirm('Confirmation demandé', 'Êtes vous sûr de vouloir supprimer cet associé ?');
					dlg.result.then(function(btn){
						console.log(this);
						// $http.
						// 	post(baseUrl+'/sci/suppAssocie', {params:$stateParams}, {withCredentials:true}).
						// 	success(function (data, status, headers, config) {
						//
						// 		if(data.status){
						// 			// console.log(data.results);
						// 			$scope = angular.extend($scope, formSci);
						// 			$scope.sci = data.results;
						// 			// console.log($scope.sci = {});
						// 		}
						// 	})
						// 	.error(function (data, status, headers, config) {
						// 		notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
						// 	});
					});
				// $http.
				// 	get(baseUrl+'/sci/get', {params:$stateParams}, {withCredentials:true}).
				// 	success(function (data, status, headers, config) {
				//
				// 		if(data.status){
				// 			// console.log(data.results);
				// 			$scope = angular.extend($scope, formSci);
				// 			$scope.sci = data.results;
				// 			// console.log($scope.sci = {});
				// 		}
				// 	})
				// 	.error(function (data, status, headers, config) {
				// 		notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
				// 	});
			};

			$scope.onSubmit = function(form) {
	    		// First we broadcast an event so all fields validate themselves
	    		$scope.$broadcast('schemaFormValidate');

	    		// Then we check if the form is valid
	    		if (form.$valid) {
					$http.
		      		post(baseUrl+'/sci/update', $scope.sci, {withCredentials:true}).
		      		success(function (data, status, headers, config) {
						if(data.status){
							ngNotify.set('La SCI a bien été enregistré', 'success');
						}
		      		})
			      	.error(function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
			      	});
	    		}
			};
	}
});
