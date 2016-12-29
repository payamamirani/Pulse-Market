angular.module('app').controller('mvCategoryCtrl', function($scope, mvCategory) {
    $scope.categories = mvCategory.query();
});