// Audit SEO/qualité du site construit (out/) — la vérité est le HTML livré, pas le JSX.
//   npm run build && npm run audit
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".html")) files.push(p);
  }
})(OUT);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const exists = (url) => {
  const clean = url.split("#")[0].split("?")[0];
  const p = path.join(OUT, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));
};

let problems = 0;
const titles = new Map();
const descs = new Map();
const flag = (page, msg) => {
  problems++;
  console.log(`  ✗ ${page}: ${msg}`);
};

for (const f of files.sort()) {
  const rel = "/" + path.relative(OUT, f).replace(/\\/g, "/").replace(/index\.html$/, "");
  if (rel === "/404.html" || rel === "/404/" || rel.startsWith("/_not-found")) continue;
  const html = fs.readFileSync(f, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));

  const title = decode(head.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const hreflangs = [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)"/g)].map((m) => m[1]);
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  const og = /property="og:image"/.test(head);

  if (!title) flag(rel, "pas de <title>");
  else if (title.length > 60 || title.length < 25) flag(rel, `titre ${title.length} car. « ${title} »`);
  if (!desc) flag(rel, "pas de meta description");
  else if (desc.length > 160 || desc.length < 110) flag(rel, `description ${desc.length} car.`);
  if (h1 !== 1) flag(rel, `${h1} <h1>`);
  if (!canonical) flag(rel, "pas de canonical");
  else if (!canonical.endsWith(rel)) flag(rel, `canonical ≠ URL (${canonical})`);
  if (hreflangs.sort().join() !== "en,fr,x-default") flag(rel, `hreflang: ${hreflangs.join(",")}`);
  const expectLang = rel.startsWith("/en/") ? "en" : "fr";
  if (lang !== expectLang) flag(rel, `<html lang="${lang}">`);
  if (!og) flag(rel, "pas d'og:image");

  titles.set(title, [...(titles.get(title) || []), rel]);
  descs.set(desc, [...(descs.get(desc) || []), rel]);

  // JSON-LD
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      const nodes = j["@graph"] ?? [j];
      nodes.forEach((n) => types.push(n["@type"]));
      const txt = JSON.stringify(j);
      if (rel.startsWith("/en/") && /etradex\.ma\/(services|a-propos|faq|contact)\//.test(txt) && !/ItemList|Organization/.test(txt)) {
        // une URL FR dans un schéma EN
        if (/"item":"https:\/\/www\.etradex\.ma\/(?!en\/)/.test(txt)) flag(rel, "URL FR dans un JSON-LD EN");
      }
    } catch (e) {
      flag(rel, `JSON-LD invalide : ${e.message}`);
    }
  }

  // images
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\balt="/.test(tag)) flag(rel, `image sans alt : ${tag.slice(0, 80)}`);
    if (!/\bwidth="/.test(tag) || !/\bheight="/.test(tag)) flag(rel, `image sans dimensions : ${tag.slice(0, 80)}`);
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (src && src.startsWith("/") && !exists(src)) flag(rel, `image manquante ${src}`);
  }

  // liens internes
  for (const m of body.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith("/_next")) continue;
    if (!exists(href)) flag(rel, `lien cassé ${href}`);
  }

  console.log(`✓ ${rel.padEnd(52)} ${String(title.length).padStart(2)}c/${String(desc.length).padStart(3)}c  ${types.join(", ")}`);
}

for (const [t, pages] of titles) if (pages.length > 1) flag(pages.join(" "), `titre dupliqué « ${t} »`);
for (const [d, pages] of descs) if (pages.length > 1) flag(pages.join(" "), "description dupliquée");

for (const f of ["sitemap.xml", "robots.txt", "llms.txt", "og.jpg", "logo.png", "contact.php", ".htaccess", "404.html", "icon.png"]) {
  if (!fs.existsSync(path.join(OUT, f))) flag("out", `${f} absent`);
}
const sm = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const smCount = (sm.match(/<loc>/g) || []).length;
const pageCount = files.filter((f) => !/404\.html$|404[\\/]index\.html$|_not-found/.test(f)).length;
if (smCount !== pageCount) flag("sitemap", `${smCount} URL pour ${pageCount} pages`);

console.log(`\n${pageCount} pages, sitemap ${smCount} URL — ${problems ? `${problems} problème(s)` : "aucun problème"}`);
process.exit(problems ? 1 : 0);
