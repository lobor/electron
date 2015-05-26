'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$http', 'baseUrl', '$state', VerifController];

	function VerifController($scope, $http, baseUrl, $state){
		$scope.listChek = [
			{
				'key':'user',
				'message':'Verification si aucun utilisateur créé',
				'icon':'spinner',
				'badge':'info'
			}
		];

			$http
				.get(baseUrl+'/install/verif')
				.then(function(data, status, headers){
					if(data.status){
						$scope.listChek[0].icon = 'check';
						$scope.listChek[0].badge = 'success';
					}
					else{
						$scope.listChek[0].icon = 'remove';
						$scope.listChek[0].badge = 'danger';
					}

				}, function(error){
					console.log('error');
				})
				.then(function(data, status, headers){
					$state.go('install.createUser');

				}, function(error){
					console.log('error');
				});


	};
});
