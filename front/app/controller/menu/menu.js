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
				'icon':'fa-home',
				'name':'Acceuil'
			},
			{
				'url':'locloud.sci',
				'icon':'fa-institution',
				'name':'SCI'
			},
			{
				'url':'locloud.bien',
				'icon':'fa-building',
				'name':'Biens'
			},
			{
				'url':'locloud.locataire',
				'icon':'fa-users',
				'name':'Locataires'
			}
		];
		$scope.style = '';

		// $scope.logout = function () {
		// 	console.log(3);
		// };
	}]);
});
