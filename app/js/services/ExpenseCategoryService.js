budgetApp.factory('ExpenseCategoryService', ['$http', function($http) {
	var service = {};
	
	service.getExpenseCategoriesByUser = function(username, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/budget_manager/expense_categories/' + username
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.createExpenseCategory = function(username, title, expectedAmount, isIncome, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/expense_category',
			data: {
				id: '',
				username: username,
				title: title,
				expectedAmount: expectedAmount,
				isIncome: isIncome
			}
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.editExpenseCategory = function(id, title, expectedAmount, isIncome, successCB, failureCB) {
		$http({
			method: 'PUT',
			url: 'http://localhost:8080/budget_manager/expense_category',
			data: {
				id: id,
				username: '',
				title: title,
				expectedAmount: expectedAmount,
				isIncome: isIncome
			}
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.deleteExpenseCategory = function(id, successCB, failureCB) {
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/budget_manager/delete/expense_category/' + id
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	return service;
	
	
}]);
