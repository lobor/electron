'use strict';
define([
	'angular',
], function(angular) {
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', List];

	function List($scope, $http, baseUrl, $state, ngNotify){
		$scope.gridOptions = {
			columnDefs: [
				{
					displayName: "SCI",
					field: "name",
				}
			],
			rowData: null,
			rowSelection: 'single',
			enableSorting: true,
			rowSelected:function(row){
				$state.go('locloud.sci.edit',{id:row.id});
			}
		};

		$http.
			get(baseUrl+'/scis',{params:{fields:'name'}})
			.success(function (data, status, headers, config) {
				$scope.gridOptions.rowData =  data.scis;
				$scope.gridOptions.api.onNewRows();
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
