angular.module('app').controller('mvCategoryCtrl', function($scope, mvCategory, mvCategoryObject, mvNotifier) {
    $scope.categories = mvCategoryObject;
    $scope.SaveCategory = function () {
        var categoryData = {
            Title: $scope.categoryName
        };

        switch ($scope.method) {
            case "AddChild":
                categoryData.ParentId = $scope.parentId;
                break;
            case "EditNode":
                categoryData.Id = $scope.Id;
                categoryData.ParentId = $scope.parentId;
                break;
        }

        var newCategory = new mvCategory(categoryData);
        if ($scope.method !== "EditNode") {
            newCategory.$save().then(function () {
                mvNotifier.successNotify(texts.SuccessAction, "");
                mvCategoryObject.refresh();
                $("#AddCategory").modal('hide');
            }, function (response) {
                mvNotifier.errorNotify(texts.ErrorAction, response.data.reason);
            })
        } else {
            newCategory.$update().then(function () {
                mvNotifier.successNotify(texts.SuccessAction, "");
                mvCategoryObject.refresh();
                $("#myPanel").modal('hide');
            }, function (response) {
                mvNotifier.errorNotify(texts.ErrorAction, response.data.reason);
            })
        }
    };

    $scope.AddNew = function () {
        $("#AddCategory").modal('show');
        $scope.parentId = null;
        $scope.Id = null;
        $scope.categoryName = null;
        $scope.method = "AddNew";
        $scope.ModalTitle = texts.AddCategory;
    };
    $scope.AddChild = function (category) {
        $("#AddCategory").modal('show');
        $scope.parentId = category._id;
        $scope.Id = null;
        $scope.categoryName = null;
        $scope.method = "AddChild";
        $scope.ModalTitle = texts.AddChildCategory;
    };
    $scope.EditNode = function (category) {
        $("#AddCategory").modal('show');
        $scope.parentId = !category.IsRoot ? "Edit Child" : null;
        $scope.Id = category._id;
        $scope.categoryName = category.Title;
        $scope.method = "EditNode";
        $scope.ModalTitle = texts.EditCategory;
    };
    $scope.DeleteChild = function (category) {

    };
});