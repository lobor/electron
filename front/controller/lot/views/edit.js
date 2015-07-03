'use strict';
define([
	'angular',
	'json!controller/lot/forms/lot.json'
], function(angular, formLot) {
	return ['$scope', '$element', '$http', 'baseUrl', 'ngNotify', '$state', '$stateParams', Edit];

	function Edit($scope, $element, $http, baseUrl, ngNotify, $state, $stateParams){
		$scope.lot = {};
		$scope.validation = formLot;
		$scope.title = 'Editer un lot';
		$http
			.get(baseUrl+'/lots/'+$stateParams.id)
			.success(function (dataLot, status, headers, config) {
				if(dataLot.lot){
					var modelLot = angular.copy(dataLot.lot);
					delete modelLot.href;
					delete modelLot.id;
					modelLot.sci = modelLot.sci.id;
					modelLot.bien = modelLot.bien.id;
					$scope.disable = false;
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
							$scope.lot = modelLot;
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
												angular.forEach(data.biens, function(bien){
													$scope.bienOption.push({
														value: bien.id,
														label: bien.name,
													});
												});
												if($scope.lot.bien != modelLot.bien){
													$scope.lot.bien = undefined;
												}

												$scope.lot = modelLot;
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
							var i = 0;
							$scope.$watch('lot', function(value){
								if($scope.formIsValid || (!$scope.formIsValid && i === 0)){
									$scope.disable = false;
								}
								else {
									$scope.disable = true;
								}
								i++
							}, true);

							$scope.submit = Submit;

							function Submit(){
								var modelLot = angular.copy($scope.lot);
								modelLot.photos = $scope.photo;

								var fd = new FormData($element.find('form')[0]);

								angular.forEach(modelLot.photos, function(photo){
        							fd.append('file[]', photo);
								});

								$http
									.post(baseUrl+'/lots/'+ dataLot.lot.id, fd, {headers: {'Content-Type': 'multipart/form-data'}})
									.success(function(){
										ngNotify.set('Le lot a bien été enregistré', 'success');
										$state.go('locloud.lot')
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
				else{
					ngNotify.set('Une erreur est apparu', 'error');
				}
			})
			.error(function(){
				ngNotify.set('Une erreur est apparu', 'error');
			});
	}
});
