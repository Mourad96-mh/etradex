"use client";

import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import { waLink } from "@/content/site";

// Envoi vers /contact.php (hébergement mutualisé). Si l'envoi échoue pour une raison
// quelconque, la demande est proposée en un clic sur WhatsApp : aucune demande perdue.
export default function ContactForm({ t, services, defaultService = "" }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error | invalid
  const [waText, setWaText] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef(null);

  const buildWhatsappText = (data) => {
    const service = services.find((s) => s.id === data.get("service"))?.title || t.serviceOther;
    return [
      t.waIntro,
      `${t.name} : ${data.get("name")}`,
      `${t.email} : ${data.get("email")}`,
      data.get("phone") ? `${t.phone} : ${data.get("phone")}` : null,
      `${t.profile} : ${data.get("profile")}`,
      `${t.service} : ${service}`,
      "",
      data.get("message"),
    ]
      .filter((l) => l !== null)
      .join("\n");
  };

  async function onSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form.checkValidity()) {
      setStatus("invalid");
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    data.set("elapsed", String(Math.round((Date.now() - startedAt.current) / 1000)));
    setWaText(buildWhatsappText(data));
    setStatus("sending");
    try {
      const res = await fetch("/contact.php", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-result form-result--ok" role="status">
        <Icon name="check" size={28} />
        <p>{t.success}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
      <h2 className="form-title">{t.title}</h2>

      <div className="form-grid">
        <label className="field">
          <span>{t.name} <abbr title={t.required}>*</abbr></span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          <span>{t.email} <abbr title={t.required}>*</abbr></span>
          <input name="email" type="email" autoComplete="email" required maxLength={160} />
        </label>
        <label className="field">
          <span>{t.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={40} aria-describedby="phone-hint" />
          <small id="phone-hint">{t.phoneHint}</small>
        </label>
        <label className="field">
          <span>{t.profile}</span>
          <select name="profile" defaultValue={t.profiles[0]}>
            {t.profiles.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="field field--full">
          <span>{t.service}</span>
          <select name="service" defaultValue={defaultService}>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
            <option value="">{t.serviceOther}</option>
          </select>
        </label>
        <label className="field field--full">
          <span>{t.message} <abbr title={t.required}>*</abbr></span>
          <textarea name="message" rows={5} required maxLength={3000} placeholder={t.messagePlaceholder} />
        </label>
      </div>

      {/* Pot de miel anti-spam : invisible pour les humains */}
      <div className="hp" aria-hidden="true">
        <label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="consent">
        <input name="consent" type="checkbox" required value="yes" />
        <span>{t.consent} <abbr title={t.required}>*</abbr></span>
      </label>

      {status === "invalid" && <p className="form-msg form-msg--warn" role="alert">{t.invalid}</p>}

      {status === "error" && (
        <div className="form-msg form-msg--error" role="alert">
          <p>{t.error}</p>
          <a className="btn btn--wa" href={waLink(waText)} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> <span>{t.sendWhatsapp}</span>
          </a>
        </div>
      )}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
        {status !== "sending" && <Icon name="arrow" size={18} />}
      </button>
    </form>
  );
}
