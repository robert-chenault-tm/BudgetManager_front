budgetApp.controller('HomeController', function($scope, $http, $rootScope, ExpenseCategoryService, ExpenseService, MonthlyBudgetService) {	
	function init() {
		zeroOut();
		
		getMonths();
	}
	
	function zeroOut() {
		$scope.showNewCategoryForm = false;
		$scope.showNewExpenseForm = false;
		$scope.showNewMonthForm = false;
		$scope.expenses = [];
		$scope.totals = [];
		$scope.biggestCategory = 1;
	}
	
	function getMonths() {
		MonthlyBudgetService.getMonthlyBudgetsByUser($rootScope.globals.currentUser.username, function(response) {
			$scope.budgetMonths = response.data.map(function(obj) {
				return {
					year: obj.year,
					month: obj.month,
					display: months[obj.month] + ' ' + obj.year
				};
			});
			$scope.date = $scope.budgetMonths[0];
			getCategories();
		}, function(error) {
			console.log(error);
		});
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
		$scope.expenses = [];
		$scope.totals = [];
		$.each($scope.categories, function(ind, element) {
			ExpenseService.getMonthlyCreatedExpensesByCategory(element.id, $scope.date.year, $scope.date.month, function(response) {
				$.merge($scope.expenses, response.data);
				generateTotals(element.id, response.data);
			}, function(error) {
				console.log(error);
			});
		});
	}
	
	function generateTotals(catId, values) {
		
		var sum = 0;
		$.each(values, function(ind, element) {
			sum += element.amount;
			if(element.amount > $scope.biggestCategory) {
				$scope.biggestCategory = element.amount;
			}
		});

		var category = $scope.categories.filter(function(cat) {
			return cat.id == catId;
		})[0];
		
		if(category.expectedAmount > $scope.biggestCategory) {
			$scope.biggestCategory = category.expectedAmount;
		}

		$scope.totals.push({
			categoryId: catId,
			total: sum,
			title: category.title,
			expectedAmount: category.expectedAmount
		});
	}
	
	function zeroNewExpenseForm() {
		$scope.newExpenseCategory = $scope.categories[0];
		$scope.newExpenseName = '';
		$scope.newExpenseAmount = null;
	}
	
	function zeroNewMonthForm() {
		$scope.newMonthYear = null;
		$scope.newMonthMonth = null;
	}
	
	function zeroNewCategoryForm() {
		$scope.newCategoryTitle = '';
		$scope.newCategoryExpectedAmount = null;
		$scope.newCategoryIncome = false;
		$scope.existingCategoryId = '';
	}
	
	$scope.filterExepensesByCategory = function(category) {
		var catId = category.id;
		return $scope.expenses.filter(function(obj) {
			return obj.categoryId == catId;
		});
	}
	
	$scope.getCategoryTotal = function(category) {
		var element = $scope.totals.filter(function(obj) {
			return obj.categoryId == category.id;
		})[0];
		
		if(element) {
			return element.total;
		} else {
			return 0;
		}
	}
	
	$scope.toggleNewExpenseForm = function() {
		$scope.editing = false;
		$scope.showNewCategoryForm = false;
		$scope.showNewMonthForm = false;
		zeroNewExpenseForm();
		$scope.showNewExpenseForm = !$scope.showNewExpenseForm;
	}
	
	$scope.toggleNewCategoryForm = function() {
		$scope.editing = false;
		$scope.showNewExpenseForm = false;
		$scope.showNewMonthForm = false;
		zeroNewCategoryForm();
		$scope.showNewCategoryForm = !$scope.showNewCategoryForm;
	}
	
	$scope.toggleNewMonthForm = function() {
		$scope.editing = false;
		$scope.showNewCategoryForm = false;
		$scope.showNewExpenseForm = false;
		zeroNewMonthForm();
		$scope.showNewMonthForm = !$scope.showNewMonthForm;
	}
	
	$scope.toggleEditCategoryForm = function(category) {
		$scope.showNewExpenseForm = false;
		$scope.showNewMonthForm = false;
		zeroNewCategoryForm();
		$scope.newCategoryTitle = category.title;
		$scope.newCategoryExpectedAmount = category.expectedAmount;
		$scope.newCategoryIncome = category.income;
		$scope.existingCategoryId = category.id;
		$scope.editing = true;
		$scope.showNewCategoryForm = true;
	}
	
	$scope.toggleEditExpenseForm = function(expense) {
		$scope.showNewCategoryForm = false;
		$scope.showNewMonthForm = false;
		zeroNewExpenseForm();
		$scope.newExpenseCategory = $scope.categories.filter(function(cat) {
			return cat.id == expense.categoryId;
		})[0];
		$scope.newExpenseName = expense.name;
		$scope.newExpenseAmount = expense.amount;
		$scope.existingExpenseId = expense.id;
		$scope.existingExpenseYear = expense.year;
		$scope.existingExpenseMonth = expense.month;
		$scope.editing = true;
		$scope.showNewExpenseForm = true;
	}
	
	$scope.toggleCategoryDisplay = function(category) {
		category.hide = !category.hide;
	}
	
	function createNewExpense() {
		ExpenseService.createCreatedExpense($scope.newExpenseCategory.id, $scope.newExpenseName, $scope.newExpenseAmount, $scope.date.year, $scope.date.month, function(response) {
			$scope.showNewExpenseForm = false;
			populateExpenses();
		}, function(error) {
			console.log(error);
		});
	}
	
	function editExistingExpense() {
		ExpenseService.editCreatedExpense($scope.existingExpenseId, $scope.newExpenseCategory.id, $scope.newExpenseName, $scope.newExpenseAmount, $scope.existingExpenseYear, $scope.existingExpenseMonth, function(response) {
			$scope.showNewExpenseForm = false;
			$scope.biggestCategory = 1;
			populateExpenses();
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.deleteExpense = function() {
		ExpenseService.deleteCreatedExpense($scope.existingExpenseId, function(response) {
			init();
		}, function(error) {
			console.log(error);
		});
	}

	$scope.submitCategoryForm = function() {
		if($scope.editing) {
			editExistingCategory();
		} else {
			createNewCategory();
		}
	}
	
	$scope.submitExpenseForm = function() {
		if($scope.editing) {
			editExistingExpense();
		} else {
			createNewExpense();
		}
	}
	
	function createNewCategory() {
		ExpenseCategoryService.createExpenseCategory($rootScope.globals.currentUser.username, $scope.newCategoryTitle, $scope.newCategoryExpectedAmount, $scope.newCategoryIncome, function(response) {
			init();
		}, function(error) {
			console.log(error);
		});
	}
	
	function editExistingCategory() {
		ExpenseCategoryService.editExpenseCategory($scope.existingCategoryId, $scope.newCategoryTitle, $scope.newCategoryExpectedAmount, $scope.newCategoryIncome, function(response) {
			init();
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.deleteCategory = function() {
		ExpenseCategoryService.deleteExpenseCategory($scope.existingCategoryId, function(response) {
			init();
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.createNewMonth = function() {
		MonthlyBudgetService.createMonthlyBudget($rootScope.globals.currentUser.username, $scope.newMonthYear, $scope.newMonthMonth, function(response) {
			init();
		}, function(error) {
			console.log(error);
		});
	}
	
	$scope.loadMonth = function() {
		populateExpenses();
	}
	
	$scope.deleteMonth = function(date) {
		if(confirm('This action cannot be undone. Are you sure you want to delete this month record?')) {
			expenseIds = $scope.expenses.map(function(obj) {
				return obj.id;
			});
			ExpenseService.deleteCreatedExpenses(expenseIds, function(response) {
				MonthlyBudgetService.deleteMonthlyBudget($rootScope.globals.currentUser.username, date.year, date.month, function(response) {
					init();
				}, function(response) {
					console.log(response);
				});
			}, function(response) {
				console.log(response);
			});

			
		}
	}
	
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	init();
});