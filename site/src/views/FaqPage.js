import LocaleLink from "@/components/LocaleLink";
import Icon from "@/components/Icon";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { SERVICES } from "@/content/services";
import { href } from "@/lib/routes";
import { breadcrumbLd, dict, faqLd } from "@/lib/seo";

export default function FaqPage({ lang }) {
  const t = dict(lang);
  const p = t.faqPage;
  const crumbs = [
    { name: t.ui.home, path: href("home", lang) },
    { name: t.ui.nav.faq, path: href("faq", lang) },
  ];
  const groups = [
    { id: "general", title: p.general, icon: "chat", items: p.items },
    ...SERVICES.map((s) => ({ id: s.id, title: s[lang].nav, icon: s.icon, items: s[lang].faq, link: href(`service:${s.id}`, lang) })),
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={faqLd(groups.flatMap((g) => g.items))} />
      <PageHero
        lang={lang}
        crumbs={crumbs}
        eyebrow={p.eyebrow}
        title={p.title}
        sub={p.sub}
        image="students"
        ticket={{ ...p.ticket, code: String(groups.reduce((n, g) => n + g.items.length, 0)) }}
      />

      <section className="section">
        <div className="container faq-page">
          <nav className="faq-toc" aria-label={p.title}>
            <ul>
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}><Icon name={g.icon} size={18} /> {g.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="faq-groups">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="faq-group">
                <h2>
                  <span className="icon-chip"><Icon name={g.icon} size={20} /></span>
                  {g.title}
                </h2>
                <Faq items={g.items} />
                {g.link && (
                  <LocaleLink href={g.link} className="link-arrow">
                    {t.ui.learnMore} <Icon name="arrow" size={18} />
                  </LocaleLink>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
