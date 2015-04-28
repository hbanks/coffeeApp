
var app = angular.module("myApp", ['ui.router']);

app.config(function($stateProvider){
	$stateProvider.state('index', {
		url: '',
		controller: 'mainController'
		// templateUrl: 'js/templates/testtemp.html'
	});
});

app.factory('myData', function($http, $q){
	var clientID = 'WNANNEHBRREEDHVD4IVAOCHGT4SHT1Q4ZM0FWM3IQPEA2NNB';
	var clientSecret = '0QV0SFDCT3VULM5RBGCLQYRTLNC2PWG4TPUOR0WXQX3R5SPF';
  var apiUrl = 'https://api.foursquare.com/v2/venues/explore?';
  var key = 'client_id=' + clientID + '&client_secret=' + clientSecret;
  // var near = 'Toronto';
  // var search = '&v=20130815&near=' + near + '&query=coffee';

	return{
		// getCoffee: function(){
		// 	//creating a function that will be deferred until the success of my ajax call
		// 	var def = $q.defer();

		// 	//ajax call
		// 	$http.get(apiUrl + key + search)
		// 		.success(def.resolve)
		// 		.error(def.reject);

		// 		// returning whether the promise was resolved or rejected
		// 		return def.promise;
		// },
		search: function(location){
			//creating a function that will be deferred until the success of my ajax call
			var def = $q.defer();
				console.log(location);

			//ajax call
			$http.get(apiUrl + key + '&v=20130815&near=' + location + '&query=coffee' + '&venuePhotos=1')
				.success(def.resolve)
				.error(def.reject);

				// returning whether the promise was resolved or rejected
				return def.promise;

		}
	}


}); // end app.factory

app.controller('mainController', function($scope, myData, $q){

	// myData.search($scope.searchLocation).then(function(data){
	// 	$scope.data = data.response.groups[0].items
	// 	console.log($scope.data);
	// 	$scope.movies = data


	// });
		$scope.search = function(){
			myData.search($scope.searchLocation).then(function(data){
				$scope.data = data.response.groups[0].items;
				// $scope.dataPhoto = data.response.groups[0].items;
				// $scope.prefix = $scope.dataPhoto.venue.featuredPhotos.items
				// $scope.photo = $scope.dataPhoto.prefix + $scope.dataPhoto.height + $scope.dataPhoto.suffix;
				console.log($scope.data)

			});
		};

});