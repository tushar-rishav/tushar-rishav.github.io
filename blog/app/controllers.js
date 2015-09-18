angular.module('app.controllers', [
	'app.directives'
])
	.controller('blogController', ['$scope','$http', function($scope,$http){
		$scope.currentPage = 1;
		$scope.pageSize = 3;
		$http.get('data/blog_detail.json').success(function(data){
			$scope.posts = data;
			$scope.numPages = function() {
		        return Math.ceil($scope.posts.length / $scope.pageSize);
		    };
		});
	}])
	.controller('overviewController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		$http.get('data/blog_detail.json').success(function(data){
			$scope.post = data[$routeParams.id];
		});
	}])
	.filter('startFrom', function() {	// custom filter for pagination
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);	
    }
	});