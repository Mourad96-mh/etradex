import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { absolute, href } from "@/lib/routes";
import { breadcrumbLd, dict } from "@/lib/seo";

export default function Contact({ lang }) {
  const t = dict(lang);
  const c = t.contact;
  const crumbs = [
    { name: t.ui.home, path: href("home", lang) },
    { name: t.ui.nav.contact, path: href("contact", lang) },
  ];
  const services = SERVICES.map((s) => ({ id: s.id, title: s[lang].nav }));

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absolute(href("contact", lang)),
          name: c.metaTitle,
          about: { "@id": `${SITE.url}/#organization` },
        }}
      />
      <PageHero lang={lang} crumbs={crumbs} eyebrow={c.eyebrow} title={c.title} sub={c.sub} image="travel" ticket={c.ticket} />

      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-side">
            <div className="contact-wa">
              <p className="eyebrow">{c.fastest}</p>
              <p>{c.fastestText}</p>
              <WhatsAppButton label={t.ui.whatsappCta} message={t.ui.waDefault} className="btn--block" />
            </div>
            <ul className="contact-list">
              <li>
                <span className="icon-chip"><Icon name="whatsapp" size={20} /></span>
                <div>
                  <p className="contact-label">WhatsApp</p>
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">{SITE.whatsappDisplay}</a>
                </div>
              </li>
              {SITE.phone && (
                <li>
                  <span className="icon-chip"><Icon name="phone" size={20} /></span>
                  <div>
                    <p className="contact-label">{c.phone}</p>
                    <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
                  </div>
                </li>
              )}
              <li>
                <span className="icon-chip"><Icon name="mail" size={20} /></span>
                <div>
                  <p className="contact-label">{c.email}</p>
                  <a className="break" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </div>
              </li>
              <li>
                <span className="icon-chip"><Icon name="pin" size={20} /></span>
                <div>
                  <p className="contact-label">{c.location}</p>
                  <p>{SITE.city[lang]}, {lang === "fr" ? "Maroc" : "Morocco"}</p>
                </div>
              </li>
            </ul>
          </aside>

          <ContactForm t={c.form} services={services} defaultService="" />
        </div>
      </section>
    </>
  );
}
