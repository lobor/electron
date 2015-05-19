'use strict';
define([
	'angular',
	'json!controller/user/forms/user.json',
], function(angular, userForm) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$stateParams', Edit];

	function Edit($scope, $http, baseUrl, ngNotify, $stateParams){
		$scope.title_form_user = 'Edition d\'un utilisateur';
		$http
			.get(baseUrl+'/users/'+$stateParams.id)
			.success(function (data, status, headers, config) {

				if(!data.error){
					$scope = angular.extend($scope, userForm);
					$scope.user = data.user;
				}
				else{
					ngNotify.set('Une erreur est apparu', 'error');
				}
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
