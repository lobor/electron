'use strict';
define([
	'angular',
], function(angular) {
	angular.module('locloud.menu', ['cr.acl']).
	controller('MenuController', ['$scope', '$state', '$window', 'crAcl', '$mdUtil', '$mdSidenav', MenuController]);


	function MenuController($scope, $state, $window,crAcl, $mdUtil){
		$scope.style = 'display: none;';
		$scope.menus = [
			{
				'url':'locloud.home',
				'icon':'fa-home',
				'name':'Acceuil',
				'acl':'ROLE_USER,ROLE_ADMIN',
				'background':'#E94B3B'
			},
			{
				'url':'locloud.sci',
				'icon':'fa-institution',
				'name':'SCI',
				'acl':'ROLE_USER,ROLE_ADMIN',
				'background':'#F98E33'
			},
			{
				'url':'locloud.lot',
				'icon':'fa-building',
				'name':'Lots',
				'acl':'ROLE_USER,ROLE_ADMIN',
				'background':'#FFB61C'
			},
			{
				'url':'locloud.locataire',
				'icon':'fa-users',
				'name':'Locataires',
				'acl':'ROLE_USER,ROLE_ADMIN',
				'background':'#23AE89'
			},
			{
				'url':'locloud.user',
				'icon':'fa-user',
				'name':'Utilisateurs',
				'acl':'ROLE_ADMIN',
				'background':'#449DD5'
			}
		];
		$scope.style = '';
		
	}
});
