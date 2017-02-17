angular.module('app').controller('mvProductCtrl' , function ($scope, mvProduct, mvCategory) {
    $scope.Products = mvProduct.query();
    $scope.Categories = mvCategory.query();
    $scope.productCategories = {};

    $("#my-awesome-dropzone").dropzone({
        url: '/upload-file',
        addRemoveLinks: true
    });

    $scope.Check = function (child) {
        $("input[type='checkbox'][data-value='" + child._id + "']").click();
    };



    $scope.AddNew = function () {
        $("#AddProduct").modal('show');
        $scope.Id = null;
        $scope.Name = null;
        $scope.method = "AddNew";
        $scope.ModalTitle = texts.AddProduct;
    };
});