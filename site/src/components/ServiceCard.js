import LocaleLink from "@/components/LocaleLink";
import Picture from "@/components/Picture";
import Icon from "@/components/Icon";
import { href } from "@/lib/routes";

export default function ServiceCard({ service, lang, learnMore, index }) {
  const c = service[lang];
  const link = href(`service:${service.id}`, lang);
  return (
    <article className="service-card reveal">
      <LocaleLink href={link} className="service-card-media" tabIndex={-1} aria-hidden="true">
        <Picture name={service.image} alt="" sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" />
      </LocaleLink>
      <div className="service-card-body">
        <p className="service-card-num">{String(index + 1).padStart(2, "0")}</p>
        <h3><LocaleLink href={link}>{c.nav}</LocaleLink></h3>
        <p>{c.short}</p>
        <ul className="ticks">
          {c.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <LocaleLink href={link} className="link-arrow" aria-label={`${learnMore} : ${c.nav}`}>
          {learnMore} <Icon name="arrow" size={18} />
        </LocaleLink>
      </div>
    </article>
  );
}
