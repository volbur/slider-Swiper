import { Swiper, Parallax, Mousewheel, Controller } from "swiper";
Swiper.use([Parallax, Mousewheel, Controller]);

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
  });

  swiperIMG.controller.control = swiperText;
  swiperText.controller.control = swiperIMG;
});
