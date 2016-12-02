angular.module('app').factory('mvIdentity', function ($window) {
    var currenUser = undefined;
    if(!!$window.bootstrappedUserObject){
        currenUser = $window.bootstrappedUserObject[0];
    }
    return {
        currentUser: currenUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});