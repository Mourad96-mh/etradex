// Carte d'embarquement des pages intérieures, cousine statique de HeroPass.
// Aucun JavaScript : l'animation (étapes cochées une à une) est en CSS et ne
// joue qu'une fois au chargement ; le HTML porte l'état final.
//
// ticket = {
//   label,             // en-tête à droite (« Votre parcours »…)
//   headline?,         // un titre en serif (nom du service)…
//   code?, codeSub?,   // …ou un grand code (« 24 h », « 06 »)
//   fields: [[clé, valeur]],
//   title, items: [[libellé, repère]], foot
// }
export default function PassCard({ ticket }) {
  const { label, code, codeSub, headline, fields, title, items, foot } = ticket;

  return (
    <div className="pass-wrap">
      <div className="pass pass--intro">
        <div className="pass-top">
          <div className="pass-head">
            <span className="pass-brand">ETRADEX</span>
            <span className="pass-label">{label}</span>
          </div>

          {headline ? (
            <p className="pass-headline">{headline}</p>
          ) : (
            <p className="pass-city pass-city--solo">
              <span className="pass-code">{code}</span>
              {codeSub && <span className="pass-name">{codeSub}</span>}
            </p>
          )}

          <dl className="pass-fields">
            {fields.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="pass-bottom">
          <p className="pass-title">{title}</p>
          <ol className="pass-steps" style={{ "--p": 1, "--n": items.length }}>
            {items.map(([text, meta], i) => (
              <li key={text} className="is-done" style={{ "--i": i }}>
                <span className="pass-dot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="12" height="12"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span className="pass-step">{text}</span>
                {meta && <span className="pass-meta">{meta}</span>}
              </li>
            ))}
          </ol>

          <div className="pass-foot pass-foot--wide">
            <span className="pass-barcode" aria-hidden="true" />
            <span>{foot}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
