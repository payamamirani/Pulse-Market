angular.module('app').controller('mvNavbarCtrl', function ($scope, mvNotifier, mvIdentity, mvAuth, $location) {
   $scope.identity = mvIdentity;
   $scope.logout = function () {
       mvAuth.logoutUser().then(function() {
           $scope.password = $scope.username = "";
           $(".modal-backdrop").remove();
           mvNotifier.infoNotify("Info", "You have successfully signed out!");
           $location.path('/');
       });
   };
});