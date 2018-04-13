budgetApp.factory('MonthlyBudgetService', ['$http', function($http) {
	var service = {};
	
	service.getMonthlyBudgetsByUser = function(username, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/budget_manager/months/' + username
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.createMonthlyBudget = function(username, year, month, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/month',
			data: {
				id: '',
				username: username,
				year: year,
				month: month
			}
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.deleteMonthlyBudget = function(username, year, month, successCB, failureCB) {
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/budget_manager/delete/month/' + username + '/' + year + '/' + month
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	return service;
}]);