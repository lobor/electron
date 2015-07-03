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
					$scope.sci = {};
					var oldSci;
					$http
						.get(baseUrl+'/scis/'+$stateParams.id)
						.success(function (data, status, headers, config) {
							if(data.sci){
								$scope.validation = sciForm;

								data.sci.date_immatriculation = new Date(data.sci.date_immatriculation);

								angular.forEach(data.sci.associes, function(associe, key){
									data.sci.associes[key].birthday = new Date(associe.birthday);
								});

								oldSci = angular.copy(data.sci);
								$scope.sci = angular.copy(data.sci);
								$scope.$setValidity(true);
								_this.submit = Submit;
								$scope.addAssocie = addAssocie;

								var addAssocie = function(){
									if(!$scope.sci.associes){
										$scope.sci.associes = [];
									}
									$scope.sci.associes.push({});
								};

								$scope.$watch('formIsValid', function(value){
									if($scope.sci !== {} && !angular.equals($scope.sci, oldSci)){
										if($scope.formIsValid){
											$scope.$setValidity(true);
										}
										else {
											$scope.$setValidity(false);
										}
									}
								}, true);

								function Submit() {
									if(angular.equals($scope.sci, oldSci)){
										$scope.$nextStep();
									}
									else{
										var data = angular.copy($scope.sci);
										delete data.href;
										delete data.id;

										angular.forEach(data.associes, function(associe, key){
											delete data.associes[key].$$hashKey;
										});

										$http
								      		.post(baseUrl+'/scis/'+$stateParams.id, data)
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
								$scope.addBien = addBien;

								function addBien(){
									if(!$scope.biens.biens){
										$scope.biens.biens = [];
									}
									$scope.biens.biens.push({});
								}

								if(!angular.equals(data.biens, []))
									$scope.biens = {biens: angular.copy(data.biens)};

								_this.submit = Submit;
								$scope.$setValidity(true);

								$scope.$watch('formIsValid', function(value){
									console.log(value);
									if(!angular.equals($scope.biens, oldBiens)){
										if($scope.formIsValid){
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
												$httpSelf = $http.post(baseUrl+'/biens/'+id, bien);
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
