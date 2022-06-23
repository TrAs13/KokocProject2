$(function () {
  $(".slider").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    // fade: true,
    // cssEase: 'linear'
  });
});

$(function () {
  $(".slider-gallary").slick({
    dots: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false
      }
    }],
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: false
      }
    }],
    slidesToShow: 2,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    mobileFirst: true,
   
    // fade: true,
    // cssEase: 'linear'
  });
});

$(function () {
  $(".slider-testimonials").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // fade: true,
    // cssEase: 'linear'
  });
});

