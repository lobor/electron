'use strict';
define([
	'angular',
	'uiRouter'
], function(angular) {
	angular.module('locloud.error500', ['ui.router'])
	.controller('Error500Controller', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
		// $http.get(baseUrl+'/auth/api/restricted').
		// success(function(data, status, headers, config){
		// 	// console.log(data, status, headers, config);
		// });
	}]);
});
