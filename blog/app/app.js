angular.module('app', [
	'ngRoute',
	'app.controllers'
]).config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'views/blog.html',
		controller: 'blogController'
	}).when('/post/:id', {
		templateUrl: 'views/overview.html',
		controller: 'overviewController'
	}).otherwise({
		redirectTo: '/'
	});
}]);