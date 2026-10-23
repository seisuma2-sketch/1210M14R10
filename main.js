// 1210M14R10 download site - navigation, scroll reveal, highlight gallery (spec section 7)
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  // Navigation background after 8px of scroll
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var hasIO = 'IntersectionObserver' in window;

  // Reveal once, then stop observing
  var reveals = document.querySelectorAll('.reveal');
  if (hasIO) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Current section highlight in the navigation
  var links = document.querySelectorAll('.nav-links a');
  if (hasIO && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var a = map[e.target.id];
        if (a && e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) sectionIO.observe(s);
    });
  }

  // Highlight gallery: one card per click
  var track = document.getElementById('gallery');
  document.querySelectorAll('.gallery-ctrl [data-dir]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = track.querySelector('.card');
      var step = card ? card.getBoundingClientRect().width + 20 : 360;
      track.scrollBy({ left: step * Number(btn.getAttribute('data-dir')), behavior: 'smooth' });
    });
  });

  // Fallback link after the download button is pressed
  var retry = document.getElementById('dlRetry');
  document.querySelectorAll('.dl-box > [data-download]').forEach(function (a) {
    a.addEventListener('click', function () {
      window.setTimeout(function () { retry.hidden = false; }, 1500);
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
