import PageHero from "@/components/PageHero";
import { SITE } from "@/content/site";
import { href } from "@/lib/routes";
import { dict } from "@/lib/seo";

export default function Legal({ lang }) {
  const t = dict(lang);
  const l = t.legal;
  const crumbs = [
    { name: t.ui.home, path: href("home", lang) },
    { name: l.title, path: href("legal", lang) },
  ];
  const orPending = (v) => v || l.pending;

  const editor = [
    [l.labels.company, SITE.legalName],
    [l.labels.form, SITE.legal.form[lang]],
    [l.labels.capital, orPending(SITE.legal.capital)],
    [l.labels.rc, orPending(SITE.legal.rc)],
    [l.labels.ice, orPending(SITE.legal.ice)],
    [l.labels.seat, SITE.streetAddress ? `${SITE.streetAddress}, ${SITE.postalCode} Rabat` : `${SITE.city[lang]}, ${lang === "fr" ? "Maroc" : "Morocco"}`],
    [l.labels.director, SITE.founder.name],
    [l.labels.email, SITE.email],
  ];

  return (
    <>
      <PageHero lang={lang} crumbs={crumbs} eyebrow={l.eyebrow} title={l.title} image="rabat" />
      <section className="section">
        <div className="container prose">
          <h2>{l.sections.editor}</h2>
          <dl className="legal-list">
            {editor.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h2>{l.sections.host}</h2>
          <p>{SITE.legal.host || l.pending}</p>

          <h2>{l.sections.ip}</h2>
          <p>{l.sections.ipText}</p>

          <h2>{l.sections.data}</h2>
          {l.sections.dataText.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <h2>{l.sections.cookies}</h2>
          <p>{l.sections.cookiesText}</p>
        </div>
      </section>
    </>
  );
}
