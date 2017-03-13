angular.module('app').controller('mvProductCtrl' , function ($scope, mvProduct, mvCategory, mvNotifier) {
    $scope.Products = mvProduct.query();
    $scope.Categories = mvCategory.query();
    $scope.productCategories = {};
    $scope.myDropZone = {};

    $("#my-awesome-dropzone").dropzone({
        url: '/upload-file' ,
        addRemoveLinks: true ,
        autoProcessQueue: false ,
        init: function () {
            $scope.myDropZone = this;
            $scope.myDropZone.on("sending", function(file, xhr, formData) {
                formData.append("productId", $scope.productId);
            });
            $scope.myDropZone.on("complete", function(file) {
                $scope.myDropZone.removeFile(file);
            });
        }
    });

    $scope.Check = function (child) {
        $("input[type='checkbox'][data-value='" + child._id + "']").click();
    };

    $scope.AddNew = function () {
        $("#AddProduct").modal('show');
        $scope.Id = $scope.productName = $scope.productCode = $scope.productPrice = $scope.productDescription = null;
        $scope.productCategories = {};
        $scope.method = "AddNew";
        $scope.ModalTitle = texts.AddProduct;
    };

    $scope.SaveProduct = function() {
        var productData = {
            Name: $scope.productName,
            Code: $scope.productCode,
            Price: $scope.productPrice,
            Description: $scope.productDescription,
            Categories : []
        };
        $.each($scope.productCategories ,function(index, value) {
            if(value === true)
                productData.Categories.push(index.toString());
        });
        switch ($scope.method) {
            case "EditNew":
                productData.Id = $scope.Id;
                break;
        }

        var newProduct = new mvProduct(productData);

        if ($scope.method !== "EditNew") {
            newProduct.$save().then(function (productId) {
                mvNotifier.successNotify(texts.SuccessAction, "");
                UploadImage(productId);
                $("#AddProduct").modal('hide');
            }, function (response) {
                mvNotifier.errorNotify(texts.ErrorAction, response.data.reason);
            })
        } else {
            newProduct.$update().then(function (productId) {
                mvNotifier.successNotify(texts.SuccessAction, "");
                UploadImage(productId);
                $("#AddProduct").modal('hide');
            }, function (response) {
                mvNotifier.errorNotify(texts.ErrorAction, response.data.reason);
            })
        }
    };

    var UploadImage = function(productId) {
        $scope.productId = productId;
        $scope.myDropZone.processQueue();
    };

});