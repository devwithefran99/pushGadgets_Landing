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
$(document).ready(function(){

  let current = 0;
  let slides = $(".slide");
  let total = slides.length;

  function showSlide(index){
    slides.removeClass("active");
    slides.eq(index).addClass("active");
  }

  $(".slider-next").click(function(){
    current = (current + 1) % total;
    showSlide(current);
  });

  $(".slider-prev").click(function(){
    current = (current - 1 + total) % total;
    showSlide(current);
  });
  
  function showSlide(index){
  $(".slide").removeClass("active");
  $(".slide").eq(index).addClass("active");
}

  // auto slide
  setInterval(function(){
    current = (current + 1) % total;
    showSlide(current);
  }, 3000);

});
  // hero part js ends
  // categories  js  starts
$(document).ready(function(){

  function handleCategories(){
    if($(window).width() >= 992){
      // Desktop → sob show
      $(".extra").removeClass("d-none");
    } else {
      // Mobile → extra hide
      $(".extra").addClass("d-none");
      $("#seeMoreBtn").text("See More");
    }
  }

  // run on load
  handleCategories();

  // run on resize (🔥 important)
  $(window).resize(function(){
    handleCategories();
  });

  // button click
  $("#seeMoreBtn").click(function(){
    $(".extra").toggleClass("d-none");

    if($(this).text() == "See More"){
      $(this).text("Show Less");
    } else {
      $(this).text("See More");
    }
  });

});
  // categories ends