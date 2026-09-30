import LocaleLink from "@/components/LocaleLink";

export default function Breadcrumbs({ items, label }) {
  return (
    <nav className="breadcrumbs" aria-label={label}>
      <ol>
        {items.map((it, i) => (
          <li key={it.path}>
            {i < items.length - 1 ? <LocaleLink href={it.path}>{it.name}</LocaleLink> : <span aria-current="page">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
