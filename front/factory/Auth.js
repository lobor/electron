define([
	'angular',
	'jquery'
], function(angular, $) {
	'use strict';
	return ['baseUrl', '$http', '$window', 'crAcl', function(baseUrl, $http, $window, crAcl){
			return {
				post: postAuth
			};
			function postAuth (param){
				var defer = $.Deferred();
			    $http
		      		.post(baseUrl+'/login', param)
		      		.success(function (data, status, headers, config) {
						if(data.status){
							localStorage.setItem('id_token', data.token);

							crAcl.setRole(data.role);

							$window.sessionStorage.setItem('role', data.role);
							defer.resolve(true);
						}
						else{
							// console.log(data.msg);
							defer.resolve(data.msg);
						}
		      		})
			      	.error(function (data, status, headers, config) {
						defer.resolve('Utilisateur non enregistré');
			      	});
				return defer.promise();
			}
		}];
});
