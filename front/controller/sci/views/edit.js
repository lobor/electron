'use strict';
define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'moment'
], function(angular, formSci) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', '$stateParams', Edit];

	function Edit($scope, $http, baseUrl, ngNotify, $state, $stateParams, dialogs) {
		$scope.title_form_sci = 'Éditer une SCI';
		$http
			.get(baseUrl+'/scis/'+$stateParams.id)
			.success(function (data, status, headers, config) {
				console.log(data)
				if(data.sci){
					$scope = angular.extend($scope, formSci);
					$scope.sci = data.sci;
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
					});
			};

			$scope.onSubmit = function(form) {
	    		$scope.$broadcast('schemaFormValidate');
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
