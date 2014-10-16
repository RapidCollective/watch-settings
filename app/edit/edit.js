'use strict';

angular.module('edit', []).controller('EditCtrl', ['$scope', 'App', '$routeParams', '$firebase', function($scope, App, $routeParams, $firebase){

    // var devicesRef = new Firebase('https://watch-settings.firebaseio.com/apps/' + $routeParams.appId + '/settingsList');
    // $scope.fbSettings = $firebase(devicesRef);

    $scope.tab = $routeParams.tab;

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
            "text": "Settings"
        }
    },
    {
        "type": "text",
        "data": {
            "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    },
    {
        "type": "toggle",
        "data": {
            "text": "Show Ads",
            "id": "showAds"
        }
    }];


    $scope.settingsDesigns = {
        "title": {
            "type": "title",
            "data": {
                "text": ""
            }
        },
        "text": {
            "type": "text",
            "data": {
                "text": ""
            }
        },
        "toggle": {
            "type": "toggle",
            "data": {
                "text": "",
                "id": ""
            }
        },
        "radio": {
            "type": "radio",
            "data": {
                "options": [{
                    "text": "",
                    "id": ""
                },
                {
                    "text": "",
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

    // $scope.fbSettings.$bind($scope, 'settingsList');

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

        SVGInjector($('img[data-inject="svg"]'));
    });

}])

.directive('landingTab', ['$location', '$timeout', function($location, $timeout) {
    return {
        restrict:'A',
        controller: 'EditCtrl',
        templateUrl: 'edit/landing.html',
        link: function(scope, element, attrs) {

        }
    }
}])

.directive('oauthTab', ['$location', '$timeout', function($location, $timeout) {
    return {
        restrict:'A',
        controller: 'EditCtrl',
        templateUrl: 'edit/oauth.html',
        link: function(scope, element, attrs) {

        }
    }
}])

.directive('settingsTab', ['$location', '$timeout', function($location, $timeout) {
    return {
        restrict:'A',
        controller: 'EditCtrl',
        templateUrl: 'edit/settings.html',
        link: function(scope, element, attrs) {

        }
    }
}])

.directive('reviewTab', ['$location', '$timeout', function($location, $timeout) {
    return {
        restrict:'A',
        controller: 'EditCtrl',
        templateUrl: 'edit/review.html',
        link: function(scope, element, attrs) {

        }
    }
}])
