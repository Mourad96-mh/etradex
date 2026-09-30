// ─────────────────────────────────────────────────────────────
//  COORDONNÉES & RÉGLAGES — le seul endroit à modifier.
//  Tout le site (en-tête, pied de page, bouton WhatsApp, formulaire,
//  JSON-LD, llms.txt) lit ces valeurs.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "ETRADEX",
  legalName: "ETRADEX SARLAU",
  // Domaine de production (sans slash final). À confirmer avec le client.
  url: "https://www.etradex.ma",
  foundingYear: 2026,

  // WhatsApp au format international SANS « + » ni espaces.
  whatsapp: "33771596038",
  whatsappDisplay: "+33 7 71 59 60 38",
  // Téléphone marocain : laisser vide tant qu'il n'existe pas.
  phone: "",
  phoneDisplay: "",
  email: "eulogesewany09@gmail.com",

  city: { fr: "Rabat – Salé", en: "Rabat – Salé", es: "Rabat – Salé" },
  region: "Rabat-Salé-Kénitra",
  country: "MA",
  // Adresse postale : vide = on n'affiche que la ville (et on reste en schema Organization).
  streetAddress: "",
  postalCode: "",

  founder: { name: "Euloges Patrick EWANY", role: { fr: "Fondateur & gérant", en: "Founder & Managing Director", es: "Fundador y gerente" } },

  // Réseaux sociaux : une URL vide = l'icône n'est pas affichée.
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
  },

  // Informations légales (société en cours de création).
  legal: {
    form: {
      fr: "SARLAU (société à responsabilité limitée à associé unique)",
      en: "SARLAU (single-member limited liability company)",
      es: "SARLAU (sociedad de responsabilidad limitada unipersonal)",
    },
    capital: "",
    rc: "",
    ice: "",
    ifiscal: "",
    host: "",
  },

  // Zones desservies
  areas: ["Rabat", "Salé", "Témara", "Kénitra"],
};

export const waLink = (text = "") =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const socialLinks = () =>
  Object.entries(SITE.social)
    .filter(([, url]) => url)
    .map(([network, url]) => ({ network, url }));
