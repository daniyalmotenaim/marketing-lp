// GSAP + ScrollTrigger required
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.service-card').forEach((card, i, cards) => {
  ScrollTrigger.create({
    trigger: card,
    start: "top 60%",
    onEnter: () => {
      gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      // Optionally, hide previous card
      if (i > 0) {
        gsap.to(cards[i-1], { opacity: 0.5, y: 40, duration: 0.7, ease: "power3.in" });
      }
    },
    onLeaveBack: () => {
      gsap.to(card, { opacity: 0.5, y: 40, duration: 0.7, ease: "power3.in" });
      if (i > 0) {
        gsap.to(cards[i-1], { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      }
    }
  });
});