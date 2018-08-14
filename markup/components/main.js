    $('#my-form').validate({
        rules: {
            email: {
                required: false,
                email: true,
            },
            phone: {
                required: true,
                 digits: true,
            },
            messages: {
                required: false,
            },
            name: {
                required: false,
            }
        },

        errorPlacement: function (error, element) {},

        submitHandler: function() {
            alert("Ожидайте звонка!");
        },

    });

    new WOW({
        mobile: false,
    }).init();

    $( ".tabs" ).tabs({
        hide: { effect: "fade", duration: 150 },
        show: { effect: "fade", duration: 150 },
    });
    var mySwiper = new Swiper('.new-client-slider', {
		spaceBetween: 0,
        slidesPerView: 6,
        loop: true,
        navigation: {
            nextEl: '.new-client-button-next',
            prevEl: '.new-client-button-prev',
        },
    });

    $('.new__img-cont').each(function(){
        var goodsImg = $(this).find('img').attr('src');
        $(this).css('background-image','url('+goodsImg+')');
        $(this).find('img').css('display', 'none');
    });
    