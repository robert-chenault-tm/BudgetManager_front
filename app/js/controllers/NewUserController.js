budgetApp.controller('NewUserController', function($scope, $location, AuthenticationService) {
	$scope.errors = [];
	
	$scope.createAccount = function() {
		$scope.errors = [];
		if($scope.newUsername.length < 3) {
			$scope.errors.push('Username must be at least 3 characters long.');
		}
		if($scope.newPassword.length < 8) {
			$scope.errors.push('Password must be at least 8 characters long.');
		}
		
		if($scope.errors.length == 0) {
			AuthenticationService.createNewAccount($scope.newUsername, $scope.newPassword, function(response) {
				$location.url('/');
			}, function(error) {
				$scope.errors.push(error.data.message);
			});
		}
	}
	
	$scope.returnToLogin = function() {
		$location.url('/');
	}
});