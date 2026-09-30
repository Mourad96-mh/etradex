// Contrôle responsive via Edge headless piloté en CDP (Node 22, aucune dépendance).
//   npm run serve   (autre terminal)   puis   npm run check:responsive
//   SHOTS=1 → captures pleine page dans ./shots (390 px et 1440 px)
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:4173";
const EDGE = process.env.EDGE || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ALL_PAGES = ["/","/services/", "/services/etudiants-internationaux/", "/a-propos/", "/faq/", "/contact/", "/mentions-legales/", "/en/", "/en/services/professionals-investors/", "/en/contact/", "/es/", "/es/servicios/estudiantes-internacionales/", "/es/contacto/"];
const PAGES = process.env.PAGES ? process.env.PAGES.split(",") : ALL_PAGES;
const WIDTHS =[320, 360, 390, 430, 600, 768, 820, 900, 1024, 1080, 1180, 1280, 1440, 1920];
const SHOTS = process.env.SHOTS === "1";
const PORT = Number(process.env.CDP_PORT) || 9333;

const profile = fs.mkdtempSync(path.join(os.tmpdir(), "etx-edge-"));
const edge = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "--no-first-run", "about:blank"], { stdio: "ignore" });

let target;
for (let i = 0; i < 40 && !target; i++) {
  await new Promise((r) => setTimeout(r, 300));
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === "page" && !t.url.startsWith("edge://"));
  } catch {}
}
if (!target) throw new Error("Edge CDP injoignable");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
const waiters = [];
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  } else if (msg.method) {
    waiters.filter((w) => w.method === msg.method).forEach((w) => w.resolve(msg));
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    const timer = setTimeout(() => {
      pending.delete(n);
      reject(new Error(`CDP ${method} sans réponse`));
    }, 20000);
    pending.set(n, (msg) => {
      clearTimeout(timer);
      resolve(msg);
    });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send("Page.enable");
await send("Runtime.enable");

async function load(url, width) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
  await send("Page.navigate", { url });
  for (let i = 0; i < 50; i++) {
    await new Promise((r) => setTimeout(r, 100));
    if (await evaluate(`document.readyState === "complete" && document.styleSheets.length > 0`)) break;
  }
  await new Promise((r) => setTimeout(r, 150));
}

const PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const over = [];
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" || cs.display === "none" || el.closest(".hp") || el.classList.contains("hero-bg")) continue; // hero-bg : zoom lent, rogné par .hero
    const r = el.getBoundingClientRect();
    if (r.width && r.right > vw + 1) over.push((el.className || el.tagName).toString().slice(0, 40) + " → " + Math.round(r.right));
  }
  const small = [...document.querySelectorAll("a, button, summary")].filter((el) => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
    return r.width && r.height && r.height < 40 && cs.display !== "inline" && !el.closest("p, .breadcrumbs");
  }).map((el) => (el.textContent || el.className).trim().slice(0, 30) + " " + Math.round(el.getBoundingClientRect().height));
  return { innerWidth, scroll: document.documentElement.scrollWidth - vw, over: over.slice(0, 5), small: small.slice(0, 5) };
})()`;

let issues = 0;
for (const p of PAGES) {
  const bad = [];
  for (const w of WIDTHS) {
    await load(BASE + p, w);
    const r = await evaluate(PROBE);
    if (r.innerWidth !== w) bad.push(`${w}: innerWidth=${r.innerWidth}`);
    if (r.scroll > 0) bad.push(`${w}: défilement horizontal ${r.scroll}px ${r.over.join(" | ")}`);
    else if (r.over.length) bad.push(`${w}: débordement ${r.over.join(" | ")}`);
    if (w === 390 && r.small.length) bad.push(`${w}: cibles < 40px ${r.small.join(" | ")}`);
  }
  issues += bad.length;
  console.log(`${bad.length ? "✗" : "✓"} ${p}${bad.length ? "\n    " + bad.join("\n    ") : ""}`);
}

// Burger : ouverture, liens réellement cliquables (elementFromPoint), fermeture.
await load(BASE + "/", 390);
const burger = await evaluate(`(async () => {
  const btn = document.querySelector(".burger");
  btn.click();
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  const menu = document.getElementById("mobile-menu");
  const links = [...menu.querySelectorAll(".mobile-link")];
  const onTop = links.filter(a => { const r = a.getBoundingClientRect(); const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return el && a.contains(el); }).length;
  const expanded = btn.getAttribute("aria-expanded");
  btn.click();
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  return { links: links.length, onTop, expanded, closed: menu.hidden };
})()`);
const burgerOk = burger.links === 5 && burger.onTop === 5 && burger.expanded === "true" && burger.closed;
if (!burgerOk) issues++;
console.log(`${burgerOk ? "✓" : "✗"} burger 390px : ${JSON.stringify(burger)}`);

if (SHOTS) {
  const dir = path.resolve(import.meta.dirname, "..", "shots");
  fs.mkdirSync(dir, { recursive: true });
  for (const p of PAGES.slice(0, 7)) {
    for (const w of [390, 1440]) {
      await load(BASE + p, w);
      await evaluate(`(async () => {
        document.documentElement.classList.remove("js-reveal");
        document.querySelectorAll("img").forEach(i => i.loading = "eager");
        for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); }
        scrollTo(0, 0);
        await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
      })()`);
      const h = await evaluate("document.documentElement.scrollHeight");
      const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: Math.min(h, 12000), scale: 1 } });
      const name = `${(p.replace(/\//g, "_") || "_").replace(/^_|_$/g, "") || "home"}-${w}.jpg`;
      fs.writeFileSync(path.join(dir, name), Buffer.from(shot.result.data, "base64"));
    }
  }
  console.log(`captures dans ${dir}`);
}

ws.close();
edge.kill();
console.log(issues ? `\n${issues} problème(s)` : "\nAucun problème de mise en page");
process.exit(issues ? 1 : 0);
