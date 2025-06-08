function Marquee(selector, speed) {
  const marqueeElements = document.querySelectorAll(selector);

  marqueeElements.forEach((marqueeElement) => {
    let i = 0,
      interval;
    const firstElement = marqueeElement.children[0];
    const start = () =>
      (interval = setInterval(
        () =>
          (firstElement.style.marginLeft = `-${
            (i += speed) % firstElement.clientWidth
          }px`),
        10
      ));
    start();
  });
}
window.addEventListener("load", () => Marquee(".marquee", 1));

// Initialize Lenis smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Integrate Lenis with GSAP
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Optional: Sync Lenis with GSAP ScrollTrigger if you plan to use it
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Landing page animations
window.addEventListener("load", () => {
  // Animate navbar floating down
  gsap.from(".navbar-glass", {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  // Animate social links with stagger
  gsap.from(".navbar-social-link", {
    opacity: 0,
    y: -20,
    duration: 0.5,
    stagger: 0.13,
    delay: 0.25,
    ease: "power2.out",
  });

  // Existing landing text animations
  gsap.fromTo(
    ".landing-text h1:first-child",
    { x: -100, opacity: 0, filter: "blur(10px)" },
    {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.5,
      delay: 0.4,
      ease: "elastic.out(0.5, 0.3)",
    }
  );
  gsap.fromTo(
    ".landing-text h1:nth-child(2)",
    { x: -100, opacity: 0, filter: "blur(10px)" },
    {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.75,
      delay: 0.65,
      ease: "elastic.out(0.5, 0.3)",
    }
  );
  gsap.fromTo(
    ".landing-text h1:nth-child(3)",
    { x: -50, opacity: 0, filter: "blur(10px)" },
    {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.75,
      delay: 0.85,
      ease: "elastic.out(0.5, 0.3)",
    }
  );
  gsap.fromTo(
    ".hr",
    { x: -50, opacity: 0, filter: "blur(10px)" },
    {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.75,
      ease: "elastic.out(0.5, 0.3)",
    },
    "<" // start at the same time as previous
  );

  // GSAP animation for marquee on page load (fade in and slide up)
  gsap.fromTo(
    ".marquee",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.75, delay: 1.25 }
  );

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Delay the initialization of project ScrollTriggers until after the marquee animation
  setTimeout(() => {
    gsap.utils.toArray(".outer-box").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100 }, // Start state: invisible, moved down
        {
          opacity: 1,
          y: 0, // End state: visible, at original position
          duration: 1,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom", // When the top of the card enters the bottom of the viewport
            toggleActions: "play none none none", // Play once when entering
          },
        }
      );
    });
  }, 1500); // 2500ms (2.5 seconds) after page load, which is when the marquee animation finishes

  // GSAP animation for footer (fade up and in on scroll)
  gsap.fromTo(
    "footer",
    { opacity: 0, y: 100 }, // Start state: invisible, moved down
    {
      opacity: 1,
      y: 0, // End state: visible, at original position
      duration: 1,
      ease: "power2.out",
      delay: 0.25,
      scrollTrigger: {
        trigger: "footer",
        start: "top bottom", // When the top of the footer enters the bottom of the viewport
        toggleActions: "play none none none", // Play once when entering
      },
    }
  );

  // Initial wave animation
  playWaveAnimation();
});

// Wave animation function
function playWaveAnimation() {
  gsap.to(".hover-emoji", {
    rotation: 35,
    duration: 0.3,
    repeat: 3,
    yoyo: true,
    ease: "sine.inOut",
    transformOrigin: "bottom center",
  });
}

// Add hover animation
const handIcon = document.querySelector(".hover-emoji");
let isAnimating = false;

handIcon.addEventListener("mouseenter", () => {
  if (!isAnimating) {
    isAnimating = true;
    playWaveAnimation();

    // Reset the animating flag when the animation completes
    setTimeout(() => {
      isAnimating = false;
    }, 0.3 * 5 * 2 * 1000); // duration * repeats * 2 (for yoyo) * 1000 (to milliseconds)
  }
});

// Project box tooltip functionality
const projectBoxes = document.querySelectorAll(".projects .box");

projectBoxes.forEach((box) => {
  const tooltip = box.querySelector(".project-tooltip");

  box.addEventListener("mouseenter", () => {
    gsap.to(tooltip, { opacity: 1, duration: 0.2 });
  });

  box.addEventListener("mouseleave", () => {
    gsap.to(tooltip, { opacity: 0, duration: 0.2 });
  });

  box.addEventListener("mousemove", (e) => {
    const boxRect = box.getBoundingClientRect();
    const x = e.clientX - boxRect.left;
    const y = e.clientY - boxRect.top;
    gsap.to(tooltip, {
      x: x + 10, // Offset to prevent cursor from directly covering the tooltip
      y: y + 10, // Offset to prevent cursor from directly covering the tooltip
      duration: 0.1,
      ease: "power1.out",
    });
  });
});
