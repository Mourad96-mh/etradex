import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import RevealObserver from "@/components/RevealObserver";
import JsonLd from "@/components/JsonLd";
import { allPageKeys, href } from "@/lib/routes";
import { dict, organizationLd } from "@/lib/seo";

// Chrome commun aux deux langues : lien d'évitement, en-tête, pied de page, bouton WhatsApp.
export default function SiteShell({ lang, children }) {
  const t = dict(lang);
  const other = lang === "fr" ? "en" : "fr";

  const nav = [
    { key: "home", label: t.ui.nav.home, path: href("home", lang) },
    { key: "services", label: t.ui.nav.services, path: href("services", lang) },
    { key: "about", label: t.ui.nav.about, path: href("about", lang) },
    { key: "faq", label: t.ui.nav.faq, path: href("faq", lang) },
    { key: "contact", label: t.ui.nav.contact, path: href("contact", lang) },
  ];

  // chemin courant → chemin équivalent dans l'autre langue
  const pairs = Object.fromEntries(allPageKeys().map((k) => [href(k, lang), href(k, other)]));
  const ui = {
    menu: t.ui.menu,
    close: t.ui.close,
    langLabel: t.ui.langLabel,
    langShort: t.ui.langShort,
    whatsappCta: t.ui.whatsappCta,
    waDefault: t.ui.waDefault,
  };

  return (
    <>
      <a className="skip-link" href="#main">{t.ui.skip}</a>
      <JsonLd data={organizationLd(lang)} />
      <Header lang={lang} nav={nav} homePath={href("home", lang)} pairs={pairs} ui={ui} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <WhatsAppFab label={t.ui.whatsappFab} message={t.ui.waDefault} />
      <RevealObserver />
    </>
  );
}
