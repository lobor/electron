'use strict';
define([
	'angular',
	'uiRouter',
], function(angular) {
	angular.module('locloud.menu', ['ui.router']).
	controller('MenuController', ['$scope', '$state', '$window', function($scope, $state, $window) {
		$scope.style = 'display: none;';
		$scope.menus = [
			{
				'url':'locloud.home',
				'name':'Acceuil'
			},
			{
				'url':'locloud.sci',
				'name':'SCI'
			},
			{
				'url':'locloud.logout',
				'name':'Se deconnecter'
			}
		];
		$scope.style = '';

		// $scope.logout = function () {
		// 	console.log(3);
		// };
	}]);
});
