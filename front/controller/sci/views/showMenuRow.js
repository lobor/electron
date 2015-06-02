'use strict';
define([
	'angular',
	'text!controller/sci/templates/menuRow.html'
], function(angular, menuRowTpl) {
	return ['$scope', '$mdBottomSheet', '$http', '$mdDialog', '$state', 'baseUrl', 'ngNotify', 'id', 'sci', ShowMenuRow];

	function ShowMenuRow($scope, $mdBottomSheet, $http, $mdDialog, $state, baseUrl, ngNotify, id, sci){
		$scope.items = [
    		{
				name: 'Éditer',
				icon: 'pencil',
				href: 'locloud.sci.edit'
			},
			{
				name: 'Supprimer',
				icon: 'delete',
				href: 'locloud.sci.supp'
			}
	  	];

		$scope.clickItem = clickItem;

		function clickItem(option){
			switch (option.href) {
				case 'locloud.sci.edit':
					$state.go(option.href, {id:id});
					break;
				case 'locloud.sci.supp':
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
									.delete(baseUrl+'/scis/'+id)
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
