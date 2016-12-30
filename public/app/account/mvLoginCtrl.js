angular.module('app').controller('mvLoginCtrl', function($scope, mvAuth, mvNotifier, $location) {
    $scope.signin = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function (success) {
            if(success) {
                mvNotifier.successNotify('success', 'logged in!');
                $location.path('/');
            } else {
                mvNotifier.errorNotify('error', 'failed to log in!');
            }
        });
    };
});