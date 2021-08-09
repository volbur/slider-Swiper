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

import { gsap, Power2 } from "gsap";

import MicroModal from "micromodal";

document.addEventListener("DOMContentLoaded", () => {
  // Modal

  MicroModal.init({
    openTrigger: "data-micromodal-open",
    closeTrigger: "data-micromodal-close",
    disableFocus: true,
    disableScroll: true,
    awaitCloseAnimation: true,
    awaitCloseAnimation: true,
  });

  //Swiper

  const swiperIMG = new Swiper(".slider-img", {
    loop: false,
    speed: 2500,
    parallax: true,
    pagination: {
      el: ".slider-pagination-count .total",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        let totalRes = total >= 10 ? total : `0${total}`;
        return totalRes;
      },
    },
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

  //Gear

  let gear = document.querySelector(".slider-gear");

  swiperText.on("slideNextTransitionStart", function () {
    gsap.to(gear, 2.8, {
      rotation: "+=50",
      ease: Power2.easeOut,
    });
  });

  swiperText.on("slidePrevTransitionStart", function () {
    gsap.to(gear, 2.8, {
      rotation: "-=50",
      ease: Power2.easeOut,
    });
  });

  let curnum = document.querySelector(".slider-pagination-count .current"),
    pagcur = document.querySelector(".slider-pagination-current__num");

  swiperText.on("slideChange", function () {
    let ind = swiperText.realIndex + 1,
      indRes = ind >= 10 ? ind : `0${ind}`;
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: -10,
      opacity: 0,
      ease: Power2.easeOut,
      onComplete: function () {
        gsap.to(curnum, 0.1, {
          force3D: true,
          y: 10,
        });
        curnum.innerHTML = indRes;
        pagcur.innerHTML = indRes;
      },
    });
    gsap.to(curnum, 0.2, {
      force3D: true,
      y: 0,
      opacity: 1,
      ease: Power2.easeOut,
      delay: 0.3,
    });
  });

  //Cursor

  const body = document.querySelector("body"),
    cursor = document.getElementById("cursor"),
    links = document.getElementsByTagName("a");

  let mouseX = 0,
    mouseY = 0,
    posX = 0,
    posY = 0;

  function mouseCoords(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  gsap.to({}, 0.01, {
    repeat: -1,
    onRepeat: () => {
      posX += (mouseX - posX) / 6;
      posY += (mouseY - posY) / 6;
      gsap.set(cursor, {
        css: {
          left: posX,
          top: posY,
        },
      });
    },
  });

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseover", () => {
      cursor.classList.add("active");
    });

    links[i].addEventListener("mouseout", () => {
      cursor.classList.remove("active");
    });
  }

  body.addEventListener("mousemove", (e) => {
    mouseCoords(e);
    cursor.classList.remove("hidden");
  });

  body.addEventListener("mouseout", () => {
    cursor.classList.add("hidden");
  });
});
