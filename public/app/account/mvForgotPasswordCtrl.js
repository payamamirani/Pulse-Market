angular.module('app').controller('mvForgotPasswordCtrl', function($scope, mvAuth, mvNotifier, mvCaptcha) {
    $scope.refreshCaptcha = function() {
        mvCaptcha.refreshCaptcha();
    };
    $scope.resetPassword = function (username, captcha) {
        mvAuth.resetPassword(username, captcha).then(function() {
            mvNotifier.successNotify(texts.SuccessAction, texts.SuccessResetPassword);
        }, function(error) {
            mvNotifier.errorNotify(texts.ErrorAction, !!error ? error : texts.ErrorResetPassword);
        });
    }
});