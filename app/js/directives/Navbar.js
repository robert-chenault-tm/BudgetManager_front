budgetApp.directive('navbar', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "/templates/directives/Navbar.html",
		controller: 'NavbarController'
	}
});