var app = angular.module('xvg', []);

app.controller('xvgController', ['$scope','$http', '$interval',
    function($scope, $http, $interval){
      $scope.xvg = 0;
      $scope.priceDollar = 0;
      $scope.money = 0;
      $scope.hashrate = 0;
      $scope.balance = 0;
      $scope.urlPriceXvg = 'https://api.coinmarketcap.com/v1/ticker/verge/';
      $scope.urlApiYiimp = 'http://api.yiimp.eu/api/wallet?address=';
      $scope.apiKey = '';

      $scope.totalMined = 0;
      $scope.paidLast24h = 0;
      $scope.unpaid = 0;

      $scope.errorNumber = 0;
      $scope.errorClass = '';

      $scope.xvgToDollars = function(amount) {
        $http.get($scope.urlPriceXvg)
          .then(function (response) {
            $scope.priceDollar = response.data[0].price_usd;
            $scope.money = $scope.xvg*$scope.priceDollar;
          });
      };

      $scope.getInfosSuprnova = function(apiKey) {
        if ($scope.apiKey.length > 0) {
          $http.get('api/getInfosSuprnova.php?key='+$scope.apiKey)
            .then(function (response) {
              if (response.data.hashrate > 1 && response.data.balanceConfirmed > 1) {
                $scope.hashrate = response.data.hashrate;
                $scope.balance = response.data.balanceConfirmed;
                $scope.errorNumber = 0;
                $scope.errorClass = '';
              }
              else {
                if ($scope.errorNumber < 30) {
                  $scope.errorClass = 'bg-warning';
                }
                else {
                  $scope.errorClass = 'bg-danger';
                }
                $scope.errorNumber += 1;
              }
            });
          }
      };

      $scope.saveApiKeySuprnova = function(apiKey) {
        if ($scope.apiKey.length > 0) {
          $http.get('api/saveApiKey.php?apiKey=' + apiKey)
            .then(function (response) {
              if (response.data.status == 'success'){
                console.log('SUCCESS');
              }
              else {
                console.log('ERROR');
              }
            });
          }
      };

      $scope.getApiKeySuprnova = function() {
        $http.get('api/getApiKey.php')
          .then(function (response) {
            if (response.data.apiKey != 'NONE') {
              $scope.apiKey = response.data.apiKey;
              $scope.getInfosSuprnova($scope.apiKey);
            }
          });
      };

      $scope.xvgToDollars(0);
      $scope.getApiKeySuprnova();
      $interval( function(){ $scope.xvgToDollars($scope.xvg); $scope.getInfosSuprnova($scope.apiKey); }, 2000);
    }
]);
