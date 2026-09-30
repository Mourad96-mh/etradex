import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import Steps from "@/components/Steps";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/content/services";
import { href } from "@/lib/routes";
import { breadcrumbLd, dict, servicesListLd } from "@/lib/seo";

export default function Services({ lang }) {
  const t = dict(lang);
  const p = t.servicesPage;
  const crumbs = [
    { name: t.ui.home, path: href("home", lang) },
    { name: t.ui.nav.services, path: href("services", lang) },
  ];

  return (
    <>
      <JsonLd data={servicesListLd(lang)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={p.eyebrow}
        title={p.title}
        sub={p.sub}
        image="rabat"
        ticket={{ ...p.ticket, items: SERVICES.map((s, i) => [s[lang].nav, String(i + 1).padStart(2, "0")]) }}
      />

      <section className="section">
        <div className="container services-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} lang={lang} learnMore={t.ui.learnMore} index={i} />
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow={t.home.how.eyebrow} title={t.home.how.title} center />
          <Steps steps={t.home.how.steps} variant="grid" />
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
