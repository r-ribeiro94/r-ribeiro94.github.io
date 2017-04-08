var app = angular.module('myApp', []);

app.controller('PackagesController', function($scope, $http) {
    
    // Gets the JSON file to parse    
    $http.get('json/packages.json')
        .then(function sucessCallBack(res){
        $scope.package = res.data.packages;
        $scope.listofdetails = res.data.packages[0].list;
        console.log($scope.listofdetails);
    }, function errorCallBack(res){
        alert("Error. The JSON file did not upload!");
    });
            
});
