function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 10,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // --- RED PANEL ---
  gsap.from(".line-1", {
    scrollTrigger: {
      trigger: ".line-1",
      scroller: ".main",
      scrub: true,
      start: "top bottom",
      end: "top top",
      onUpdate: (self) => console.log(self.direction),
    },
    scaleX: 0,
    transformOrigin: "left center",
    ease: "none",
  });

  // --- ORANGE PANEL ---
  gsap.from(".line-2", {
    scrollTrigger: {
      trigger: ".orange",
      scroller: ".main",
      scrub: true,
      pin: true,
      start: "top top",
      end: "+=100%",
    },
    scaleX: 0,
    transformOrigin: "left center",
    ease: "none",
  });

  // --- PURPLE/GREEN PANEL ---
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".purple",
      scroller: ".main",
      scrub: true,
      pin: true,
      start: "top top",
      end: "+=100%",
    },
  });

  tl.from(".purple p", {
    scale: 0.3,
    rotation: 45,
    autoAlpha: 0,
    ease: "power2",
  })
    .from(
      ".line-3",
      { scaleX: 0, transformOrigin: "left center", ease: "none" },
      0
    )
    .to(".purple", { backgroundColor: "#28a92b" }, 0);

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function cursor_effect() {
  var pg1Content = document.querySelector(".pg1-content");
  var cursor = document.querySelector(".cursor");

  pg1Content.addEventListener("mousemove", function (dets) {
    // cursor.style.left = dets.x + "px";   //its pure JS effect
    // cursor.style.top = dets.y + "px";      //its pure JS effect
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  /* pg1Content.addEventListener("mouseenter", function () {
    cursor.style.scale = "1";
  });
  pg1Content.addEventListener("mouseleave", function () {
    cursor.style.scale = "0";
  }); */ //its pure js code

  pg1Content.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  pg1Content.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
function cursor_effect_pg4() {
  var pg4 = document.querySelector(".pg4");
  var cursor = document.querySelector(".pg4-cursor");

  pg4.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });

  pg4.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
  pg4.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
function loader() {
  let tl = gsap.timeline();
  tl.from(".loader h4", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  });
  tl.to(".loader h4", {
    opacity: 0,
    stagger: 0.1,
    x: -10,
    duration: 1,
  });

  tl.to(".loader", {
    display: "none",
    opacity: 0,
  });
  // let tl = gsap.timeline();
  tl.from(".pg1-content h1 span", {
    y: 100,
    stagger: 0.1,
    opacity: 0,
    duration: 1,
  });

  tl.from(".footer .ft3 h1 span", {
    y: -100,
    stagger: 0.1,
    opacity: 0,
    duration: 1,
  });
}

function pg2_h1() {
  gsap.from(".pg2-nav-content h5", {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".pg2",
      scroller: ".main",
      start: "top 47%",
      end: "top 46%",
      markers: true,
      scrub: 2,
    },
  });
}

function pg2_h4() {
  gsap.from(".pg2 h4 span", {
    y: 100,
    stagger: 0.1,
    duration: 1,
    scrollTrigger: {
      trigger: ".pg2 h4",
      scroller: ".main",
      start: "top 47%",
      end: "top 46%",
      markers: true,
      scrub: 2,
    },
  });
}

function pg5_h5() {
  gsap.from(".pg5 h5", {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".pg5",
      scroller: ".main",
      start: "top 47%",
      end: "top 45%",
      markers: true,
      scrub: 2,
    },
  });
}
function pg5_h3() {
  gsap.from(".pg5 h3 span", {
    y: 100,
    stagger: 0.1,
    duration: 1,
    scrollTrigger: {
      trigger: ".pg5 h3",
      scroller: ".main",
      start: "top 47%",
      end: "top 45%",
      markers: true,
      scrub: 2,
    },
  });
}

function swiper() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4.2,
    spaceBetween: 10,
    loop: true,
    mousewheel: true,
    keyboard: true,
  });
}

function footer() {
  gsap.from(".footer .ft3 h1 span", {
    x: -200,
    stagger: 0.15,
    duration: 1,
    scrollTrigger: {
      trigger: ".footer .ft1",
      scroller: ".main",
      start: "left 47px",
      end: "left 54px",
      markers: true,
      scrub: 2,
    },
  });
}
locomotive();
cursor_effect();
cursor_effect_pg4();
loader();
pg2_h1();
pg2_h4();
pg5_h5();
pg5_h3();
swiper();
footer();
