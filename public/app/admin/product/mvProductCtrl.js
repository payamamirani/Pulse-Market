angular.module('app').controller('mvProductCtrl' , function ($scope, mvProduct, mvCategory, mvNotifier, Upload) {
    $scope.Products = mvProduct.query();
    $scope.Categories = mvCategory.query();
    $scope.productCategories = {};

    $scope.Check = function (child) {
        $("input[type='checkbox'][data-value='" + child._id + "']").click();
    };

    $scope.orderByOrientation = true;
    $scope.myOrderBy = "CreatedOn";
    $scope.SortByMe = function (col) {
        $scope.myOrderBy = col;
        $scope.orderByOrientation = !$scope.orderByOrientation;
    };

    $scope.AddNew = function () {
        $("#AddProduct").modal('show');
        $scope.Id = $scope.productName = $scope.productCode = $scope.productPrice = $scope.productDescription = null;
        $scope.productCategories = {};
        $scope.method = "AddNew";
        $scope.files = null;
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
            case "Edit":
                productData.Id = $scope.Id;
                break;
        }

        Upload.upload({
            url: '/api/Products',
            arrayKey: '',
            data: { files: $scope.files, product: productData }
        }).then(function(resp){
            mvNotifier.successNotify(texts.SuccessAction, "");
            $("#AddProduct").modal('hide');
        }, function(resp){
            mvNotifier.errorNotify(texts.ErrorAction, response.data.reason);
        }, function(evt) {
            //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

        //var newProduct = new mvProduct(productData);

        /*newProduct.$save().then(function () {
                mvNotifier.successNotify(texts.SuccessAction, "");
                $("#AddProduct").modal('hide');
            },
            function (response) {
                mvNotifier.errorNotify(texts.ErrorAction, response.data.reason);
            }
        );*/
    };
});