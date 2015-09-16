angular.module('app.controllers', [
	'app.directives'
])
	.controller('blogController', ['$scope', '$http', function($scope, $http){
		$http.get('data/blog_detail.json').success(function(data){
			$scope.posts = data;
			
		});
	}])
	.controller('overviewController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		$http.get('data/blog_detail.json').success(function(data){
			$scope.post = data[$routeParams.id];
		});
	}]);