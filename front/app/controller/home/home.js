'use strict';
define([
	'angular',
	'uiRouter'
], function(angular) {
	angular.module('locloud.home', ['ui.router'])
	.controller('HomeController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
		// $http.get(baseUrl+'/auth/api/restricted').
		// success(function(data, status, headers, config){
		// 	// console.log(data, status, headers, config);
		// });
	}]);
});
