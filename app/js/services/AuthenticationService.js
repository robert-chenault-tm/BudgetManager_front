budgetApp.factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', '$timeout', 'Base64', function($http, $cookieStore, $rootScope, $timeout, Base64) {
	var service = {};
	
	service.Login = function(username, password, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/authenticate/' + username + '/' + password
		}).then(function(response) {
			if(response != null && response.status == 200) {
				successCB(response);
			} else {
				failureCB(response)
			}
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.SetCredentials = function(username, password) {
		var authData = Base64.encode(username + ':' + password);
		$rootScope.globals = {
				currentUser: {
					username: username,
					authData: authData
				}
		}
		
		$http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
		$cookieStore.put('globals', $rootScope.globals);
	}
	
	service.ClearCredentials = function() {
		$rootScope.globals = {};
		$cookieStore.remove('globals');
		$http.defaults.headers.common['Authorization'] = 'Basic ';
	}
	
	service.createNewAccount = function(username, password, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/user/generate',
			data: {
				username: username,
				password: password,
				id: '',
				enabled: true
			}
		}).then(function(response) {
			if(response != null && response.status == 200) {
				successCB(response);
			} else {
				failureCB(response)
			}
		}, function(response) {
			failureCB(response);
		});
	}
	
	return service;
}]);