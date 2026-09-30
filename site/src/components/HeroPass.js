"use client";

import { useEffect, useRef, useState } from "react";
import { P0, P2, PLANE, ROUTE, planeAt } from "@/lib/passRoute";

// Carte d'embarquement animée du hero : un vol part d'une ville d'origine vers
// Rabat–Salé, puis les 4 étapes de l'arrivée se cochent une à une, puis le
// tampon « Bienvenue ». Le HTML serveur montre l'état final (tout coché) : sans
// JavaScript, ou avec prefers-reduced-motion, la carte reste complète et fixe.

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const FLIGHT_MS = 2300;
const STEP_MS = 620;
const HOLD_MS = 2800;

export default function HeroPass({ card }) {
  const steps = card.items.length;
  const [origin, setOrigin] = useState(0);
  const [done, setDone] = useState(steps); // état serveur : tout est coché
  const [landed, setLanded] = useState(true);
  const [stamped, setStamped] = useState(true);
  const planeRef = useRef(null);
  const trailRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    let visible = true;
    let raf = 0;
    const timers = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        const tick = () => (visible ? resolve() : timers.push(setTimeout(tick, 400)));
        timers.push(setTimeout(tick, ms));
      });

    const setProgress = (p) => {
      planeRef.current?.setAttribute("transform", planeAt(p));
      trailRef.current?.setAttribute("stroke-dashoffset", String(1 - p));
    };

    const fly = () =>
      new Promise((resolve) => {
        const start = performance.now();
        const frame = (now) => {
          if (!alive) return resolve();
          const t = Math.min(1, (now - start) / FLIGHT_MS);
          setProgress(easeInOut(t));
          if (t < 1) raf = requestAnimationFrame(frame);
          else resolve();
        };
        raf = requestAnimationFrame(frame);
      });

    // En pause hors écran : rien ne tourne pour rien.
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (wrapRef.current) io.observe(wrapRef.current);

    (async () => {
      await wait(HOLD_MS); // on laisse d'abord lire l'état complet
      let i = 0;
      while (alive) {
        i = (i + 1) % card.origins.length;
        setStamped(false);
        setLanded(false);
        setDone(0);
        setProgress(0);
        await wait(450);
        if (!alive) break;
        setOrigin(i);
        await wait(350);
        if (!alive) break;
        await fly();
        if (!alive) break;
        setLanded(true);
        for (let s = 1; s <= steps && alive; s++) {
          await wait(STEP_MS);
          if (alive) setDone(s);
        }
        await wait(450);
        if (!alive) break;
        setStamped(true);
        await wait(HOLD_MS);
      }
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, [card.origins.length, steps]);

  // Légère inclinaison 3D qui suit le pointeur (souris uniquement).
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.removeProperty("--ry");
    e.currentTarget.style.removeProperty("--rx");
  };

  const [code, city] = card.origins[origin];
  const [destCode, destCity] = card.dest;
  const current = done < steps ? done : -1;

  return (
    <div className="pass-wrap" ref={wrapRef} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="pass">
        <div className="pass-top">
          <div className="pass-head">
            <span className="pass-brand">ETRADEX</span>
            <span className="pass-label">{card.label}</span>
          </div>

          <div className="pass-route">
            <p className="pass-city">
              <span className="pass-code" key={code}>{code}</span>
              <span className="pass-name" key={city}>{city}</span>
            </p>
            <svg className="pass-arc" viewBox="0 0 200 60" aria-hidden="true" focusable="false">
              <path d={ROUTE} className="pass-arc-base" />
              <path
                ref={trailRef}
                d={ROUTE}
                className="pass-arc-trail"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset="0"
              />
              <circle cx={P0[0]} cy={P0[1]} r="2.6" className="pass-arc-pin" />
              <circle cx={P2[0]} cy={P2[1]} r="2.6" className="pass-arc-pin" />
              <circle cx={P2[0]} cy={P2[1]} r="3" className={`pass-arc-ping${landed ? " is-on" : ""}`} />
              <g ref={planeRef} transform={planeAt(1)}>
                <path
                  className="pass-plane"
                  d={PLANE}
                />
              </g>
            </svg>
            <p className="pass-city pass-city--dest">
              <span className="pass-code">{destCode}</span>
              <span className="pass-name">{destCity}</span>
            </p>
          </div>

          <dl className="pass-fields">
            {card.fields.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="pass-bottom">
          <p className="pass-title">{card.title}</p>
          <ol className="pass-steps" style={{ "--p": done / steps }}>
            {card.items.map(([label, meta], i) => (
              <li key={label} className={i < done ? "is-done" : i === current && landed ? "is-current" : undefined}>
                <span className="pass-dot" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="12" height="12"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <span className="pass-step">{label}</span>
                <span className="pass-meta">{meta}</span>
              </li>
            ))}
          </ol>

          <div className="pass-foot">
            <span className="pass-barcode" aria-hidden="true" />
            <span>{card.foot}</span>
          </div>

          <span className={`pass-stamp${stamped ? " is-on" : ""}`} aria-hidden="true">
            <span>{card.stamp.split(" ")[0]}</span>
            <span>{card.stamp.split(" ").slice(1).join(" ")}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
