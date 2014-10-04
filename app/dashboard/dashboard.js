'use strict';

angular.module('dashboard', []).controller('DashboardCtrl', ['$scope', 'App', 'User', function($scope, App, User){

    $scope.apps = App.getAll();
    $scope.user = User.findByUid('simplelogin:30');

}])
// .filter('hasPermission', ['User', 'App', function(User, App){
//
//     return function(input){
//         console.log(input);
//         var apps = App.getAll();
//         var result = [];
//
//         angular.forEach(input, function(app){
//             // console.log(apps.$child('ttmm'));
//             // console.log(App.findById(app));
//         //     result.push(App.getAll().$child(app));
//         });
//         return result;
//     };
// }]);
