define([
	'angular',
], function(angular) {
	'use strict';
	return ['$scope', '$rootScope', 'AuthService', '$state', LoginController];

	function LoginController($scope, $rootScope, AuthService, $state){
		$rootScope.login = 'login';
		$scope.user = {email: 'lionel.bertrand@ymail.com'};
  		$scope.message = '';

		$scope.submit = function () {
			$scope.message = '';
			var test = AuthService.post($scope.user);
			$
				.when(test)
				.done(function(resultAuth){
					if(resultAuth === true){
						$state.go('locloud.home',null,{
							reload: true, notify: true
						});
					}
					else{
						$scope.message = resultAuth;
					}
				});
		};
	}
});
