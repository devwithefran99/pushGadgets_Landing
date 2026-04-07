const hamburger  = document.getElementById('hamburgerBtn');
  const sidebar    = document.getElementById('mobileSidebar');
  const overlay    = document.getElementById('mobileOverlay');
  const closeBtn   = document.getElementById('sidebarClose');
 
  function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow='hidden'; }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow=''; }
 
  hamburger.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click',  closeSidebar);
  overlay.addEventListener('click',   closeSidebar);
 
  // Accordion for sidebar categories
  document.querySelectorAll('#sidebarCats > li > a[data-target]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(link.dataset.target);
      const chevron = link.querySelector('i');
      const isOpen = target.classList.contains('open');
 
      // close all
      document.querySelectorAll('.sidebar-sub.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('#sidebarCats i.bi-chevron-down').forEach(i => { i.classList.remove('bi-chevron-down'); i.classList.add('bi-chevron-right'); });
 
      if (!isOpen) {
        target.classList.add('open');
        chevron.classList.remove('bi-chevron-right');
        chevron.classList.add('bi-chevron-down');
      }
    });
  });

  // hero part js
$(document).ready(function () {
  let current = 0;
  const slides = $('.slide');
  const dots = $('.dot');
  const total = slides.length;
  let autoTimer;
 
  function goTo(index) {
    slides.eq(current).removeClass('active');
    dots.eq(current).removeClass('active');
    current = (index + total) % total;
    slides.eq(current).addClass('active');
    dots.eq(current).addClass('active');
  }
 
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }
 
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }
 
  $('.slider-next').on('click', function () {
    goTo(current + 1);
    resetAuto();
  });
 
  $('.slider-prev').on('click', function () {
    goTo(current - 1);
    resetAuto();
  });
 
  dots.each(function (i) {
    $(this).on('click', function () {
      goTo(i);
      resetAuto();
    });
  });
 
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
 
  $('.slider-container').on('touchstart', function (e) {
    touchStartX = e.originalEvent.changedTouches[0].clientX;
  });
 
  $('.slider-container').on('touchend', function (e) {
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  });
 
  startAuto();
 
  // Feature items stagger re-trigger on scroll (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).css('animation-play-state', 'running');
      }
    });
  }, { threshold: 0.2 });
 
  $('.feature-item').each(function () {
    observer.observe(this);
  });
});
  // hero part js ends