define(['app','controller/auth/auth'], function(app){
	describe('controller', function () {
		var $scope, $controller = 1;

		beforeEach(module('locloud'));
		beforeEach(module('locloud.login'));

		beforeEach(inject(function (_$controller_, _$rootScope_) {
				$scope = _$rootScope_.$new();
				$controller = _$controller_;
			}));

		describe('toto', function () {

			it('test if $scope is defined', function(){
				expect(3).toBe(3);
			});

			it('toto', function(){
				var controller = $controller('LoginController', { $scope: $scope });
				expect($scope.submit).toBeDefined();
			});
		});
	});
});
