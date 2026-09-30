// 404 globale. Avec deux layouts racines (fr/en), Next l'enveloppe dans son propre
// <html><body> : on rend donc un fragment autonome avec un style en ligne
// (sinon la page sort sans feuille de style dans l'export statique).

export const metadata = {
  title: "Page introuvable | ETRADEX",
  robots: { index: false, follow: true },
};

const css = `
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:#1f2326;color:#fff}
.nf{min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center}
.nf-code{font-size:clamp(72px,18vw,140px);font-weight:800;color:#f2707b;margin:0;line-height:1}
.nf h1{font-size:clamp(22px,5vw,30px);margin:12px 0 8px}
.nf p{color:#c9ccd0;margin:0 0 6px}
.nf-actions{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:28px}
.nf a{display:inline-flex;align-items:center;min-height:48px;padding:0 22px;border-radius:4px;font-weight:700;text-decoration:none}
.nf .p{background:#b21c30;color:#fff}
.nf .s{border:2px solid rgba(255,255,255,.5);color:#fff}
`;

export default function NotFound() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="nf">
        <div>
          <p className="nf-code">404</p>
          <h1>Page introuvable · Page not found</h1>
          <p>Cette page n’existe pas ou a été déplacée.</p>
          <p lang="en">This page does not exist or has been moved.</p>
          <div className="nf-actions">
            <a className="p" href="/">Retour à l’accueil</a>
            <a className="s" href="/en/" lang="en">Back to home</a>
          </div>
        </div>
      </div>
    </>
  );
}
