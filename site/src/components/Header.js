"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LocaleLink from "@/components/LocaleLink";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import { waLink } from "@/content/site";

// nav   : [{ key, label, path }]
// pairs : { "/chemin/fr/": "/en/path/", … } dans les deux sens, pour le sélecteur de langue.
export default function Header({ lang, nav, homePath, pairs, ui }) {
  const pathname = usePathname() || homePath;
  const [open, setOpen] = useState(false);

  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const otherPath = pairs[current] ?? (lang === "fr" ? "/en/" : "/");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (path) => (path === homePath ? current === homePath : current.startsWith(path));

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <LocaleLink href={homePath} className="header-logo">
            <Logo priority />
          </LocaleLink>

          <nav className="nav-desktop" aria-label={ui.menu}>
            {nav.map((item) => (
              <LocaleLink key={item.key} href={item.path} className={`nav-link${isActive(item.path) ? " is-active" : ""}`} aria-current={isActive(item.path) ? "page" : undefined}>
                {item.label}
              </LocaleLink>
            ))}
          </nav>

          <div className="header-actions">
            <LocaleLink href={otherPath} className="lang-switch" hrefLang={lang === "fr" ? "en" : "fr"} lang={lang === "fr" ? "en" : "fr"} aria-label={ui.langLabel}>
              {ui.langShort}
            </LocaleLink>
            <a className="btn btn--wa btn--sm header-cta" href={waLink(ui.waDefault)} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              <span>WhatsApp</span>
            </a>
            <button type="button" className="burger" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? ui.close : ui.menu} onClick={() => setOpen((o) => !o)}>
              <Icon name={open ? "close" : "menu"} size={26} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label={ui.menu}>
          {nav.map((item) => (
            <LocaleLink key={item.key} href={item.path} className={`mobile-link${isActive(item.path) ? " is-active" : ""}`} aria-current={isActive(item.path) ? "page" : undefined}>
              {item.label}
              <Icon name="arrow" size={18} />
            </LocaleLink>
          ))}
        </nav>
        <a className="btn btn--wa btn--block" href={waLink(ui.waDefault)} target="_blank" rel="noopener noreferrer">
          <Icon name="whatsapp" size={20} />
          <span>{ui.whatsappCta}</span>
        </a>
        <LocaleLink href={otherPath} className="mobile-lang" hrefLang={lang === "fr" ? "en" : "fr"}>
          <Icon name="globe" size={18} /> {ui.langLabel}
        </LocaleLink>
      </div>
    </>
  );
}
