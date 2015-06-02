'use strict';
define([
	'angular',
	'json!controller/Locataire/forms/addSci.json',
	'angular-grid',
	'ng-notify',
], function(angular, formSci) {
	angular.module('locloud.locataire', ['ui.router','angularGrid','schemaForm', 'ngNotify'])
	.controller('LocataireMenuController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
		$scope.menus = [
			{
				'name':'Creer un locataire',
				'state':'locloud.sci.create'
			}
		];
	}])
	.controller('LocataireMenuCreateController', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {

	}])
	.controller('LocataireListController', ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', function($scope, $http, baseUrl, $state, ngNotify) {
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
			ngNotify.set('Une erreur est apparu', 'error');
		});
	}])
	.controller('LocataireCreateController', ['$scope', '$http', 'baseUrl', '$state', function($scope, $http, baseUrl, $state) {
		$scope = angular.extend($scope, formSci);
		$scope.title_form_sci = 'Créer une SCI';
		$scope.sci = {};


		$scope.onSubmit = function(form) {
    		// First we broadcast an event so all fields validate themselves
    		$scope.$broadcast('schemaFormValidate');

    		// Then we check if the form is valid
    		if (form.$valid) {
				$http.
		      		post(baseUrl+'/sci/create', $scope.sci).
		      		success(function (data, status, headers, config) {

						if(data.status){
							$state.go('locloud.sci');
						}
		      		})
			      	.error(function (data, status, headers, config) {
			      	});
    		}
		};
	}])
	.controller('LocataireEditController', ['$scope', '$http', 'baseUrl', '$state', '$stateParams', function($scope, $http, baseUrl, $state, $stateParams) {
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

			$scope.deleteUser = function(modelValue,form){
				console.log(modelValue,form);
				var dlg = dialogs.confirm('Confirmation demandé', 'Êtes vous sûr de vouloir supprimer cet associé ?');
					dlg.result.then(function(btn){
					});
			};

			$scope.onSubmit = function(form) {
	    		// First we broadcast an event so all fields validate themselves
	    		$scope.$broadcast('schemaFormValidate');

	    		// Then we check if the form is valid
	    		if (form.$valid) {
					$http.
		      		post(baseUrl+'/sci/update', $scope.sci, {withCredentials:true}).
		      		success(function (data, status, headers, config) {
						if(data.status){
							// notify({ message:'La SCI a bien été enregistré', classes:'alert-success'} );
						}
		      		})
			      	.error(function (data, status, headers, config) {
						// notify({ message:'Une erreur est apparu', classes:'alert-danger'} );
			      	});
	    		}
			};
	}]);
});
