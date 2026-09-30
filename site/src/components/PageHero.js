import Breadcrumbs from "@/components/Breadcrumbs";
import HeroWords from "@/components/HeroWords";
import PassCard from "@/components/PassCard";
import Picture from "@/components/Picture";
import { dict } from "@/lib/seo";

// Bandeau des pages intérieures, même langage que le hero d'accueil :
// photo sous voile avec zoom lent, titre en cascade, carte d'embarquement à droite.
export default function PageHero({ eyebrow, title, sub, crumbs, lang, image, ticket, children }) {
  return (
    <section className={`page-hero${image ? " has-photo" : ""}${ticket ? " has-ticket" : ""}`}>
      {image && <Picture name={image} alt="" priority sizes="100vw" className="hero-bg" />}
      <div className="container page-hero-grid">
        <div className="page-hero-inner">
          {crumbs && (
            <div className="hero-in" style={{ "--d": "0ms" }}>
              <Breadcrumbs items={crumbs} label={dict(lang).ui.breadcrumb} />
            </div>
          )}
          {eyebrow && <p className="eyebrow eyebrow--light hero-in" style={{ "--d": "80ms" }}>{eyebrow}</p>}
          <h1><HeroWords text={title} /></h1>
          {sub && <p className="page-hero-sub hero-in" style={{ "--d": "420ms" }}>{sub}</p>}
          {children}
        </div>
        {ticket && (
          <div className="hero-visual hero-in" style={{ "--d": "240ms" }}>
            <PassCard ticket={ticket} />
          </div>
        )}
      </div>
    </section>
  );
}
