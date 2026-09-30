// Titre de hero découpé en mots pour une entrée en cascade (CSS seul, voir .w).
// `offset` décale la cascade quand un titre est rendu en plusieurs morceaux.
export default function HeroWords({ text, offset = 0 }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="w" style={{ "--i": offset + i }}>
      {w}{" "}
    </span>
  ));
}
