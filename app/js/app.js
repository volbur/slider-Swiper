import {
  Swiper,
  Parallax,
  Mousewheel,
  Controller,
  Pagination,
  Scrollbar,
  Navigation,
} from "swiper";
Swiper.use([
  Parallax,
  Mousewheel,
  Controller,
  Pagination,
  Scrollbar,
  Navigation,
]);

document.addEventListener("DOMContentLoaded", () => {
  const swiperIMG = new Swiper(".slider-img", {
    loop: false,
    speed: 2500,
    parallax: true,
  });

  const swiperText = new Swiper(".slider-text", {
    loop: false,
    speed: 2500,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  swiperIMG.controller.control = swiperText;
  swiperText.controller.control = swiperIMG;
});
