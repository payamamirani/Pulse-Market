angular.module('app').controller('mvNavbarCategoryCtrl', function($scope, mvCategory) {
    $scope.categories = mvCategory.query();
});