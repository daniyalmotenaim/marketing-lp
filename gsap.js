
// GSAP & ScrollTrigger setup
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from(".hero-text", {
  opacity: 0,
  y: 50,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".hero-image", {
  opacity: 0,
  x: 50,
  duration: 1.2,
  delay: 0.5,
  ease: "power3.out"
});

// Scroll-triggered section reveals
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".service-card-rect");


// Card hover animation
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -5, scale: 1.02, duration: 0.3, ease: "power1.out" });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power1.inOut" });
  });
});


cards.forEach((card, index) => {
  gsap.fromTo(card, 
    { autoAlpha: 0, y: 50, scale: 0.95 }, 
    { 
      autoAlpha: 1, y: 0, scale: 1, duration: 0.6, 
      ease: "power2.out", 
      scrollTrigger: {
        trigger: card,
        start: "top center+=100",
        end: "bottom center",
        toggleActions: "restart none none none"
      } 
    });
});

// CTA form input animation

