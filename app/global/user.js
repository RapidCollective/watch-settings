'use strict';

angular.module('global').factory('User', ['$firebase', 'Auth', '$rootScope', function($firebase, Auth, $rootScope){

	var ref = new Firebase('https://watch-settings.firebaseio.com/users');
	var users = $firebase(ref);

	var User = {
		create: function(user){
            users[user.uid] = {
                id: user.id,
                uid: user.uid,
                provider: user.provider,
                email: user.email
            };

            users.$save(user.uid).then(function(){
                setCurrentUser(user.uid);
            });
        },
        createFacebook: function(user){
            users[user.uid] = {
                id: user.id,
                uid: user.uid,
                provider: user.provider,
                email: user.thirdPartyUserData.email
            };

            users.$save(user.uid).then(function(){
                setCurrentUser(user.uid);
            });
        },
		findByUid: function(uid){
			if(uid){
				return users.$child(uid);
			}
		},
		getCurrent: function(){
			return $rootScope.currentUser;
		},
		signedIn: function(){
			return $rootScope.currentUser !== undefined;
		}
	}

	function setCurrentUser(uid){
        // alertify.log('Set Current User: ' + uid);
		$rootScope.currentUser = User.findByUid(uid);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(event, authUser){

		setCurrentUser(authUser.uid);

	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function(){
        // alertify.log('current user = undefined');
		delete $rootScope.currentUser;
	});

	return User;
}]);
