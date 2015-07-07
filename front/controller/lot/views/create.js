define([
	'angular',
	'json!controller/lot/forms/lot.json',
	'jquery'
], function (angular, formLot, $) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', '$element', Create];

	function Create ($scope, $http, baseUrl, $state, ngNotify, $element) {
		$scope.lot = {};
		$scope.validation = formLot;
		$scope.disable = true;
		$scope.title = 'Créer un lot';
		$http
			.get(baseUrl+'/scis', {
				params: {
					fields:'name',
				}
			})
			.success(function(data, status, headers){
				$scope.typeOption = [{
						"value": "Appartement",
						"label": "Appartement"
					},
					{
						"value": "Maison",
						"label": "Maison"
					},
					{
						"value": "Local commercial",
						"label": "Local commercial"
					},
					{
						"value": "Box",
						"label": "Box"
					}];
				$scope.sciOption = [];
				angular.forEach(data.scis, function(sci){
					$scope.sciOption.push({
						value: sci.id,
						label: sci.name,
					});
				});

				$scope.$watch('lot.sci', function(value){
					if(value){
						$http
							.get(baseUrl+'/scis/' + value + '/biens', {
								params: {
									fields:'name,sci',
								}
							})
							.success(function(data, status, headers){
								if(!angular.equals(data.biens,[])){
									$scope.bienOption = [];
									angular.forEach(data.biens, function(sci){
										$scope.bienOption.push({
											value: sci.id,
											label: sci.name,
										});
									});

									if($scope.lot.bien){
										$scope.lot.bien = undefined;
									}
								}
								else{
									ngNotify.set('Aucun bien associé à cette SCI', 'error');
								}
							})
							.error(function(){
								ngNotify.set('Une erreur est apparu', 'error');
							});
					}
				});

				$scope.$watch('lot', function(value){
					if($scope.formIsValid){
						$scope.disable = false;
					}
					else {
						$scope.disable = true;
					}
				}, true);

				$scope.submit = Submit;

				function Submit(){
					var modelLot = angular.copy($scope.lot);

					var fd = new FormData();
					$.map(modelLot, function(value, index){
						fd.append(index, value);
					});


					angular.forEach($scope.photo, function(photo){
						fd.append('file[]', photo);
					});

					$http
						.post(baseUrl+'/lots/', fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined}})
						.success(function(){
							ngNotify.set('Le lot a bien été enregistré', 'success');
							$state.go('locloud.lot');
						})
						.error(function(){
							ngNotify.set('Une erreur est apparu', 'error');
						});
				}
			})
			.error(function(){
				ngNotify.set('Une erreur est apparu', 'error');
			});
  }
});
