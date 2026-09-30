import { LOGO } from "@/content/brand";

// Logo client (détouré par scripts/make-logo.mjs). `light` = version blanche pour fonds sombres.
export default function Logo({ light = false, priority = false }) {
  return (
    <img
      className="logo"
      src={light ? LOGO.light : LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt="ETRADEX Maroc"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
