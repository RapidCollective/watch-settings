'use strict';

var watchSettings = angular.module('watchSettings', [
	'ngRoute',
	'ngAnimate',
	'firebase',
	'global',
	'home',
	'dashboard',
	'edit'
])

watchSettings.config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    })
	.when('/log-in', {
		templateUrl: 'home/log-in.html',
		controller: 'HomeCtrl'
	})
	.when('/sign-up', {
		templateUrl: 'home/sign-up.html',
		controller: 'HomeCtrl'
	})
	.when('/dashboard', {
		templateUrl: 'dashboard/dashboard.html',
		controller: 'DashboardCtrl'
	})
	.when('/edit/:appId', {
		templateUrl: 'edit/edit.html',
		controller: 'EditCtrl'
	})
    .otherwise({
        redirectTo: '/'
    });

}]);
