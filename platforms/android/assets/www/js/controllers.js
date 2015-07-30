angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login, yep', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

.controller('ScanCtrl', function ($scope, Api) {
    //$scope.items = Scan.query();

    $scope.getProduct = function (ean) {
        $scope.products = Api.Product.query({ ean: ean }, function () {
            console.log($scope.product);
        });
        $scope.$apply();
    };

    $scope.scan = function () {
        cordova.plugins.barcodeScanner.scan(
           function (result) {
               var date = new Date().toISOString();
               $scope.ean = result.text;
               $scope.getProduct(result.text);
               $scope.newScan = function () {
                   /*post.$save(function () {
                       $scope.items = Scan.query();
                   });*/
               }

           },
           function (error) {
               alert("Scanning failed: " + error);
           }
        );
    };

})

