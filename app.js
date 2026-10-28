// DOIA — shared behavior: scroll reveal + active nav + subtle nav state
(function () {
  'use strict';

  // ---- reveal on scroll ----
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---- mark current nav item ----
  function initNav() {
    function key(s) {
      if (!s) return 'index';
      s = s.split('#')[0].split('?')[0];     // strip hash/query
      s = s.replace(/\/+$/, '');             // strip trailing slash
      s = s.substring(s.lastIndexOf('/') + 1); // last path segment
      s = s.replace(/\.html$/, '');          // drop .html extension
      return s || 'index';
    }
    var current = key(location.pathname);
    document.querySelectorAll('.nav__menu a').forEach(function (a) {
      if (key(a.getAttribute('href')) === current) a.setAttribute('aria-current', 'page');
    });
  }

  // ---- hero slideshow (crossfade) ----
  function initHero() {
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove('is-active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('is-active');
    }, 5000);
  }

  // ---- nav: verborgen bij laden, verschijnt bij scroll / aanraking / muisbeweging ----
  function initNavReveal() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var t = null, IDLE = 2600;
    function hideIfIdle() {
      if (window.scrollY > 8 || nav.matches(':hover') || nav.contains(document.activeElement)) return;
      nav.classList.remove('is-shown');
    }
    function show() {
      nav.classList.add('is-shown');
      clearTimeout(t); t = setTimeout(hideIfIdle, IDLE);
    }
    window.addEventListener('scroll', function () { if (window.scrollY > 8) { nav.classList.add('is-shown'); clearTimeout(t); } else show(); }, { passive: true });
    window.addEventListener('mousemove', show, { passive: true });
    window.addEventListener('touchstart', show, { passive: true });
    window.addEventListener('keydown', function (e) { if (e.key === 'Tab') show(); });
    nav.addEventListener('mouseleave', function () { clearTimeout(t); t = setTimeout(hideIfIdle, IDLE); });
    if (window.scrollY > 8) nav.classList.add('is-shown');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initReveal(); initNav(); initNavReveal(); initHero(); });
  } else { initReveal(); initNav(); initNavReveal(); initHero(); }
})();
