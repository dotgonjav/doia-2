(function () {
  var form = document.getElementById('wiz');
  if (!form) return;
  var EN = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var T = EN ? {
    back: '← Previous', next: 'Next →', skip: 'Skip', send: 'Send →', sending: 'Sending…',
    need: 'Choose an option to continue', fill: 'Please fill this in to continue', pcErr: 'Please enter a valid Belgian postcode', intlErr: 'Please enter postcode and town', cc: 'Country code', ccOther: 'Other', ccFull: '+… full number', intlPh: 'Postcode and town', ctryPh: 'Country', lands: ['Belgium', 'Netherlands', 'Luxembourg', 'France', 'Germany', 'Other country'], town: 'Municipality', multi: 'Several answers possible', optional: 'Optional',
    subject: 'New enquiry doia.be', privacy: '/en/privacy',
    f: { name: 'Name', company: 'Company name', email: 'Email', phone: 'Phone', yourName: 'Your name', opt: 'Optional', you: 'you@email.com',
      errName: 'Please enter your name', errEmail: 'Please enter a valid email address', errPhone: 'Please enter your phone number',
      consent: 'I agree to the <a href="/en/privacy">privacy policy</a> and consent to the processing and storage of my personal data by Studio DOIA, for administrative and communication purposes.' }
  } : {
    back: '← Vorige', next: 'Volgende →', skip: 'Overslaan', send: 'Verzenden →', sending: 'Verzenden…',
    need: 'Kies een optie om verder te gaan', fill: 'Vul dit in om verder te gaan', pcErr: 'Vul een geldige Belgische postcode in', intlErr: 'Vul postcode en plaats in', cc: 'Landcode', ccOther: 'Ander', ccFull: '+… volledig nummer', intlPh: 'Postcode en plaats', ctryPh: 'Land', lands: ['België', 'Nederland', 'Luxemburg', 'Frankrijk', 'Duitsland', 'Ander land'], town: 'Gemeente', multi: 'Meerdere antwoorden mogelijk', optional: 'Optioneel',
    subject: 'Nieuwe projectaanvraag doia.be', privacy: '/privacy',
    f: { name: 'Naam', company: 'Bedrijfsnaam', email: 'E-mail', phone: 'Telefoon', yourName: 'Uw naam', opt: 'Optioneel', you: 'u@email.com',
      errName: 'Vul uw naam in', errEmail: 'Voer een geldig e-mailadres in', errPhone: 'Vul uw telefoonnummer in',
      consent: 'Ik ga akkoord met het <a href="/privacy">privacybeleid</a> en geef toestemming voor de verwerking en opslag van mijn persoonsgegevens door Studio DOIA, voor administratieve en communicatiedoeleinden.' }
  };
  var H, S = EN ? [
    { id: 'dienst', label: 'Service', req: true, q: 'How can I help you?', opts: [
      { v: 'Spatial advice', s: 'Home visit with advice on site', k: 'advies' },
      { v: 'Design', s: 'Complete concept, plans and 3D', k: 'ontwerp' },
      { v: 'Design with guidance', s: 'Design, bill of quantities, tender and site', k: 'begeleiding' },
      { v: 'Not sure yet', s: 'We look together at what fits' }] },
    { id: 'type', req: true, label: 'Type of property', q: 'What type of property is it?', opts: ['House', 'Apartment', 'Shop', 'Office', 'Hospitality', 'Other'] },
    { id: 'ruimtes', req: true, label: 'Rooms', multi: true, q: 'Which rooms would you like to work on?', ph: 'E.g. practice room, studio, waiting room', byType: [H = ['Kitchen', 'Living room', 'Dining room', 'Bathroom', 'Bedroom', 'Study', 'Entrance and hall', 'Entire home'], H, ['Sales floor', 'Shop window', 'Counter and checkout', 'Fitting rooms', 'Storage', 'Staff room', 'Entire shop'], ['Workspaces', 'Meeting room', 'Reception', 'Executive office', 'Pantry', 'Restrooms', 'Entire office'], ['Dining room', 'Bar', 'Lounge', 'Terrace', 'Kitchen', 'Restrooms', 'Hotel rooms', 'Entire venue'], null] },
    { id: 'aard', req: true, label: 'New build / renovation', q: 'Is it a new build or a renovation?', opts: ['New build / shell', 'Renovation', 'Refurnishing without major works'] },
    { id: 'opp', req: true, label: 'Floor area', q: 'Roughly how large is the space or property?', opts: ['Under 50 m²', '50 – 100 m²', '100 – 200 m²', 'Over 200 m²', 'Not sure'] },
    { id: 'timing', req: true, label: 'Timing', q: 'When would you like to start?', opts: ['As soon as possible', 'Within 3 months', 'In 3 to 6 months', 'Later than 6 months', 'No idea yet'] },
    { id: 'budget', req: true, label: 'Budget', q: 'What budget do you roughly have in mind?', hint: 'Indicative building cost, excluding fees', opts: ['Under € 50,000', '€ 50,000 – 150,000', '€ 150,000 – 300,000', 'Over € 300,000', 'No idea yet'] },
    { id: 'locatie', req: true, label: 'Location', type: 'postcode', q: 'Where is the project located?', ph: 'Postcode' },
    { id: 'bron', label: 'Source', q: 'How did you hear about Studio DOIA?', opts: ['Google', 'Google Maps', 'Instagram', 'LinkedIn', 'Word of mouth', 'Other'] },
    { id: 'bericht', label: 'Message', type: 'area', q: 'Anything else you would like to share?', ph: 'About your space, your wishes or what bothers you now.' },
    { id: 'contact', type: 'contact', req: true, q: 'How can I reach you?' }
  ] : [
    { id: 'dienst', label: 'Dienst', req: true, q: 'Waarmee kan ik u helpen?', opts: [
      { v: 'Ruimtelijk advies', s: 'Huisbezoek met advies ter plaatse', k: 'advies' },
      { v: 'Ontwerp', s: 'Volledig concept, plannen en 3D', k: 'ontwerp' },
      { v: 'Ontwerp met begeleiding', s: 'Ontwerp, meetstaat, aanbesteding en werf', k: 'begeleiding' },
      { v: 'Weet ik nog niet', s: 'Samen bekijken wat past' }] },
    { id: 'type', req: true, label: 'Type pand', q: 'Om wat voor pand gaat het?', opts: ['Huis', 'Appartement', 'Handelszaak', 'Kantoor', 'Horeca', 'Ander'] },
    { id: 'ruimtes', req: true, label: 'Ruimtes', multi: true, q: 'Welke ruimtes wilt u aanpakken?', ph: 'Bv. praktijkruimte, atelier, wachtzaal', byType: [H = ['Keuken', 'Living', 'Eetkamer', 'Badkamer', 'Slaapkamer', 'Bureau', 'Inkom en hal', 'Volledige woning'], H, ['Verkoopruimte', 'Etalage', 'Toonbank en kassa', 'Paskamers', 'Stockruimte', 'Personeelsruimte', 'Volledige zaak'], ['Werkplekken', 'Vergaderruimte', 'Onthaal', 'Directiekantoor', 'Pantry', 'Sanitair', 'Volledig kantoor'], ['Eetzaal', 'Bar', 'Lounge', 'Terras', 'Keuken', 'Sanitair', 'Hotelkamers', 'Volledige zaak'], null] },
    { id: 'aard', req: true, label: 'Nieuwbouw / renovatie', q: 'Gaat het om nieuwbouw of renovatie?', opts: ['Nieuwbouw / casco', 'Renovatie', 'Herinrichting zonder grote werken'] },
    { id: 'opp', req: true, label: 'Oppervlakte', q: 'Hoe groot is de ruimte of het pand ongeveer?', opts: ['Minder dan 50 m²', '50 – 100 m²', '100 – 200 m²', 'Meer dan 200 m²', 'Weet ik niet'] },
    { id: 'timing', req: true, label: 'Timing', q: 'Wanneer wilt u starten?', opts: ['Zo snel mogelijk', 'Binnen 3 maanden', 'Over 3 tot 6 maanden', 'Later dan 6 maanden', 'Nog geen idee'] },
    { id: 'budget', req: true, label: 'Budget', q: 'Welk budget heeft u ongeveer voor ogen?', hint: 'Indicatieve bouwkost, exclusief erelonen', opts: ['Minder dan 50.000 €', '50.000 – 150.000 €', '150.000 – 300.000 €', 'Meer dan 300.000 €', 'Nog geen idee'] },
    { id: 'locatie', req: true, label: 'Locatie', type: 'postcode', q: 'Waar bevindt het project zich?', ph: 'Postcode' },
    { id: 'bron', label: 'Bron', q: 'Hoe heeft u Studio DOIA leren kennen?', opts: ['Google', 'Google Maps', 'Instagram', 'LinkedIn', 'Via via', 'Ander'] },
    { id: 'bericht', label: 'Bericht', type: 'area', q: 'Wilt u nog iets vertellen?', ph: 'Over uw ruimte, uw wensen of wat u nu stoort.' },
    { id: 'contact', type: 'contact', req: true, q: 'Hoe kan ik u bereiken?' }
  ];
  function norm(a) { return a.map(function (o) { return typeof o === 'string' ? { v: o } : o; }); }
  S.forEach(function (s) { if (s.opts) s.opts = norm(s.opts); });
  function resolve(s) {
    if (!s.byType) return;
    var k = -1; S[1].opts.forEach(function (o, n) { if (o.v === st.type) k = n; });
    var o = k > -1 ? s.byType[k] : s.byType[0];
    if (o) { s.opts = norm(o); s.multi = true; delete s.type; }
    else { s.opts = null; s.multi = false; s.type = 'text'; }
  }

  var stage = document.getElementById('wiz-stage'), bar = document.getElementById('wiz-bar'), count = document.getElementById('wiz-count');
  var bBack = document.getElementById('wiz-back'), bSkip = document.getElementById('wiz-skip'), bNext = document.getElementById('wiz-next');
  var errEl = document.getElementById('form-error'), sent = document.getElementById('sent');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var st = { name: '', company: '', email: '', phone: '', cc: null, consent: false, land: 0, intl: '', ctry: '' }, i = 0, N = S.length, timer;

  var pre = new URLSearchParams(location.search).get('dienst');
  S[0].opts.forEach(function (o) { if (o.k && o.k === pre) st.dienst = o.v; });

  var PROV = EN ? ['Brussels', 'Walloon Brabant', 'Flemish Brabant', 'Antwerp', 'Limburg', 'Liège', 'Namur', 'Hainaut', 'Luxembourg', 'West Flanders', 'East Flanders']
    : ['Brussel', 'Waals-Brabant', 'Vlaams-Brabant', 'Antwerpen', 'Limburg', 'Luik', 'Namen', 'Henegouwen', 'Luxemburg', 'West-Vlaanderen', 'Oost-Vlaanderen'];
  function prov(n) {
    var r = [[1000, 1299, 0], [1300, 1499, 1], [1500, 1999, 2], [2000, 2999, 3], [3000, 3499, 2], [3500, 3999, 4], [4000, 4999, 5], [5000, 5999, 6], [6000, 6599, 7], [6600, 6999, 8], [7000, 7999, 7], [8000, 8999, 9], [9000, 9999, 10]];
    for (var k = 0; k < r.length; k++) if (n >= r[k][0] && n <= r[k][1]) return PROV[r[k][2]];
    return '';
  }
  var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, ''), PC = null, pcLoading = null;
  function loadPC() {
    if (PC) return Promise.resolve(PC);
    if (pcLoading) return pcLoading;
    pcLoading = new Promise(function (res) {
      var sc = document.createElement('script'); sc.src = BASE + 'postcodes-be.js';
      sc.onload = function () { PC = {}; (window.DOIA_PC || '').split('|').forEach(function (r) { var k = r.split(':'); PC[k[0]] = k[1].split(';'); }); res(PC); };
      sc.onerror = function () { PC = {}; res(PC); };
      document.head.appendChild(sc);
    });
    return pcLoading;
  }
  function intlSet() {
    var c = st.land === 5 ? st.ctry.trim() : T.lands[st.land];
    st.locatie = st.intl.trim() ? st.intl.trim() + (c ? ', ' + c : '') : '';
  }
  function pcSet() {
    var p = prov(+st.pc);
    st.pcOut = (st.pcGem ? st.pcGem + ' · ' : '') + p;
    st.locatie = st.pc + ' ' + (st.pcGem ? st.pcGem + ', ' : '') + p;
  }
  function pcShow() {
    var out = document.getElementById('pc-out'), man = document.getElementById('pc-man'), ops = document.getElementById('pc-opts'); if (!out) return;
    out.textContent = st.pcOut || ''; man.hidden = !st.pcManual;
    var n = st.pcNames || [];
    ops.hidden = n.length < 2;
    ops.innerHTML = n.length < 2 ? '' : n.map(function (g, k) { return '<button type="button" class="opt opt--sm" data-pc="' + k + '" aria-pressed="' + (st.pcGem === g) + '"><span class="opt__box"></span><span class="opt__txt"><span class="opt__v">' + esc(g) + '</span></span></button>'; }).join('');
  }
  function lookup(pc) {
    st.pcNames = []; st.pcGem = ''; st.pcManual = false;
    if (!prov(+pc)) { st.locatie = ''; st.pcOut = ''; pcShow(); return; }
    pcSet(); pcShow();
    loadPC().then(function (m) {
      if (st.pc !== pc) return;
      var n = m[pc] || [];
      st.pcNames = n; st.pcManual = !n.length;
      if (n.length === 1) st.pcGem = n[0];
      pcSet(); pcShow();
    });
  }
  var CC = [['BE', '+32'], ['NL', '+31'], ['LU', '+352'], ['FR', '+33'], ['DE', '+49'], ['GB', '+44'], ['CH', '+41'], ['ES', '+34'], ['IT', '+39'], ['US', '+1']];
  var LAND_CC = ['+32', '+31', '+352', '+33', '+49', null];
  function cc() { return st.cc != null ? st.cc : (LAND_CC[st.land] || '+32'); }
  function fullPhone() {
    var p = st.phone.trim().replace(/[\s.\/()-]/g, '');
    if (/^\+/.test(p)) return p;
    if (/^00/.test(p)) return '+' + p.slice(2);
    return cc() ? cc() + ' ' + p.replace(/^0/, '') : p;
  }
  function phoneField() {
    var c = cc();
    return '<div class="field" id="f-phone"><label for="phone">' + T.f.phone + ' <span class="req">*</span></label><div class="tel">' +
      '<select id="phone-cc" aria-label="' + T.cc + '">' + CC.map(function (o) { return '<option value="' + o[1] + '"' + (o[1] === c ? ' selected' : '') + '>' + o[0] + ' ' + o[1] + '</option>'; }).join('') +
      '<option value=""' + (c === '' ? ' selected' : '') + '>' + T.ccOther + '</option></select>' +
      '<input type="tel" id="phone" name="phone" autocomplete="tel-national" placeholder="' + (c ? '4 12 34 56 78' : T.ccFull) + '" value="' + esc(st.phone) + '" required /></div>' +
      '<span class="err">' + T.f.errPhone + '</span></div>';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function has(s) { var v = st[s.id]; return Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim()); }
  function pressed(s, v) { var x = st[s.id]; return s.multi ? !!(x && x.indexOf(v) > -1) : x === v; }
  function field(id, type, label, ph, req, err) {
    return '<div class="field" id="f-' + id + '"><label for="' + id + '">' + label + (req ? ' <span class="req">*</span>' : '') + '</label>' +
      '<input type="' + type + '" id="' + id + '" name="' + id + '" placeholder="' + ph + '" value="' + esc(st[id]) + '"' + (req ? ' required' : '') + ' />' +
      (err ? '<span class="err">' + err + '</span>' : '') + '</div>';
  }

  function render(focus) {
    resolve(S[i]);
    var s = S[i], h = '<h2 class="wiz__q">' + s.q + '</h2>';
    var meta = [s.hint, s.multi ? T.multi : '', !s.req ? T.optional : ''].filter(Boolean).join(' · ');
    if (meta) h += '<p class="wiz__hint">' + meta + '</p>';
    if (s.opts) {
      h += '<div class="wiz__opts" role="group">' + s.opts.map(function (o, n) {
        return '<button type="button" class="opt" data-n="' + n + '" aria-pressed="' + pressed(s, o.v) + '"><span class="opt__box' + (s.multi ? ' opt__box--multi' : '') + '"></span><span class="opt__txt"><span class="opt__v">' + o.v + '</span>' + (o.s ? '<span class="opt__s">' + o.s + '</span>' : '') + '</span></button>';
      }).join('') + '</div><p class="wiz__err" id="wiz-err" hidden>' + T.need + '</p>';
    } else if (s.type === 'text') {
      h += '<div class="field"><input type="text" id="w-in" placeholder="' + s.ph + '" value="' + esc(st[s.id] || '') + '" /></div><p class="wiz__err" id="wiz-err" hidden>' + T.fill + '</p>';
    } else if (s.type === 'postcode') {
      h += '<div class="wiz__opts wiz__pc-opts" role="group">' + T.lands.map(function (l, k) { return '<button type="button" class="opt opt--sm" data-land="' + k + '" aria-pressed="' + (st.land === k) + '"><span class="opt__box"></span><span class="opt__txt"><span class="opt__v">' + l + '</span></span></button>'; }).join('') + '</div>';
      if (st.land) {
        h += '<div class="wiz__pc">' + (st.land === 5 ? '<div class="field"><input type="text" id="w-ctry" placeholder="' + T.ctryPh + '" value="' + esc(st.ctry) + '" /></div>' : '') +
          '<div class="field"><input type="text" id="w-intl" placeholder="' + T.intlPh + '" value="' + esc(st.intl) + '" /></div><p class="wiz__err" id="wiz-err" hidden>' + T.intlErr + '</p></div>';
      } else
      h += '<div class="wiz__pc"><div class="field"><input type="text" id="w-in" inputmode="numeric" maxlength="4" autocomplete="postal-code" placeholder="' + s.ph + '" value="' + esc(st.pc || '') + '" /></div>' +
        '<p class="wiz__pc-out" id="pc-out" aria-live="polite"></p><div class="wiz__opts wiz__pc-opts" id="pc-opts" hidden></div>' +
        '<div class="field" id="pc-man" hidden><input type="text" id="w-gem" placeholder="' + T.town + '" value="' + esc(st.pcGem || '') + '" /></div>' +
        '<p class="wiz__err" id="wiz-err" hidden>' + T.pcErr + '</p></div>';
    } else if (s.type === 'area') {
      h += '<div class="field"><textarea id="w-in" placeholder="' + s.ph + '">' + esc(st[s.id] || '') + '</textarea></div><p class="wiz__err" id="wiz-err" hidden>' + T.fill + '</p>';
    } else {
      h += '<div class="form__row">' + field('name', 'text', T.f.name, T.f.yourName, true, T.f.errName) + field('company', 'text', T.f.company, T.f.opt) + '</div>' +
        '<div class="form__row">' + field('email', 'email', T.f.email, T.f.you, true, T.f.errEmail) + phoneField() + '</div>' +
        '<div class="consent" id="f-consent"><input type="checkbox" id="consent" name="consent"' + (st.consent ? ' checked' : '') + ' /><label for="consent">' + T.f.consent + ' <span class="req">*</span></label></div>';
    }
    stage.innerHTML = h;
    if (s.type === 'postcode' && !st.land) pcShow();
    stage.style.animation = 'none'; void stage.offsetWidth; stage.style.animation = '';
    count.textContent = String(i + 1).padStart(2, '0') + ' / ' + N;
    bar.style.width = ((i + 1) / N * 100) + '%';
    bBack.style.visibility = i ? 'visible' : 'hidden';
    bSkip.hidden = !!s.req;
    bNext.textContent = s.type === 'contact' ? T.send : T.next;
    if (errEl) errEl.hidden = true;
    if (focus) {
      var r = form.getBoundingClientRect();
      if (r.top < 70) window.scrollTo({ top: window.scrollY + r.top - 110, behavior: 'smooth' });
      var el = stage.querySelector('.opt[aria-pressed="true"], .opt, input, textarea');
      if (el) el.focus({ preventScroll: true });
    }
  }

  function go(d) { clearTimeout(timer); i = Math.max(0, Math.min(N - 1, i + d)); render(true); }
  function next() {
    var s = S[i];
    if (s.type === 'contact') return submit();
    if (s.type === 'postcode' && !st.land && st.pc && !prov(+st.pc)) { document.getElementById('wiz-err').hidden = false; return; }
    if (s.req && !has(s)) { var e = document.getElementById('wiz-err'); if (e) e.hidden = false; return; }
    go(1);
  }

  stage.addEventListener('click', function (e) {
    var b = e.target.closest('.opt'); if (!b) return;
    if (b.dataset.land != null) {
      var L = +b.dataset.land; if (L === st.land) return;
      st.land = L; st.locatie = '';
      if (L) intlSet(); else if (st.pc && st.pc.length === 4) { lookup(st.pc); }
      render(false);
      var f0 = stage.querySelector(L === 5 ? '#w-ctry' : (L ? '#w-intl' : '#w-in')); if (f0) f0.focus({ preventScroll: true });
      return;
    }
    if (b.dataset.pc != null) { st.pcGem = st.pcNames[+b.dataset.pc]; pcSet(); pcShow(); return; }
    var s = S[i], v = s.opts[+b.dataset.n].v;
    if (s.multi) {
      var a = st[s.id] || (st[s.id] = []), k = a.indexOf(v);
      if (k > -1) a.splice(k, 1); else a.push(v);
      b.setAttribute('aria-pressed', k < 0);
    } else {
      if (s.id === 'type' && st.type !== v) delete st.ruimtes;
      st[s.id] = v;
      stage.querySelectorAll('.opt').forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      clearTimeout(timer); timer = setTimeout(function () { go(1); }, 320);
    }
    var er = document.getElementById('wiz-err'); if (er) er.hidden = true;
  });
  stage.addEventListener('input', function (e) {
    var t = e.target, s = S[i];
    if (s.type === 'postcode' && t.id === 'w-in') {
      t.value = t.value.replace(/\D/g, '').slice(0, 4); st.pc = t.value;
      var er0 = document.getElementById('wiz-err'); if (er0) er0.hidden = true;
      if (st.pc.length === 4) lookup(st.pc); else { st.locatie = ''; st.pcOut = ''; st.pcManual = false; st.pcNames = []; st.pcGem = ''; pcShow(); }
    } else if (t.id === 'w-intl' || t.id === 'w-ctry') {
      st[t.id === 'w-intl' ? 'intl' : 'ctry'] = t.value; intlSet(); var er1 = document.getElementById('wiz-err'); if (er1) er1.hidden = true;
    } else if (t.id === 'w-gem') {
      st.pcGem = t.value.trim(); pcSet(); document.getElementById('pc-out').textContent = st.pcOut;
    } else if (t.id === 'w-in') { st[s.id] = t.value; var er2 = document.getElementById('wiz-err'); if (er2) er2.hidden = true; }
    else if (t.id in st) st[t.id] = t.type === 'checkbox' ? t.checked : t.value;
    var f = t.closest('.field') || t.closest('.consent'); if (f) f.classList.remove('invalid');
  });
  stage.addEventListener('change', function (e) {
    if (e.target.id === 'phone-cc') { st.cc = e.target.value; var ph = document.getElementById('phone'); ph.placeholder = st.cc ? '4 12 34 56 78' : T.ccFull; ph.focus(); return; }
    if (e.target.id === 'consent') { st.consent = e.target.checked; document.getElementById('f-consent').classList.remove('invalid'); }
  });
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') { e.preventDefault(); next(); }
  });
  bBack.addEventListener('click', function () { go(-1); });
  bSkip.addEventListener('click', function () { var id = S[i].id; delete st[id]; if (id === 'locatie') { st.pc = ''; st.pcOut = ''; st.pcGem = ''; st.pcManual = false; st.pcNames = []; st.intl = ''; st.ctry = ''; st.land = 0; } go(1); });
  bNext.addEventListener('click', next);
  form.addEventListener('submit', function (e) { e.preventDefault(); next(); });

  function submit() {
    function bad(id, b) { document.getElementById(id).classList.toggle('invalid', b); return b; }
    var ok = ![bad('f-name', !st.name.trim()), bad('f-email', !emailRe.test(st.email.trim())), bad('f-phone', !st.phone.trim()), bad('f-consent', !st.consent)].some(Boolean);
    if (!ok) return;
    var fd = new FormData(form);
    fd.set('phone', fullPhone());
    fd.set('subject', T.subject + ' · ' + (st.dienst || '—'));
    var rows = [];
    S.forEach(function (s) {
      if (s.type === 'contact' || !has(s)) return;
      var v = Array.isArray(st[s.id]) ? st[s.id].join(', ') : String(st[s.id]).trim();
      fd.append(s.label, v); rows.push([s.label, v]);
    });
    bNext.disabled = true; bNext.textContent = T.sending;
    fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d || !d.success) throw new Error('submit failed');
        rows.push([T.f.name, st.name.trim()], [T.f.email, st.email.trim()], [T.f.phone, fullPhone()]);
        if (st.company.trim()) rows.push([T.f.company, st.company.trim()]);
        document.getElementById('sum').innerHTML = rows.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('');
        form.style.display = 'none';
        sent.classList.add('show');
        var r = sent.getBoundingClientRect();
        if (r.top < 70) window.scrollTo({ top: window.scrollY + r.top - 110, behavior: 'smooth' });
        if (window.doiaTrackLead) window.doiaTrackLead();
      })
      .catch(function () { bNext.disabled = false; bNext.textContent = T.send; if (errEl) errEl.hidden = false; });
  }

  render(false);
})();
