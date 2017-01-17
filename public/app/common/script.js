$(document).ready(function() {
    $("#myPanel #profile ul li").click(function() {
        $("#myPanel #profile ul li").removeClass('active');
        if(!$(this).hasClass('active'))
            $(this).addClass('active');
    });
});