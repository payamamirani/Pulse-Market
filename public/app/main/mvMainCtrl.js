angular.module('app').controller('mvMainCtrl', function ($scope) {
    $scope.myVar = "Hello Angular!";
    $("#MainSlider").sliderPro({
        width: '100%',
        height: 550,
        arrows: true,
        buttons: false,
        imageScaleMode: 'exact',
        waitForLayers: true,
        fade: true,
        autoScaleLayers: false,
        thumbnailPointer: true
    });
});