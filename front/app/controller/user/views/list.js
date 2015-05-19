'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$state', '$http', 'baseUrl', 'ngNotify', List];

	function List($scope, $state, $http, baseUrl, ngNotify){
		$scope.gridUsers = {
			columnDefs: [
				{
					displayName: "Id",
					field: "id",
				},
				{
					displayName: "Utilisateurs",
					field: "name",
				}
			],
			rowData: null,
			rowSelection: 'single',
			enableSorting: true,
			rowSelected:function(row){
				$state.go('locloud.user.edit',row);
			}
		};

		$http.get(baseUrl+'/users')
			.success(function(data, status, headers, config){
				$scope.gridUsers.rowData =  data.users;
				$scope.gridUsers.api.onNewRows();
			})
			.error(function(){
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
