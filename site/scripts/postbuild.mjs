// Après `next build` : la 404 globale sort dans le <html> minimal de Next, sans lang.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "..", "out");
for (const f of ["404.html", "404/index.html"]) {
  const p = path.join(OUT, f);
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, "utf8");
  if (!/<html[^>]*\blang=/.test(html)) fs.writeFileSync(p, html.replace(/<html(?=[\s>])/, '<html lang="fr"'));
}
console.log("postbuild : lang ajouté à la 404");
