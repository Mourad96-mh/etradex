// Télécharge les photos (CC0, archive Unsplash sur Wikimedia Commons) dans assets-src/
// puis génère les WebP responsives dans public/img/ et src/content/media.js (dimensions → zéro CLS).
//
//   npm run images
//
// Pour remplacer une photo par une vraie photo du client : déposer le fichier dans assets-src/
// sous le même nom (<name>.jpg) et relancer le script (le téléchargement est sauté si le fichier existe).

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets-src");
const OUT = path.join(ROOT, "public", "img");
const UA = { "User-Agent": "etradex-site-build/1.0" };

// name → fichier Commons, ratio de recadrage, point d'intérêt, largeurs générées
const IMAGES = [
  { name: "hero", file: "Students learning together (Unsplash).jpg", ratio: 16 / 9, position: "centre", widths: [800, 1400, 2000] },
  { name: "students", file: "University graduation (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "travel", file: "Passport documents desk (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "housing", file: "Living room (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "concierge", file: "Driving a Mercedes (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "investors", file: "Rawpixel.com 2017-06-02 (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "tailored", file: "Airport hall interior (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "rabat", file: "Rabat. Morocco (Unsplash).jpg", ratio: 3 / 2, position: "centre", widths: [640, 1400] },
  { name: "journey", file: "Suitcase in train station (Unsplash).jpg", ratio: 4 / 5, position: "right", widths: [480, 900] },
];

fs.mkdirSync(SRC, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const media = {};
const credits = [];

for (const img of IMAGES) {
  const src = path.join(SRC, `${img.name}.jpg`);
  if (!fs.existsSync(src)) {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(img.file)}?width=2400`;
    const res = await fetch(url, { headers: UA, redirect: "follow" });
    if (!res.ok) throw new Error(`${img.name}: HTTP ${res.status}`);
    fs.writeFileSync(src, Buffer.from(await res.arrayBuffer()));
    await new Promise((r) => setTimeout(r, 1500));
  }

  const meta = await sharp(src).metadata();
  // recadrage au ratio voulu, sur la plus grande surface possible
  let cw = meta.width;
  let ch = Math.round(cw / img.ratio);
  if (ch > meta.height) {
    ch = meta.height;
    cw = Math.round(ch * img.ratio);
  }

  const variants = [];
  for (const w of img.widths) {
    const h = Math.round(w / img.ratio);
    const file = `${img.name}-${w}.webp`;
    await sharp(src)
      .resize(cw, ch, { fit: "cover", position: img.position })
      .resize(w, h)
      .modulate({ saturation: 0.95 })
      .webp({ quality: 74, effort: 6 })
      .toFile(path.join(OUT, file));
    const kb = Math.round(fs.statSync(path.join(OUT, file)).size / 1024);
    variants.push({ src: `/img/${file}`, w, h });
    console.log(`${file.padEnd(22)} ${w}x${h}  ${kb} KB`);
  }
  media[img.name] = { variants, w: variants.at(-1).w, h: variants.at(-1).h };
  credits.push(`- ${img.name}: https://commons.wikimedia.org/wiki/File:${encodeURIComponent(img.file.replace(/ /g, "_"))} (CC0)`);
}

fs.writeFileSync(
  path.join(ROOT, "src", "content", "media.js"),
  `// Généré par scripts/make-images.mjs — ne pas modifier à la main.\nexport const MEDIA = ${JSON.stringify(media, null, 2)};\n`
);
fs.writeFileSync(
  path.join(SRC, "CREDITS.md"),
  `# Crédits photos\n\nToutes les photos sont sous licence CC0 (domaine public, archive Unsplash sur Wikimedia Commons).\nAucune attribution obligatoire. Photos d'illustration : elles ne représentent pas des clients d'ETRADEX.\n\n${credits.join("\n")}\n`
);
console.log("media.js + CREDITS.md écrits");
