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

  // Latest release: version, file name, size and SHA-256 from the GitHub API (spec section 6).
  // The values written in index.html stay as the fallback when the API cannot be reached.
  var RELEASE_API = 'https://api.github.com/repos/seisuma2-sketch/1210M14R10/releases/latest';
  var SETUP_ASSET = '1210M14R10-win-Setup.exe';

  function formatSize(bytes) {
    var mb = (bytes / 1048576).toFixed(1);
    return mb + ' MB (' + bytes.toLocaleString('ja-JP') + ' バイト)';
  }

  function showRelease(release) {
    var assets = release.assets || [];
    var setup = null;
    for (var i = 0; i < assets.length; i++) {
      if (assets[i].name === SETUP_ASSET) { setup = assets[i]; break; }
    }
    if (!setup) return;

    var version = String(release.tag_name || '').replace(/^v/, '');
    if (version) {
      document.querySelectorAll('[data-version]').forEach(function (el) { el.textContent = version; });
    }
    var file = document.getElementById('dlFile');
    if (file) file.textContent = setup.name;
    var size = document.getElementById('dlSize');
    if (size && typeof setup.size === 'number') size.textContent = formatSize(setup.size);
    var hash = document.getElementById('dlHash');
    var digest = typeof setup.digest === 'string' ? setup.digest : '';
    if (hash && digest.indexOf('sha256:') === 0) hash.textContent = digest.slice(7);
    if (setup.browser_download_url) {
      document.querySelectorAll('[data-download]').forEach(function (a) { a.href = setup.browser_download_url; });
    }
  }

  if (window.fetch) {
    fetch(RELEASE_API, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (release) { if (release) showRelease(release); })
      .catch(function () { /* offline or rate limited: keep the values in index.html */ });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
