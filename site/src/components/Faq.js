import Icon from "@/components/Icon";

// Accordéon sans JavaScript (<details>) : lisible par Google et par les lecteurs d'écran.
export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(({ q, a }) => (
        <details key={q} className="faq-item">
          <summary>
            <span>{q}</span>
            <Icon name="chevron" size={20} className="faq-chevron" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
