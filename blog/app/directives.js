angular.module('app.directives', [])
	.directive('navigationbar', [function(){
		return {
			controller: ['$scope', '$http', function($scope, $http){
				$http.get('data/social_links.json').success(function(data){
					$scope.links = data;	// fetch the page detail
					$scope.user="Tushar";
				}).error(function(data){console.log("error in fetching social_links.json file");});
			}],
			restrict: 'E',
			templateUrl: 'partials/navigationbar.html',
			replace: true,
		};
	}])
	.directive('madewith', [function(){
		return {
			controller: [],
			restrict: 'E',
			templateUrl: 'partials/madewith.html',
			replace: true,
		};
	}]);
