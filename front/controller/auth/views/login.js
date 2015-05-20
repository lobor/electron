'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$http', '$window', 'baseUrl', '$rootScope', '$state', 'crAcl', LoginController];

	function LoginController($scope, $http, $window, baseUrl, $rootScope, $state, crAcl){
		$rootScope.login = 'login';
		$scope.user = {email: 'lionel.bertrand@ymail.com'};
  		$scope.message = '';

		$scope.submit = function () {
			$scope.message = '';
			$scope.styleAlert = '';
		    $http
	      		.post(baseUrl+'/login', $scope.user, {withCredentials:true})
	      		.success(function (data, status, headers, config) {
					if(!data.error){
						crAcl.setRole(data.user.role);

						$window.sessionStorage.setItem('role',data.user.role);

						$state.go('locloud.home',null,{
						  reload: true, notify: true
						});
					}
					else{
						switch(data.errorCode){
							// 001 => not password or email
							case '001':
								$scope.message = 'Champs email et mot de passe obligatoires';
								$scope.styleAlert = 'alert alert-danger';
								break;

							// 002 => email not find
							case '002':
								$scope.message = 'Aucun compte associé à cet email';
								$scope.styleAlert = 'alert alert-danger';
								break;

							// 003 => password incorrect
							case '003':
								$scope.message = 'Mot de passe incorrect';
								$scope.styleAlert = 'alert alert-danger';
								break;
						}
					}
	      		})
		      	.error(function (data, status, headers, config) {
			        // Erase the token if the user fails to log in
			        // delete $window.sessionStorage.token;

			        // Handle login errors here
			        $scope.message = 'Error: Invalid user or password';
		      	});
		};
	}
});
