'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$state', '$http', 'baseUrl', 'ngNotify', List];

	function List($scope, $state, $http, baseUrl, ngNotify){
		$scope.gridUsers = {
			columnDefs: [
				{
					displayName: "Prénom",
					field: "prenom",
				},
				{
					displayName: "Nom",
					field: "nom",
				},
				{
					displayName: "Email",
					field: "email",
				},
			],
			rowData: null,
			rowSelection: 'single',
			enableSorting: true,
			rowSelected:function(row){
				$state.go('locloud.user.edit',row);
			}
		};

		$http.get(baseUrl+'/users',{params:{fields:'nom,prenom,email'}})
			.success(function(data, status, headers, config){
				$scope.gridUsers.rowData =  data.users;
				$scope.gridUsers.api.onNewRows();
			})
			.error(function(){
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
