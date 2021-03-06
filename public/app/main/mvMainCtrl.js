angular.module('app').controller('mvMainCtrl', function ($scope) {
    $scope.myVar = "Hello Angular!";
    $("#MainSlider").sliderPro({
        width: '100%',
        height: 550,
        arrows: true,
        buttons: false,
        imageScaleMode: 'exact',
        fade: true,
        autoScaleLayers: false,
        thumbnailPointer: true,
        thumbnailWidth: 150,
        thumbnailHeight: 100,
        breakpoints: {
            985: {
                height: 350
            },
            760: {
                thumbnailWidth: 100,
                thumbnailHeight: 80,
                height: 250
            }
        }
    });
});