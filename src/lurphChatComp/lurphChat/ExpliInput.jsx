/**
 * ExpliInput.jsx (LurphInput)  — fixed
 *
 * Fixes:
 *  1. Model picker toggle and outside-click — picker was rendering in a portal
 *     but the outside-click handler only checked the trigger ref, not the portal.
 *     Now uses a stable ref attached to the portal DOM node.
 *  2. Model chips update immediately on toggle/remove — no stale closure.
 *  3. handleSubmit correctly passes prompt + models to parent onSubmit.
 *  4. Stop button renders and fires correctly while isTyping.
 *  5. Suggestion text injection is stable.
 *  6. Textarea auto-grows and resets correctly.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

// ─── Logo SVGs ────────────────────────────────────────────────────────────────

const LOGOS = {
  lurph: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FFD600" />
      <path d="M8 12h8M12 8v8" stroke="#000" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  openai: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.387 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.663zm2.010-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  gemini: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gemini-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" fill="url(#gemini-grad)" />
    </svg>
  ),
  deepseek: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#4D6BFE" />
      <path d="M7.5 14.5C7.5 11.462 9.91 9 12.9 9c1.764 0 3.33.84 4.35 2.15" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="12.9" cy="15.5" r="2.6" fill="#fff" />
      <circle cx="12.9" cy="15.5" r="1.1" fill="#4D6BFE" />
    </svg>
  ),
  anthropic: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13.827 3.52h-3.654L5.009 20.48h3.611l1.111-3.07h6.537l1.111 3.07H21L13.827 3.52zm-3.092 11.107 2.265-6.26 2.265 6.26H10.735z" fill="#D97706" />
    </svg>
  ),
  grok: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.017 20.853L14.392 3h2.953L6.019 20.853H3.017zM14.604 20.853L21 11.001l-1.55-2.392-7.844 12.244h2.998zM9.565 3L6.572 7.647 8.122 10.04 13.563 3H9.565z" />
    </svg>
  ),
  mistral: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="5" height="5" fill="#F97316" />
      <rect x="9" y="2" width="5" height="5" fill="#F97316" />
      <rect x="16" y="2" width="6" height="5" fill="#F97316" />
      <rect x="2" y="9" width="5" height="5" fill="#F97316" />
      <rect x="9" y="9" width="5" height="5" fill="#FB923C" />
      <rect x="16" y="9" width="6" height="5" fill="#FB923C" />
      <rect x="2" y="16" width="5" height="6" fill="#FED7AA" />
      <rect x="9" y="16" width="5" height="6" fill="#F97316" />
      <rect x="16" y="16" width="6" height="6" fill="#F97316" />
    </svg>
  ),
  meta: ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="meta-g" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0082FB" />
          <stop offset="1" stopColor="#00C6E0" />
        </linearGradient>
      </defs>
      <path d="M2 12C2 7.5 4.4 4 7.4 4c1.5 0 2.8.8 4.6 3.5C13.9 4.8 15.2 4 16.6 4 19.6 4 22 7.5 22 12s-2.4 8-5.4 8c-1.4 0-2.7-.8-4.6-3.5C10.2 19.2 8.9 20 7.4 20 4.4 20 2 16.5 2 12z" stroke="url(#meta-g)" strokeWidth="1.8" fill="none" />
      <ellipse cx="12" cy="12" rx="3" ry="5.5" stroke="url(#meta-g)" strokeWidth="1.6" fill="none" />
    </svg>
  ),
};

// ─── Model / Combo data ───────────────────────────────────────────────────────

export const MODELS = [
  { id: "lurph",                       label: "Lurph",                  provider: "Lurph",      color: "#FFD600", logo: "lurph"     },
  { id: "gpt-4o",                      label: "GPT-4o",                 provider: "OpenAI",     color: "#10a37f", logo: "openai"    },
  { id: "gpt-4o-mini",                 label: "GPT-4o mini",            provider: "OpenAI",     color: "#10a37f", logo: "openai"    },
  { id: "gemini-2.5-flash",            label: "Gemini 2.5 Flash",       provider: "Google",     color: "#4285f4", logo: "gemini"    },
  { id: "gemini-1.5-flash",            label: "Gemini 1.5 Flash",       provider: "Google",     color: "#4285f4", logo: "gemini"    },
  { id: "deepseek-chat",               label: "DeepSeek",               provider: "DeepSeek",   color: "#4D6BFE", logo: "deepseek"  },
  { id: "claude-3-5-sonnet-20241022",  label: "Claude 3.5 Sonnet",      provider: "Anthropic",  color: "#D97706", logo: "anthropic" },
  { id: "claude-3-haiku-20240307",     label: "Claude 3 Haiku",         provider: "Anthropic",  color: "#D97706", logo: "anthropic" },
  { id: "grok-3",                      label: "Grok 3",                 provider: "xAI",        color: "#e5e5e5", logo: "grok"      },
  { id: "mistral-large-latest",        label: "Mistral Large",          provider: "Mistral",    color: "#f97316", logo: "mistral"   },
  { id: "mistral-small-latest",        label: "Mistral Small",          provider: "Mistral",    color: "#f97316", logo: "mistral"   },
  { id: "openai/gpt-4o-mini",          label: "OR GPT-4o mini",         provider: "OpenRouter", color: "#7c3aed", logo: "openai"    },
  { id: "openai/gpt-4o",               label: "OR GPT-4o",              provider: "OpenRouter", color: "#7c3aed", logo: "openai"    },
  { id: "anthropic/claude-3-haiku",    label: "OR Claude 3 Haiku",      provider: "OpenRouter", color: "#D97706", logo: "anthropic" },
  { id: "anthropic/claude-3-sonnet",   label: "OR Claude 3 Sonnet",     provider: "OpenRouter", color: "#D97706", logo: "anthropic" },
  { id: "google/gemini-2.0-flash-001", label: "OR Gemini 2.0 Flash",    provider: "OpenRouter", color: "#4285f4", logo: "gemini"    },
];

const COMBOS = [
  { id: "speed",     label: "Speed Duo",      models: ["gpt-4o-mini", "gemini-2.5-flash"], desc: "Fast & lightweight" },
  { id: "power",     label: "Power Stack",    models: ["gpt-4o", "claude-3-5-sonnet-20241022"],      desc: "Best reasoning"    },
  { id: "lurph-gpt", label: "Lurph + GPT-4o", models: ["lurph", "gpt-4o"],                 desc: "Recommended"       },
];

const modelById = (id) => MODELS.find((m) => m.id === id);

// ─── ModelLogo ────────────────────────────────────────────────────────────────

function ModelLogo({ logoKey, size = 16 }) {
  const Comp = LOGOS[logoKey];
  if (!Comp) return <span style={{ width: size, height: size, display: "inline-block" }} />;
  return <Comp size={size} />;
}

// ─── ModelChip ────────────────────────────────────────────────────────────────

function ModelChip({ modelId, onRemove, isOnly }) {
  const model = modelById(modelId);
  if (!model) return null;

  return (
    <span
      style={{
        display:      "inline-flex",
        alignItems:   "center",
        gap:          5,
        padding:      "3px 6px 3px 7px",
        borderRadius: 999,
        background:   `color-mix(in srgb, ${model.color} 12%, transparent)`,
        border:       `1px solid color-mix(in srgb, ${model.color} 28%, transparent)`,
        fontSize:     11,
        color:        model.color,
        userSelect:   "none",
        flexShrink:   0,
      }}
    >
      <ModelLogo logoKey={model.logo} size={12} />
      <span style={{ fontWeight: 500 }}>{model.label}</span>
      {/* Don't show remove button if it's the last model */}
      {!isOnly && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(modelId); }}
          aria-label={`Remove ${model.label}`}
          style={{
            width:        16,
            height:       16,
            borderRadius: "50%",
            border:       "none",
            background:   `color-mix(in srgb, ${model.color} 20%, transparent)`,
            color:        model.color,
            fontSize:     9,
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            cursor:       "pointer",
            flexShrink:   0,
            fontFamily:   "inherit",
            lineHeight:   1,
            transition:   "background 0.12s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = `color-mix(in srgb, ${model.color} 35%, transparent)`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = `color-mix(in srgb, ${model.color} 20%, transparent)`)
          }
        >
          ✕
        </button>
      )}
    </span>
  );
}

// ─── ModelPicker ─────────────────────────────────────────────────────────────

function ModelPicker({ open, selected, onToggle, onApplyCombo, anchorRef, onClose }) {
  const [query, setQuery] = useState("");
  const [pos,   setPos]   = useState({ top: 0, left: 0, width: 660 });
  const panelRef          = useRef(null);

  // Position calculation
  useEffect(() => {
    if (!open || !anchorRef?.current) return;

    const update = () => {
      const rect    = anchorRef.current.getBoundingClientRect();
      const pickerW = Math.min(660, window.innerWidth - 24);
      let   left    = rect.left;
      if (left + pickerW > window.innerWidth - 12) left = window.innerWidth - pickerW - 12;
      if (left < 12) left = 12;
      const estimatedH = 320;
      const top = rect.top > estimatedH + 16
        ? rect.top - estimatedH - 10
        : rect.bottom + 10;
      setPos({ top, left, width: pickerW });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, anchorRef]);

  // Outside-click: close when clicking anywhere outside the trigger or panel
  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      const trigger = anchorRef?.current;
      const panel   = panelRef.current;
      if (trigger?.contains(e.target) || panel?.contains(e.target)) return;
      onClose();
    };

    // Use a small timeout so the toggle click that opened the picker
    // doesn't immediately close it via this handler.
    const id = setTimeout(() => {
      document.addEventListener("mousedown", handler);
    }, 0);

    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handler);
    };
  }, [open, anchorRef, onClose]);

  const filtered = MODELS.filter(
    (m) =>
      m.label.toLowerCase().includes(query.toLowerCase()) ||
      m.provider.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      style={{
        position:      "fixed",
        top:           pos.top,
        left:          pos.left,
        width:         pos.width,
        background:    "#141418",
        border:        "1px solid rgba(255,255,255,.13)",
        borderRadius:  16,
        overflow:      "hidden",
        zIndex:        9999,
        boxShadow:     "0 8px 48px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.03)",
        animation:     "pickerSlideUp .18s cubic-bezier(.16,1,.3,1)",
        maxHeight:     "80vh",
        display:       "flex",
        flexDirection: "column",
      }}
    >
      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4a4a6a" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#ebebf5", fontSize: 13, fontFamily: "inherit" }}
          placeholder="Search models…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ background: "transparent", border: "none", color: "#4a4a6a", cursor: "pointer", fontSize: 12 }}>✕</button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: !query ? "minmax(180px, 35%) 1fr" : "1fr", gap: 0, overflowY: "auto", flex: 1, minHeight: 0 }}>
        {/* Combos column */}
        {!query && (
          <div style={{ padding: "14px 16px", borderRight: "1px solid rgba(255,255,255,.07)" }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", color: "#4a4a6a", marginBottom: 10, marginTop: 0 }}>
              Top combos
            </p>
            {COMBOS.map((combo) => {
              const isActive = combo.models.every((id) => selected.includes(id));
              return (
                <button
                  key={combo.id}
                  onClick={() => { onApplyCombo(combo.models); }}
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    alignItems:    "flex-start",
                    gap:           3,
                    width:         "100%",
                    padding:       "10px 12px",
                    background:    isActive ? "rgba(255,214,0,.07)" : "#1c1c22",
                    border:        `1px solid ${isActive ? "rgba(255,214,0,.18)" : "rgba(255,255,255,.07)"}`,
                    borderRadius:  10,
                    marginBottom:  8,
                    cursor:        "pointer",
                    fontFamily:    "inherit",
                    textAlign:     "left",
                    transition:    "all .15s",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 500, color: isActive ? "#FFD600" : "#ebebf5" }}>
                    {combo.label}
                  </span>
                  <span style={{ fontSize: 11, color: "#4a4a6a" }}>{combo.desc}</span>
                  <span style={{ fontSize: 11, color: isActive ? "#d97706" : "#8888a8", marginTop: 1 }}>
                    {combo.models.map((id) => modelById(id)?.label).join(" + ")}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Models column */}
        <div style={{ padding: "14px 16px", overflowY: "auto" }}>
          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", color: "#4a4a6a", marginBottom: 10, marginTop: 0 }}>
            {query ? "Results" : "All models"}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {filtered.map((m) => {
              const on = selected.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => onToggle(m.id)}
                  style={{
                    display:      "inline-flex",
                    alignItems:   "center",
                    gap:          6,
                    padding:      "6px 12px 6px 9px",
                    borderRadius: 999,
                    border:       `1px solid ${on ? `color-mix(in srgb, ${m.color} 35%, transparent)` : "rgba(255,255,255,.08)"}`,
                    background:   on ? `color-mix(in srgb, ${m.color} 10%, transparent)` : "rgba(255,255,255,.03)",
                    color:        on ? m.color : "#8888a8",
                    fontSize:     12.5,
                    fontFamily:   "inherit",
                    cursor:       "pointer",
                    transition:   "all .15s",
                    whiteSpace:   "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!on) {
                      e.currentTarget.style.background = "rgba(255,255,255,.07)";
                      e.currentTarget.style.color      = "#c8c8d8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!on) {
                      e.currentTarget.style.background = "rgba(255,255,255,.03)";
                      e.currentTarget.style.color      = "#8888a8";
                    }
                  }}
                >
                  <ModelLogo logoKey={m.logo} size={15} />
                  <span style={{ fontWeight: on ? 500 : 400 }}>{m.label}</span>
                  <span style={{ fontSize: 10.5, color: on ? `color-mix(in srgb, ${m.color} 70%, transparent)` : "#4a4a6a", marginLeft: 1 }}>
                    {m.provider}
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p style={{ color: "#4a4a6a", fontSize: 13, margin: 0 }}>No models found</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ─── AttachMenu ───────────────────────────────────────────────────────────────

function AttachMenu({ open, onClose, onFile, onImage }) {
  const fileRef = useRef(null);
  const imgRef  = useRef(null);
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 39 }} />
      <div
        style={{
          position:   "absolute",
          bottom:     "calc(100% + 8px)",
          left:       0,
          background: "#141418",
          border:     "1px solid rgba(255,255,255,.13)",
          borderRadius: 13,
          overflow:   "hidden",
          minWidth:   178,
          zIndex:     40,
          boxShadow:  "0 -6px 28px rgba(0,0,0,.55)",
        }}
      >
        {[
          {
            label: "Upload PDF",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            ),
            onClick: () => fileRef.current?.click(),
          },
          {
            label: "Upload Image",
            icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            ),
            onClick: () => imgRef.current?.click(),
          },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => { item.onClick(); onClose(); }}
            style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "10px 14px", fontSize: 13, color: "#ebebf5", cursor: "pointer", background: "transparent", border: "none", fontFamily: "inherit", textAlign: "left", transition: "background .1s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1c1c22")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
        <input ref={fileRef} type="file" accept=".pdf"    hidden onChange={(e) => { onFile(e.target.files[0]);  onClose(); e.target.value = ""; }} />
        <input ref={imgRef}  type="file" accept="image/*" hidden onChange={(e) => { onImage(e.target.files[0]); onClose(); e.target.value = ""; }} />
      </div>
    </>
  );
}

// ─── Main LurphInput ──────────────────────────────────────────────────────────

export default function LurphInput({
  onSubmit,
  isTyping        = false,
  chatNotPresent  = true,
  onStop,
  suggestionText  = "",
}) {
  const [prompt,         setPrompt]         = useState("");
  const [selectedModels, setSelectedModels] = useState(["lurph"]);
  const [pickerOpen,     setPickerOpen]     = useState(false);
  const [attachOpen,     setAttachOpen]     = useState(false);
  const [isRecording,    setIsRecording]    = useState(false);
  const [attachment,     setAttachment]     = useState(null);
  const [image,          setImage]          = useState(null);

  const textareaRef = useRef(null);
  const triggerRef  = useRef(null);

  // ── Auto-grow textarea ──────────────────────────────────────────────────────
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 150) + "px";
  }, [prompt]);

  // ── Focus management ────────────────────────────────────────────────────────
  useEffect(() => { textareaRef.current?.focus(); }, []);
  useEffect(() => { if (!isTyping) textareaRef.current?.focus(); }, [isTyping]);

  // ── Inject suggestion text ──────────────────────────────────────────────────
  const prevSuggestionRef = useRef("");
  useEffect(() => {
    if (suggestionText && suggestionText !== prevSuggestionRef.current) {
      prevSuggestionRef.current = suggestionText;
      setPrompt(suggestionText);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [suggestionText]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed || isTyping) return;

    onSubmit?.({
      prompt:     trimmed,
      models:     selectedModels,
      attachment,
      image,
    });

    setPrompt("");
    setAttachment(null);
    setImage(null);
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [prompt, isTyping, selectedModels, attachment, image, onSubmit]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  // ── Model selection ─────────────────────────────────────────────────────────
  const toggleModel = useCallback((id) => {
    setSelectedModels((prev) => {
      if (prev.includes(id)) {
        // Never remove if it's the last model
        if (prev.length === 1) return prev;
        return prev.filter((m) => m !== id);
      }
      return [...prev, id];
    });
  }, []);

  const applyCombo = useCallback((modelIds) => {
    setSelectedModels(modelIds);
    setPickerOpen(false);
  }, []);

  const closePicker = useCallback(() => setPickerOpen(false), []);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const triggerLabel = selectedModels.length === 1
    ? (modelById(selectedModels[0])?.label ?? "1 model")
    : `${selectedModels.length} models`;

  const inputActive = prompt.trim().length > 0;
  const canSend     = inputActive && !isTyping;

  return (
    <>
      <style>{`
        @keyframes pickerSlideUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.2; } }
        @keyframes spin  { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ width: "100%", position: "relative" }}>
        {/* ── Model picker trigger ──────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setPickerOpen((o) => !o)}
            style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          6,
              padding:      "6px 12px",
              background:   pickerOpen ? "#22222d" : "#1c1c22",
              border:       `1px solid ${pickerOpen ? "rgba(255,214,0,.2)" : "rgba(255,255,255,.07)"}`,
              borderRadius: 10,
              cursor:       "pointer",
              fontSize:     12,
              color:        pickerOpen ? "#FFD600" : "#8888a8",
              fontFamily:   "inherit",
              transition:   "all .15s",
              userSelect:   "none",
            }}
          >
            {selectedModels.length === 1 && (
              <ModelLogo logoKey={modelById(selectedModels[0])?.logo} size={14} />
            )}
            {triggerLabel}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d={pickerOpen ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
            </svg>
            {selectedModels.length > 1 && (
              <span style={{ padding: "2px 7px", background: "rgba(255,214,0,.08)", border: "1px solid rgba(255,214,0,.2)", borderRadius: 999, fontSize: 10, color: "#FFD600" }}>
                {selectedModels.length}
              </span>
            )}
          </button>
        </div>

        {/* ── Model Picker Portal ─────────────────────────────────────────── */}
        <ModelPicker
          open={pickerOpen}
          selected={selectedModels}
          onToggle={toggleModel}
          onApplyCombo={applyCombo}
          anchorRef={triggerRef}
          onClose={closePicker}
        />

        {/* ── Input box ──────────────────────────────────────────────────── */}
        <div
          style={{
            background:   "#141418",
            border:       `1px solid ${inputActive ? "rgba(255,214,0,.2)" : "rgba(255,255,255,.07)"}`,
            borderRadius: 20,
            boxShadow:    inputActive
              ? "0 0 0 1px rgba(255,214,0,.04), 0 16px 56px rgba(0,0,0,.55)"
              : "none",
            transition: "border-color .25s, box-shadow .25s",
          }}
        >
          {/* Model chips row inside the box — only show if multiple models or not default Lurph */}
          {selectedModels.length > 1 && (
            <div
              style={{
                display:    "flex",
                flexWrap:   "wrap",
                gap:        6,
                padding:    "10px 14px 0",
                alignItems: "center",
              }}
            >
              {selectedModels.map((id) => (
                <ModelChip
                  key={id}
                  modelId={id}
                  onRemove={toggleModel}
                  isOnly={selectedModels.length === 1}
                />
              ))}
              {selectedModels.length > 1 && (
                <span style={{ fontSize: 10, color: "#3f3f46", marginLeft: 2 }}>
                  · responding in parallel
                </span>
              )}
            </div>
          )}

          {/* Attachment chip */}
          {attachment && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", margin: "8px 14px 0", background: "rgba(255,214,0,.07)", border: "1px solid rgba(255,214,0,.2)", borderRadius: 12, fontSize: 12 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
              <span style={{ color: "#8888a8", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{attachment.name}</span>
              <span style={{ color: "#4a4a6a", fontSize: 11 }}>{(attachment.size / 1024).toFixed(1)} KB</span>
              <button type="button" onClick={() => setAttachment(null)} style={{ marginLeft: "auto", cursor: "pointer", color: "#4a4a6a", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, border: "none", background: "transparent", fontSize: 10, fontFamily: "inherit" }}>✕</button>
            </div>
          )}

          {/* Image chip */}
          {image && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", margin: "8px 14px 0", background: "rgba(255,214,0,.07)", border: "1px solid rgba(255,214,0,.2)", borderRadius: 12, fontSize: 12 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              <span style={{ color: "#8888a8", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{image.name}</span>
              <span style={{ color: "#4a4a6a", fontSize: 11 }}>{(image.size / 1024).toFixed(1)} KB</span>
              <button type="button" onClick={() => setImage(null)} style={{ marginLeft: "auto", cursor: "pointer", color: "#4a4a6a", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 4, border: "none", background: "transparent", fontSize: 10, fontFamily: "inherit" }}>✕</button>
            </div>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything…"
            disabled={isTyping}
            rows={1}
            style={{
              width:      "100%",
              background: "transparent",
              border:     "none",
              outline:    "none",
              resize:     "none",
              fontSize:   15,
              lineHeight: 1.65,
              color:      "#ebebf5",
              padding:    "14px 16px 8px",
              minHeight:  28,
              maxHeight:  150,
              overflowY:  "auto",
              fontFamily: "inherit",
              scrollbarWidth: "none",
              opacity:    isTyping ? 0.5 : 1,
              cursor:     isTyping ? "not-allowed" : "text",
              boxSizing:  "border-box",
            }}
          />

          {/* Bottom action bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Attach */}
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  title="Attach file"
                  onClick={() => setAttachOpen((o) => !o)}
                  style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: "transparent", color: "#4a4a6a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.color = "#8888a8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4a4a6a"; }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <AttachMenu
                  open={attachOpen}
                  onClose={() => setAttachOpen(false)}
                  onFile={setAttachment}
                  onImage={setImage}
                />
              </div>

              {/* Mic */}
              <button
                type="button"
                title={isRecording ? "Stop recording" : "Voice input"}
                onClick={() => setIsRecording((r) => !r)}
                style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: isRecording ? "rgba(255,50,50,.08)" : "transparent", color: isRecording ? "#f87171" : "#4a4a6a", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .15s" }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                </svg>
              </button>

              {isRecording && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: "rgba(255,214,0,.08)", borderRadius: 999, fontSize: 11, color: "#FFD600", marginLeft: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD600", animation: "blink 1.5s ease-in-out infinite" }} />
                  Listening
                </div>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {prompt.length > 0 && (
                <span style={{ fontSize: 11, color: "#4a4a6a", fontVariantNumeric: "tabular-nums" }}>
                  {prompt.length}/2000
                </span>
              )}

              {/* Stop button while streaming */}
              {isTyping && onStop ? (
                <button
                  type="button"
                  onClick={onStop}
                  title="Stop generating"
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "0 14px", height: 34, borderRadius: 10, border: "1px solid rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)", color: "#f87171", fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="#f87171">
                    <rect width="10" height="10" rx="2" />
                  </svg>
                  Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSend}
                  title="Send"
                  style={{
                    width:        34,
                    height:       34,
                    borderRadius: 10,
                    border:       "none",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    flexShrink:   0,
                    transition:   "all .2s",
                    fontFamily:   "inherit",
                    ...(canSend
                      ? { background: "linear-gradient(135deg,#FFD600,#d97706)", color: "#000", cursor: "pointer", boxShadow: "0 4px 18px rgba(255,214,0,.22)" }
                      : { background: "rgba(255,255,255,.05)", color: "rgba(255,255,255,.12)", cursor: "default" }),
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Hints */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10, fontSize: 11, color: "#4a4a6a" }}>
          <span>Enter to send</span>
          <span style={{ opacity: .3 }}>·</span>
          <span>Shift+Enter for new line</span>
        </div>
      </div>
    </>
  );
}