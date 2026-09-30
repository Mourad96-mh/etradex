# 02 — Architecture

## 1. Décisions techniques (ADR résumés)

| # | Décision | Pourquoi | Alternatives écartées |
|---|---|---|---|
| A1 | **Next.js 15 (App Router) en export statique** (`output: "export"` → `site/out/`) | HTML complet par page = SEO solide, aucun serveur à maintenir, hébergement le moins cher, impossible à « hacker » comme un WordPress | WordPress (lourd, failles, maintenance plugins) ; SPA React pure (mauvais SEO) |
| A2 | **Pas de back-office** | décision client du 29/09 ; tout le contenu est dans `src/content/` → une modif = 1 fichier + rebuild + upload | CMS headless (surcoût, abonnement) |
| A3 | **CSS pur** (tokens CSS sur `:root`, 1 feuille globale) | zéro dépendance, rendu rapide, déjà éprouvé (BATIPRO, Diamant Vert, BFM) | Tailwind (inutile à cette échelle) |
| A4 | **FR à la racine, EN sous `/en`**, 2 layouts racines via route groups `(fr)` / `(en)` | `<html lang>` correct dans le HTML statique ; hreflang propre ; l'arabe s'ajoute en `(ar)` + `dir="rtl"` | i18n client-side (invisible pour Google) |
| A5 | **Formulaire → `contact.php`** (mutualisé Hostinger/cPanel) **+ repli WhatsApp** | pas de service tiers ni de clé API ; si l'envoi échoue, le message part par WhatsApp pré-rempli : aucune demande perdue | Formspree/Web3Forms (compte tiers, quotas) |
| A6 | **Photos CC0** optimisées par `sharp` en WebP 800/1600 px, dimensions générées | LCP rapide, zéro CLS, remplaçables par les vraies photos du client | `next/image` (inutilisable en export sans loader) |
| A7 | **Polices via `next/font/google`** (auto-hébergées au build) | aucune requête Google au runtime (gain LCP mesuré sur d'autres projets) | `<link>` Google Fonts (bloquant) |
| A8 | **Next 15.5.26** (dist-tag `backport`, corrigé) | versions vulnérables refusées par Vercel ; 16.x inutile ici | — |

## 2. Arborescence du site (sitemap)

| Page | FR | EN |
|---|---|---|
| Accueil | `/` | `/en/` |
| À propos | `/a-propos/` | `/en/about/` |
| Services (index) | `/services/` | `/en/services/` |
| Étudiants internationaux | `/services/etudiants-internationaux/` | `/en/services/international-students/` |
| Voyages & assistance administrative | `/services/voyages-assistance-administrative/` | `/en/services/travel-administrative-assistance/` |
| Logement & immobilier | `/services/logement-immobilier/` | `/en/services/housing-real-estate/` |
| Conciergerie | `/services/conciergerie/` | `/en/services/concierge/` |
| Professionnels & investisseurs | `/services/professionnels-investisseurs/` | `/en/services/professionals-investors/` |
| Services sur mesure | `/services/sur-mesure/` | `/en/services/tailored-services/` |
| FAQ | `/faq/` | `/en/faq/` |
| Contact | `/contact/` | `/en/contact/` |
| Mentions légales | `/mentions-legales/` | `/en/legal-notice/` |
| 404 | `/404.html` | — |

**24 pages indexables + 404.** Le sélecteur de langue pointe vers la page **équivalente** (table de routes), pas vers l'accueil.

## 3. Structure du code

```
euloges/
├─ euloges.txt            brief client
├─ docs/                  01-discovery, 02-architecture, 03-handoff
└─ site/
   ├─ next.config.mjs     output export, trailingSlash, images.unoptimized
   ├─ assets-src/         originaux photos (non publiés)
   ├─ scripts/            make-images.mjs, make-og.mjs, audit.mjs, check-responsive.mjs
   ├─ public/
   │  ├─ img/             WebP générés
   │  ├─ contact.php      endpoint du formulaire (mail())
   │  ├─ .htaccess        gzip, cache, HTTPS, 404
   │  ├─ llms.txt  og.jpg
   └─ src/
      ├─ content/         ★ TOUT LE CONTENU ICI ★
      │  ├─ site.js       coordonnées, réseaux, domaine, infos légales (1 seul endroit)
      │  ├─ services.js   les 6 services FR+EN (slugs, textes, photo, icône, FAQ)
      │  ├─ fr.js en.js   textes de l'interface et des pages
      │  └─ media.js      (généré) dimensions des images
      ├─ lib/
      │  ├─ routes.js     table page → chemin FR/EN, helpers href/alternates
      │  └─ seo.js        buildMetadata(), JSON-LD (Organization, WebSite, Service, Breadcrumb, FAQ)
      ├─ components/      Header, Footer, WhatsAppFab, Icon, Logo, PageHero, ServiceCard,
      │                   Steps, Faq, CtaBand, ContactForm (client), JsonLd, Breadcrumbs
      ├─ views/           Home, About, Services, Service, Faq, Contact, Legal (paramétrés par `lang`)
      └─ app/
         ├─ (fr)/layout.js + pages FR   → fichiers minces : <View lang="fr" />
         ├─ (en)/layout.js + en/…       → fichiers minces : <View lang="en" />
         ├─ not-found.js  sitemap.js  robots.js  icon.svg  globals.css
```

**Principe :** les routes sont des coquilles vides ; les *views* contiennent la mise en page ; le *content* contient les mots.
Une modif client = `src/content/*` uniquement.

## 4. Modèle de contenu

```js
// services.js
{ id: "students", icon: "graduation", image: "students",
  slug: { fr: "etudiants-internationaux", en: "international-students" },
  fr: { title, short, metaTitle, metaDesc, intro, audience[], includes[{title,text}], steps[], faq[{q,a}] },
  en: { … } }
```
`site.js` porte les coordonnées : **changer le numéro WhatsApp à un seul endroit** le met à jour dans l'en-tête,
le pied de page, le bouton flottant, le formulaire, le JSON-LD et `llms.txt` (généré).

## 5. Design system

- **Parti pris « pas l'air IA »** (demande du 29/09, révision légère) — ce qu'on s'interdit / ce qu'on fait :

  | Interdit | Choix retenu |
  |---|---|
  | Halos et dégradés lumineux | Aplats bleu nuit + filet safran 4 px en pied de bandeau |
  | Icône dans un carré coloré sur chaque carte | Icône au trait seule, ou numéro en serif |
  | Libellés en capitales espacées au-dessus de tout | Libellé simple suivi d'un filet 1 px |
  | Tout centré | Titres alignés à gauche |
  | Pastilles, boutons pilule, rayons 20 px | Angles 4 px, soulignés, filets |
  | Cartes identiques avec ombre douce | Colonnes séparées par des filets, ombre rare |
  | Police sans-serif « tendance » partout | **Newsreader** (serif, titres) + **Public Sans** (texte) |
  | Animation « glisse vers le haut » | Fondu seul |

- **Palette = charte du logo client** (reçu le 29/09, `site/brand/logo-client.jpeg`) : anthracite `#1f2326` (bandeaux) · rouge logo `#b21c30` (filets, texte sur clair 6,8:1) · rouge clair `#f2707b` (accents sur fond sombre 5,5:1) · gris logo `#4d4d4d` · fond clair `#f5f4f1` · WhatsApp `#25d366` (icône) / `#0d7d3e` (bouton avec texte, AA).
- **Composants « parlants »** conservés : carte « Votre arrivée, étape par étape » dans le hero, parcours étudiant en 4 temps,
  étapes numérotées, engagements concrets.

### Accueil (ordre des sections)
1. **Hero** photo + H1 + 2 CTA (WhatsApp / Nos services) + chips (réponse 24 h, Rabat–Salé, FR·EN, devis gratuit)
2. **Pour qui ?** 4 profils → service associé
3. **Nos 6 services** (cartes photo)
4. **Parcours étudiant** en 4 temps (timeline) — le différenciateur visuel
5. **Comment ça marche** 4 étapes
6. **Nos engagements** (remplace les faux chiffres)
7. **FAQ** (5 questions) + lien
8. **Bandeau CTA** WhatsApp

## 6. SEO technique

- `metadata` par page : titre ≤ 60, description 120–160, canonical, hreflang fr/en/x-default, OG + Twitter, `og.jpg` 1200×630.
- JSON-LD : `Organization` + `WebSite` (layout, `@id` liés) ; `Service` + `BreadcrumbList` + `FAQPage` sur chaque service ;
  `FAQPage` sur /faq ; `AboutPage`, `ContactPage`. **`Organization` et non `LocalBusiness`** tant qu'il n'y a pas d'adresse.
- `sitemap.xml` + `robots.txt` (bots IA autorisés) générés par l'app ; `llms.txt`.
- Liens `<Link prefetch={false}>` (pas de 404 RSC en statique).

## 7. Formulaire de contact

Champs : nom*, e-mail*, téléphone/WhatsApp, profil (étudiant/famille/particulier/entreprise/investisseur),
service (6 + autre), message*, consentement*, **pot de miel anti-spam** (champ caché).
Flux : `fetch POST /contact.php` → `{ok:true}` → message de succès.
Échec (réseau, hébergeur sans PHP, erreur) → message + **bouton « Envoyer via WhatsApp »** pré-rempli avec les champs.
`contact.php` : validation serveur, anti-spam (pot de miel + délai minimal), `mail()` vers l'e-mail de `site.js`, réponse JSON.

## 8. Hébergement & mise en ligne (recommandation)

- **Hostinger (offre mutualisée)** : domaine offert la 1re année, SSL gratuit, PHP (`contact.php`), e-mail pro `contact@domaine`.
- Déploiement : `npm run build` → envoyer le contenu de `site/out/` dans `public_html/` (zip créé avec `tar.exe`, pas `Compress-Archive`).
- Après mise en ligne : Google Search Console + soumission du sitemap + fiche Google Business Profile (quand l'adresse existera).

## 9. Qualité (vérifications avant livraison)

1. `npm run build` : 25 fichiers HTML.
2. `scripts/audit.mjs` : 1 h1, longueur titres/descriptions, canonical, hreflang, JSON-LD parsable, alt + dimensions des images, liens internes non cassés.
3. `scripts/check-responsive.mjs` (Edge via CDP) : débordement à 320–1920 px, burger fonctionnel, cibles tactiles.
4. Lighthouse sur la page d'accueil + une page service.
