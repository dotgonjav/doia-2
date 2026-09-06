# Redirect-bestanden voor dulguunotgonjav.com repo (GitHub: dotgonjav/doia)

Deze bestanden vervangen de bestaande pagina's in de repo "doia" (CNAME: dulguunotgonjav.com).
De repo heeft al werkende redirect-stubs voor: about.html, project-baigal.html, project-ger.html, project-shar.html, terms-conditions.html — die hoef je niet aan te passen.

## Stappen
1. Clone de repo "doia" (dulguunotgonjav.com) lokaal.
2. Vervang deze bestanden in de root door de versies in deze map:
   index.html, werk.html, studio.html, contact.html, privacy.html, disclaimer.html, terms.html, bedankt.html
   Plaats ook alle bestanden uit de map "en/" in de map "en/" van de root (root/en/*.html) — redirects voor dulguunotgonjav.com/en/*.
3. Laat CNAME ongewijzigd (blijft "dulguunotgonjav.com").
4. Commit en push naar main:
   git add -A
   git commit -m "Redirect alle pagina's naar doia.be"
   git push origin main
5. Check in GitHub Pages settings (repo doia) dat custom domain nog dulguunotgonjav.com is en HTTPS enforced staat aan.

## Nieuwe site (doia.be)
De volledige, huidige site (dit project) hoort in de repo "doia-2" (nu leeg):
1. Download/exporteer dit project als bestanden (of git init lokaal met deze inhoud).
2. Push alles naar dotgonjav/doia-2, branch main.
3. In GitHub repo settings > Pages: zet custom domain op "doia.be", enforce HTTPS.
4. Bij je domeinregistrar (voor doia.be): zet DNS zoals GitHub Pages vraagt —
   4x A-records naar GitHub Pages IP's (185.199.108.153, .109.153, .110.153, .111.153)
   plus (optioneel) een AAAA-record set, of een CNAME naar dotgonjav.github.io als je een subdomain gebruikt.
5. Wacht op DNS-propagatie en activeer HTTPS in Pages settings.
