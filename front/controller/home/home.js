define([
	'angular',
	'material-calendar'
], function(angular) {
	'use strict';
	angular.module('locloud.home', ['materialCalendar'])
		.controller('HomeController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
			$scope.$on("md-calendar.date.click", function(date) {
				console.log(date);
			});
		}]);
});
