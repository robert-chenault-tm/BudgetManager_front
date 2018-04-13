budgetApp.controller('LoginController', function($scope, $http, $location, AuthenticationService) {
	$scope.error = '';
	AuthenticationService.ClearCredentials();
	
	$scope.signIn = function() {
		$scope.dataLoading = true;
		AuthenticationService.Login($scope.username, $scope.password, function(response) {
			if(response != null && response.data != "") {
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$location.url('/home');
			} else {
				$scope.error = "Invalid credentials";
				$scope.dataLoading = false;
			}
			
		}, function(error) {
			$scope.error = error.data.message;
			$scope.dataLoading = false;
		});
	}	
	
	$scope.openNewUserPage = function() {
		$location.url('/newUser');
	}
});