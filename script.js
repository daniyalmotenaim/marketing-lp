document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const tab = this.getAttribute('data-tab');
    document.querySelectorAll('.featured-work-card').forEach(card => {
      if (tab === 'all' || card.getAttribute('data-category') === tab) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

console.log("Scroll to Top Button");

// Scroll to Top Progress Button
document.addEventListener("DOMContentLoaded", () => {
  const progressPath = document.querySelector(".progress-wrap path");
  const progressWrap = document.querySelector(".progress-wrap");
  const progressArrow = document.querySelector(".progress-arrow");
  const pathLength = progressPath.getTotalLength();

  // Setup SVG stroke
  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength;

  const offset = 150;

  const updateProgress = () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;

    if (scroll > offset) {
      progressWrap.classList.add("active");
    } else {
      progressWrap.classList.remove("active");
    }
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress);

  // Smooth scroll to top when clicked
  progressWrap.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Hover effects for arrow
  progressWrap.addEventListener('mouseenter', function() {
    if (progressArrow) {
      progressArrow.style.transform = 'translate(-50%, -50%) scale(1.1)';
    }
  });
  
  progressWrap.addEventListener('mouseleave', function() {
    if (progressArrow) {
      progressArrow.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });
});
