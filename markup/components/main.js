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


// $('.new-type-gallery-top .swiper-slide').each(function(){
//     var attrSlide = $(this).find('img').attr('src');
//     $(".new-type-gallery-thumbs .swiper-slide img").attr('src', attrSlide);    
// });

$('.new__img-cont').each(function(){
    var goodsImg = $(this).find('img').attr('src');
    $(this).css('background-image','url('+goodsImg+')');
    $(this).find('img').css('display', 'none');
});
var mySwiper = new Swiper('.new-client-slider', {
    spaceBetween: 0,
    slidesPerView: 6,
    loop: true,
    navigation: {
        nextEl: '.new-client-button-next',
        prevEl: '.new-client-button-prev',
    },
    breakpoints:{
        768: {
            slidesPerView: 4,
        },
        600: {
            slidesPerView: 2,
        },
        320: {
            slidesPerView: 1,
        },
    },
});



var galleryTop = new Swiper('.new-type-gallery-top',{
});
var galleryThumbs = new Swiper('.new-type-gallery-thumbs', {
    spaceBetween: 40,
    slidesPerView: 4,
    centeredSlides: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.new-type-button-prev',
        prevEl: '.new-type-button-next',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    }
});

galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;

galleryThumbs.slideTo(2);