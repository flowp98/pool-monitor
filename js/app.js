var app = angular.module('stalk', []);

app.controller('stalkController', ['$scope','$http', '$interval', '$timeout',
    function($scope, $http, $interval, $timeout){
      $scope.ip;
      $scope.infos = {};

      $scope.getIp = function(amount) {
        $http.get("https://api.ipify.org?format=json")
          .then(function (response) {
            $scope.ip = response.data.ip;
            $scope.getLocation($scope.ip);
          });
      };

      $scope.getLocation = function(ip) {
        $http.get("http://ip-api.com/json/" + ip)
          .then(function (response) {
            $scope.infos.ip = ip;
            $scope.infos.country = response.data.country;
            $scope.infos.countryCode = response.data.countryCode;
            $scope.infos.region = response.data.regionName;
            $scope.infos.regionCode = response.data.region;
            $scope.infos.city = response.data.city;
            $scope.infos.zip = response.data.zip;
            $scope.infos.lat = response.data.lat;
            $scope.infos.lon = response.data.lon;
            $scope.saveData();
          });
      };

      $scope.saveData = function() {
        $http.post("http://localhost:3000/api/add/infos", $scope.infos)
          .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(data);
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
          console.log("HERE");
          
      };

      $scope.getIp();
      $interval( function(){}, 30000);
    }
]);
