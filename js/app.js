var app = angular.module('minerMonitor', ['chart.js']);

app.controller('minerMonitorController', ['$scope','$http', '$interval', '$timeout',
    function($scope, $http, $interval, $timeout){
      $scope.currency = 0;
      $scope.priceDollar = 0;
      $scope.priceBitcoin = 0;
      $scope.priceSatoshi = 0;
      $scope.change1h = 0;
      $scope.change24h = 0;
      $scope.change7d = 0;

      $scope.money = 0;
      $scope.hashrate = 0;
      $scope.balance = 0;
      $scope.workers = [];
      $scope.labelsGraphStatsWorkers = [];
      $scope.dataGraphStatsWorkers = [];
      $scope.dataHashrate = [[]];
      $scope.labelsHashrate = [];
      $scope.graphOptionsHashrate = {scales: {
                                      yAxes: [{
                                          display: true,
                                          ticks: {
                                              beginAtZero: true
                                          }
                                      }],
                                      xAxes: [{
                                          display: false
                                      }]}
                                    };

      $scope.currency = "rvn";
      $scope.apiKey = '';
      $scope.miningPool = 'suprnova';

      $scope.saveSuccessful = false;
      $scope.saveError = false;

      $scope.totalMined = 0;
      $scope.paidLast24h = 0;
      $scope.unpaid = 0;

      $scope.theme = 'clear-theme';
      $scope.sound = 'off';

      $scope.errorNumber = 0;
      $scope.errorClass = '';

      $scope.currencyToDollar = function(amount) {
        $http.get("api/getPrice.php?currency=" + $scope.currency)
          .then(function (response) {
            $scope.priceDollar = response.data.dollar;
            $scope.money = $scope.currency*$scope.priceDollar;
            $scope.change1h = response.data.change1h;
            $scope.change24h = response.data.change24h;
            $scope.change7d = response.data.change7d;
          });
      };

      $scope.currencyToBitcoin = function(amount) {
        $http.get("api/getPrice.php?currency=" + $scope.currency)
          .then(function (response) {
            $scope.priceBitcoin = response.data.bitcoin;
            var re = new RegExp("0.(0){1,7}");
            $scope.priceSatoshi = $scope.priceBitcoin.replace(re, "");
          });
      };

      $scope.getInfos = function(apiKey) {
        if ($scope.miningPool == 'suprnova') {
          $scope.getInfosSuprnova(apiKey);
        } else if ($scope.miningPool == 'yiimp') {

        } else if ($scope.miningPool == 'elitehash') {
          $scope.getInfosElitehash(apiKey);
        }
      };

      $scope.getInfosSuprnova = function(apiKey) {
        if ($scope.apiKey.length > 0) {
          $http.get('api/getInfosSuprnova.php?key='+$scope.apiKey+'&currency='+$scope.currency+'&algo=nochoice')
            .then(function (response) {
              $scope.hashrate = response.data.hashrate;
              $scope.balance = response.data.balanceConfirmed;

              $scope.workers = response.data.workers;
              for (var i = 0; i < $scope.workers.length; i++) {
                $scope.dataGraphStatsWorkers[i] = $scope.workers[i].hashrate;
                $scope.labelsGraphStatsWorkers[i] = $scope.workers[i].username;
              }

              $scope.dataHashrate[0].push(response.data.hashrate/1000);
              $scope.labelsHashrate.push($scope.dataHashrate[0].length);
              //console.log($scope.dataHashrate);
            });
          }
      };

      $scope.getInfosElitehash = function(apiKey) {
        if ($scope.apiKey.length > 0) {
          $http.get('api/getInfosElitehash.php?key='+$scope.apiKey+'&currency='+$scope.currency+'&algo=nochoice')
            .then(function (response) {
                $scope.hashrate = response.data.hashrate;
                $scope.balance = response.data.balanceConfirmed;
                $scope.workers = [];

                $scope.dataHashrate[0].push(response.data.hashrate/1000);
                $scope.labelsHashrate.push($scope.dataHashrate[0].length);
            });
          }
      };

      $scope.saveInfos = function() {
        $http.get('api/saveInfos.php?apiKey=' + $scope.apiKey + '&currency=' + $scope.currency + '&pool=' + $scope.miningPool)
          .then(function (response) {
            if (response.data.status == 'success'){
              $scope.saveSuccessful = true;
              $timeout( function(){
                  $scope.saveSuccessful = false;
              }, 5000 );
            }
            else {
              $scope.saveError = true;
              $timeout( function(){
                  $scope.saveError = false;
              }, 5000 );
            }
          });
      };

      $scope.getSavedInfos = function() {
        $http.get('api/getInfos.php')
          .then(function (response) {
            if (response.data.apiKey != 'NONE') {
              $scope.apiKey = response.data.apiKey;
            }
            if (response.data.currency != 'NONE') {
              $scope.currency = response.data.currency;
            }
            if (response.data.pool != 'NONE') {
              $scope.miningPool = response.data.pool;
            }
            $scope.getInfos($scope.apiKey);
          });
      };

      $scope.switchTheme = function() {
        if ($scope.theme == 'clear-theme') {
          $scope.theme = 'dark-theme';
        }
        else {
          $scope.theme = 'clear-theme';
        }
      };

      $scope.switchSound = function() {
        if ($scope.sound == 'off') {
          $scope.sound = 'on';
        }
        else {
          $scope.sound = 'off';
        }
      };

      $scope.resetGraphsData = function() {
        $scope.dataHashrate[0] = [];
        $scope.labelsHashrate = [];
      };

      $scope.currencyToDollar(0);
      $scope.currencyToBitcoin(0);
      $scope.getSavedInfos();
      $interval( function(){ $scope.currencyToDollar($scope.currency); $scope.currencyToBitcoin($scope.currency); $scope.getInfos($scope.apiKey); }, 30000);
    }
]);
