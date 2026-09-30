import LocaleLink from "@/components/LocaleLink";
import Icon from "@/components/Icon";
import Picture from "@/components/Picture";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import Steps from "@/components/Steps";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroPass from "@/components/HeroPass";
import HeroWords from "@/components/HeroWords";
import { SERVICES, serviceById } from "@/content/services";
import { href } from "@/lib/routes";
import { dict, faqLd } from "@/lib/seo";

export default function Home({ lang }) {
  const t = dict(lang);
  const h = t.home;
  const students = serviceById("students");
  const faqItems = t.faqPage.items.slice(1, 6);

  return (
    <>
      {/* 1. Hero */}
      <section className="hero">
        <Picture name="hero" alt="" priority sizes="100vw" className="hero-bg" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light hero-in" style={{ "--d": "0ms" }}><Icon name="pin" size={16} /> {h.eyebrow}</p>
            <h1>
              <HeroWords text={h.title} />
              <span className="accent"><HeroWords text={h.titleAccent} offset={h.title.split(" ").length} /></span>
            </h1>
            <p className="hero-sub hero-in" style={{ "--d": "520ms" }}>{h.sub}</p>
            <div className="hero-actions hero-in" style={{ "--d": "640ms" }}>
              <WhatsAppButton label={t.ui.whatsappCta} message={t.ui.waDefault} className="btn--lg" />
              <LocaleLink href={href("services", lang)} className="btn btn--ghost-light btn--lg">{h.ctaSecondary}</LocaleLink>
            </div>
            <ul className="chips hero-in" style={{ "--d": "760ms" }}>
              {h.chips.map((c) => (
                <li key={c}><Icon name="check" size={16} />{c}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual hero-in" style={{ "--d": "300ms" }}>
            <HeroPass card={h.card} />
          </div>
        </div>
      </section>

      {/* 2. Pour qui ? */}
      <section className="section section--tight">
        <div className="container">
          <SectionHead eyebrow={h.audience.eyebrow} title={h.audience.title} center />
          <ul className="audience-grid">
            {h.audience.items.map((a) => (
              <li key={a.title} className="reveal">
                <LocaleLink href={href(`service:${a.service}`, lang)} className="audience-card">
                  <span className="icon-chip icon-chip--lg"><Icon name={a.icon} size={26} /></span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                  <Icon name="arrow" size={18} className="audience-arrow" />
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Services */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead eyebrow={h.services.eyebrow} title={h.services.title} sub={h.services.sub} center />
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} service={s} lang={lang} learnMore={t.ui.learnMore} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Parcours étudiant */}
      <section className="section">
        <div className="container journey">
          <div className="journey-media reveal">
            <Picture name="journey" alt="" sizes="(max-width: 900px) 100vw, 420px" />
          </div>
          <div className="journey-body">
            <SectionHead eyebrow={h.journey.eyebrow} title={h.journey.title} />
            <Steps steps={students[lang].steps} variant="timeline" />
            <LocaleLink href={href("service:students", lang)} className="btn btn--primary">
              {h.journey.cta} <Icon name="arrow" size={18} />
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* 5. Comment ça marche */}
      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow={h.how.eyebrow} title={h.how.title} center />
          <Steps steps={h.how.steps} variant="grid" />
        </div>
      </section>

      {/* 6. Engagements */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow={h.commitments.eyebrow} title={h.commitments.title} center />
          <ul className="commit-grid">
            {h.commitments.items.map((c) => (
              <li key={c.title} className="commit reveal">
                <span className="icon-chip icon-chip--lg"><Icon name={c.icon} size={26} /></span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="section section--cream">
        <div className="container faq-wrap">
          <SectionHead eyebrow={h.faq.eyebrow} title={h.faq.title} />
          <div>
            <Faq items={faqItems} />
            <LocaleLink href={href("faq", lang)} className="link-arrow">
              {h.faq.more} <Icon name="arrow" size={18} />
            </LocaleLink>
          </div>
        </div>
        <JsonLd data={faqLd(faqItems)} />
      </section>

      {/* 8. CTA */}
      <CtaBand lang={lang} />
    </>
  );
}
