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
    var mySwiper = new Swiper('.swiper-container', {
		spaceBetween: 30,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
    });