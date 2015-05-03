'use strict';
define([
	'angular',
	'uiRouter',
], function(angular) {
	angular.module('locloud.menu', ['ui.router']).
	controller('MenuController', ['$scope', '$state',function($scope, $state) {
		var cookie = '';
		var name =  "Auth=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) cookie =  c.substring(name.length,c.length);
		}

		$scope.style = 'display: none;';
		if(cookie){
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
		}

		// $scope.logout = function () {
		// 	console.log(3);
		// };
	}]);
});
