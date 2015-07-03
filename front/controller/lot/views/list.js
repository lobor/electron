'use strict';
define([
	'angular',
	'text!controller/lot/templates/menuRow.html',
	'controller/lot/views/showMenuRow'
], function(angular, menuRowTpl, ShowMenuRowController) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', '$mdBottomSheet', List];

	function List($scope, $http, baseUrl, ngNotify, $state, $mdBottomSheet){
		$scope.gridOptions = {
			columnDefs: [
				{
					displayName: "Identifiant",
					field: "identifiant",
				},
				{
					displayName: "Sci",
					field: "sci",
				},{
					displayName: "Bien",
					field: "bien",
				},
				{
					displayName: "",
					width:'88px',
					cellStyle:{
						flex: 'initial'
					},
					cellRenderer: function(params){
						var element = '<a class="md-button" ng-click="menuRow(data)"><i class="mdi mdi-dots-horizontal"></i></a>';
						params.$scope.menuRow = function(data){
							$mdBottomSheet.show({
						      	template: menuRowTpl,
						      	controller: ShowMenuRowController,
								locals: {
									id: data.id,
									lot: data.identifiant
								}
						    });
						};
						return element;
					},
					cellClass: ['colButton']
				}
			],
			rowData: null,
			enableSorting: true,
			angularCompileRows: true
		};

		$http
			.get(baseUrl+'/lots', {params:{fields:'identifiant,sci,bien'}})
			.success(function (data, status, headers, config) {
				$scope.gridOptions.rowData =  data.lots;
				$scope.gridOptions.api.onNewRows();
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
