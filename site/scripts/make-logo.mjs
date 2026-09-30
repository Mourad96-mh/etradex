// Détoure le logo client (brand/logo-client.jpeg, fond blanc, JPEG WhatsApp) et génère :
//   public/logo-etradex.png        couleurs d'origine, fond transparent (fonds clairs)
//   public/logo-etradex-light.png  lettrage gris → blanc, rouge conservé (fonds sombres)
//   public/logo.png                logo sur fond blanc (JSON-LD Organization.logo)
//   src/app/icon.png, apple-icon.png  l'avion en papier seul (favicon)
//   src/content/brand.js           dimensions → attributs width/height (zéro CLS)
//
// Chaque pixel est classé « rouge » ou « gris » et reçoit la couleur pure de la charte ;
// seule l'opacité vient de l'image. Résultat : bords nets, sans halo blanc du JPEG.
//   npm run logo

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "brand", "logo-client.jpeg");
const RED = [178, 28, 48]; // #b21c30
const GREY = [77, 77, 77]; // #4d4d4d

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

function render(greyColor, redColor, redOnly = false) {
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0, o = 0; i < data.length; i += C, o += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const isRed = r - g > 40 && r - b > 30;
    // opacité : distance au blanc, rapportée à celle de l'encre pure
    const a = isRed ? (255 - g) / (255 - RED[1]) : (255 - (r + g + b) / 3) / (255 - GREY[0]);
    let alpha = redOnly && !isRed ? 0 : Math.round(Math.min(1, Math.max(0, (a - 0.08) / 0.84)) * 255);
    const col = isRed ? redColor : greyColor;
    out[o] = col[0];
    out[o + 1] = col[1];
    out[o + 2] = col[2];
    out[o + 3] = alpha;
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } });
}

async function save(img, file, targetW) {
  const buf = await img.png().toBuffer();
  const trimmed = await sharp(buf).trim({ threshold: 1 }).toBuffer();
  const resized = await sharp(trimmed).resize({ width: targetW }).png({ palette: true, quality: 90, effort: 10 }).toBuffer();
  fs.writeFileSync(file, resized);
  const m = await sharp(resized).metadata();
  console.log(`${path.relative(ROOT, file).padEnd(34)} ${m.width}x${m.height}  ${Math.round(resized.length / 1024)} KB`);
  return m;
}

const color = await save(render(GREY, RED), path.join(ROOT, "public", "logo-etradex.png"), 560);
await save(render([255, 255, 255], [232, 72, 86]), path.join(ROOT, "public", "logo-etradex-light.png"), 560);

// Logo sur fond blanc, avec marge (données structurées, partages)
const colorBuf = fs.readFileSync(path.join(ROOT, "public", "logo-etradex.png"));
await sharp(colorBuf)
  .resize({ width: 520 })
  .extend({ top: 40, bottom: 40, left: 40, right: 40, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png({ palette: true })
  .toFile(path.join(ROOT, "public", "logo.png"));

// Favicon : l'avion rouge = pixels rouges dans le quart droit de l'image
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = Math.round(W * 0.75); x < W; x++) {
    const i = (y * W + x) * C;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r - g > 60 && r - b > 50) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
}
const pw = maxX - minX + 1, ph = maxY - minY + 1;
const plane = await render(GREY, RED, true).extract({ left: minX, top: minY, width: pw, height: ph }).png().toBuffer();
for (const [file, size, pad] of [["icon.png", 256, 28], ["apple-icon.png", 180, 26]]) {
  const inner = size - pad * 2;
  const p = await sharp(plane).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: file === "icon.png" ? { r: 0, g: 0, b: 0, alpha: 0 } : "#ffffff" } })
    .composite([{ input: p, left: pad, top: pad }])
    .png()
    .toFile(path.join(ROOT, "src", "app", file));
}
console.log(`favicon : avion ${pw}x${ph} px`);

fs.writeFileSync(
  path.join(ROOT, "src", "content", "brand.js"),
  `// Généré par scripts/make-logo.mjs — ne pas modifier à la main.\nexport const LOGO = { src: "/logo-etradex.png", light: "/logo-etradex-light.png", width: ${color.width}, height: ${color.height} };\n`
);
