define([
	'angular',
], function(angular) {
	'use strict';
	return ['$scope', '$http', '$window', 'baseUrl', '$rootScope', '$state', /*'crAcl',*/ LoginController];

	function LoginController($scope, $http, $window, baseUrl, $rootScope, $state/*, crAcl*/){
		$rootScope.login = 'login';
		$scope.user = {email: 'lionel.bertrand@ymail.com'};
  		$scope.message = '';

		$scope.submit = function () {
			$scope.message = '';
			$scope.styleAlert = '';
		    $http
	      		.post(baseUrl+'/login', $scope.user)
	      		.success(function (data, status, headers, config) {
					if(data.status){
						localStorage.setItem('id_token', data.token);

						// crAcl.setRole(data.role);

						$window.sessionStorage.setItem('role', data.role);

						$state.go('locloud.home',null,{
						  reload: true, notify: true
						});
					}
					else{
						$scope.message = data.msg;
					}
	      		})
		      	.error(function (data, status, headers, config) {
			        $scope.message = 'Utilisateur non enregistré';
		      	});
		};
	}
});
