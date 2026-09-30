import LocaleLink from "@/components/LocaleLink";
import Icon from "@/components/Icon";
import Picture from "@/components/Picture";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionHead from "@/components/SectionHead";
import Steps from "@/components/Steps";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroWords from "@/components/HeroWords";
import PassCard from "@/components/PassCard";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { href } from "@/lib/routes";
import { breadcrumbLd, dict, faqLd, serviceLd } from "@/lib/seo";

export default function Service({ lang, service }) {
  const t = dict(lang);
  const c = service[lang];
  const waMsg = t.ui.waService(c.nav);
  const crumbs = [
    { name: t.ui.home, path: href("home", lang) },
    { name: t.ui.nav.services, path: href("services", lang) },
    { name: c.nav, path: href(`service:${service.id}`, lang) },
  ];
  const others = SERVICES.filter((s) => s.id !== service.id);
  const tk = t.service.ticket;
  const index = SERVICES.findIndex((s) => s.id === service.id) + 1;
  const ticket = {
    label: tk.label,
    headline: c.nav,
    fields: [
      [tk.service, `${String(index).padStart(2, "0")} / ${String(SERVICES.length).padStart(2, "0")}`],
      [tk.base, SITE.city[lang]],
      [tk.quote, tk.free],
    ],
    title: t.service.steps,
    items: c.steps.map((st, i) => [st.title, String(i + 1).padStart(2, "0")]),
    foot: tk.foot,
  };

  return (
    <>
      <JsonLd data={serviceLd(service, lang)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={faqLd(c.faq)} />

      <section className="service-hero has-photo has-ticket">
        <Picture name={service.image} alt="" priority sizes="100vw" className="hero-bg" />
        <div className="container service-hero-grid">
          <div className="service-hero-copy">
            <div className="hero-in" style={{ "--d": "0ms" }}>
              <Breadcrumbs items={crumbs} label={t.ui.breadcrumb} />
            </div>
            <h1><HeroWords text={c.title} /></h1>
            <p className="page-hero-sub hero-in" style={{ "--d": "420ms" }}>{c.heroSub}</p>
            <div className="hero-actions hero-in" style={{ "--d": "540ms" }}>
              <WhatsAppButton label={t.ui.whatsappCta} message={waMsg} />
              <LocaleLink href={href("contact", lang)} className="btn btn--ghost-light">{t.ui.contactCta}</LocaleLink>
            </div>
          </div>
          <div className="hero-visual hero-in" style={{ "--d": "240ms" }}>
            <PassCard ticket={ticket} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container intro-grid">
          <p className="lead">{c.intro}</p>
          <aside className="audience-box">
            <h2>{t.service.forWhom}</h2>
            <ul className="ticks">
              {c.audience.map((a) => (
                <li key={a}><Icon name="check" size={16} />{a}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead title={t.service.includes} center />
          <ul className="include-grid">
            {c.includes.map((it) => (
              <li key={it.title} className="include reveal">
                <span className="icon-chip"><Icon name={it.icon} size={22} /></span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={t.service.steps} center />
          <Steps steps={c.steps} variant="grid" />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container faq-wrap">
          <div>
            <SectionHead title={t.service.faq} />
            <WhatsAppButton label={t.service.ask} message={waMsg} variant="wa-outline" />
          </div>
          <Faq items={c.faq} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <SectionHead title={t.service.others} />
          <ul className="others-grid">
            {others.map((s) => (
              <li key={s.id}>
                <LocaleLink href={href(`service:${s.id}`, lang)} className="other-link">
                  <span className="icon-chip"><Icon name={s.icon} size={20} /></span>
                  <span>{s[lang].nav}</span>
                  <Icon name="arrow" size={18} />
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} message={waMsg} />
    </>
  );
}
