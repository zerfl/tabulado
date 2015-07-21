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

.controller('ScanCtrl', function ($scope, Scan) {
    $scope.items = Scan.query();
/*
    $scope.addScan = function () { //create a new movie. Issues a POST to /api/movies
        $scope.scan.$save(function () {
            $scope.items = Scan.query();
        });
    };
*/
    $scope.doRefresh = function () {
        $scope.items = Scan.query(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.scan = function () {
        cordova.plugins.barcodeScanner.scan(
           function (result) {
               var date = new Date().toISOString();
               $scope.item = {
                   ean: result.text,
                   format: result.format,
                   date: date
               };
               $scope.$apply();

               $scope.newScan = function () {
                   var post = new Scan($scope.item);
                   post.$save(function () {
                       $scope.items = Scan.query();
                   });
               }



               /*$scope.lastmessage = $scope.addScan();
               //console.log($scope.lastmessage);
               //$scope.items = Scan.query();*/
           },
           function (error) {
               alert("Scanning failed: " + error);
           }
        );
    };

})
