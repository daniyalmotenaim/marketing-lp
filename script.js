const carousel = document.getElementById('services-carousel');
document.querySelector('.prev-btn').onclick = () => {
  carousel.scrollBy({ left: -340, behavior: 'smooth' });
};
document.querySelector('.next-btn').onclick = () => {
  carousel.scrollBy({ left: 340, behavior: 'smooth' });
};

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
