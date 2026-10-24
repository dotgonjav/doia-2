# Studio DOIA - Website Design Rules
## Studio DOIA Interieurarchitectuur

Dit document beschrijft de vaste regels, structuur en logica van deze website.
Elke aanpassing - groot of klein - moet deze regels respecteren.

---

## 1. Merk & naam

- **Publieke merknaam / handelsnaam**: **Studio DOIA** (EN: Studio DOIA). Overal kort gebruikt — titles, meta, JSON-LD, footer, body copy.
- **Domein**: `doia.be`. Alle canonicals, og:url, hreflang, sitemap en CNAME wijzen hierheen.
- **Dulguun Otgonjav** blijft de persoonsnaam van de oprichter - enkel gebruiken waar het echt over de persoon gaat (JSON-LD `founder`, portret-alt, bio). Nooit meer als merknaam.
- **E-mail**: nog steeds `hello@dulguunotgonjav.com` / `press@dulguunotgonjav.com` - wordt later door de eigenaar overgezet; niet wijzigen zonder opdracht.
- **Woordmerk in nav**: `Studio DOIA` (kort — de volledige naam staat in SEO: title, meta, JSON-LD) — font-size 0.65rem, letter-spacing 0.18em.
- **Woordmerk in footer**: `Studio DOIA` (kort), via `.footer__brand`. Copyright: `© 2026 Studio DOIA. Alle rechten voorbehouden.`
- **Tagline**: "Interieurarchitect" of "Interieurarchitectuur · België" - altijd klein, als eyebrow of sub-label.

---

## 2. Taal & stem

- **Primaire taal**: Nederlands (NL). Alle publieke copy in het Nederlands.
- **Stem**: klantgericht - de klant staat altijd voorop. Spreek de lezer rechtstreeks aan met **"u"** ("uw thuis", "u werkt samen met één interieurarchitect"). De eerste persoon enkelvoud ("ik") blijft toegestaan wáár het over vakmanschap, visie of begeleiding gaat ("ik luister", "alles wat ik voor u maak"), maar open en kader vanuit de klant, niet vanuit "ik". Nooit "we" of "onze studio".
- **Tone of voice**: concreet, zintuiglijk, stellig en rustig. Geen buzzwords ("synergy", "passionated", "innovative").
- **Drie kernboodschappen** (altijd herkenbaar aanwezig):
  1. *"Geïnspireerd door natuur en ritueel."*
  2. *"Ontworpen vanuit wie u bent."*
  3. *"Van het eerste gesprek tot het laatste detail."*
- **Slogan** (kernboodschap #1 = de vaste tagline, overal identiek - visitekaartje, bio, handtekening, offerte). Vertaal nooit los; gebruik altijd exact deze paren:
  - NL → *"Geïnspireerd door natuur en ritueel."*
  - EN → *"Inspired by nature and ritual."*
- **Support-tagline** (onder/naast de slogan, nooit als vervanging - het origin/differentiator-verhaal):
  - NL → *"Geïnspireerd op nomadische tradities."*
  - EN → *"Inspired by nomadic traditions."*
- **Vervallen slogan** (nergens meer gebruiken): "Een thuis/ruimte hoeft niet ingewikkeld te zijn. Het moet kloppen." / "A home doesn't have to be complicated. It has to feel right."
- **Dienstnamen** (nooit wijzigen zonder expliciete opdracht):
  - S/01 → Ruimtelijk advies — 450 € (650 € boven 200 m²), verrekend bij doorgang naar Ontwerp
  - S/02 → Ontwerp — 2.800 – 4.000 € (één ruimte) / 7.000 – 12.000 € (volledige woning)
  - S/03 → Ontwerp met begeleiding — 10% van de bouwkost, minimaal 8.000 € (7% in het eerste jaar)

---

## 3. Kleur

Gedefinieerd als CSS-variabelen in `styles.css`:

| Variabele    | Waarde               | Gebruik                              |
|--------------|----------------------|--------------------------------------|
| `--paper`    | `#FBFAF8`            | Paginaachtergrond                    |
| `--paper-2`  | `#F2F0EC`            | Afbeeldingsplaceholder, subtiele bg  |
| `--ink`      | `#16140F`            | Primaire tekst, knoppen              |
| `--ink-2`    | `#5A564E`            | Secundaire tekst, beschrijvingen     |
| `--ink-3`    | `#98938A`            | Captions, labels, eyebrows           |
| `--line`     | `#DEDAD2`            | Haarlijnen, randen, dividers         |
| `--line-2`   | `#C9C4BA`            | Formuliervelden                      |
| `--accent`   | `oklch(0.59 0.10 42)`| Terracotta - spaarzaam gebruiken     |
| `--accent-2` | `oklch(0.72 0.06 220)`| Zachtblauw - zelden gebruiken       |

**Regel**: gebruik nooit willekeurige nieuwe kleuren. Kies altijd uit bovenstaande variabelen. Het accent (terracotta) enkel voor hover-states, step-nummers, CTA-knoppen en vereiste-sterretjes.

---

## 4. Typografie

Fonts geladen via Google Fonts in `styles.css`:
- `--mono`: IBM Plex Mono (300, 400, 500) → labels, nav, eyebrows, captions, nummers
- `--sans`: IBM Plex Sans (300, 400, 500) → headings, body, alles wat leesbaar moet zijn

**Klassen** (nooit opnieuw definiëren - gebruik altijd deze):
- `.h-display` → grote titels (pagina H1), clamp 2.6→7rem
- `.h-lg` → sectietitels, clamp 1.8→3.4rem
- `.lead` → intro-alinea's, clamp 1.05→1.4rem, max-width 30ch
- `.eyebrow` → mono uppercase, letter-spacing 0.18em, font-size 0.7rem, kleur `--ink-3`
- `.mono` → mono uppercase, letter-spacing 0.14em, font-size 0.72rem

**Regels**:
- Body copy altijd font-weight 300.
- Headings altijd font-weight 300, letter-spacing negatief (-0.01em tot -0.02em).
- Nooit bold (700) gebruiken - maximaal 500 voor wordmark.
- Minimale font-size: 0.62rem voor labels; 1rem voor leestekst.

---

## 5. Lay-out & grid

**Paginamarge**: `--gut: max(clamp(20px, 4.5vw, 64px), calc((100vw - var(--max)) / 2))` - altijd via `.shell` toegepast. `--max: 1600px` = maximale inhoudsbreedte; op widescreens groeit de marge zodat inhoud, nav en footer gecentreerd blijven. Hero-beelden blijven full-bleed.

**Rasterlogica**:
- Desktop breakpoint voor 2-koloms: `min-width: 860px` (tekst + beeld naast elkaar)
- Desktop breakpoint voor diensten/processen: `min-width: 820px`
- Desktop breakpoint voor paren (2 gelijke kolommen): `min-width: 720px`
- Altijd `display: grid` met `gap`, nooit losse margins tussen siblings.

**Vaste afstanden** (gebruik altijd `clamp`):
- Sectie vertical padding: `clamp(50px, 8vw, 110px)` of `clamp(80px, 12vw, 160px)`
- Pagina-header top padding: `clamp(120px, 18vh, 220px)`
- Gap tussen elementen: `clamp(28px, 5vw, 60px)` (groot) / `clamp(18px, 2.5vw, 28px)` (klein)

---

## 6. Componenten

### Nav
- Positie: fixed, z-index 50, mix-blend-mode: difference (wit op zwart/kleur).
- Wordmark links, menu rechts (Werk · Studio · Contact).
- Hover-state: `::after` underline scaleX animatie.
- Actieve pagina: `aria-current="page"` via `app.js initNav()`.

### Footer
- Altijd 2-koloms grid (Studio-info links, Pagina's rechts) + `.footer__bottom`.
- Inhoud: adres, email, telefoon, Instagram, LinkedIn, BTW-nummer.
- Vaste footer-info:
  - Adres: Heidijk 17, B-2860 Sint-Katelijne-Waver, België
  - Email: hello@dulguunotgonjav.com / press@dulguunotgonjav.com
  - Tel: +32 4 56 87 04 41
  - BTW: BE0735 512 495

### Afbeeldingen
- Vaste, ingebakken `<img>` (geen drag-and-drop slots meer). Altijd `loading="lazy"` behalve hero-beelden (`loading="eager" fetchpriority="high"`), met een beschrijvende Nederlandse `alt`.
- Wrapper altijd `.frame` (overflow hidden, bg `--paper-2`, hover scale 1.035); `.frame img` is `width/height:100%` + `object-fit:cover`.
- Bronbestanden in `images/`, geoptimaliseerd op max 2560px (langste zijde), JPEG q 0.8–0.82.

### Diensten (services) - index.html
- Grid per rij: `grid-template-columns: 1fr 1.7fr 0.5fr` op desktop.
- S/0X en naam altijd samen in `.svc__head` (flex, align-items baseline, gap clamp(22px,3vw,44px)).
- Prijs rechts uitlijnen, breek "Één heldere prijs," / "vooraf afgesproken" op 2 regels via `<br />`.
- Hover: `padding-left` transitie.

### Scroll-reveal
- Klasse `.reveal` op alle elementen die bij scroll verschijnen.
- Vertraging via `.d1`, `.d2`, `.d3` (0.08s / 0.16s / 0.24s).
- Eerste zichtbare elementen in hero: altijd `.reveal.is-visible` (al zichtbaar bij load).

### Knoppen
- `.btn`: ink achtergrond, paper tekst. Hover: accent achtergrond.
- `.link-line`: mono uppercase, border-bottom, hover gap vergroot.
- Nooit ronde knoppen of afgeronde hoeken.

### FAQ (studio.html)
- Accordion: hoogte animatie via JS (`panel.style.height`).
- `.qa__icon` plus/min via CSS `::after scaleY(0)`.
- Hover kleur: terracotta accent.

---

## 7. Bestandsstructuur

De **actieve pagina's** zijn de werkende, publieke website (schone URL's):
- `index.html` - Homepage
- `werk.html` - Portfolio-overzicht
- `studio.html` - Over / Aanpak / Werkwijze / FAQ
- `contact.html` - Contact + formulier
- `project-baigal.html`, `project-ger.html`, `project-shar.html` - projectpagina's
- `privacy.html`, `terms.html`, `disclaimer.html` - juridisch (noindex)

Gedeelde bestanden (nooit per pagina dupliceren):
- `styles.css` - alle tokens, utilities, nav, footer
- `app.js` - scroll-reveal IntersectionObserver + nav active state

**SEO / hosting-bestanden** (root, niet aanraken zonder reden):
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, `404.html`
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `og-image.jpg`
- `CNAME` - custom domain voor GitHub Pages (`doia.be`)
- Elke pagina heeft in `<head>`: unieke `<title>` + meta-description, canonical, Open Graph/Twitter, JSON-LD schema. Bij nieuwe pagina's dit patroon volgen en toevoegen aan `sitemap.xml`.

**Opgeruimd**: de oude `/archive/`, `/uploads/`, `/screenshots/`, `/opt/` mappen en de editor-only `image-slot.js` + `.image-slots.state.json` zijn verwijderd. De map bevat nu uitsluitend de werkende site + hosting-bestanden.

---

## 8. Wat nooit mag

- Geen emoji's.
- Geen afgeronde hoeken op containers (enkel op knoppen als dat zo is gedefineerd - hier: geen).
- Geen gradiëntachtergronden (enkel de hero-scrim is toegestaan).
- Geen nieuwe kleuren buiten de CSS-variabelen.
- Geen "we" of "onze" in de copy.
- Geen "Dulguun Otgonjav Interior Architect" meer als merknaam - dat is de oude handelsnaam.
- Geen `position: absolute` voor lay-out (enkel voor hero overlays).
- Geen inline `margin` tussen siblings - altijd `gap` in flex/grid.
- Geen font-weight 700 (bold).
- Geen `scrollIntoView()`.
- Geen Lorem Ipsum of Engelse placeholder-copy.

---

## 9. Bij aanpassingen

1. **Lees eerst** het betreffende bestand voor je schrijft.
2. **Gebruik `str_replace_edit`** voor gerichte aanpassingen - geen volledige herschrijvingen tenzij nodig.
3. **Respecteer het grid**: pas kolommen aan via de bestaande breakpoints.
4. **Nieuwe secties**: volg het patroon `.shell` + `.block` of `.shell` + eigen sectie-class met `border-top: 1px solid var(--line)`.
5. **Nieuwe copy**: altijd Nederlands, eerste persoon, binnen de tone of voice.
6. **Screenshot** om te verifiëren bij twijfel over uitlijning.
7. **NL en EN altijd samen**: elke NL-pagina heeft een EN-tegenhanger in `/en/` met identieke structuur (zelfde tags, classes, grid, reveal-delays). Wijzig je de ene, wijzig dan de andere in dezelfde beweging. Enige toegestane afwijking: het `.note-binding`-kader op de EN juridische pagina's.

---

## 10. Gestructureerde data (JSON-LD)

Elke pagina heeft schema-markup in `<head>`, direct na `<meta name="theme-color">`. Vaste verdeling:

| Pagina | Schema |
|--------|--------|
| `index.html` / `en/index.html` | `ProfessionalService` (@id `https://doia.be/#studio`, incl. adres, geo, uren 09:00–17:00 ma–vr, hasMap, availableLanguage, `hasOfferCatalog` met de 3 diensten, `AskAction` naar contact) + `WebSite` |
| `contact.html` / `en/contact.html` | `ProfessionalService` (zelfde @id, zonder OfferCatalog) |
| `studio.html` / `en/studio.html` | `AboutPage` + `Person` (@id `#dulguun`) én `FAQPage` |
| `werk.html` / `en/work.html` | `CollectionPage` + `ItemList` van alle projecten |
| `werk/<slug>.html` / `en/work/<slug>.html` | `CreativeWork` per project |
| juridisch, 404, bedankt | geen schema |

**Regels**:
- **Nooit prijzen in schema.** De diensten staan als `Service` zonder prijsveld; elke `Offer` verwijst met `url` naar de contactpagina en de beschrijving luidt "Prijs op maat van uw project. Vraag een offerte aan via de contactpagina." (EN: "Price tailored to your project. Request a quote via the contact page."). Prijzen staan enkel in de zichtbare copy op `index.html`.
- Altijd naar de bestaande `@id`'s verwijzen (`#studio`, `#dulguun`) in plaats van de entiteit te herhalen.
- JSON moet geldig zijn: geen trailing komma's, `&` in URL's als `&amp;` vermijden binnen JSON-LD (gewone `&` is correct daar).

### Checklist bij een NIEUW project

Doe dit altijd volledig, in één keer:

1. `werk/<slug>.html` + `en/work/<slug>.html` aanmaken naar het patroon van `werk/ger.html` — incl. eigen `title`, meta-description, canonical, hreflang, OG en `CreativeWork`-schema met `locationCreated` en `creator: { "@id": "https://doia.be/#studio" }`.
2. Projectkaart toevoegen aan `werk.html` én `en/work.html` (`.card` + `.card__frame` + `loading="lazy"` + NL/EN alt-tekst), met de juiste `.d1`/`.d2`/`.d3` reveal-delay in de reeks.
3. **`ItemList` bijwerken** op `werk.html` én `en/work.html`: nieuwe `ListItem` met juiste `position`, en `numberOfItems` verhogen.
4. `sitemap.xml` uitbreiden met beide URL's (NL + EN).
5. Beelden in `images/`, max 2560px langste zijde, JPEG q 0.8–0.82, beschrijvende Nederlandse/Engelse `alt`.
6. Homepage-selectie op `index.html` / `en/index.html` nakijken: hoort het nieuwe project daar thuis, en verandert de volgorde?
7. Na afloop: alle JSON-LD-blokken valideren (moeten parsen) en de NL/EN-structuurcheck uit punt 7 hierboven doen.
