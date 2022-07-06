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
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
      },
      {
        breakpoint: 568,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
      }
  ]
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

