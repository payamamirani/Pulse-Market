angular.module('app').factory('mvCategoryObject', function (mvCategory) {
    var categories = mvCategory.query();
    return {
        categories: categories,
        refresh: function () {
            this.categories = mvCategory.query();
        }
    }
});