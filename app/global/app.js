'use strict';

angular.module('global').factory('App', ['$firebase', 'Auth', 'User', '$rootScope', function($firebase, Auth, User, $rootScope){

	var ref = new Firebase('https://watch-settings.firebaseio.com/apps');
	var apps = $firebase(ref);

	var App = {
		getAll: function(){
			return apps
		},
		findById: function(id){
			if(id){
				return apps.$child(id);
			}
		}
	}

	return App;
}]);
