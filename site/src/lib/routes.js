import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";

// La première langue est la langue par défaut (racine du site, x-default).
export const LANGS = ["fr", "en", "es"];

// Clé de page → chemin dans chaque langue (avec slash final, trailingSlash: true).
const PAGES = {
  home: { fr: "/", en: "/en/", es: "/es/" },
  about: { fr: "/a-propos/", en: "/en/about/", es: "/es/sobre-nosotros/" },
  services: { fr: "/services/", en: "/en/services/", es: "/es/servicios/" },
  faq: { fr: "/faq/", en: "/en/faq/", es: "/es/preguntas-frecuentes/" },
  contact: { fr: "/contact/", en: "/en/contact/", es: "/es/contacto/" },
  legal: { fr: "/mentions-legales/", en: "/en/legal-notice/", es: "/es/aviso-legal/" },
};

for (const s of SERVICES) {
  PAGES[`service:${s.id}`] = {
    fr: `/services/${s.slug.fr}/`,
    en: `/en/services/${s.slug.en}/`,
    es: `/es/servicios/${s.slug.es}/`,
  };
}

export const href = (key, lang) => {
  const page = PAGES[key];
  if (!page) throw new Error(`Route inconnue : ${key}`);
  return page[lang];
};

export const absolute = (path) => `${SITE.url}${path}`;

// Pour metadata.alternates : canonical + hreflang de chaque langue + x-default.
export const alternates = (key, lang) => ({
  canonical: absolute(href(key, lang)),
  languages: {
    ...Object.fromEntries(LANGS.map((l) => [l, absolute(href(key, l))])),
    "x-default": absolute(href(key, LANGS[0])),
  },
});

export const allPageKeys = () => Object.keys(PAGES);
