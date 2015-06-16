'use strict';
define([
	'angular',
], function(angular) {
	angular.module('locloud.menu', ['cr.acl']).
	controller('MenuController', ['$scope', '$state', '$window', 'crAcl', MenuController]);


	function MenuController($scope, $state, $window,crAcl){
		$scope.style = 'display: none;';
		$scope.menus = [
			{
				'url':'locloud.home',
				'icon':'fa-home',
				'name':'Acceuil',
				'acl':'ROLE_USER,ROLE_ADMIN'
			},
			{
				'url':'locloud.sci',
				'icon':'fa-institution',
				'name':'SCI',
				'acl':'ROLE_USER,ROLE_ADMIN'
			},
			{
				'url':'locloud.lot',
				'icon':'fa-building',
				'name':'Lots',
				'acl':'ROLE_USER,ROLE_ADMIN'
			},
			{
				'url':'locloud.locataire',
				'icon':'fa-users',
				'name':'Locataires',
				'acl':'ROLE_USER,ROLE_ADMIN'
			},
			{
				'url':'locloud.user',
				'icon':'fa-user',
				'name':'Utilisateurs',
				'acl':'ROLE_ADMIN'
			}
		];
		$scope.style = '';
	}
});
