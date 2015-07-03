'use strict';
define([
	'angular',
	'text!controller/sci/templates/menuRow.html',
	'controller/sci/views/showMenuRow'
], function(angular, menuRowTpl, ShowMenuRowController) {
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', '$mdBottomSheet', List];

	function List($scope, $http, baseUrl, $state, ngNotify, $mdBottomSheet){
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
						      	controller: ShowMenuRowController,
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

		$http
			.get(baseUrl+'/scis',{params:{fields:'name,associes'}})
			.success(function (data, status, headers, config) {
				angular.forEach(data.scis,function(sci, key){
					data.scis[key].nbAssocies = data.scis[key].associes.length
				});
				// data.scis.nbAssocies = data.scis.associes.length;
				$scope.gridOptions.rowData =  data.scis;
				$scope.gridOptions.api.onNewRows();
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
