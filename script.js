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

// Testimonials Carousel Functionality (Slides of 3)
(function() {
  const carousel = document.querySelector('.testimonials-carousel');
  const prevBtn = document.querySelector('.carousel-btn.testimonials-prev');
  const nextBtn = document.querySelector('.carousel-btn.testimonials-next');
  const slides = carousel ? Array.from(carousel.querySelectorAll('.testimonial-slide')) : [];
  if (!carousel || !prevBtn || !nextBtn || slides.length === 0) return;

  let currentSlide = 0;

  function updateSlides() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
      // Set .active on the middle card of the active slide
      const cards = slide.querySelectorAll('.testimonial-card');
      cards.forEach(card => card.classList.remove('active'));
      if (idx === currentSlide && cards.length === 3) {
        cards[1].classList.add('active');
      }
    });
  }

  prevBtn.addEventListener('click', function() {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlides();
    }
  });
  nextBtn.addEventListener('click', function() {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlides();
    }
  });

  updateSlides();
})();

// Promotional Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
  const promoPopup = document.getElementById('promoPopup');
  const closePromoPopup = document.getElementById('closePromoPopup');
  const promoForm = document.getElementById('promoForm');
  const promoEndDate = document.getElementById('promoEndDate');
  
  // Set end date (7 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  promoEndDate.textContent = endDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  // Show popup after 2 seconds
  setTimeout(() => {
    promoPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 2000);
  
  // Close popup functionality
  function closePopup() {
    promoPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  closePromoPopup.addEventListener('click', closePopup);
  
  // Close on overlay click
  promoPopup.addEventListener('click', function(e) {
    if (e.target === promoPopup) {
      closePopup();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && promoPopup.classList.contains('active')) {
      closePopup();
    }
  });
  
  // Form submission
  promoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(promoForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const service = formData.get('service');
    
    // Validate form
    if (!name || !email || !service) {
      alert('Please fill in all fields');
      return;
    }
    
    // Show success message
    const popupContent = promoPopup.querySelector('.promo-popup-content');
    popupContent.innerHTML = `
      <div class="promo-success">
        <div class="promo-success-icon">
          <svg width="40" height="40" fill="none" stroke="#232323" stroke-width="3" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Thank You!</h3>
        <p>Your 30% discount has been applied! We'll contact you within 24 hours to discuss your ${service.replace('-', ' ')} project.</p>
        <button class="promo-submit-btn" onclick="closePopup()" style="margin-top: 20px;">
          <span>Close</span>
        </button>
      </div>
    `;
    
    // Store in localStorage to prevent showing again
    localStorage.setItem('promoSubmitted', 'true');
    
    // Optional: Send data to server
    console.log('Form submitted:', { name, email, service });
  });
  
  // Check if user has already submitted
  if (localStorage.getItem('promoSubmitted')) {
    promoPopup.style.display = 'none';
  }
});

// Global function for closing popup (used in success message)
function closePopup() {
  const promoPopup = document.getElementById('promoPopup');
  if (promoPopup) {
    promoPopup.classList.remove('active');
    document.body.style.overflow = '';
  }
}

