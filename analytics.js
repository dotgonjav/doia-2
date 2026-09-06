/* =========================================================================
   DOIA — Cookietoestemming (granulair) + conversiemeting
   ---------------------------------------------------------------------------
   De Google-tag (gtag.js) + Consent Mode v2-standaard (alles 'denied') staan
   RECHTSTREEKS in de <head> van elke pagina. Dit bestand regelt:
     1. de cookiemelding (2 lagen: balk + voorkeuren-paneel),
     2. granulaire toestemming — Analytisch (Clarity + GA) los van
        Marketing (Google Ads) — via Consent Mode 'update',
     3. de "Cookievoorkeuren"-link in de footer (later wijzigen),
     4. de conversie bij een verzonden contactformulier.

   Toestemming wordt opgeslagen als JSON: {"analytics":bool,"marketing":bool}.
   Oude waarden ('granted' / 'denied') blijven backward-compatible.
   ========================================================================= */
(function () {
  var ADS_ID = 'AW-18149300990';
  /* Google Ads-conversielabel (deel ná de schuine streep in 'AW-…/XXXX'). */
  var ADS_CONVERSION_LABEL = 'eXc8CMHhhr4cEP61oc5D';
  var CLARITY_ID = 'xbonrd8v8m';
  var KEY = 'doia-consent';

  /* Veiligheidsnet: als het head-fragment niet liep, toch een gtag-stub. */
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () { dataLayer.push(arguments); };
  }

  var clarityLoaded = false;

  /* ---- Toestemming lezen / schrijven ------------------------------------ */
  function readConsent() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) {}
    if (!raw) return null;
    if (raw === 'granted') return { analytics: true, marketing: true };
    if (raw === 'denied') return { analytics: false, marketing: false };
    try {
      var o = JSON.parse(raw);
      if (o && typeof o === 'object') {
        return { analytics: !!o.analytics, marketing: !!o.marketing };
      }
    } catch (e) {}
    return null;
  }

  function saveConsent(c) {
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
  }

  /* ---- Microsoft Clarity — pas laden ná toestemming (analytisch) --------- */
  function loadClarity() {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  /* ---- Toestemming toepassen (Consent Mode update) ----------------------- */
  function applyConsent(c) {
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
    if (c.analytics) loadClarity();
  }

  /* ---- Publieke helpers ------------------------------------------------- */
  window.doiaTrackLead = function () {
    gtag('event', 'generate_lead', { currency: 'EUR', value: 0 });
    gtag('event', 'conversion', { send_to: ADS_ID + '/' + ADS_CONVERSION_LABEL });
  };
  window.doiaResetConsent = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  };

  /* ---- Taaldetectie ----------------------------------------------------- */
  function isEnglish() {
    try {
      if (/^\/en(\/|$)/.test(location.pathname)) return true;
      var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
      return lang.indexOf('en') === 0;
    } catch (e) { return false; }
  }

  /* ---- Copy ------------------------------------------------------------- */
  var COPY = {
    nl: {
      label: 'Cookietoestemming',
      text: 'Deze site gebruikt cookies om het bezoek te analyseren en de doeltreffendheid van advertenties te meten. U kiest zelf wat u toestaat. <a href="/privacy">Privacybeleid</a>.',
      deny: 'Alles weigeren',
      customise: 'Voorkeuren aanpassen',
      accept: 'Alles aanvaarden',
      prefsTitle: 'Cookievoorkeuren',
      prefsIntro: 'U bepaalt zelf welke cookies u toestaat. Essentiële cookies zijn nodig voor de basiswerking en staan altijd aan. Uw keuze wordt onthouden en kan later via de footer worden gewijzigd.',
      always: 'Altijd actief',
      save: 'Voorkeuren opslaan',
      close: 'Sluiten',
      footerLink: 'Cookievoorkeuren',
      cats: [
        { key: 'essential', name: 'Essentieel', always: true,
          desc: 'Noodzakelijk voor de basiswerking: sessie, taalkeuze en het onthouden van uw cookievoorkeur. Deze kunnen niet worden uitgeschakeld.' },
        { key: 'analytics', name: 'Analytisch', always: false,
          desc: 'Meet anoniem hoe de site wordt gebruikt (Microsoft Clarity, Google Analytics), zodat de ervaring kan worden verbeterd.' },
        { key: 'marketing', name: 'Marketing', always: false,
          desc: 'Meet de doeltreffendheid van advertenties (Google Ads).' }
      ]
    },
    en: {
      label: 'Cookie consent',
      text: 'This site uses cookies to analyse visits and measure the effectiveness of ads. The choice is yours. <a href="/en/privacy">Privacy policy</a>.',
      deny: 'Decline all',
      customise: 'Manage preferences',
      accept: 'Accept all',
      prefsTitle: 'Cookie preferences',
      prefsIntro: 'You decide which cookies you allow. Essential cookies are required for the site to work and are always on. Your choice is remembered and can be changed later via the footer.',
      always: 'Always active',
      save: 'Save preferences',
      close: 'Close',
      footerLink: 'Cookie preferences',
      cats: [
        { key: 'essential', name: 'Essential', always: true,
          desc: 'Required for basic operation: session, language choice and remembering your cookie preference. These cannot be switched off.' },
        { key: 'analytics', name: 'Analytics', always: false,
          desc: 'Measures anonymously how the site is used (Microsoft Clarity, Google Analytics) so the experience can be improved.' },
        { key: 'marketing', name: 'Marketing', always: false,
          desc: 'Measures the effectiveness of advertising (Google Ads).' }
      ]
    }
  };

  var T = isEnglish() ? COPY.en : COPY.nl;

  /* ---- DOM helpers ------------------------------------------------------ */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  var barEl = null;
  var prefsEl = null;

  function removeBar() {
    if (!barEl) return;
    barEl.classList.remove('is-open');
    var b = barEl; barEl = null;
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 500);
  }

  /* ---- Eerste laag: compacte balk --------------------------------------- */
  function buildBar() {
    if (barEl) return;
    barEl = el('div', 'cookie');
    barEl.setAttribute('role', 'dialog');
    barEl.setAttribute('aria-label', T.label);
    barEl.innerHTML =
      '<div class="cookie__inner shell">' +
        '<p class="cookie__text">' + T.text + '</p>' +
        '<div class="cookie__actions">' +
          '<button type="button" class="cookie__btn cookie__btn--ghost" data-cc="deny">' + T.deny + '</button>' +
          '<button type="button" class="cookie__btn cookie__btn--ghost" data-cc="prefs">' + T.customise + '</button>' +
          '<button type="button" class="cookie__btn" data-cc="accept">' + T.accept + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(barEl);
    barEl.querySelector('[data-cc="accept"]').addEventListener('click', function () {
      finish({ analytics: true, marketing: true });
    });
    barEl.querySelector('[data-cc="deny"]').addEventListener('click', function () {
      finish({ analytics: false, marketing: false });
    });
    barEl.querySelector('[data-cc="prefs"]').addEventListener('click', openPrefs);
    setTimeout(function () { barEl.classList.add('is-open'); }, 40);
  }

  /* ---- Tweede laag: voorkeuren-paneel ----------------------------------- */
  function catRow(cat, current) {
    var row = el('div', 'cc-cat');
    row.appendChild(el('span', 'cc-cat__name', cat.name));
    if (cat.always) {
      row.appendChild(el('span', 'cc-cat__always', T.always));
    } else {
      var sw = el('label', 'cc-switch');
      var checked = current && current[cat.key] ? ' checked' : '';
      sw.innerHTML =
        '<input type="checkbox" data-cat="' + cat.key + '"' + checked + ' aria-label="' + cat.name + '" />' +
        '<span class="cc-switch__track"></span><span class="cc-switch__thumb"></span>';
      row.appendChild(sw);
    }
    row.appendChild(el('p', 'cc-cat__desc', cat.desc));
    return row;
  }

  function openPrefs() {
    var current = readConsent() || { analytics: false, marketing: false };
    if (!prefsEl) {
      prefsEl = el('div', 'cookie-prefs');
      prefsEl.setAttribute('role', 'dialog');
      prefsEl.setAttribute('aria-modal', 'true');
      prefsEl.setAttribute('aria-label', T.prefsTitle);
      var scrim = el('div', 'cookie-prefs__scrim');
      var panel = el('div', 'cookie-prefs__panel');
      var head = el('div', 'cookie-prefs__head');
      head.appendChild(el('button', 'cookie-prefs__close', T.close));
      head.appendChild(el('h2', 'cookie-prefs__title', T.prefsTitle));
      head.appendChild(el('p', 'cookie-prefs__intro', T.prefsIntro));
      var list = el('div', 'cookie-prefs__list');
      T.cats.forEach(function (c) { list.appendChild(catRow(c, current)); });
      var foot = el('div', 'cookie-prefs__foot');
      foot.innerHTML =
        '<button type="button" class="cookie__btn cookie__btn--ghost" data-cc="save">' + T.save + '</button>' +
        '<button type="button" class="cookie__btn" data-cc="accept-all">' + T.accept + '</button>';
      panel.appendChild(head);
      panel.appendChild(list);
      panel.appendChild(foot);
      prefsEl.appendChild(scrim);
      prefsEl.appendChild(panel);
      document.body.appendChild(prefsEl);

      scrim.addEventListener('click', closePrefs);
      head.querySelector('.cookie-prefs__close').addEventListener('click', closePrefs);
      foot.querySelector('[data-cc="save"]').addEventListener('click', function () {
        var choice = { analytics: false, marketing: false };
        prefsEl.querySelectorAll('input[data-cat]').forEach(function (i) {
          choice[i.getAttribute('data-cat')] = i.checked;
        });
        finish(choice);
      });
      foot.querySelector('[data-cc="accept-all"]').addEventListener('click', function () {
        finish({ analytics: true, marketing: true });
      });
    } else {
      /* Toggles bijwerken naar de huidige keuze bij heropenen. */
      prefsEl.querySelectorAll('input[data-cat]').forEach(function (i) {
        i.checked = !!current[i.getAttribute('data-cat')];
      });
    }
    requestAnimationFrame(function () { prefsEl.classList.add('is-open'); });
  }

  function closePrefs() {
    if (prefsEl) prefsEl.classList.remove('is-open');
  }

  /* ---- Keuze afronden --------------------------------------------------- */
  function finish(choice) {
    saveConsent(choice);
    applyConsent(choice);
    closePrefs();
    removeBar();
  }

  /* ---- Footer-link "Cookievoorkeuren" injecteren ------------------------ */
  function injectFooterLink() {
    var cols = document.querySelectorAll('.footer__col');
    if (!cols.length) return;
    var col = cols[cols.length - 1];
    if (col.querySelector('.footer__cookie-link')) return;
    var a = el('a', 'footer__cookie-link', T.footerLink);
    a.href = '#cookievoorkeuren';
    a.addEventListener('click', function (e) { e.preventDefault(); openPrefs(); });
    col.appendChild(a);
  }

  /* ---- Init ------------------------------------------------------------- */
  function init() {
    injectFooterLink();
    var c = readConsent();
    if (c) { applyConsent(c); } else { buildBar(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
