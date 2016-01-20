angular.module('demoApp', ['owsFastBind'])

.controller('DemoController', ['$rootScope', '$scope', '$interval', '$timeout', function($rootScope, $scope, $interval, $timeout) {
  $scope.test = 1;
  $scope.test_class = 'demo';
  $scope.test_show = true;
  $scope.test_hide = true;

  $scope.list = [];

  $timeout(function(){
  	$scope.test = new Date().getTime();
  	$scope.test_html =  '<p>' + new Date().getTime() + "</p>";
  	$scope.test_class = 'demo_' + new Date().getTime();
  	for(var i = 0; i < 10000; i++){
  		$scope.list.push(i);
  	}
  	$scope.test_show = !$scope.test_show;
  	$scope.test_hide = !$scope.test_hide;
  	$rootScope.$broadcast("test"); //using this to update

  	$interval(function(){
	  	$scope.list.push(new Date().getTime()+1);
	  	$scope.list.push(new Date().getTime()+2);
	  	$scope.list.push(new Date().getTime()+3);
	  	$scope.test = new Date().getTime();
	  	$scope.test_html =  '<p>' + new Date().getTime() + "</p>";
	  	$scope.test_class = 'demo_' + new Date().getTime();
	  	$scope.test_show = !$scope.test_show;
	  	$scope.test_hide = !$scope.test_hide;
	  	OwsFbUpdate("test"); //or this to update
	}, 1000);

  }, 500);

  $interval(function(){
  	(function () { 
	    var root = angular.element(document.getElementsByTagName('body'));

	    var watchers = [];

	    var f = function (element) {
	        angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) { 
	            if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
	                angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
	                    watchers.push(watcher);
	                });
	            }
	        });

	        angular.forEach(element.children(), function (childElement) {
	            f(angular.element(childElement));
	        });
	    };

	    f(root);

	    // Remove duplicate watchers
	    var watchersWithoutDuplicates = [];
	    angular.forEach(watchers, function(item) {
	        if(watchersWithoutDuplicates.indexOf(item) < 0) {
	             watchersWithoutDuplicates.push(item);
	        }
	    });

	    console.log("Watchers:" + watchersWithoutDuplicates.length);
	})();
  }, 5000);
}])