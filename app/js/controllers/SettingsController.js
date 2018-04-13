budgetApp.controller('SettingsController', function($scope, $rootScope, ExpenseCategoryService, ExpenseService) {
	function init() {
		$scope.showNewExpenseForm = false;
		$scope.editing = false;		
		getCategories();
	}
	
	function getCategories() {
		ExpenseCategoryService.getExpenseCategoriesByUser($rootScope.globals.currentUser.username, function(response) {
			$scope.categories = response.data;
			$scope.newExpenseCategory = $scope.categories[0];
			populateExpenses();
		}, function(error) {
			console.log(error);
		});
	}
	
	function populateExpenses() {
		ExpenseService.getRecurringExpensesByUserId($rootScope.globals.currentUser.username, function(response) {
			$scope.expenses = response.data;
		}, function(error) {
			console.log(error);
		});
	}
	
	function fillNewExpenseForm(expense) {
		$scope.newExpenseId = expense.id;
		$scope.newExpenseName = expense.name;
		$scope.newExpenseAmount = expense.amount;
		$scope.newExpenseCategory = $scope.categories.filter(function(cat) {
			return cat.id == expense.categoryId;
		})[0];
	}
	
	$scope.submitExpenseForm = function() {
		var expense = {
				categoryId: $scope.newExpenseCategory.id,
				name: $scope.newExpenseName,
				amount: $scope.newExpenseAmount
		}
		if($scope.editing) {
			expense.id = $scope.newExpenseId;
			ExpenseService.updateRecurringExpense(expense, function(response) {
				init();
			}, function(error) {
				console.log(error);
			});
		} else {
			ExpenseService.createRecurringExpense(expense, function(response) {
				init();
			}, function(error) {
				console.log(error);
			});
		}
	}
	
	$scope.openNewExpenseForm = function() {
		var emptyExpense = {id: '', name:'', amount:0, categoryId: $scope.categories[0].id}
		fillNewExpenseForm(emptyExpense);
		$scope.showNewExpenseForm = true;
		$scope.editing = false;
	}
	
	$scope.closeNewExpenseForm = function() {
		$scope.showNewExpenseForm = false;
	}
	
	$scope.openEditExpenseForm = function(expense) {
		fillNewExpenseForm(expense);
		$scope.showNewExpenseForm = true;
		$scope.editing = true;
	}
	
	$scope.deleteExpense = function() {
		ExpenseService.deleteRecurringExpense($scope.newExpenseId, function(response) {
			init();
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.getCategoryName = function(id) {
		return $scope.categories.filter(function(cat) {
			return cat.id == id;
		})[0].title;
	}
	
	init();
});