budgetApp.controller('NavbarController', function($scope, $location, AuthenticationService) {
	$scope.logout = function() {
		AuthenticationService.ClearCredentials();
		$location.url('/');
	}
	
	$scope.goToHome = function() {
		$location.url('/home');
	}
	
	$scope.goToSettings = function() {
		$location.url('/settings');
	}
});