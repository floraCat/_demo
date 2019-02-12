//
// angular.module('myApp',[])
// 	.run(function($rootScope){
// 		$rootScope.name='World';
// 	});


// var myApp=angular.module("myApp",[]);
// myApp.run(function($rootScope,$timeout){
// 	$timeout(function(){
// 		$rootScope.name='333';
// 	},2000);
// });

// var myApp=angular.module("myApp",[]);
// myApp.controller("myCtrl",function($scope){
// 	$scope.imgSrc='images/ar2L.png';
// });


// angular.module('myApp', [])
// 	.filter('capitalize', function() {
// 		return function(input) {
// 			if (input) {
// 				return input[0].toUpperCase() + input.slice(1);
// 			}
// 		}
// 	});

// angular.module('myApp', [])
// 	.run(function(){
// 		console.log(window);
// 	});




var testapp = angular.module('myApp', []);

testapp.controller('parentController', ['$scope', '$window', function($scope, $window) {
    console.log('parentController scope id = ', $scope.$id);
    $scope.primary1Label = 'Prime1';
    
    $scope.onPrimary1Click = function() {
        $window.alert('Primary1 clicked');    
    };
}]);

testapp.directive('primary', function() {
    return {
        restrict: 'C',
        link: function(scope, element, attrs) {
            element.addClass('btn btn-primary');
        }
    }
});

testapp.directive('buttonBar', function() {
    return {
        restrict: 'EA',
        template: '<div class="span4 well clearfix"><div class="pull-right" ng-transclude></div></div>',
        replace: true,
        transclude: true
    };
});