import { absolute, alternates, allPageKeys, href, LANGS } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date();
  return allPageKeys().flatMap((key) =>
    LANGS.map((lang) => ({
      url: absolute(href(key, lang)),
      lastModified,
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: key === "home" ? 1 : key.startsWith("service:") ? 0.9 : key === "legal" ? 0.3 : 0.7,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, alternates(key, lang).languages[l]])) },
    }))
  );
}
