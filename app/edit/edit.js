'use strict';

angular.module('edit', []).controller('EditCtrl', ['$scope', 'App', '$routeParams', function($scope, App, $routeParams){

    $scope.app = App.findById($routeParams.appId);

    $scope.imageOptions = [
        "images/combo-lock.svg",
        "images/globe.svg",
        "images/gear.svg",
        "images/keyhole.svg",
        "images/locked.svg",
        "images/cloud.svg"
    ];

    $scope.colorOptions = [
        "ef4121",
        "3498DB",
        "C0392B",
        "8E44AD",
        "2C3E50"
    ];

    $scope.settingsList = [{
        "type": "title",
        "data": {
            "value": "Settings"
        }
    },
    {
        "type": "text",
        "data": {
            "value": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    },
    {
        "type": "toggle",
        "data": {
            "name": "Show Ads",
            "id": "showAds"
        }
    },
    {
        "type": "title",
        "data": {
            "value": "Color"
        }
    },
    {
        "type": "radio",
        "data": {
            "options": [{
                "name": "Blue",
                "id": "blue"
            },
            {
                "name": "Green",
                "id": "green",
                "checked": "checked"
            },
            {
                "name": "Red",
                "id": "red"
            }]
        }
    },
    {
        "type": "title",
        "data": {
            "value": "Some Setting"
        }
    },
    {
        "type": "input",
        "data": {
            "value": "Case Sandberg",
            "placeholder": "Your Name",
            "id": "name"
        }
    }];


    $scope.delete = function(index){
        delete $scope.settingsList[index];
    }

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
