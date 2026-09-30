// Étapes numérotées (chiffres en serif, sans pastille d'icône).
export default function Steps({ steps, variant = "grid" }) {
  return (
    <ol className={`steps steps--${variant}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="step reveal">
          <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
