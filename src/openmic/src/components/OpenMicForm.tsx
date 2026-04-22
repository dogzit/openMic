"use client";

import { useState } from "react";

const PERF_TYPES = [
  { key: "music",   icon: "🎸", label: "Хөгжим" },
  { key: "poetry",  icon: "✍️", label: "Яруу найраг" },
  { key: "comedy",  icon: "🎤", label: "Стенд-ап" },
  { key: "dance",   icon: "💃", label: "Бүжиг" },
  { key: "art",     icon: "🎭", label: "Дуран / Жүжиг" },
  { key: "other",   icon: "✨", label: "Бусад" },
];

const ALL_SLOTS = [
  { time: "19:00", taken: true },
  { time: "19:10", taken: true },
  { time: "19:20", taken: false },
  { time: "19:30", taken: false },
  { time: "19:40", taken: false },
  { time: "19:50", taken: true },
  { time: "20:00", taken: false },
  { time: "20:10", taken: false },
  { time: "20:20", taken: true },
  { time: "20:30", taken: false },
  { time: "20:40", taken: false },
  { time: "20:50", taken: false },
];

export default function OpenMicForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", note: "",
  });
  const [perfType, setPerfType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function set(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit() {
    setError("");
    if (!form.firstName) return setError("Нэрээ оруулна уу.");
    if (!form.email.includes("@")) return setError("Имэйл хаяг буруу байна.");
    if (!form.phone) return setError("Утасны дугаараа оруулна уу.");
    if (!perfType) return setError("Тоглолтын төрлөө сонгоно уу.");
    if (!timeSlot) return setError("Цагийн слот сонгоно уу.");
    if (!agreed) return setError("Дүрэм журамтай зөвшөөрнө үү.");

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, perfType, timeSlot }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message ?? "Алдаа гарлаа.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Сүлжээний алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "56px 24px" }}>
        <span style={{ fontSize: 52, display: "block", marginBottom: 20 }}>🎤</span>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 48, letterSpacing: "0.04em",
          color: "#f0ede6", marginBottom: 12,
        }}>
          ТАЙЗАНД <span style={{ color: "#e8ff47" }}>УГТЪЯ</span>
        </h2>
        <p style={{ fontSize: 14, color: "rgba(240,237,230,0.45)", lineHeight: 1.8, marginBottom: 8 }}>
          Бүртгэл амжилттай! Имэйл хаяг руу чинь баталгаажуулалт ирсэн байгаа.
        </p>
        <p style={{
          display: "inline-block",
          fontFamily: "'Syne Mono', monospace", fontSize: 13,
          color: "#e8ff47",
          background: "rgba(232,255,71,0.08)",
          border: "1px solid rgba(232,255,71,0.2)",
          borderRadius: 4, padding: "6px 18px", marginBottom: 28,
        }}>
          {timeSlot} — цагийн слот
        </p>
        <br/>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(240,237,230,0.4)", fontFamily: "Syne, sans-serif",
            fontSize: 13, padding: "10px 24px", borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Буцах
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Name row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Нэр" required>
          <input className="f-input" value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="Болд" />
        </Field>
        <Field label="Овог">
          <input className="f-input" value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Батаа" />
        </Field>
      </div>

      <Field label="Имэйл" required>
        <input className="f-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="bold@example.mn" />
      </Field>

      <Field label="Утасны дугаар" required>
        <input className="f-input" type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="9911 ****" />
      </Field>

      {/* Perf type */}
      <Field label="Тоглолтын төрөл" required>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {PERF_TYPES.map(t => (
            <button
              key={t.key}
              onClick={() => setPerfType(t.key)}
              style={{
                background: perfType === t.key ? "rgba(232,255,71,0.08)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${perfType === t.key ? "#e8ff47" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 4, padding: "12px 8px", cursor: "pointer",
                textAlign: "center", transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 20, display: "block", marginBottom: 6 }}>{t.icon}</span>
              <span style={{ fontSize: 11, color: perfType === t.key ? "#e8ff47" : "rgba(240,237,230,0.45)", fontFamily: "Syne, sans-serif" }}>{t.label}</span>
            </button>
          ))}
        </div>
      </Field>

      {/* Slot picker */}
      <Field label="Цагийн слот" required>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
          {ALL_SLOTS.map(s => (
            <button
              key={s.time}
              disabled={s.taken}
              onClick={() => !s.taken && setTimeSlot(s.time)}
              style={{
                background: timeSlot === s.time ? "rgba(232,255,71,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${timeSlot === s.time ? "#e8ff47" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 4, padding: "10px 4px",
                fontFamily: "'Syne Mono', monospace", fontSize: 12,
                color: s.taken ? "rgba(240,237,230,0.2)" : timeSlot === s.time ? "#e8ff47" : "rgba(240,237,230,0.45)",
                textDecoration: s.taken ? "line-through" : "none",
                cursor: s.taken ? "not-allowed" : "pointer",
                opacity: s.taken ? 0.4 : 1,
                transition: "all 0.15s",
              }}
            >
              {s.time}
            </button>
          ))}
        </div>
      </Field>

      {/* Note */}
      <Field label="Нэмэлт тайлбар">
        <textarea
          className="f-input"
          rows={3}
          value={form.note}
          onChange={e => set("note", e.target.value)}
          placeholder="Онцгой хүсэлт, техникийн шаардлага..."
          style={{ resize: "vertical" }}
        />
      </Field>

      {/* Agree */}
      <div
        onClick={() => setAgreed(a => !a)}
        style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}
      >
        <div style={{
          width: 18, height: 18, flexShrink: 0, marginTop: 1,
          border: `1px solid ${agreed ? "#e8ff47" : "rgba(255,255,255,0.15)"}`,
          borderRadius: 3, background: agreed ? "#e8ff47" : "rgba(255,255,255,0.03)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: "#080808", fontWeight: 900, transition: "all 0.15s",
        }}>
          {agreed && "✓"}
        </div>
        <span style={{ fontSize: 13, color: "rgba(240,237,230,0.4)", lineHeight: 1.7 }}>
          Дүрэм журамтай танилцаж зөвшөөрч байна. Миний тоглолтыг нийгмийн сүлжээнд нийтлэх зөвшөөрлийг олгож байна.
        </span>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          fontSize: 13, color: "#f87171",
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.2)",
          borderRadius: 6, padding: "10px 14px",
        }}>
          {error}
        </div>
      )}

      {/* Submit */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? "rgba(232,255,71,0.4)" : "#e8ff47",
            color: "#080808", border: "none",
            borderRadius: 4, padding: "15px 36px",
            fontFamily: "Syne, sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", gap: 10,
            transition: "all 0.2s",
          }}
        >
          {loading && (
            <span style={{
              width: 14, height: 14,
              border: "2px solid rgba(8,8,8,0.3)", borderTopColor: "#080808",
              borderRadius: "50%", animation: "spin 0.6s linear infinite",
              display: "inline-block",
            }}/>
          )}
          {loading ? "Илгээж байна..." : "Бүртгүүлэх →"}
        </button>
      </div>

      <style>{`
        .f-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
          padding: 12px 14px;
          color: #f0ede6;
          font-family: Syne, sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .f-input::placeholder { color: rgba(240,237,230,0.18); }
        .f-input:focus {
          border-color: rgba(232,255,71,0.4);
          box-shadow: 0 0 0 3px rgba(232,255,71,0.07);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function Field({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{
        fontFamily: "'Syne Mono', monospace",
        fontSize: 10, letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "rgba(240,237,230,0.35)",
      }}>
        {label}{required && <span style={{ color: "#ff4d6d", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}
