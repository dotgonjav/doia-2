# Upload naar repo "doia-2" (doia.be)

Deze 10 bestanden vervangen de bestaande versies in de root van de repo.
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

## Stappen
    git add -A
    git commit -m "Schema markup uitgebreid: LocalBusiness, ItemList, Person, OfferCatalog"
    git push origin main

## Daarna
1. Google Search Console > Sitemaps > sitemap.xml opnieuw indienen.
2. Controleer met search.google.com/test/rich-results op https://doia.be/
   Verwacht: ProfessionalService met adres, openingsuren 09:00-17:00 en 3 diensten.
