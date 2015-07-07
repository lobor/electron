define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'json!controller/sci/forms/bien.json',
	'text!controller/sci/templates/createSci.html',
	'text!controller/sci/templates/createBien.html',
	'moment'
], function(angular, sciForm, bienForm, CreateSciTpl, CreateBienTpl, moment) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', '$stateParams', 'SciService', Edit];

	function Edit($scope, $http, baseUrl, ngNotify, $state, $stateParams, SciService) {
		var _this = $scope;
		$scope.sci = {};
		$scope.steps = [
			{
				template: CreateSciTpl,
				title: 'Créez la SCI',
				hasForm: true,
				controller: ['$scope', SciController]
			},
			{
				template: CreateBienTpl,
				title: 'Créez les biens',
				hasForm: true,
				controller: ['$scope', BienController]
			}
		];

		function SciController ($scope){
			$scope.sci = {};
			var oldSci;

			var SciGet = SciService.get($stateParams.id);
			$
				.when(SciGet)
				.done(function(Sci){
					$scope.validation = sciForm;
					console.log(Sci);
					oldSci = angular.copy(Sci.sci);
					$scope.sci = angular.copy(Sci.sci);
					$scope.$setValidity(true);
					_this.submit = Submit;
					$scope.addAssocie = addAssocie;

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

					function addAssocie (){
						if(!$scope.sci.associes){
							$scope.sci.associes = [];
						}
						$scope.sci.associes.push({});
					}

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

							var saveSci = SciService.put($stateParams.id, data);
							$
								.when(saveSci).done(function(Sci){
									$scope.$nextStep();
								});
						}
					}
				});
		}

		function BienController ($scope) {
				var oldBiens;
				var SciGet = SciService.getListBien($stateParams.id);
				$
					.when(SciGet)
					.done(function(Bien){
						oldBiens = {biens: angular.copy(Bien.biens)};
						$scope.biens = {biens:[]};
						$scope.addBien = addBien;

						function addBien(){
							if(!$scope.biens.biens){
								$scope.biens.biens = [];
							}
							$scope.biens.biens.push({});
						}

						if(!angular.equals(Bien.biens, []))
							$scope.biens = {biens: angular.copy(Bien.biens)};

						_this.submit = Submit;
						$scope.$setValidity(true);

						$scope.$watch('formIsValid', function(value){
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
					});
		}
	}
});
