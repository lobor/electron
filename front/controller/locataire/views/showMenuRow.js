define([
	'angular',
	'text!controller/locataire/templates/menuRow.html'
], function(angular, menuRowTpl) {
	'use strict';
	return ['$scope', '$mdBottomSheet', '$http', '$mdDialog', '$state', 'baseUrl', 'ngNotify', 'id', 'sci', ShowMenuRow];

	function ShowMenuRow($scope, $mdBottomSheet, $http, $mdDialog, $state, baseUrl, ngNotify, id, sci){
		$scope.items = [
    		{
				name: 'Éditer',
				icon: 'pencil',
				href: 'locloud.locataire.edit'
			},
			{
				name: 'Supprimer',
				icon: 'delete',
				href: 'locloud.locataire.supp'
			}
	  	];

		$scope.clickItem = clickItem;

		function clickItem(option){
			switch (option.href) {
				case 'locloud.locataire.edit':
					$state.go(option.href, {id:id});
					break;
				case 'locloud.locataire.supp':
					var confirm = $mdDialog
						.confirm()
						.title('Suppression d\'une SCI')
						.content('Souhaitez vous vraiment supprimer la SCI "'+sci+'"')
						.ok('Supprimer')
      					.cancel('Annuler');

					$mdDialog
						.show(confirm)
						.then(function() {
								$http
									.delete(baseUrl+'/locataires/'+id)
									.success(function (data, status, headers, config) {
										ngNotify.set('La SCI a bien supprimé', 'success');
										$state.reload();
									})
									.error(function (data, status, headers, config) {
										ngNotify.set('Une erreur est apparu', 'error');
									});
						    });
					break;
			}
			$mdBottomSheet.hide();
		}
	}
});
