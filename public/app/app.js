angular.module('app', ['ngResource', 'ngRoute', 'ui.tree']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleCheck = {
        admin: {
            auth: function (mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function(mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }
        },
        nouser: {
            auth: function(mvAuth) {
                return mvAuth.authorizeNotAuthenticatedUserForRoute();
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users' , { templateUrl: '/partials/admin/user-list' , controller: 'mvUserListCtrl',
            resolve: routeRoleCheck.admin })
        .when('/admin/category', { templateUrl: '/partials/admin/category/category', controller: 'mvCategoryCtrl',
            resolve: routeRoleCheck.admin })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl',
            resolve: routeRoleCheck.nouser })
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'mvProfileCtrl',
            resolve: routeRoleCheck.user });
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});