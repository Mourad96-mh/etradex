import Icon from "@/components/Icon";
import Picture from "@/components/Picture";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/content/site";
import { absolute, href } from "@/lib/routes";
import { breadcrumbLd, dict } from "@/lib/seo";

export default function About({ lang }) {
  const t = dict(lang);
  const a = t.about;
  const crumbs = [
    { name: t.ui.home, path: href("home", lang) },
    { name: t.ui.nav.about, path: href("about", lang) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absolute(href("about", lang)),
          name: a.metaTitle,
          about: { "@id": `${SITE.url}/#organization` },
        }}
      />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={a.eyebrow}
        title={a.title}
        sub={a.sub}
        image="tailored"
        ticket={{ ...a.ticket, items: a.values.map((v, i) => [v.title, String(i + 1).padStart(2, "0")]) }}
      />

      <section className="section">
        <div className="container split">
          <div className="split-body">
            <h2 className="section-title">{a.storyTitle}</h2>
            {a.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <blockquote className="slogan">« {t.slogan} »</blockquote>
          </div>
          <div className="split-media reveal">
            <Picture name="rabat" alt={t.about.photoAlt} sizes="(max-width: 900px) 100vw, 540px" />
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead title={a.valuesTitle} center />
          <ul className="commit-grid">
            {a.values.map((v) => (
              <li key={v.title} className="commit reveal">
                <span className="icon-chip icon-chip--lg"><Icon name={v.icon} size={26} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container two-cards">
          <article className="info-card reveal">
            <span className="icon-chip icon-chip--lg"><Icon name="pin" size={26} /></span>
            <h2>{a.whyTitle}</h2>
            <p>{a.why}</p>
            <ul className="tags">
              {SITE.areas.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
          <article className="info-card reveal">
            <span className="icon-chip icon-chip--lg"><Icon name="user" size={26} /></span>
            <h2>{a.founderTitle}</h2>
            <p className="founder-name">{SITE.founder.name}</p>
            <p className="founder-role">{SITE.founder.role[lang]} · {SITE.legalName}</p>
            <p>{a.founderText}</p>
          </article>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
