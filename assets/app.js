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

  // tranding slide js
$(function () {
  let current = 0;

  function getVisible() {
    const w = $(window).width();
    if (w < 769) return 2;
    if (w < 1025) return 3;
    return 5;
  }

  function totalSlides() {
    return Math.max(1, $('#sliderTrack .product-card').length - getVisible() + 1);
  }

  function buildDots() {
    $('#sliderDots').empty();
    for (let i = 0; i < totalSlides(); i++) {
      $('<div class="dot' + (i === current ? ' active' : '') + '"></div>')
        .on('click', (function(idx){ return function(){ goTo(idx); }; })(i))
        .appendTo('#sliderDots');
    }
  }

  function goTo(idx) {
    const total = totalSlides();
    current = Math.max(0, Math.min(idx, total - 1));
    const cardW = $('#sliderTrack .product-card').outerWidth(true);
    $('#sliderTrack').css('transform', 'translateX(-' + (current * cardW) + 'px)');
    $('#sliderDots .dot').removeClass('active').eq(current).addClass('active');
  }

  $('#nextBtn').on('click', function () { goTo(current + 1); });
  $('#prevBtn').on('click', function () { goTo(current - 1); });

  $(window).on('resize', function () { buildDots(); goTo(current); });

  buildDots();
});
  // end of tranding slider js

  // best product part JS
$(function () {
  let current = 0;
  let activeTab = 'best';

  function getVisible() {
    const w = $('.fp-slider-wrap').width();
    if (w < 500) return 2;
    if (w < 800) return 3;
    return 5;
  }

  function getCards() {
    return $('.fp-card.show');
  }

  function totalSlides() {
    return Math.max(1, getCards().length - getVisible() + 1);
  }

  function showTab(tab) {
    activeTab = tab;
    current = 0;
    $('#fpTrack').css('transform', 'translateX(0)');
    $('.fp-card').removeClass('show');
    $('.fp-card[data-tab="' + tab + '"]').addClass('show');
    buildDots();
  }

  function buildDots() {
    const $dots = $('#fpDots').empty();
    for (let i = 0; i < totalSlides(); i++) {
      $('<div class="fp-dot' + (i === current ? ' active' : '') + '"></div>')
        .on('click', (function (idx) { return function () { goTo(idx); }; })(i))
        .appendTo($dots);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, totalSlides() - 1));
    const cw = getCards().first().outerWidth(true);
    $('#fpTrack').css('transform', 'translateX(-' + (current * cw) + 'px)');
    $('#fpDots .fp-dot').removeClass('active').eq(current).addClass('active');
  }

  $('#fpNext').on('click', function () { goTo(current + 1); });
  $('#fpPrev').on('click', function () { goTo(current - 1); });

  $('.fp-tab').on('click', function () {
    $('.fp-tab').removeClass('active');
    $(this).addClass('active');
    showTab($(this).data('tab'));
  });

  $(window).on('resize', function () { buildDots(); goTo(current); });

  showTab('best');
});
  // end of best products

  // home applience starts

let position = 0

function getVisibleItems() {
    if ($(window).width() < 768) return 2
    if ($(window).width() < 992) return 3
    return 4
}

function updateButtons() {
    let visibleItems = getVisibleItems()
    let totalItems = $('.kitchen-item:visible').length
    let itemWidth = $('.kitchen-item:visible').first().outerWidth(true)
    let maxMove = (totalItems - visibleItems) * itemWidth

    if (position <= 0) {
        $('#slidePrev').addClass('disabled')
    } else {
        $('#slidePrev').removeClass('disabled')
    }

    if (position >= maxMove) {
        $('#slideNext').addClass('disabled')
    } else {
        $('#slideNext').removeClass('disabled')
    }
}

function filterProduct(type) {
    $('.kitchen-item').hide()
    $('.' + type).fadeIn()

    position = 0
    $('.kitchen-products').css('transform', 'translateX(0px)')

    updateButtons()
}

$(document).ready(function () {

    filterProduct('appliance')

    $('.kitchen-filter').click(function () {
        $('.kitchen-filter').removeClass('active-filter')
        $(this).addClass('active-filter')

        let type = $(this).data('type')
        filterProduct(type)
    })

    $('#slideNext').click(function () {
        let visibleItems = getVisibleItems()
        let itemWidth = $('.kitchen-item:visible').first().outerWidth(true)
        let totalItems = $('.kitchen-item:visible').length
        let maxMove = (totalItems - visibleItems) * itemWidth

        if (position < maxMove) {
            position += itemWidth
            $('.kitchen-products').css('transform', 'translateX(-' + position + 'px)')
        }

        updateButtons()
    })

    $('#slidePrev').click(function () {
        let itemWidth = $('.kitchen-item:visible').first().outerWidth(true)

        if (position > 0) {
            position -= itemWidth
            $('.kitchen-products').css('transform', 'translateX(-' + position + 'px)')
        }

        updateButtons()
    })

    $(window).resize(function () {
        position = 0
        $('.kitchen-products').css('transform', 'translateX(0px)')
        updateButtons()
    })

    updateButtons()
})
  // home applience ends

  // blogs starts

 $(function () {
  var $slides = $('.slide-item');
  var $dots   = $('.slider-dots .dot');
  var total   = $slides.length;
  var current = 0;
  var timer;

  function goTo(n) {
    $slides.removeClass('active');
    $dots.removeClass('active');
    current = (n + total) % total;
    $slides.eq(current).addClass('active');
    $dots.eq(current).addClass('active');
  }

  function startAuto() {
    timer = setInterval(function () { goTo(current + 1); }, 2500);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  $dots.on('click', function () {
    goTo($(this).data('index'));
    resetAuto();
  });

  $('.slider-arrow.next').on('click', function () {
    goTo(current + 1);
    resetAuto();
  });

  $('.slider-arrow.prev').on('click', function () {
    goTo(current - 1);
    resetAuto();
  });

  startAuto();
});
  // blogs js ends