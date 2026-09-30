# 01 — Discovery (cadrage)

> Phase « avant le code » : ce que l'équipe produit avant d'écrire une ligne.
> Source : `euloges.txt` (brief client du 29/09/2026) + analyse de 2 concurrents.

## 1. Le client

| | |
|---|---|
| Société | **ETRADEX SARLAU** — en cours de création |
| Contact | Euloges Patrick EWANY |
| Localisation | Rabat / Salé, Maroc |
| WhatsApp | +33 7 71 59 60 38 (numéro français) |
| E-mail | eulogesewany09@gmail.com (gmail — pas encore d'adresse au domaine) |
| Signature | « Votre partenaire pour la mobilité, les études et le développement des jeunes talents au Maroc » |

## 2. Objectifs business

1. **Générer des demandes de contact** (WhatsApp d'abord, formulaire ensuite) — c'est LA mesure du succès.
2. **Crédibiliser une société neuve** : le site doit rassurer un étudiant à 3 000 km et un parent qui paie.
3. **Être trouvé sur Google** sur les recherches « étudier au Maroc », « logement étudiant Rabat », « conciergerie Rabat »…
4. **Se démarquer de Moriva** : « très littéraire » → nous : visuel, scannable, orienté action.

## 3. Personas (qui vient sur le site, et pourquoi)

| # | Persona | Ce qu'il cherche | Ce qui le convainc | Canal préféré |
|---|---|---|---|---|
| P1 | **Étudiant étranger** (Afrique subsaharienne, francophone, 18-25 ans) — cœur de cible | inscription, visa/carte de séjour, logement, accueil aéroport | étapes claires, délais, « on s'occupe de tout », réponse rapide | **WhatsApp**, mobile |
| P2 | **Parent / famille** qui finance | sécurité, sérieux, interlocuteur fiable | société déclarée, adresse Rabat, process transparent | WhatsApp, téléphone |
| P3 | **Particulier / expatrié** arrivant au Maroc | logement, démarches, conciergerie | disponibilité, service sur mesure | WhatsApp, formulaire |
| P4 | **Entreprise** (mobilité de salariés, stagiaires) | relocation, logement, assistance admin | sérieux, devis, e-mail pro | Formulaire, e-mail |
| P5 | **Professionnel / investisseur** | installation, création de société, immobilier | réseau local, accompagnement de bout en bout | Formulaire, rendez-vous |

**Conséquence design :** mobile-first (P1 est à 90 % sur téléphone), WhatsApp visible en permanence, textes courts.

## 4. Analyse concurrentielle

| | **moriva.ma** | **stufly.ma** | **ETRADEX (cible)** |
|---|---|---|---|
| Cible | étudiants internationaux | étudiants internationaux | étudiants **+** particuliers, entreprises, investisseurs |
| Ville | Rabat | Casablanca | **Rabat–Salé** |
| Ton | institutionnel, long (« littéraire ») | chaleureux, emojis, simple | direct, visuel, rassurant |
| Structure | comptes, bourses, agences, blog | one-page : services → 4 étapes → domaines → FAQ → contact | multi-pages SEO + parcours clair |
| Parcours | création de compte (friction) | « Commencer gratuitement » + formulaire multi-étapes | **WhatsApp 1 clic** + formulaire court qualifié |
| Preuves | aucune stat, aucun témoignage | délais concrets (visa 2-6 sem., réponse < 24 h) | délais/engagements concrets, **aucune stat inventée** |
| Langues | FR | FR | **FR + EN** (AR prévu) |
| Faiblesse exploitable | pavés de texte, services flous | périmètre étudiant uniquement, one-page = peu de SEO | — |

**Positionnement retenu :** *le guichet unique de l'installation au Maroc* — étudiants en priorité, mais aussi familles,
entreprises et investisseurs. Stufly = étudiants seulement ; Moriva = orientation académique. ETRADEX couvre
**tout ce qui se passe après l'admission** (voyage, papiers, logement, vie quotidienne) et au-delà des étudiants.

## 5. Périmètre (scope)

### Inclus (V1)
- Accueil, À propos, Services (index + **6 pages dédiées**), FAQ, Contact, Mentions légales, 404
- **Bilingue FR (racine) + EN (`/en`)** — structure prête pour l'arabe (RTL) en V2
- Formulaire de contact qualifié (profil, service, message) + **WhatsApp** (bouton flottant + CTA partout)
- Réseaux sociaux (en-tête/pied de page, masqués tant que non fournis)
- SEO de base complet : titres/descriptions uniques, sitemap, robots, JSON-LD, Open Graph, hreflang
- 100 % responsive (320 → 2560 px)

### Exclus (décisions)
- ❌ **Pas de dashboard / back-office** (décision du 29/09). Les modifications de textes/photos passent par nous
  (contenu centralisé dans un seul fichier → modification en minutes). À vendre comme **forfait maintenance**.
- ❌ Pas d'espace client / compte / paiement en ligne.
- ❌ Pas de blog en V1 (option V2 : c'est le vrai levier SEO long terme — guides « visa étudiant Maroc », etc.).

## 6. Contenu : ce qu'on a / ce qui manque

| Élément | Statut | Action |
|---|---|---|
| Liste des 6 services | ✅ brief | rédaction par nous |
| Slogan | ✅ brief | réutilisé en hero |
| **Logo** | ❌ | wordmark provisoire ETRADEX (SVG) — à remplacer |
| **Photos** | ❌ | photos libres de droits CC0 (non présentées comme « nos réalisations ») |
| **Couleurs** | ❌ | proposition : bleu nuit + safran (confiance + chaleur marocaine) |
| **Téléphone marocain** | ❌ | on affiche le WhatsApp +33 fourni |
| **E-mail pro** | ❌ | gmail en attendant `contact@<domaine>` |
| **Adresse postale** | ❌ | « Rabat – Salé » seulement → schema `Organization`, pas `LocalBusiness` |
| **Réseaux sociaux** | ❌ | liens masqués tant que vides |
| **RC / ICE / capital** | ❌ (société en création) | mentions légales avec champs à compléter |
| **Nom de domaine** | ❌ | à trancher : `.ma` exige la société immatriculée → `.com` possible en attendant |

**Règle d'honnêteté** (société neuve) : **zéro** chiffre inventé (« +500 étudiants »), **zéro** faux témoignage,
**zéro** logo de partenaire. On remplace la preuve sociale par des **engagements vérifiables** : réponse sous 24 h,
interlocuteur unique, devis gratuit, FR/EN.

## 7. Stratégie SEO (mots-clés par page)

| Page | Mot-clé principal (FR) | Secondaires | EN |
|---|---|---|---|
| Accueil | accompagnement étudiants étrangers Maroc | installation au Maroc, Rabat Salé | study in Morocco support |
| Étudiants | étudier au Maroc étudiant étranger | inscription université Maroc, carte de séjour étudiant, accueil aéroport | international students Morocco |
| Voyages & admin | assistance administrative Maroc | visa Maroc, légalisation documents, billets | administrative assistance Morocco |
| Logement | logement étudiant Rabat | location appartement Rabat Salé, colocation | student housing Rabat |
| Conciergerie | conciergerie Rabat | conciergerie entreprise, assistance particuliers | concierge service Rabat |
| Pros & investisseurs | investir au Maroc accompagnement | création société Maroc, installation expatrié | invest in Morocco support |
| Sur mesure | services sur mesure Maroc | relocation Maroc | relocation services Morocco |
| FAQ | questions étudier au Maroc | — | FAQ studying in Morocco |

Local : Rabat, Salé, Témara, Kénitra (région Rabat-Salé-Kénitra) ; international : pays d'origine francophones.

## 8. Critères de réussite (definition of done)

- Lighthouse ≥ 90 perf / 100 SEO / 100 accessibilité / 100 bonnes pratiques (sur serveur type production)
- 0 débordement horizontal de 320 à 2560 px ; cibles tactiles ≥ 44 px
- 1 `<h1>` par page, titres ≤ 60 car., descriptions 120–160 car., JSON-LD valide (0 erreur)
- WhatsApp accessible en ≤ 1 clic depuis n'importe quelle page
- Le client peut demander une modif texte/photo → livrée en < 24 h (contenu centralisé)

## 9. Risques

| Risque | Mitigation |
|---|---|
| Société pas encore immatriculée → `.ma` impossible, mentions légales incomplètes | `.com` ou attente ; champs légaux isolés dans la config |
| Numéro +33 : moins rassurant pour un public « Maroc » | demander un numéro +212 ; tout est dans `site.config` |
| Photos stock = impression « générique » | cadrage soigné, 1 photo par service, remplaçables par des vraies |
| Formulaire sans backend | endpoint PHP léger (hébergement mutualisé) + repli WhatsApp si l'envoi échoue |
