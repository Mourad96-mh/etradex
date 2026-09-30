// Serveur local du dossier out/ qui imite la production (gzip + cache + 404),
// pour que Lighthouse mesure des chiffres réalistes.   npm run serve  → http://localhost:4173
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const OUT = path.resolve(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT) || 4173;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".ico": "image/x-icon" };
const TEXT = /\.(html|css|js|json|svg|txt|xml)$/;

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(OUT, p);
  if (!file.startsWith(OUT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!p.endsWith("/")) { res.writeHead(301, { Location: p + "/" }); return res.end(); }
    file = path.join(file, "index.html");
  }
  let status = 200;
  if (!fs.existsSync(file)) { file = path.join(OUT, "404.html"); status = 404; }
  const ext = path.extname(file);
  const headers = { "Content-Type": TYPES[ext] || "application/octet-stream", "Cache-Control": ext === ".html" ? "public, max-age=600" : "public, max-age=31536000, immutable" };
  let body = fs.readFileSync(file);
  if (TEXT.test(file) && /gzip/.test(req.headers["accept-encoding"] || "")) { body = zlib.gzipSync(body); headers["Content-Encoding"] = "gzip"; }
  res.writeHead(status, headers);
  res.end(body);
}).listen(PORT, () => console.log(`out/ servi sur http://localhost:${PORT}`));
