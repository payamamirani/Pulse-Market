angular.module('app').controller('mvSignupCtrl', function($scope,mvAuth,mvNotifier,$location) {
    $scope.signup = function () {
        var newUserData = {
            Username: $scope.email,
            Password: $scope.password,
            FirstName: $scope.firstName,
            LastName: $scope.lastName
        };

        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.successNotify("Success", "User account created!");
            $location.path("/");
        }, function(reason) {
            mvNotifier.errorNotify("Error", reason);
        });
    }
});
