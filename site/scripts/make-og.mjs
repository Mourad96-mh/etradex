// Génère public/og.jpg (carte de partage 1200×630) avec le logo client.
//   npm run logo && npm run og

import sharp from "sharp";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public");
const DARK = "#1f2326";

const photo = await sharp(path.join(ROOT, "assets-src", "hero.jpg"))
  .resize(560, 630, { fit: "cover" })
  .modulate({ brightness: 0.95, saturation: 0.9 })
  .toBuffer();

const logo = await sharp(path.join(PUB, "logo-etradex-light.png")).resize({ width: 330 }).toBuffer();

const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="fade" x1="0" x2="1">
      <stop offset="0" stop-color="${DARK}" stop-opacity="1"/>
      <stop offset="1" stop-color="${DARK}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="640" height="630" fill="${DARK}"/>
  <rect x="640" width="160" height="630" fill="url(#fade)"/>
  <rect x="0" y="622" width="1200" height="8" fill="#b21c30"/>
  <text x="72" y="282" font-family="Georgia, 'Times New Roman', serif" font-size="52" fill="#fff">Étudier, vivre et</text>
  <text x="72" y="344" font-family="Georgia, 'Times New Roman', serif" font-size="52" fill="#fff">entreprendre au Maroc,</text>
  <text x="72" y="406" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-style="italic" fill="#f2707b">on s’occupe du reste.</text>
  <line x1="72" y1="456" x2="560" y2="456" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <text x="72" y="500" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#c9ccd0">Étudiants · Logement · Démarches · Conciergerie</text>
  <text x="72" y="542" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#fff">Rabat – Salé · Maroc</text>
</svg>`;

await sharp({ create: { width: 1200, height: 630, channels: 3, background: DARK } })
  .composite([
    { input: photo, left: 640, top: 0 },
    { input: Buffer.from(card), left: 0, top: 0 },
    { input: logo, left: 72, top: 72 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(PUB, "og.jpg"));

console.log("og.jpg écrit");
