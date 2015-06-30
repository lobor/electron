'use strict';
define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'json!controller/sci/forms/bien.json',
	'text!controller/sci/templates/createSci.html',
	'text!controller/sci/templates/createBien.html',
	'moment'
], function(angular, sciForm, bienForm, CreateSciTpl, CreateBienTpl, moment) {
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', '$stateParams', Edit];

	function Edit($scope, $http, baseUrl, ngNotify, $state, $stateParams, dialogs) {
		var _this = $scope;
		$scope.sci = {};
		$scope.steps = [
			{
				template: CreateSciTpl,
				title: 'Créez la SCI',
				hasForm: true,
				controller: ['$scope', function($scope){
					$scope = angular.extend($scope, sciForm);
					$scope.sci = {};
					var oldSci;
					$http
						.get(baseUrl+'/scis/'+$stateParams.id)
						.success(function (data, status, headers, config) {
							if(data.sci){
								oldSci = angular.copy(data.sci);
								$scope.sci = angular.copy(data.sci);
								$scope.$setValidity(true);
								_this.submit = Submit;

								$scope.$watch('sci', function(value){
									if($scope.sci !== {} && !angular.equals($scope.sci, oldSci)){
										if($scope.addSci.$valid && !$scope.addSci.$pristine){
											$scope.$setValidity(true);
										}
										else{
											$scope.$setValidity(false);
										}
									}
								}, true);

								function Submit() {
									if(angular.equals($scope.sci, oldSci)){
										$scope.$nextStep();
									}
									else{
										var href = $scope.sci.href;
										delete $scope.sci.href;
										delete $scope.sci.id;

										angular.forEach($scope.sci.associes, function(associe, key){
											$scope.sci.associes[key].birthday = moment(associe.birthday, 'DD MMMM YYYY');
										});

										$http
								      		.put(baseUrl+'/'+href, $scope.sci)
								      		.success(function (data, status, headers, config) {
												if(data.sci){
													ngNotify.set('La SCI a bien été enregistré', 'success');
													$scope.$nextStep();
												}
								      		})
									      	.error(function (data, status, headers, config) {
												ngNotify.set('Une erreur est apparu', 'error');
									      	});
									}
								}
							}
						})
						.error(function (data, status, headers, config) {
							ngNotify.set('Une erreur est apparu', 'error');
						});
				}]
			},
			{
				template: CreateBienTpl,
				title: 'Créez les biens',
				hasForm: true,
				controller: ['$scope', function($scope){
					$scope = angular.extend($scope, bienForm);
					var oldBiens;
					$http
						.get(baseUrl+'/scis/'+$stateParams.id+'/biens', {params:{fields:'name,cp,city,address,photos'}})
						.success(function (data, status, headers, config) {
							if(data.biens){
								oldBiens = {biens: angular.copy(data.biens)};
								$scope.biens = {biens:[]};
								if(!angular.equals(data.biens, []))
									$scope.biens = {biens: angular.copy(data.biens)};
								_this.submit = Submit;

								$scope.$setValidity(true);

								$scope.$watch('biens', function(value){
									if(!angular.equals($scope.biens, []) && !angular.equals($scope.biens, oldBiens)){
										if($scope.addBien.$valid && !$scope.addBien.$pristine){
											$scope.$setValidity(true);
										}
										else{
											$scope.$setValidity(false);
										}
									}
								}, true);

								function Submit() {
									if(angular.equals($scope.biens, oldBiens)){
										$state.go('locloud.sci');
									}
									else{
										var $httpSelf;
										angular.forEach($scope.biens.biens, function(bien){
											if(!bien.photos)
												bien.photos = [];

											if(bien.id){
												var id = bien.id;
												delete bien.href;
												delete bien.id;
												$httpSelf = $http.put(baseUrl+'/biens/'+id, bien);
											}
											else{
												$httpSelf = $http.post(baseUrl+'/scis/'+$stateParams.id+'/biens', bien);
											}
										});

										$httpSelf
											.then(function(){
												ngNotify.set('Les biens on été enregistré', 'success');
												$state.go('locloud.sci');
											}, function(){
												ngNotify.set('Une erreur est apparu', 'error');
											});

										// $http
										//     		.post(baseUrl+'/'+href, $scope.sci)
										//     		.success(function (data, status, headers, config) {
										// 		if(data.sci){
										// 			ngNotify.set('La SCI a bien été enregistré', 'success');
										// 			$scope.$nextStep();
										// 		}
										//     		})
									    //   	.error(function (data, status, headers, config) {
										// 		ngNotify.set('Une erreur est apparu', 'error');
									    //   	});
									}
								}
							}
						})
						.error(function (data, status, headers, config) {
							ngNotify.set('Une erreur est apparu', 'error');
						});
				}]
			}
		];
	}
});
