import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";

export const LANGS = ["fr", "en"];

// Clé de page → chemin dans chaque langue (avec slash final, trailingSlash: true).
const PAGES = {
  home: { fr: "/", en: "/en/" },
  about: { fr: "/a-propos/", en: "/en/about/" },
  services: { fr: "/services/", en: "/en/services/" },
  faq: { fr: "/faq/", en: "/en/faq/" },
  contact: { fr: "/contact/", en: "/en/contact/" },
  legal: { fr: "/mentions-legales/", en: "/en/legal-notice/" },
};

for (const s of SERVICES) {
  PAGES[`service:${s.id}`] = {
    fr: `/services/${s.slug.fr}/`,
    en: `/en/services/${s.slug.en}/`,
  };
}

export const href = (key, lang) => {
  const page = PAGES[key];
  if (!page) throw new Error(`Route inconnue : ${key}`);
  return page[lang];
};

export const absolute = (path) => `${SITE.url}${path}`;

// Pour metadata.alternates : canonical + hreflang fr/en/x-default.
export const alternates = (key, lang) => ({
  canonical: absolute(href(key, lang)),
  languages: {
    fr: absolute(href(key, "fr")),
    en: absolute(href(key, "en")),
    "x-default": absolute(href(key, "fr")),
  },
});

export const allPageKeys = () => Object.keys(PAGES);
