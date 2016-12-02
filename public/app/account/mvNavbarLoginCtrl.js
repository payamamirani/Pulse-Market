angular.module('app').controller('mvNavbarLoginCtrl', function ($scope, mvNotifier, mvIdentity, mvAuth) {
   $scope.identity = mvIdentity;
   $scope.signin = function (username, password) {
       mvAuth.authenticateUser(username, password).then(function (success) {
           if(success) mvNotifier.successNotify('success', 'logged in!');
           else        mvNotifier.errorNotify('error', 'failed to log in!');
       });
   };
});