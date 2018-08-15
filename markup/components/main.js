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


$('.new-type-gallery-top .swiper-slide').each(function(){
    var attrSlide = $(this).find('img').attr('src');
    $(".new-type-gallery-thumbs .swiper-slide img").attr('src', attrSlide);    
});

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
});



var galleryTop = new Swiper('.new-type-gallery-top', {
    spaceBetween: 30,
    
});
var galleryThumbs = new Swiper('.new-type-gallery-thumbs', {
    spaceAround: 30,
    centeredSlides: true,
    slidesPerView: 4,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;