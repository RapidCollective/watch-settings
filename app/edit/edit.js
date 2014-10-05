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
    }];


    $scope.settingsDesigns = {
        "title": {
            "type": "title",
            "data": {
                "value": ""
            }
        },
        "text": {
            "type": "text",
            "data": {
                "value": ""
            }
        },
        "toggle": {
            "type": "toggle",
            "data": {
                "name": "",
                "id": ""
            }
        },
        "radio": {
            "type": "radio",
            "data": {
                "options": [{
                    "name": "",
                    "id": ""
                },
                {
                    "name": "",
                    "id": "",
                    "checked": ""
                }]
            }
        },
        "input": {
            "type": "input",
            "data": {
                "value": "",
                "placeholder": "",
                "id": ""
            }
        }
    };

    $scope.add = function(type){
        $scope.settingsList.push($scope.settingsDesigns[type]);
    }


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
