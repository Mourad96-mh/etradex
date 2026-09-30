import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import fr from "@/content/fr";
import en from "@/content/en";
import { absolute, alternates, href } from "@/lib/routes";

export const dict = (lang) => (lang === "en" ? en : fr);

const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "ETRADEX" };

// Métadonnées Next complètes pour une page : titre absolu (longueur maîtrisée),
// description, canonical, hreflang, Open Graph et Twitter.
export function pageMetadata({ lang, key, title, description }) {
  const alt = alternates(key, lang);
  return {
    title: { absolute: title },
    description,
    alternates: alt,
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: dict(lang).locale,
      alternateLocale: lang === "fr" ? "en_US" : "fr_MA",
      url: alt.canonical,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

// ── JSON-LD ─────────────────────────────────────────────────

const ORG_ID = `${SITE.url}/#organization`;
const WEB_ID = `${SITE.url}/#website`;

// Organization (et non LocalBusiness) : pas encore d'adresse postale publiée.
export function organizationLd(lang) {
  const t = dict(lang);
  const sameAs = Object.values(SITE.social).filter(Boolean);
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Rabat",
    addressRegion: SITE.region,
    addressCountry: SITE.country,
    ...(SITE.streetAddress && { streetAddress: SITE.streetAddress }),
    ...(SITE.postalCode && { postalCode: SITE.postalCode }),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: `${SITE.url}/`,
        logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png`, width: 600, height: 204 },
        image: `${SITE.url}/og.jpg`,
        slogan: t.slogan,
        description: t.footer.about,
        foundingDate: String(SITE.foundingYear),
        founder: { "@type": "Person", name: SITE.founder.name, jobTitle: SITE.founder.role[lang] },
        email: SITE.email,
        ...(SITE.phone && { telephone: SITE.phone }),
        address,
        areaServed: [
          ...SITE.areas.map((city) => ({ "@type": "City", name: city })),
          { "@type": "Country", name: "Maroc" },
        ],
        knowsLanguage: ["fr", "en"],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: `+${SITE.whatsapp}`,
          email: SITE.email,
          availableLanguage: ["French", "English"],
        },
        ...(sameAs.length && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": WEB_ID,
        url: `${SITE.url}/`,
        name: SITE.name,
        inLanguage: lang,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function serviceLd(service, lang) {
  const c = service[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    description: c.metaDesc,
    serviceType: c.nav,
    url: absolute(href(`service:${service.id}`, lang)),
    provider: { "@id": ORG_ID },
    areaServed: SITE.areas.map((city) => ({ "@type": "City", name: city })),
    availableLanguage: ["fr", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: c.title,
      itemListElement: c.includes.map((it) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: it.title, description: it.text },
      })),
    },
  };
}

export function servicesListLd(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s[lang].title,
      item: absolute(href(`service:${s.id}`, lang)),
    })),
  };
}
