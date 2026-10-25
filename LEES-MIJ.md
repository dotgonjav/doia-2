# Upload naar repo "doia-2" (doia.be)

Deze bestanden vervangen de bestaande versies in de root van de repo.
Behoud de mappenstructuur: en/index.html hoort in en/, enzovoort.

## Bestanden
- index.html            schema: LocalBusiness opgeschoond + uren 09-17 + hasMap + OfferCatalog
- en/index.html         idem (EN)
- contact.html          schema: uren + hasMap + availableLanguage
- en/contact.html       idem (EN) + eyebrow boven H1 verwijderd (lay-out gelijk aan NL)
- werk.html             schema: CollectionPage + ItemList (3 projecten)
- en/work.html          idem (EN)
- studio.html           schema: AboutPage + Person toegevoegd
- en/studio.html        idem (EN)
- sitemap.xml           alle lastmod-datums op 2026-09-08
- CLAUDE.md             projectregels (niet zichtbaar op de site)

## Project Baigal: nieuwe beelden
- images/baigal-01 t/m 09.jpg   (01-04 overschrijven, 05-09 nieuw)
- werk/baigal.html, en/work/baigal.html   nieuwe galerij (9 beelden, 3:2 / 2:3) + nieuwe projecttekst

## Project Ger: nieuw ontwerp
- images/ger-01 t/m 11.jpg   (01-06 overschrijven, 07-11 nieuw)
- werk/ger.html, en/work/ger.html   nieuwe galerij (11 beelden, 3:2 / 2:3), nieuw concept + materiaaltekst, og:image = ger-01
- werk.html, en/work.html, index.html, en/index.html   Ger-kaart en hero-slides naar nieuwe beelden

## Social preview (og:image)
- werk/baigal.html, en/work/baigal.html   og:image = baigal-02
- werk/shar.html, en/work/shar.html   og:image = shar-01

## Widescreen
- styles.css   maximale inhoudsbreedte 1600px, gecentreerd op brede schermen

## Stappen
    git add -A
    git commit -m "Schema markup uitgebreid: LocalBusiness, ItemList, Person, OfferCatalog"
    git push origin main

## Daarna
1. Google Search Console > Sitemaps > sitemap.xml opnieuw indienen.
2. Controleer met search.google.com/test/rich-results op https://doia.be/
   Verwacht: ProfessionalService met adres, openingsuren 09:00-17:00 en 3 diensten.
