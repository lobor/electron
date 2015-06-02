'use strict';
define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'moment'
], function(angular, formSci) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', '$stateParams', Edit];

	function Edit($scope, $http, baseUrl, ngNotify, $state, $stateParams, dialogs) {
		$scope.title_form_sci = 'Éditer une SCI';
		$scope = angular.extend($scope, formSci);
		$http
			.get(baseUrl+'/scis/'+$stateParams.id)
			.success(function (data, status, headers, config) {
				if(data.sci){
					$scope.sci = data.sci;
				}
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});


			$scope.onSubmit = function(form) {
	    		$scope.$broadcast('schemaFormValidate');
	    		if (form.$valid) {
					var href = $scope.sci.href;
					delete $scope.sci.href;
					delete $scope.sci.id;

					angular.forEach($scope.sci.associes, function(associe, key){
						$scope.sci.associes[key].birthday = moment(associe.birthday, 'DD MMMM YYYY');
					});

					$http
			      		.post(baseUrl+'/'+href, $scope.sci)
			      		.success(function (data, status, headers, config) {
							if(data.sci){
								$scope.sci = data.sci;
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
