angular.module('app').factory('mvCategory', function ($resource) {
    var CategoryResource = $resource('/api/Categories/:id', {_id: "@id"}, {
        update: { method: 'PUT', isArray: false }
    });

    return CategoryResource;
});