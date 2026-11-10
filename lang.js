// DOIA — taalkeuze bij eerste bezoek (NL / EN). Keuze wordt onthouden; nooit automatisch doorsturen.
(function () {
  'use strict';
  var KEY = 'doia-lang';
  var html = document.documentElement;
  var pageLang = (html.getAttribute('lang') || 'nl').slice(0, 2).toLowerCase() === 'en' ? 'en' : 'nl';
  function remember(l) { try { localStorage.setItem(KEY, l); } catch (e) {} }

  // nav-toggle onthoudt ook de keuze
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.nav__lang a');
    if (a) remember(pageLang === 'nl' ? 'en' : 'nl');
  });

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { return; }
  var force = /[?&]taalkeuze\b/.test(location.search);
  if (stored && !force) return;
  if (navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|preview|facebookexternalhit|pinterest/i.test(navigator.userAgent)) return;

  function altUrl(l) {
    var el = document.querySelector('link[rel="alternate"][hreflang="' + l + '"]');
    if (!el) return null;
    try { var u = new URL(el.getAttribute('href'), location.href); return u.pathname + location.search + location.hash; } catch (e) { return null; }
  }
  var navLang = ((navigator.languages && navigator.languages[0]) || navigator.language || '').slice(0, 2).toLowerCase();
  var suggested = navLang === 'en' ? 'en' : (navLang === 'nl' ? 'nl' : pageLang);
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function letters(s) {
    return s.split('').map(function (c, i) {
      return '<span style="--i:' + i + '">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
    }).join('');
  }

  function build() {
    var g = document.createElement('div');
    g.className = 'lgate';
    g.setAttribute('role', 'dialog');
    g.setAttribute('aria-modal', 'true');
    g.setAttribute('aria-labelledby', 'lgate-mark');
    g.innerHTML =
      '<div class="lgate__inner">' +
                '<div class="lgate__mark" id="lgate-mark" aria-label="Studio DOIA">' + letters('Studio DOIA') + '</div>' +
        '<p class="lgate__ask">Kies uw taal <span aria-hidden="true">/</span> Choose your language</p>' +
        '<div class="lgate__choices">' +
          '<button type="button" class="lgate__opt" data-l="nl" lang="nl"><span class="lgate__name">Nederlands</span></button>' +
          '<button type="button" class="lgate__opt" data-l="en" lang="en"><span class="lgate__name">English</span></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(g);
    html.classList.add('lgate-open');
    requestAnimationFrame(function () { requestAnimationFrame(function () { g.classList.add('is-in'); }); });

    var first = g.querySelector('[data-l="' + suggested + '"]');
    setTimeout(function () { first.focus({ preventScroll: true }); }, reduce ? 0 : 1400);

    function close() {
      g.classList.add('is-out');
      html.classList.remove('lgate-open');
      setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); }, reduce ? 0 : 1600);
    }
    function choose(l) {
      remember(l);
      var url = l !== pageLang && altUrl(l);
      if (url) {
        g.classList.add('is-leaving');
        setTimeout(function () { location.href = url; }, reduce ? 0 : 450);
      } else close();
    }
    g.addEventListener('click', function (e) {
      var b = e.target.closest('.lgate__opt');
      if (b) choose(b.getAttribute('data-l'));
    });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { remember(pageLang); close(); }
      if (e.key === 'Tab') {
        var o = g.querySelectorAll('.lgate__opt');
        if (e.shiftKey && document.activeElement === o[0]) { e.preventDefault(); o[1].focus(); }
        else if (!e.shiftKey && document.activeElement === o[1]) { e.preventDefault(); o[0].focus(); }
      }
    });
  }

  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
