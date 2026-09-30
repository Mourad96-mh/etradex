import LocaleLink from "@/components/LocaleLink";
import WhatsAppButton from "@/components/WhatsAppButton";
import { href } from "@/lib/routes";
import { dict } from "@/lib/seo";

export default function CtaBand({ lang, message }) {
  const t = dict(lang);
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{t.cta.title}</h2>
          <p>{t.cta.text}</p>
        </div>
        <div className="cta-band-actions">
          <WhatsAppButton label={t.ui.whatsappCta} message={message ?? t.ui.waDefault} />
          <LocaleLink href={href("contact", lang)} className="btn btn--ghost-light">{t.cta.secondary}</LocaleLink>
        </div>
      </div>
    </section>
  );
}
