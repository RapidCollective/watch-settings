'use strict';

var watchSettings = angular.module('watchSettings', [
	'ngRoute',
	'ngAnimate',
	'home'
])

watchSettings.config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

}]);
