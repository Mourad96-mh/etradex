// Textes du site en français (interface + pages).
// Les textes des 6 services sont dans services.js.

const fr = {
  lang: "fr",
  locale: "fr_MA",
  slogan: "Votre partenaire pour la mobilité, les études et le développement des jeunes talents au Maroc",

  ui: {
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    nav: { home: "Accueil", about: "À propos", services: "Services", faq: "FAQ", contact: "Contact" },
    // nom de CETTE langue, affiché dans le sélecteur des autres versions
    langName: "Français",
    langShort: "FR",
    langs: "Langue",
    breadcrumb: "Fil d’Ariane",
    country: "Maroc",
    whatsappCta: "Écrire sur WhatsApp",
    whatsappFab: "Nous écrire sur WhatsApp",
    contactCta: "Demander un devis",
    learnMore: "En savoir plus",
    allServices: "Tous nos services",
    home: "Accueil",
    waDefault: "Bonjour ETRADEX, je souhaite avoir des informations sur vos services.",
    waService: (title) => `Bonjour ETRADEX, je suis intéressé(e) par votre service « ${title} ».`,
  },

  footer: {
    about: "ETRADEX accompagne étudiants étrangers, familles, entreprises et investisseurs dans leur installation au Maroc, depuis Rabat–Salé.",
    services: "Services",
    company: "ETRADEX",
    contact: "Contact",
    legal: "Mentions légales",
    rights: "Tous droits réservés.",
    follow: "Suivez-nous",
  },

  home: {
    metaTitle: "ETRADEX | Étudier, vivre et investir au Maroc",
    metaDesc: "ETRADEX accompagne étudiants étrangers, familles, entreprises et investisseurs à Rabat et Salé : inscription, visa, logement, conciergerie. Devis gratuit.",
    eyebrow: "Rabat – Salé · Maroc",
    title: "Étudier, vivre et entreprendre au Maroc,",
    titleAccent: "on s’occupe du reste.",
    sub: "Inscription, visa, accueil, logement, démarches : un seul interlocuteur pour réussir votre installation au Maroc.",
    ctaSecondary: "Découvrir nos services",
    chips: ["Réponse sous 24 h", "Devis gratuit", "Français · English", "Basés à Rabat – Salé"],
    card: {
      label: "Carte d’embarquement",
      title: "Votre arrivée, étape par étape",
      origins: [["PAR", "Paris"], ["DKR", "Dakar"], ["ABJ", "Abidjan"], ["KIN", "Kinshasa"], ["LBV", "Libreville"], ["DLA", "Douala"]],
      dest: ["RBA", "Rabat – Salé"],
      fields: [["Passager", "Vous"], ["Formule", "Clé en main"], ["Contact", "Un seul"]],
      items: [
        ["Inscription validée", "J-90"],
        ["Visa déposé", "J-45"],
        ["Accueil à l’aéroport", "Jour J"],
        ["Clés du logement", "Jour J"],
      ],
      stamp: "Bienvenue au Maroc",
      foot: "Un seul contact du début à la fin",
    },

    audience: {
      eyebrow: "Pour qui ?",
      title: "Un accompagnement pour chaque profil",
      items: [
        { icon: "graduation", title: "Étudiants étrangers", text: "Inscription, visa, logement et carte de séjour.", service: "students" },
        { icon: "users", title: "Familles et particuliers", text: "Installation, démarches et conciergerie au quotidien.", service: "concierge" },
        { icon: "building", title: "Entreprises", text: "Mobilité, accueil et logement de vos équipes.", service: "concierge" },
        { icon: "chart", title: "Investisseurs", text: "Création d’activité, réseau local, locaux.", service: "investors" },
      ],
    },

    services: {
      eyebrow: "Nos services",
      title: "Six domaines, un seul interlocuteur",
      sub: "Choisissez un service ou combinez-les : nous construisons l’accompagnement qui vous correspond.",
    },

    journey: {
      eyebrow: "Parcours étudiant",
      title: "De votre pays à votre campus, on vous suit à chaque étape",
      cta: "Voir l’accompagnement étudiant",
    },

    how: {
      eyebrow: "Comment ça marche",
      title: "Quatre étapes simples",
      steps: [
        { icon: "chat", title: "Vous nous écrivez", text: "Par WhatsApp ou via le formulaire, en français ou en anglais." },
        { icon: "phone", title: "On fait le point", text: "Un échange gratuit pour comprendre votre situation." },
        { icon: "file", title: "Proposition claire", text: "Ce que nous faisons, en combien de temps et à quel prix." },
        { icon: "check", title: "On s’en occupe", text: "Nous avançons et vous suivez chaque étape en temps réel." },
      ],
    },

    commitments: {
      eyebrow: "Nos engagements",
      title: "Ce que vous pouvez attendre de nous",
      items: [
        { icon: "clock", title: "Réponse sous 24 h", text: "Chaque message reçoit une réponse sous 24 heures ouvrées." },
        { icon: "user", title: "Un seul interlocuteur", text: "La même personne suit votre dossier du début à la fin." },
        { icon: "tag", title: "Prix annoncé à l’avance", text: "Un devis écrit avant de commencer. Pas de frais cachés." },
        { icon: "globe", title: "Français et anglais", text: "Nous échangeons dans la langue qui vous convient." },
      ],
    },

    faq: { eyebrow: "Questions fréquentes", title: "Vous vous posez sûrement ces questions", more: "Voir toutes les questions" },
  },

  cta: {
    title: "Parlons de votre projet",
    text: "Expliquez-nous votre situation en quelques lignes. Nous vous répondons sous 24 h avec une proposition claire.",
    secondary: "Utiliser le formulaire",
  },

  about: {
    ticket: {
      label: "Fiche société",
      code: "RBA",
      codeSub: "Rabat – Salé · Maroc",
      fields: [["Création", "2026"], ["Langues", "FR · EN"], ["Réponse", "Sous 24 h"]],
      title: "Nos valeurs",
      foot: "Un contact de confiance, sur place",
    },
    metaTitle: "À propos d’ETRADEX | Mobilité et installation au Maroc",
    metaDesc: "ETRADEX est une société basée à Rabat–Salé qui accompagne étudiants étrangers, familles, entreprises et investisseurs dans leur installation au Maroc.",
    eyebrow: "À propos",
    title: "Votre partenaire sur place, au Maroc",
    sub: "ETRADEX est née d’un constat simple : s’installer au Maroc est une belle opportunité, mais les premières démarches peuvent vite devenir un parcours du combattant.",
    photoAlt: "Rue de Rabat, Maroc",
    storyTitle: "Notre mission",
    story: [
      "ETRADEX SARLAU est une société basée à Rabat–Salé. Elle accompagne les étudiants étrangers, les familles, les entreprises et les investisseurs qui choisissent le Maroc pour étudier, vivre ou développer une activité.",
      "Notre rôle : être le contact de confiance sur place. Nous préparons les démarches, nous trouvons le logement, nous accueillons, nous coordonnons les bons professionnels et nous restons disponibles une fois l’installation terminée.",
      "Notre priorité va aux jeunes talents : un étudiant bien accompagné à son arrivée réussit mieux ses études et son intégration.",
    ],
    valuesTitle: "Nos valeurs",
    values: [
      { icon: "handshake", title: "Proximité", text: "Nous sommes sur place, à Rabat–Salé, et joignables facilement." },
      { icon: "eye", title: "Transparence", text: "Un périmètre clair et un prix annoncé avant de commencer." },
      { icon: "bolt", title: "Réactivité", text: "Une réponse sous 24 h et un suivi à chaque étape." },
      { icon: "heart", title: "Bienveillance", text: "Nous accompagnons des personnes, pas seulement des dossiers." },
    ],
    whyTitle: "Pourquoi Rabat – Salé ?",
    why: "Capitale administrative et ville universitaire, Rabat concentre universités, écoles, ambassades et administrations. Salé, Témara et Kénitra complètent un bassin de vie accessible, bien relié par le tramway et le train. C’est depuis cette base que nous rayonnons dans tout le Maroc et à l’international.",
    founderTitle: "La direction",
    founderText: "ETRADEX est dirigée par son fondateur, qui suit personnellement les premiers dossiers de chaque client.",
  },

  servicesPage: {
    ticket: {
      label: "Nos services",
      code: "06",
      codeSub: "domaines à combiner",
      fields: [["Devis", "Gratuit"], ["Contact", "Un seul"], ["Langues", "FR · EN"]],
      title: "Selon votre situation",
      foot: "Un seul contact du début à la fin",
    },
    metaTitle: "Nos services : étudiants, logement, conciergerie | ETRADEX",
    metaDesc: "Étudiants étrangers, voyages et démarches, logement, conciergerie, investisseurs et services sur mesure : les 6 services d’ETRADEX à Rabat–Salé.",
    eyebrow: "Nos services",
    title: "Tout pour réussir votre installation au Maroc",
    sub: "Six domaines d’accompagnement, à combiner selon votre situation. Un seul interlocuteur, un devis gratuit.",
  },

  service: {
    ticket: {
      label: "Votre parcours",
      service: "Service",
      base: "Base",
      quote: "Devis",
      free: "Gratuit",
      foot: "Un seul contact du début à la fin",
    },
    forWhom: "Pour qui ?",
    includes: "Ce que nous faisons pour vous",
    steps: "Comment ça se passe",
    faq: "Questions fréquentes",
    others: "Nos autres services",
    ask: "Poser une question sur WhatsApp",
  },

  faqPage: {
    ticket: {
      label: "Questions fréquentes",
      codeSub: "questions, des réponses claires",
      fields: [["Réponse", "Sous 24 h"], ["Canal", "WhatsApp"], ["Langues", "FR · EN"]],
      title: "Les sujets abordés",
      items: [["Tarifs et devis", "Q2"], ["Démarches avant l’arrivée", "Q4"], ["Villes couvertes", "Q5"], ["Visas et titres de séjour", "Q6"]],
      foot: "Pas trouvé ? Écrivez-nous sur WhatsApp",
    },
    metaTitle: "FAQ : étudier et s’installer au Maroc | ETRADEX",
    metaDesc: "Visa, logement, carte de séjour, tarifs, délais : les réponses aux questions les plus fréquentes sur l’accompagnement ETRADEX au Maroc.",
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    sub: "Vous ne trouvez pas votre réponse ? Écrivez-nous sur WhatsApp, nous répondons sous 24 h.",
    general: "Questions générales",
    items: [
      { q: "Qui est ETRADEX ?", a: "ETRADEX SARLAU est une société basée à Rabat–Salé qui accompagne étudiants étrangers, familles, entreprises et investisseurs dans leur installation au Maroc : démarches, logement, accueil, conciergerie." },
      { q: "Combien coûtent vos services ?", a: "Chaque situation est différente, donc nous établissons un devis gratuit et sans engagement après un premier échange. Le prix est toujours annoncé avant de commencer." },
      { q: "Comment vous contacter ?", a: "Le plus rapide est WhatsApp. Vous pouvez aussi remplir le formulaire de contact : nous répondons sous 24 heures ouvrées." },
      { q: "Pouvez-vous m’aider avant mon arrivée au Maroc ?", a: "Oui. La plupart des démarches commencent à distance : liste des documents, inscription, visa, recherche de logement avec visites en vidéo." },
      { q: "Dans quelles villes intervenez-vous ?", a: "Nous sommes basés à Rabat–Salé et intervenons principalement à Rabat, Salé, Témara et Kénitra. Nous accompagnons aussi des projets ailleurs au Maroc et à l’international." },
      { q: "Garantissez-vous les visas et titres de séjour ?", a: "Non, ces décisions appartiennent aux autorités. Nous garantissons en revanche un dossier préparé avec soin et un suivi à chaque étape." },
      { q: "Dans quelles langues travaillez-vous ?", a: "En français et en anglais." },
      { q: "Travaillez-vous avec les entreprises ?", a: "Oui : accueil et logement de salariés ou de stagiaires, conciergerie d’entreprise, accompagnement de projets d’implantation." },
    ],
  },

  contact: {
    ticket: {
      label: "Demande de devis",
      code: "24 h",
      codeSub: "pour vous répondre",
      fields: [["Canal", "WhatsApp"], ["Devis", "Gratuit"], ["Langues", "FR · EN"]],
      title: "Ce qui se passe ensuite",
      items: [["Vous décrivez votre besoin", "01"], ["Nous répondons sous 24 h", "02"], ["Vous recevez un devis clair", "03"], ["On lance votre dossier", "04"]],
      foot: "Sans engagement, prix annoncé avant de commencer",
    },
    metaTitle: "Contact et devis gratuit | ETRADEX Rabat – Salé",
    metaDesc: "Contactez ETRADEX par WhatsApp ou via le formulaire : réponse sous 24 h et devis gratuit pour votre projet d’études, de logement ou d’installation au Maroc.",
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    sub: "Décrivez votre besoin en quelques lignes : nous vous répondons sous 24 h avec une proposition claire.",
    fastest: "Le plus rapide",
    fastestText: "Écrivez-nous directement sur WhatsApp.",
    email: "E-mail",
    phone: "Téléphone",
    location: "Localisation",
    form: {
      title: "Formulaire de contact",
      name: "Nom complet",
      email: "E-mail",
      phone: "Téléphone / WhatsApp",
      phoneHint: "Avec l’indicatif du pays",
      profile: "Vous êtes",
      profiles: ["Étudiant(e)", "Parent / famille", "Particulier", "Entreprise", "Investisseur", "Autre"],
      service: "Service souhaité",
      serviceOther: "Autre / je ne sais pas encore",
      message: "Votre message",
      messagePlaceholder: "Votre situation, vos dates, votre ville…",
      consent: "J’accepte qu’ETRADEX utilise ces informations pour me recontacter.",
      required: "champ obligatoire",
      submit: "Envoyer ma demande",
      sending: "Envoi en cours…",
      success: "Merci ! Votre demande est bien envoyée. Nous vous répondons sous 24 h.",
      error: "L’envoi n’a pas abouti. Pas de souci : envoyez la même demande sur WhatsApp en un clic.",
      sendWhatsapp: "Envoyer via WhatsApp",
      waIntro: "Bonjour ETRADEX, voici ma demande :",
      invalid: "Merci de compléter les champs obligatoires.",
    },
  },

  legal: {
    metaTitle: "Mentions légales | ETRADEX",
    metaDesc: "Mentions légales du site ETRADEX : éditeur, hébergement, propriété intellectuelle et protection des données personnelles (loi 09-08).",
    eyebrow: "Informations",
    title: "Mentions légales",
    pending: "en cours d’immatriculation",
    sections: {
      editor: "Éditeur du site",
      host: "Hébergement",
      ip: "Propriété intellectuelle",
      ipText: "L’ensemble des textes, éléments graphiques et la structure de ce site sont la propriété d’ETRADEX, sauf mention contraire. Les photographies d’illustration proviennent de banques d’images libres de droits. Toute reproduction sans autorisation est interdite.",
      data: "Données personnelles",
      dataText: [
        "Les informations envoyées via le formulaire de contact ou WhatsApp servent uniquement à répondre à votre demande. Elles ne sont ni vendues ni cédées à des tiers.",
        "Conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel, vous disposez d’un droit d’accès, de rectification et d’opposition. Pour l’exercer, écrivez-nous à l’adresse e-mail indiquée ci-dessus.",
      ],
      cookies: "Cookies",
      cookiesText: "Ce site n’utilise aucun cookie publicitaire ni outil de suivi.",
    },
    labels: { company: "Société", form: "Forme juridique", capital: "Capital", rc: "RC", ice: "ICE", seat: "Siège", director: "Directeur de la publication", email: "E-mail", host: "Hébergeur" },
  },

  notFound: {
    title: "Page introuvable",
    text: "Cette page n’existe pas ou a été déplacée.",
    back: "Retour à l’accueil",
  },
};

export default fr;
