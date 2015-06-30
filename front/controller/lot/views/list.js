'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', List];

	function List($scope, $http, baseUrl, $state, ngNotify){
		$scope.gridOptions = {
			columnDefs: [
				{
					displayName: "Id",
					field: "_id",
				},
				{
					displayName: "Lot",
					field: "name",
				}
			],
			rowData: null,
			rowSelection: 'single',
			enableSorting: true,
			rowSelected:function(row){
				$state.go('locloud.lot.edit',{id:row._id});
			}
		};

		$http
			.get(baseUrl+'/lots')
			.success(function (data, status, headers, config) {
				$scope.gridOptions.rowData =  data.results;
				$scope.gridOptions.api.onNewRows();
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
