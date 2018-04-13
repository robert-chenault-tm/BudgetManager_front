budgetApp.factory('ExpenseService', ['$http', function($http) {
	var service = {};
	
	service.getMonthlyCreatedExpensesByCategory = function(categoryid, year, month, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/budget_manager/created_expenses/' + categoryid + '/' + year + '/' + month
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.createCreatedExpense = function(categoryId, name, amount, year, month, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/created_expense',
			data: {
				id: '',
				categoryId: categoryId,
				name: name,
				amount: amount,
				year: year,
				month: month
			}
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.editCreatedExpense = function(id, categoryId, name, amount, year, month, successCB, failureCB) {
		$http({
			method: 'PUT',
			url: 'http://localhost:8080/budget_manager/created_expense',
			data: {
				id: id,
				categoryId: categoryId,
				name: name,
				amount: amount,
				year: year,
				month: month
			}
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.deleteCreatedExpense = function(id, successCB, failureCB) {
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/budget_manager/delete/created_expense/' + id
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.deleteCreatedExpenses = function(ids, successCB, failureCB) {
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/delete/created_expenses',
			data: ids
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.getRecurringExpensesByUserId = function(id, successCB, failureCB) {
		$http({
			method: 'GET',
			url: 'http://localhost:8080/budget_manager/recurring_expenses/user/' + id
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.createRecurringExpense = function(expense, successCB, failureCB) {
		expense.id = '';
		$http({
			method: 'POST',
			url: 'http://localhost:8080/budget_manager/recurring_expense',
			data: expense
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.updateRecurringExpense = function(expense, successCB, failureCB) {
		$http({
			method: 'PUT',
			url: 'http://localhost:8080/budget_manager/recurring_expense',
			data: {
				id: expense.id,
				categoryId: expense.categoryId,
				name: expense.name,
				amount: expense.amount
			}
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	service.deleteRecurringExpense = function(id, successCB, failureCB) {
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/budget_manager/delete/recurring_expense/' + id
		}).then(function(response) {
			successCB(response);
		}, function(response) {
			failureCB(response);
		});
	}
	
	return service;
}]);