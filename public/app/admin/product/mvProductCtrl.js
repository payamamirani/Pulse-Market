angular.module('app').controller('mvProductCtrl' , function ($scope, mvProduct, mvCategory) {
    $scope.Products = mvProduct.query();
    $scope.Categories = mvCategory.query();
    $scope.productCategories = {};
    $scope.myDropZone = {};

    $("#my-awesome-dropzone").dropzone({
        url: '/upload-file' ,
        addRemoveLinks: true ,
        autoProcessQueue: true ,
        init: function () {
            $scope.myDropZone = this;
            $scope.myDropZone.on("sending", function(file, xhr, formData) {
                debugger;
                formData.append("productId", "1234");
            });
            $scope.myDropZone.on("complete", function(file) {
                //$scope.myDropZone.removeFile(file);
            });
        }
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

    $scope.SaveProduct = function(){
        debugger;
        $scope.productId = "1234";
        $scope.myDropZone.processQueue();
    }
});