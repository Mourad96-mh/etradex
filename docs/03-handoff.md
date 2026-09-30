# 03 — Livraison, maintenance et points ouverts

## Commandes

```bash
cd site
npm install            # une fois
npm run dev            # développement → http://localhost:3000
npm run build          # export statique → site/out/ (24 pages + 404)
npm run serve          # sert out/ comme en production (gzip, cache) → http://localhost:4173
npm run audit          # SEO : titres, descriptions, h1, canonical, hreflang, JSON-LD, images, liens
npm run check:responsive   # (serve lancé) débordements 320→1920 px + burger ; SHOTS=1 pour les captures
npm run images         # régénère les WebP depuis assets-src/
npm run logo           # détoure brand/logo-client.jpeg → logos PNG, favicon, brand.js
npm run og             # régénère og.jpg (après npm run logo)
```

## Modifier le contenu (demandes du client)

| Demande | Fichier |
|---|---|
| Numéro WhatsApp, e-mail, téléphone, adresse, réseaux sociaux, RC/ICE | `site/src/content/site.js` (+ `public/llms.txt`, + `TO_EMAIL` dans `public/contact.php`) |
| Texte d'un service (titre, puces, FAQ…) | `site/src/content/services.js` |
| Textes de l'accueil, à propos, FAQ, contact, pied de page | `site/src/content/fr.js` / `en.js` |
| Remplacer une photo | déposer `<nom>.jpg` dans `site/assets-src/` puis `npm run images` |
| Nouveau logo | remplacer `site/brand/logo-client.jpeg` (fond blanc), puis `npm run logo && npm run og` |

Puis `npm run build` → renvoyer le contenu de `site/out/` sur l'hébergement.
Réseaux sociaux : renseigner l'URL dans `site.js` suffit, l'icône apparaît dans le pied de page et le `sameAs` du JSON-LD.

## Mise en ligne (Hostinger / cPanel)

1. Acheter l'hébergement + domaine ; activer le SSL (Let's Encrypt).
2. `npm run build`, puis zipper **le contenu** de `out/` avec `tar.exe -a -c -f site.zip -C out .` (pas `Compress-Archive` : chemins Windows cassés sur Linux).
3. Extraire dans `public_html/`. Le `.htaccess` force HTTPS + www, active gzip et le cache.
4. Si le domaine n'est pas `www.etradex.ma` : changer `SITE.url` dans `site.js`, `FROM_EMAIL` dans `contact.php`, les URL de `llms.txt`, et la règle www du `.htaccess`.
5. Tester le formulaire en réel (l'e-mail doit arriver ; sinon le repli WhatsApp s'affiche).
6. Google Search Console : vérifier le domaine, soumettre `/sitemap.xml`, demander l'indexation des 6 pages services.

## Vérifié (29/09/2026)

- Build : 24 pages indexables + 404, sitemap 24 URL, `robots.txt`, `llms.txt`, `og.jpg`.
- `npm run audit` : 0 problème (titres 43–58 car., descriptions 121–160 car., 1 h1/page, canonical + hreflang fr/en/x-default, `lang` correct).
- JSON-LD : 78 blocs, 0 erreur (Organization, WebSite, Service, BreadcrumbList, FAQPage, ItemList, AboutPage, ContactPage).
- Responsive : voir la sortie de `check:responsive` (14 largeurs × 10 pages + test fonctionnel du burger).

## ⚠ Points ouverts — à obtenir du client

1. ~~Logo~~ ✅ reçu le 29/09 (JPEG WhatsApp détouré). Demander si possible la **version vectorielle** (SVG/PDF/AI) pour un rendu parfaitement net.
2. **Nom de domaine** (`etradex.ma` supposé — `.ma` exige la société immatriculée).
3. **Numéro marocain** (+212) : aujourd'hui seul le WhatsApp +33 est affiché.
4. **E-mail professionnel** (`contact@domaine`) à la place du gmail.
5. **Adresse postale** → permettra le schéma `LocalBusiness` + fiche Google Business Profile (gros levier local).
6. **Réseaux sociaux** (Facebook, Instagram, LinkedIn, TikTok).
7. **RC, ICE, capital** pour les mentions légales (affichés « en cours d'immatriculation »), et le nom de l'hébergeur.
8. **Vraies photos** (équipe, bureau, accueil d'étudiants) pour remplacer les photos d'illustration.
9. Valider les **textes** (rédigés par nous à partir du brief), notamment les engagements « réponse sous 24 h » et « un seul interlocuteur ».
10. **Arabe** : non inclus en V1 ; l'architecture le permet (groupe de routes `(ar)` + `dir="rtl"`).

## Évolutions proposées (V2)

- Blog / guides (« visa étudiant Maroc », « logement étudiant Rabat »…) : le vrai levier SEO long terme.
- Version arabe.
- Témoignages réels d'étudiants dès les premiers clients (avec accord écrit).
