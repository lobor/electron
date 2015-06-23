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
		$scope.sci = {};
		$scope.steps = [
			{
				template: CreateSciTpl,
				title: 'Créez la SCI',
				hasForm: true,
				controller: ['$scope', function($scope){
					$scope = angular.extend($scope, sciForm);
					$scope.$broadcast('schemaFormRedraw')
					console.log($scope.sci);
					// $scope.$on('schemaFormValidate', function(){
					// 		console.log(3);
					// });
					// console.log($scope.$broadcast('schemaFormValidate'));

					$scope.$watch('sci', function(value){
						if($scope.sci !== {}){
							$scope.$broadcast('schemaFormValidate')
							if($scope.addSci.$valid && !$scope.addSci.$pristine){
								$scope.$setValidity(true)
							}
						}
					}, true)
				}]
			},
			{
				template: CreateBienTpl,
				title: 'Créez les lots',
				hasForm: true,
				controller: ['$scope', function($scope){
					$scope = angular.extend($scope, bienForm);
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
		$scope.title_form_sci = 'Créer une SCI';
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
		// 	// 		var sciData = angular.extend({},$scope.sci);
		// 	// 		var biensData = angular.extend({},sciData);
		// 	//
		// 	// 		delete sciData.biens;
		// 	// 		sciData.date_immatriculation = moment(sciData.date_immatriculation, 'DD MMMM YYYY');
		// 	//
		// 	// 		angular.forEach(sciData.associes, function(associe, key){
		// 	// 			sciData.associes[key].birthday = moment(associe.birthday, 'DD MMMM YYYY');
		// 	// 		});
		// 	//
		// 	// 		$http
		// 	//     		.post(baseUrl + '/scis', sciData)
		// 	//     		.then(function (data, status, headers, config) {
		// 	// 					if(data.data.sci){
		// 	// 						ngNotify.set('La SCI a bien été enregistré', 'success');
		// 	// 						$http
		// 	// 							.post(baseUrl + '/scis/'+data.data.sci.id+'/biens', biensData)
		// 	// 							.then(function (data, status, headers, config){
		// 	// 									if(data.data.biens){
		// 	// 										ngNotify.set('Les biens ont bien été enregistrés', 'success');
		// 	// 										$state.go('locloud.sci');
		// 	// 									}
		// 	// 								}, function (data, status, headers, config){
		// 	// 									ngNotify.set('Une erreur est apparu', 'error');
		// 	// 								});
		// 	// 					}
		// 	// 					else{
		// 	// 						ngNotify.set('Une erreur est apparu', 'error');
		// 	// 					}
		// 	// 					return data;
		// 	// 				}, function (data, status, headers, config) {
		// 	// 					ngNotify.set('Une erreur est apparu', 'error');
		// 	// 					return false;
		// 	//     		});
		// 	// }
		// }
	}
});
