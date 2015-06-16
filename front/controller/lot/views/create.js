'use strict';

define([
	'angular',
	'json!controller/lot/forms/lot.json'
], function (angular, formLot) {
	return ['$scope', '$http', 'baseUrl', '$state', 'ngNotify', Create];

	function Create ($scope, $http, baseUrl, ngNotify, $state) {


		$scope = angular.extend($scope, formLot);
		$scope.title = 'Créer un lot';
		$scope.lot = {};


		$scope.$watch('files', function () {
			console.log($scope.files);
    //     $scope.upload($scope.files);
    });
  }
});
