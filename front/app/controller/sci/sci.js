'use strict';
define([
	'angular',
	'json!controller/sci/forms/addSci.json',
	'uiRouter',
	'angular-grid',
	'ObjectPath',
	'angular-schema-form',
	'bootstrap-decorator',
	'angular-schema-form-datepicker',
	'angular-notify',
], function(angular, formSci) {
	angular.module('locloud.sci', ['ui.router','angularGrid','schemaForm', 'cgNotify'])
	.controller('SciMenuController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
		$scope.menus = [
			{
				'name':'Creer une SCI',
				'state':'locloud.sci.create'
			}
		];
	}])
	.controller('SciMenuCreateController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {

	}])
	.controller('SciListController', ['$scope', '$http', 'baseUrl', '$state', 'notify', function($scope, $http, baseUrl, $state, notify) {
		$scope.gridOptions = {
			columnDefs: [
				{
					displayName: "Id",
					field: "_id",
				},
				{
					displayName: "SCI",
					field: "name",
				}
			],
			rowData: null,
			rowSelection: 'single',
			enableSorting: true,
			rowSelected:function(row){
				$state.go('locloud.sci.edit',{id:row._id});
			}
		};
		$http.
		get(baseUrl+'/sci/list').
		success(function (data, status, headers, config) {
			$scope.gridOptions.rowData =  data.results;
			$scope.gridOptions.api.onNewRows();
		})
		.error(function (data, status, headers, config) {
			notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
		});
	}])
	.controller('SciCreateController', ['$scope', '$http', 'baseUrl', 'notify', '$state', function($scope, $http, baseUrl, notify, $state) {
		$scope = angular.extend($scope, formSci);
		$scope.title_form_sci = 'Créer une SCI';
		$scope.sci = {};


		$scope.onSubmit = function(form) {
    		// First we broadcast an event so all fields validate themselves
    		$scope.$broadcast('schemaFormValidate');

    		// Then we check if the form is valid
    		if (form.$valid) {
				$http.
		      		post(baseUrl+'/sci/create', $scope.sci, {withCredentials:true}).
		      		success(function (data, status, headers, config) {

						if(data.status){
							notify({ message:'La SCI a bien été enregistré', classes:'alert-success'} );
							$state.go('locloud.sci');
						}
		      		})
			      	.error(function (data, status, headers, config) {
						notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
			      	});
    		}
		};
	}])
	.controller('SciEditController', ['$scope', '$http', 'baseUrl', 'notify', '$state', '$stateParams', function($scope, $http, baseUrl, notify, $state, $stateParams) {
		$scope.title_form_sci = 'Éditer une SCI';
		$http.
			get(baseUrl+'/sci/get', {params:$stateParams}, {withCredentials:true}).
			success(function (data, status, headers, config) {

				if(data.status){
					// console.log(data.results);
					$scope = angular.extend($scope, formSci);
					$scope.sci = data.results;
					// console.log($scope.sci = {});
				}
			})

			.error(function (data, status, headers, config) {
				notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
			});


			$scope.onSubmit = function(form) {
	    		// First we broadcast an event so all fields validate themselves
	    		$scope.$broadcast('schemaFormValidate');

	    		// Then we check if the form is valid
	    		if (form.$valid) {
					$http.
		      		post(baseUrl+'/sci/update', $scope.sci, {withCredentials:true}).
		      		success(function (data, status, headers, config) {
						if(data.status){
							notify({ message:'La SCI a bien été enregistré', classes:'alert-success'} );
						}
		      		})
			      	.error(function (data, status, headers, config) {
						notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
			      	});
	    		}
			};
	}]);
});
