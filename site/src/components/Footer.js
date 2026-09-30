import LocaleLink from "@/components/LocaleLink";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import { SITE, socialLinks, waLink } from "@/content/site";
import { SERVICES } from "@/content/services";
import { href } from "@/lib/routes";
import { dict } from "@/lib/seo";

export default function Footer({ lang }) {
  const t = dict(lang);
  const socials = socialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>{t.footer.about}</p>
          {socials.length > 0 && (
            <div className="footer-social" aria-label={t.footer.follow}>
              {socials.map(({ network, url }) => (
                <a key={network} href={url} target="_blank" rel="noopener noreferrer" aria-label={network}>
                  <Icon name={network} size={20} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="footer-col">
          <h2>{t.footer.services}</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.id}>
                <LocaleLink href={href(`service:${s.id}`, lang)}>{s[lang].nav}</LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h2>{t.footer.company}</h2>
          <ul>
            <li><LocaleLink href={href("about", lang)}>{t.ui.nav.about}</LocaleLink></li>
            <li><LocaleLink href={href("services", lang)}>{t.ui.nav.services}</LocaleLink></li>
            <li><LocaleLink href={href("faq", lang)}>{t.ui.nav.faq}</LocaleLink></li>
            <li><LocaleLink href={href("contact", lang)}>{t.ui.nav.contact}</LocaleLink></li>
            <li><LocaleLink href={href("legal", lang)}>{t.footer.legal}</LocaleLink></li>
          </ul>
        </div>

        <div className="footer-col">
          <h2>{t.footer.contact}</h2>
          <ul className="footer-contact">
            <li>
              <a className="footer-icon-link" href={waLink(t.ui.waDefault)} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> <span>{SITE.whatsappDisplay}</span>
              </a>
            </li>
            {SITE.phone && (
              <li>
                <a className="footer-icon-link" href={`tel:${SITE.phone}`}>
                  <Icon name="phone" size={18} /> <span>{SITE.phoneDisplay}</span>
                </a>
              </li>
            )}
            <li>
              <a className="footer-icon-link" href={`mailto:${SITE.email}`}>
                <Icon name="mail" size={18} /> <span className="break">{SITE.email}</span>
              </a>
            </li>
            <li className="footer-icon-link">
              <Icon name="pin" size={18} /> <span>{SITE.city[lang]}, {t.ui.country}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {year} {SITE.legalName}. {t.footer.rights}</p>
          <p className="footer-slogan">{t.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
