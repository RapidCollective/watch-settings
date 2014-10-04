'use strict';

angular.module('home', []).controller('HomeCtrl', ['$scope', 'Auth', 'User', '$location', function($scope, Auth, User, $location){

    $scope.signedIn = User.signedIn();

    $scope.$on('$firebaseSimpleLogin:login', function () {

        $location.path('/dashboard');

    });

    $scope.githubLogin = function(){
        Auth.githubLogin().then(function(user){

            console.log(user);

            if(!User.findByUid(user.uid).uid){

                User.createFacebook(user);

            }

        }, function(error){
            console.log(error);
        });
    };

    $scope.signup = function(){

        Auth.login($scope.user).then(function(user){

            // Success

        }, function(error){

            if (error = 'INVALID_EMAIL') {

                Auth.register($scope.user).then(function(user){

                    // Create User

                    User.create(user);

                    $scope.login();

                }, function(error){

                    // Problem creating user

                });

            } else if (error = 'INVALID_PASSWORD') {

                // Invalid Password

            } else {
                console.log(error);
            }

        });

    }

    $scope.login = function(){
        Auth.login($scope.user).then(function(user){

            // Success

        }, function(error){

            if (error = 'INVALID_EMAIL'){

                // Email doesn't exist

            } else if (error = 'INVALID_PASSWORD'){

                // Invalid Password

            } else {
                console.log(error);
            }

        });
    }

    $scope.signOut = function(){
        Auth.logout();
    }

}]);
