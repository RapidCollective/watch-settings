'use strict';

angular.module('global', []).factory('Auth', ['$firebaseSimpleLogin', '$rootScope', function($firebaseSimpleLogin, $rootScope){

    var ref = new Firebase('https://watch-settings.firebaseio.com/');
    var auth = $firebaseSimpleLogin(ref);

    var Auth = {
        register: function(user){
            return auth.$createUser(user.email, user.password);
        },
        signedIn: function(){
            return auth.user !== null;
        },
        login: function(user){
            return auth.$login('password', user);
        },
        githubLogin: function(user){

            return auth.$login('github');
        },
        logout: function(){
            auth.$logout();
        }
    }

    $rootScope.signedIn = function(){
        return Auth.signedIn();
    }

    return Auth;

}]);
