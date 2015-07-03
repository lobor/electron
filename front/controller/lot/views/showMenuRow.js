define([
	'angular',
	'text!controller/lot/templates/menuRow.html'
], function(angular, menuRowTpl) {
	'use strict';
	return ['$scope', '$mdBottomSheet', '$http', '$mdDialog', '$state', 'baseUrl', 'ngNotify', 'id', 'lot', ShowMenuRow];

	function ShowMenuRow($scope, $mdBottomSheet, $http, $mdDialog, $state, baseUrl, ngNotify, id, lot){
		$scope.items = [
    		{
				name: 'Éditer',
				icon: 'pencil',
				href: 'locloud.lot.edit'
			},
			{
				name: 'Supprimer',
				icon: 'delete',
				href: 'locloud.lot.supp'
			}
	  	];

		$scope.clickItem = clickItem;

		function clickItem(option){
			switch (option.href) {
				case 'locloud.lot.edit':
					$state.go(option.href, {id:id});
					break;
				case 'locloud.lot.supp':
					var confirm = $mdDialog
						.confirm()
						.title('Suppression d\'un lot')
						.content('Souhaitez vous vraiment supprimer le lot "'+lot+'"')
						.ok('Supprimer')
      					.cancel('Annuler');

					$mdDialog
						.show(confirm)
						.then(function() {
								$http
									.delete(baseUrl+'/lots/'+id)
									.success(function (data, status, headers, config) {
										ngNotify.set('Le lot a bien supprimé', 'success');
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
