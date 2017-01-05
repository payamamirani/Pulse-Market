angular.module('app').factory('mvCaptcha', function() {
    return {
        refreshCaptcha: function() {
            $("#captcha").attr("src", "/captcha?" + new Date().getMilliseconds());
        }
    };
});