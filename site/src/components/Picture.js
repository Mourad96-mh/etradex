import { MEDIA } from "@/content/media";

// Image responsive depuis MEDIA (généré par scripts/make-images.mjs) :
// srcset + dimensions réelles → pas de décalage de mise en page.
export default function Picture({ name, alt, sizes = "100vw", priority = false, className }) {
  const m = MEDIA[name];
  if (!m) return null;
  const srcSet = m.variants.map((v) => `${v.src} ${v.w}w`).join(", ");
  return (
    <img
      className={className}
      src={m.variants.at(-1).src}
      srcSet={srcSet}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
