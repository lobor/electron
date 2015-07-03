define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'json!controller/sci/forms/bien.json',
	'text!controller/sci/templates/createSci.html',
	'text!controller/sci/templates/createBien.html',
	'moment'
], function(angular, sciForm, bienForm, CreateSciTpl, CreateBienTpl, moment) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', Create];

	function Create($scope, $http, baseUrl, ngNotify, $state) {
		var _this = $scope;
		$scope.idSci = null;
		$scope.steps = [
			{
				template: CreateSciTpl,
				title: 'Créez la SCI',
				hasForm: true,
				controller: ['$scope', function($scope){
					$scope.validation = sciForm;
					$scope.sci = {};
					$scope.addAssocie = addAssocie;

					function addAssocie(){
						if(!$scope.sci.associes){
							$scope.sci.associes = [];
						}
						$scope.sci.associes.push({});
					}
					_this.submit = Submit;

					$scope.$watch('formIsValid', function(value){
						if($scope.formIsValid){
							$scope.$setValidity(true);
						}
						else {
							$scope.$setValidity(false);
						}
					}, true);
					//
					function Submit() {
						var sciData = angular.copy($scope.sci);


						angular.forEach(sciData.associes, function(associe, key){
							delete sciData.associes[key].$$hashKey;
						});

						$http
				    		.post(baseUrl + '/scis', sciData)
				    		.then(function (data, status, headers, config) {
									if(data.data.sci){
										_this.idSci = data.data.sci.id;
										ngNotify.set('La SCI a bien été enregistré', 'success');
										$scope.$nextStep();
									}
									else{
										ngNotify.set('Une erreur est apparu', 'error');
									}
									return data;
								}, function (data, status, headers, config) {
									ngNotify.set('Une erreur est apparu', 'error');
									return false;
				    		});
					}
				}]
			},
			{
				template: CreateBienTpl,
				title: 'Créez les lots',
				hasForm: true,
				controller: ['$scope', function($scope){
					$scope.biens = {biens:[]};
					$scope.validation = bienForm;
					$scope.addBien = addBien;

					function addBien(){
						if(!$scope.biens.biens){
							$scope.biens.biens = [];
						}
						$scope.biens.biens.push({});
					}

					$scope.$broadcast('schemaFormRedraw');

					_this.submit = Submit;

					$scope.$watch('formIsValid', function(value){
						if($scope.formIsValid){
							$scope.$setValidity(true);
						}
						else {
							$scope.$setValidity(false);
						}
					}, true);

					function Submit() {
						var $httpSelf;
						angular.forEach($scope.biens.biens, function(bien){
							if(!bien.photos)
								bien.photos = [];

							$httpSelf = $http.post(baseUrl+'/scis/'+_this.idSci+'/biens', bien);
						});

						$httpSelf
							.then(function(){
								ngNotify.set('Les biens on été enregistré', 'success');
								$state.go('locloud.sci');
							}, function(){
								ngNotify.set('Une erreur est apparu', 'error');
							});
					}
				}]
			}
		];



		// $scope.wizard = Wizards.create($scope, [
		// 	{
		// 		controller: ['$scope', function($scope){
		// 			$scope = angular.extend($scope, sciForm);
		// 			// $scope.phoneCount = $scope.order.phones.length || 1;
		//             // $scope.$watch("phoneCount", function(phoneCount) {
		//             //     if (phoneCount > -1) {
		//             //         Cols.assureLength(phoneCount, $scope.order.phones, function() {return {};});
		//             //     }
		//             // });
		// 		}],
		// 		templateUrl: 'controller/sci/templates/create.html'
		// 	},
		// 	{
		// 		then: [
		//             {
		// 				controller: ['$scope', function($scope){
		// 					// $scope = angular.extend($scope, bienForm);
		// 					// $scope.phoneCount = $scope.order.phones.length || 1;
		// 		            // $scope.$watch("phoneCount", function(phoneCount) {
		// 		            //     if (phoneCount > -1) {
		// 		            //         Cols.assureLength(phoneCount, $scope.order.phones, function() {return {};});
		// 		            //     }
		// 		            // });
		// 				}],
		// 				templateUrl: 'controller/sci/templates/create2.html'
		// 			},
		// 			{}
		//         ]
		// 	}
		// ]);



		// $scope = angular.extend($scope, sciForm);
		// $scope = angular.extend($scope, bienForm);
		// $scope.sci = {};
		// $scope.bien = {};
		//
		// $scope.SubmitSci = SubmitSci;
		//
		// $scope.ReturnSubmitSci = ReturnSubmitSci;
		//
		// function ReturnSubmitSci(form) {
		// 	console.log(3);
		// 	return true;
		// }
		//
		// function SubmitSci(form) {
		// 	// console.log(3);
		// 	return true;
		// 	// First we broadcast an event so all fields validate themselves
		// 	// $scope.$broadcast('schemaFormValidate');
		// 	// if (form.$valid) {
					// var sciData = angular.extend({},$scope.sci);
					// var biensData = angular.extend({},sciData);
					//
					// delete sciData.biens;
					// sciData.date_immatriculation = moment(sciData.date_immatriculation, 'DD MMMM YYYY');
					//
					// angular.forEach(sciData.associes, function(associe, key){
					// 	sciData.associes[key].birthday = moment(associe.birthday, 'DD MMMM YYYY');
					// });
					//
					// $http
			    	// 	.post(baseUrl + '/scis', sciData)
			    	// 	.then(function (data, status, headers, config) {
					// 			if(data.data.sci){
					// 				ngNotify.set('La SCI a bien été enregistré', 'success');
					// 				$http
					// 					.post(baseUrl + '/scis/'+data.data.sci.id+'/biens', biensData)
					// 					.then(function (data, status, headers, config){
					// 							if(data.data.biens){
					// 								ngNotify.set('Les biens ont bien été enregistrés', 'success');
					// 								$state.go('locloud.sci');
					// 							}
					// 						}, function (data, status, headers, config){
					// 							ngNotify.set('Une erreur est apparu', 'error');
					// 						});
					// 			}
					// 			else{
					// 				ngNotify.set('Une erreur est apparu', 'error');
					// 			}
					// 			return data;
					// 		}, function (data, status, headers, config) {
					// 			ngNotify.set('Une erreur est apparu', 'error');
					// 			return false;
			    	// 	});
		// 	// }
		// }
	}
});
