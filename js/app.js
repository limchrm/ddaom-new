var app = angular.module('myApp', ['colorpicker.module']);


// DATE AND TIME
app.controller('TimeCtrl', function($scope, $interval) {
	var tick = function() {
		$scope.clock = Date.now();
	}
	tick();
	$interval(tick, 1000);
	$scope.date = new Date();
});

// QUOTIES FROM GOOGLE SPREADSHEET
app.controller('QuoteCtrl', function($scope, $http, $filter) {
	$scope.quotes = [];
	$scope.num = Math.floor((Math.random() * 90) + 1);
	
	$http.get("https://spreadsheets.google.com/feeds/list/1e3oNuL79PBq-xSvpovbppM5j4aUzgzHfkl5c6x1HzAc/od6/public/values?alt=json")
	.success(function(response) {
		$scope.quotes = $filter('shuffle')(response.feed.entry);
	});

	// SHUFFLE QUOTES AGAIN
	$scope.reload = function() {
		$scope.quotes = $filter('shuffle')($scope.quotes);
	};

});


// SHUFFLE QUOTES AGAIN
app.filter('shuffle', function() {
	var shuffledArr = [],
	shuffledLength = 0;
	return function(arr) {
		var o = arr.slice(0, arr.length);
		if (shuffledLength == arr.length) return shuffledArr;
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			shuffledArr = o;
		return o;
	};
});
