"use strict";

const carousel = $("#carousel");
const carouselDots = $("#carousel-dots");
var carouselData = [];
var carouselIndex = 0;

function moveCarousel() {
  const items = carousel.find(".carousel-img");
  items.each((index, item) => {
    item.style.transform = `translate(-50%, -50%) translateX(${(index - 1) * -101}%)`;
  });
  $("#carousel-dots .carousel-dot").removeClass("carousel-dot-active");
  const activeDotIndex =
    (carouselIndex + 1 + carouselData.length) % carouselData.length;
  $("#carousel-dots .carousel-dot")
    .eq(activeDotIndex)
    .addClass("carousel-dot-active");
  $("#carousel-button").data("url", carouselData[activeDotIndex].link);

  console.log("Active Dot Index:", activeDotIndex);
}

function carouselLeft() {
  const lastItem = $("#carousel .carousel-img:last");
  carousel.prepend(lastItem);
  moveCarousel();
  carouselIndex = (carouselIndex + 1) % carouselData.length;
}

function carouselInit() {
  carousel.empty();
  carousel.append("<div id='carousel-dots'></div>");
  const carouselButton = $(
    "<div id='carousel-button'><span>OPEN</span><img src='/images/carousel-arrow.svg' /></div>",
  );
  carouselButton.click(function () {
    window.open($(this).data("url"));
  });
  carousel.append(carouselButton);
  carouselData.forEach((item, index) => {
    $("#carousel-dots").append(`<div class="carousel-dot"></div>`);
  });
  carouselData.forEach((item, index) => {
    const elem = $(
      `<img class="carousel-img" src="/config/carousel-img/${carouselData.length - index - 1}.png" />`,
    ).data("index", index);
    if (carouselData.length - index - 1 == 1) {
      console.log(elem, "poo");
      carousel.prepend(elem);
    } else if (carouselData.length - index - 1 == 0) {
      $(".carousel-img").first().after(elem);
    } else {
      carousel.append(elem);
    }
  });
  moveCarousel();
  setTimeout(function () {
    carousel.find(".carousel-img").addClass("carousel-img-animated");
  }, 20);
  $("#carousel-button").data("url", carouselData[0].link);
  carouselIndex = 0;
  for (let i = 0; i < carouselData.length; i++) {
    carouselLeft();
  }
}

$(document).ready((e) => {
  $.getJSON("/config/carousel.json", (data) => {
    carouselData = data;
    carouselInit();
    setInterval(() => {
      carouselLeft();
    }, 6000);
  });
});
