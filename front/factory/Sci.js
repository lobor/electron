define([
	'angular',
	'jquery'
], function(angular, $) {
	'use strict';
	return ['baseUrl', '$http', 'ngNotify', function(baseUrl, $http, ngNotify){
			return {
				getList: List,
				get: GetOne,
				put: Put,
				getListBien: GetListBien,
				create : CreateSci
			};

			function CreateSci (sciData){
				var defer = $.Deferred();
				$http
					.post(baseUrl + '/scis', sciData)
					.then(function (data, status, headers, config) {
							if(data.data.sci){
								ngNotify.set('La SCI a bien été enregistré', 'success');
								defer.resolve(data);
							}
							else{
								ngNotify.set('Une erreur est apparu', 'error');
							}
						}, function (data, status, headers, config) {
							ngNotify.set('Une erreur est apparu', 'error');
					});
				return defer.promise();
			}

			function GetListBien (id) {
				var defer = $.Deferred();
				$http
					.get(baseUrl+'/scis/' + id + '/biens', {
						params: {
							fields: 'name,cp,city,address,photos'
						}
					})
					.success(function (data, status, headers, config) {
						if(data.biens){
							defer.resolve(data);
						}
					})
					.error(function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
					});
				return defer.promise();
			}

			function List (param){
				var defer = $.Deferred();
				$http
					.get(baseUrl + '/scis', {
						params: {
							fields: 'name,associes'
						}
					})
					.success(function (data, status, headers, config) {
						angular.forEach(data.scis,function(sci, key){
							data.scis[key].nbAssocies = data.scis[key].associes.length
						});
						defer.resolve(data);
					})
					.error(function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
					});
				return defer.promise();
			}

			function Put (id, param) {
				var defer = $.Deferred();
				$http
					.post(baseUrl+'/scis/'+id, param)
					.success(function (data, status, headers, config) {
						if(data.sci){
							ngNotify.set('La SCI a bien été enregistré', 'success');
							defer.resolve(data);
						}
					})
					.error(function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
					});
				return defer.promise();
			}

			function GetOne (id) {
				console.log(id);
				var defer = $.Deferred();
				$http
					.get(baseUrl+'/scis/'+id)
					.success(function (data, status, headers, config) {
						if(data.sci){
							data.sci.date_immatriculation = new Date(data.sci.date_immatriculation);

							angular.forEach(data.sci.associes, function(associe, key){
								data.sci.associes[key].birthday = new Date(associe.birthday);
							});

							defer.resolve(data);
						}
					})
					.error(function (data, status, headers, config) {
						ngNotify.set('Une erreur est apparu', 'error');
					});
				return defer.promise();
			}
		}];
});
