$(function () {
    // // $('.first').fadeOut(2000);
    // $('.first').fadeIn(4000);

    $('.first').on('click', function () {
        $(this).addClass('animated flipInY').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            function () {
                $(this).removeClass('animated flipInY');
            });
    });

})