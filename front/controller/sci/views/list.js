define([
	'angular',
	'text!controller/sci/templates/menuRow.html'
], function(angular, menuRowTpl) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', '$mdBottomSheet', 'SciService', List];

	function List($scope, $http, baseUrl, $state, ngNotify, $mdBottomSheet, SciService){
		$scope.gridOptions = {
			columnDefs: [
				{
					displayName: "SCI",
					field: "name",
				},
				{
					displayName: "Nombre d'associés",
					field: "nbAssocies",
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
						      	controller: 'ShowMenuRowController',
								locals: {
									id: data.id,
									sci: data.name
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

		var sciDefered = SciService.getList();
		$
			.when(sciDefered)
			.done(function(resultSci){
				$scope.gridOptions.rowData =  resultSci.scis;
				$scope.gridOptions.api.onNewRows();
			});
	}
});
