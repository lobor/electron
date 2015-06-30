define([
	'angular',
	'json!controller/lot/forms/lot.json'
], function (angular, formLot) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', Create];

	function Create ($scope, $http, baseUrl, $state, ngNotify) {
		angular.forEach(formLot.form[0].items, function(item, key){
			if(item.key[0] === 'sci'){
				formLot.form[0].items[key].onChange = function(modelValue,form){
					console.log("Password is",modelValue);
				};
			}
		});

		$scope = angular.extend($scope, formLot);
		$scope.title = 'Créer un lot';
		$scope.lot = {};
		$http
			.get(baseUrl+'/scis', {
				params: {
					fields:'name,sci',
					action: 'bien'
				}
			})
			.success(function (data, status, headers, config) {
				var arraySci = [];
				var arraySciTest = [];
				var arrayBien = {};

				angular.forEach(data.biens, function(bien){
					if(!arrayBien[bien.sci.id]){
						arrayBien[bien.sci.id] = [];
					}

					arrayBien[bien.sci.id].push({
						value: bien.id,
						name: bien.name,
					});

					if(arraySciTest.indexOf(bien.sci.id) === -1){
						arraySciTest.push(bien.sci.id);
						arraySci.push({
							value: bien.sci.id,
							name: bien.sci.name,
						});
					}
				});

				angular.forEach($scope.form[0].items, function(item, key){
					if(item.key[0] === 'sci'){
						$scope.form[0].items[key].titleMap = arraySci;
						$scope.form[0].items[key].onChange = function(modelValue,form){
							console.log("Password is",modelValue);

						};
						// console.log($scope.form[0].items[key]);
					}
				});

				$scope.$broadcast('schemaFormRedraw');
			})
			.error(function (data, status, headers, config) {
				ngNotify.set('Une erreur est apparu', 'error');
			});
  }
});
