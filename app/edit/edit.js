'use strict';

angular.module('edit', []).controller('EditCtrl', ['$scope', 'App', '$routeParams', function($scope, App, $routeParams){

    // $scope.apps = App.getAll();

    // // Set experience on experiences load promise
    // $scope.experiences.$on('loaded', function(){
    //
    //     if(!!$scope.experiences[$routeParams.slug]){
    //         $scope.experience = $scope.experiences[$routeParams.slug];
    //         $scope.experienceState = $scope.experience.state;
    //     } else {
    //         // $location.path('/dashboard');
    //     }
    // });

    $scope.app = App.findById($routeParams.appId);

    $scope.imageOptions = [
        "images/combo-lock.svg",
        "images/globe.svg",
        "images/gear.svg",
        "images/keyhole.svg",
        "images/locked.svg",
        "images/cloud.svg" ];

    $scope.colorOptions = [
        "ef4121",
        "3498DB",
        "C0392B",
        "8E44AD",
        "2C3E50"
    ]

    $scope.changeImage = function(href){
        $scope.landing.image = href;
    }

    $scope.changeColor = function(color){
        $scope.landing.color = color;
    }

    $scope.app.$on('loaded', function(){
        $scope.name = $scope.app.name;
        $scope.landing = $scope.app.configuration.landing;
    });

}])
