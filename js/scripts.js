
var app = angular.module("myApp", []);

app.factory('myData', function($http, $q){
	var clientID = 'WNANNEHBRREEDHVD4IVAOCHGT4SHT1Q4ZM0FWM3IQPEA2NNB';
	var clientSecret = '0QV0SFDCT3VULM5RBGCLQYRTLNC2PWG4TPUOR0WXQX3R5SPF';
  var apiUrl = 'https://api.foursquare.com/v2/venues/explore?';
  var key = 'client_id=' + clientID + '&client_secret=' + clientSecret;

	return{

		search: function(location){
			//creating a function that will be deferred until the success of my ajax call
			var def = $q.defer();

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

		$scope.search = function(){
			myData.search($scope.searchLocation).then(function(data){
				$scope.data = data.response.groups[0].items;		
			});
		};

});

// filter to remove the http:// from urls
app.filter('httpReplace', function() {
	return  function(text) {
		if(text === undefined) {
			return text;
		}
		else {
			return text.replace(/https?:\/\//, '');
		}
	}
});

// when search button is clicked, scroll to the main section
$('.searchButton').on('click', function(event) {

    $('html, body').animate({
    scrollTop: $("#main").offset().top
}, 1250);

});