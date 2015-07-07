define([
	'angular',
	'json!controller/sci/forms/sci.json',
	'json!controller/sci/forms/bien.json',
	'text!controller/sci/templates/createSci.html',
	'text!controller/sci/templates/createBien.html',
	'moment'
], function(angular, sciForm, bienForm, CreateSciTpl, CreateBienTpl, moment) {
	'use strict';
	return ['$scope', '$http', 'baseUrl', 'ngNotify', '$state', 'SciService', Create];

	function Create($scope, $http, baseUrl, ngNotify, $state, SciService) {
		var _this = $scope;
		$scope.idSci = null;
		$scope.steps = [
			{
				template: CreateSciTpl,
				title: 'Créez la SCI',
				hasForm: true,
				controller: ['$scope', SciController]
			},
			{
				template: CreateBienTpl,
				title: 'Créez les lots',
				hasForm: true,
				controller: ['$scope', BienController]
			}
		];

		function SciController ($scope) {
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

				var sciDeferred = SciService.create(sciData);

				$
					.when(sciDeferred)
					.done(function(Sci){
						_this.idSci = Sci.data.sci.id;
						$scope.$nextStep();
					});
			}
		}

		function BienController ($scope){
			$scope.biens = {biens:[]};
			$scope.validation = bienForm;
			$scope.addBien = addBien;

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

			function addBien(){
				if(!$scope.biens.biens){
					$scope.biens.biens = [];
				}
				$scope.biens.biens.push({});
			}

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
		}
	}
});
