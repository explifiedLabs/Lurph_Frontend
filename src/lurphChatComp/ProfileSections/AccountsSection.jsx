import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  saveApiKey,
  removeApiKey,
  fetchKeyStatus,
  fetchMe,
} from "../../features/authSlice";
import {
  Check, Trash2, Eye, EyeOff, Loader2, AlertCircle,
  User, Mail, Calendar, Key, ChevronDown, ChevronUp,
  ShieldCheck, ShieldAlert, CreditCard, KeyRound,
  ExternalLink, Sparkles, Zap, Globe, Copy,
} from "lucide-react";

const Y = "#FFD600";

// ── Real SVG company logos ────────────────────────────────────────────────────

const ProviderLogos = {
  openai: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.387 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.402-.663zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  gemini: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="acc-gemini-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" fill="url(#acc-gemini-g)" />
    </svg>
  ),
  anthropic: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13.827 3.52h-3.654L5.009 20.48h3.611l1.111-3.07h6.537l1.111 3.07H21L13.827 3.52zm-3.092 11.107 2.265-6.26 2.265 6.26H10.735z" fill="#D97706" />
    </svg>
  ),
  deepseek: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#4D6BFE" />
      <path d="M7.5 14.5C7.5 11.462 9.91 9 12.9 9c1.764 0 3.33.84 4.35 2.15" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="12.9" cy="15.5" r="2.6" fill="#fff" />
      <circle cx="12.9" cy="15.5" r="1.1" fill="#4D6BFE" />
    </svg>
  ),
  grok: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.017 20.853L14.392 3h2.953L6.019 20.853H3.017zM14.604 20.853L21 11.001l-1.55-2.392-7.844 12.244h2.998zM9.565 3L6.572 7.647 8.122 10.04 13.563 3H9.565z" />
    </svg>
  ),
  mistral: ({ size = 20 }) => (
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
  openrouter: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
      <path d="M12 2C12 2 4 8 4 12s8 10 8 10" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
      <path d="M12 2C12 2 20 8 20 12s-8 10-8 10" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#8b5cf6" strokeWidth="1.2" fill="none" />
    </svg>
  ),
};

function ProviderLogo({ providerId, size = 20, color }) {
  const Comp = ProviderLogos[providerId];
  if (!Comp) return <Key size={size} style={{ color }} />;
  return <Comp size={size} />;
}

const PROVIDERS = [
  {
    id: "openai",
    label: "OpenAI",
    placeholder: "sk-...",
    models: ["GPT-4o", "GPT-4o mini"],
    color: "#10a37f",
    hint: "Find your key at platform.openai.com/api-keys",
    keyUrl: "https://platform.openai.com/api-keys",
  },
  {
    id: "gemini",
    label: "Google Gemini",
    placeholder: "AIza...",
    models: ["Gemini 2.5 Flash", "Gemini 1.5 Flash"],
    color: "#4285f4",
    hint: "Find your key at aistudio.google.com/app/apikey",
    keyUrl: "https://aistudio.google.com/app/apikey",
  },
  {
    id: "anthropic",
    label: "Anthropic",
    placeholder: "sk-ant-...",
    models: ["Claude 3.5 Sonnet", "Claude 3 Haiku"],
    color: "#d97706",
    hint: "Find your key at console.anthropic.com/settings/keys",
    keyUrl: "https://console.anthropic.com/settings/keys",
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    placeholder: "sk-...",
    models: ["DeepSeek Chat"],
    color: "#4D6BFE",
    hint: "Find your key at platform.deepseek.com",
    keyUrl: "https://platform.deepseek.com",
  },
  {
    id: "grok",
    label: "xAI / Grok",
    placeholder: "xai-...",
    models: ["Grok 3"],
    color: "#a1a1aa",
    hint: "Find your key at console.x.ai",
    keyUrl: "https://console.x.ai",
  },
  {
    id: "mistral",
    label: "Mistral",
    placeholder: "...",
    models: ["Mistral Large", "Mistral Small"],
    color: "#f97316",
    hint: "Find your key at console.mistral.ai",
    keyUrl: "https://console.mistral.ai",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    placeholder: "sk-or-v1-...",
    models: [
      "OR GPT-4o mini", "OR GPT-4o",
      "OR Claude 3 Haiku", "OR Claude 3 Sonnet",
      "OR Gemini 2.0 Flash",
    ],
    color: "#8b5cf6",
    hint: "Find your key at openrouter.ai/keys",
    keyUrl: "https://openrouter.ai/keys",
  },
];

// ── Animated stat number ──────────────────────────────────────────────────────
function AnimatedStat({ value, label, icon: Icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        padding: "16px 12px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        minWidth: 0,
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: `${color}15`,
        border: `1px solid ${color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={15} style={{ color }} />
      </div>
      <span style={{
        fontSize: 22, fontWeight: 700, color: "#f4f4f5",
        fontVariantNumeric: "tabular-nums",
      }}>
        {value}
      </span>
      <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#52525b" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ── Provider card (redesigned) ───────────────────────────────────────────────
function ProviderCard({ provider, isSaved, onSave, onDelete, saving, deleting }) {
  const [expanded, setExpanded] = useState(false);
  const [keyVal, setKeyVal]     = useState("");
  const [showKey, setShowKey]   = useState(false);
  const [localErr, setLocalErr] = useState("");
  const [hovered, setHovered]   = useState(false);

  const handleSave = () => {
    setLocalErr("");
    if (!keyVal.trim()) { setLocalErr("Please enter an API key."); return; }
    onSave(provider.id, keyVal.trim());
    setKeyVal("");
    setExpanded(false);
  };

  const handleDelete = () => { onDelete(provider.id); setExpanded(false); };

  const isConnected = isSaved === "user";
  const isFree = isSaved === "free";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${isConnected ? `${provider.color}35` : isFree ? "rgba(99,102,241,0.2)" : hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        background: isConnected
          ? `linear-gradient(135deg, ${provider.color}08, ${provider.color}03)`
          : isFree
            ? "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(99,102,241,0.02))"
            : hovered
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.015)",
        overflow: "hidden",
        transition: "all 0.25s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "16px 18px", cursor: "pointer",
          transition: "background 0.15s",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Provider icon circle */}
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: `${provider.color}12`,
          border: `1px solid ${provider.color}20`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: provider.color,
          transition: "all 0.2s",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}>
          <ProviderLogo providerId={provider.id} size={20} color={provider.color} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#f4f4f5" }}>
              {provider.label}
            </span>
            {isConnected ? (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
                background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)",
                color: "#22c55e", letterSpacing: "0.06em",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <Check size={10} /> CONNECTED
              </span>
            ) : isFree ? (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20,
                background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                color: "#818cf8", letterSpacing: "0.06em",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <Sparkles size={10} /> FREE TIER
              </span>
            ) : (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                color: "#71717a", letterSpacing: "0.06em",
              }}>
                NOT ADDED
              </span>
            )}
          </div>

          {/* Model chips row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
            {provider.models.map((m) => (
              <span key={m} style={{
                fontSize: 10, padding: "2px 7px", borderRadius: 6,
                background: isConnected ? `${provider.color}10` : "rgba(255,255,255,0.04)",
                border: `1px solid ${isConnected ? `${provider.color}18` : "rgba(255,255,255,0.06)"}`,
                color: isConnected ? provider.color : "#52525b",
                fontWeight: 500,
              }}>
                {m}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          color: "#52525b", flexShrink: 0,
          transition: "transform 0.2s",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        }}>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Expanded panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "0 18px 18px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}>
              {/* Get key link */}
              <a
                href={provider.keyUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  margin: "14px 0 12px",
                  fontSize: 12, color: provider.color,
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <ExternalLink size={12} />
                {provider.hint}
              </a>

              {isConnected ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Masked key display */}
                  <div style={{
                    flex: 1, padding: "10px 14px", borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#52525b", fontSize: 13, fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    letterSpacing: "0.12em",
                  }}>
                    ••••  ••••  ••••  ••••
                  </div>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "10px 16px", borderRadius: 10,
                      border: "1px solid rgba(239,68,68,0.2)",
                      background: "rgba(239,68,68,0.06)",
                      color: "#f87171", fontSize: 13, fontWeight: 600,
                      cursor: deleting ? "wait" : "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { if (!deleting) e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.06)"}
                  >
                    {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                    Remove
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showKey ? "text" : "password"}
                      value={keyVal}
                      onChange={(e) => { setKeyVal(e.target.value); setLocalErr(""); }}
                      placeholder={provider.placeholder}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      style={{
                        width: "100%", padding: "11px 40px 11px 14px", borderRadius: 10,
                        border: `1px solid ${localErr ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
                        background: "rgba(255,255,255,0.03)", color: "#e4e4e7", fontSize: 13,
                        outline: "none", boxSizing: "border-box",
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => { if (!localErr) e.target.style.borderColor = `${provider.color}40`; }}
                      onBlur={(e) => { if (!localErr) e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                    <button
                      onClick={() => setShowKey((v) => !v)}
                      style={{
                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", color: "#52525b",
                        cursor: "pointer", padding: 2,
                      }}
                    >
                      {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  {localErr && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 5,
                      color: "#ef4444", fontSize: 12,
                    }}>
                      <AlertCircle size={12} /> {localErr}
                    </div>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={saving || !keyVal.trim()}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                      padding: "11px 18px", borderRadius: 10, border: "none",
                      background: saving || !keyVal.trim()
                        ? "rgba(255,214,0,0.2)"
                        : `linear-gradient(135deg, ${Y}, #D97706)`,
                      color: saving || !keyVal.trim() ? "#71717a" : "#000",
                      fontSize: 13, fontWeight: 700,
                      cursor: saving || !keyVal.trim() ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                      boxShadow: saving || !keyVal.trim() ? "none" : "0 4px 16px rgba(255,214,0,0.15)",
                    }}
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Key size={14} />}
                    {saving ? "Verifying…" : "Save & Verify"}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main AccountsSection ──────────────────────────────────────────────────────
export default function AccountsSection() {
  const dispatch = useDispatch();
  const { user, keyStatus, keyLoading, keyError } = useSelector((s) => s.auth);

  const [savingProvider, setSavingProvider]     = useState(null);
  const [deletingProvider, setDeletingProvider] = useState(null);
  const [successMsg, setSuccessMsg]             = useState("");

  useEffect(() => {
    dispatch(fetchKeyStatus());
    if (!user) dispatch(fetchMe());
  }, [dispatch]);

  const handleSave = async (provider, apiKey) => {
    setSavingProvider(provider);
    setSuccessMsg("");
    const result = await dispatch(saveApiKey({ provider, apiKey }));
    setSavingProvider(null);
    if (saveApiKey.fulfilled.match(result)) {
      setSuccessMsg(`${PROVIDERS.find((p) => p.id === provider)?.label} key saved!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleDelete = async (provider) => {
    setDeletingProvider(provider);
    await dispatch(removeApiKey(provider));
    setDeletingProvider(null);
  };

  // Derive plan from user object (adjust field name to match your schema)
  const userPlan = user?.plan || user?.subscription?.plan || "free";
  const connectedCount = Object.values(keyStatus || {}).filter((v) => v?.active).length;
  const userKeyCount = Object.values(keyStatus || {}).filter((v) => v?.userKey).length;
  const isPro = userPlan === "pro" || userPlan === "enterprise";

  return (
    <div style={{ maxWidth: 640 }}>

      {/* ── Profile card with glassmorphism ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 32 }}
      >
        <h2 style={{
          fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <User size={18} style={{ color: Y }} />
          Account
        </h2>
        <p style={{ fontSize: 13, color: "#52525b", marginBottom: 20 }}>
          Your profile, plan, and verification status
        </p>

        <div style={{
          padding: 24, borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,214,0,0.01))",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle glow effect */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 120, height: 120, borderRadius: "50%",
            background: `radial-gradient(circle, ${Y}08, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Avatar + name row */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20, position: "relative" }}>
            {/* Avatar with gradient ring */}
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              padding: 2,
              background: `linear-gradient(135deg, ${Y}, #D97706, ${Y}88)`,
              flexShrink: 0,
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: "#141418",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: Y }}>
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name */}
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f4f4f5", marginBottom: 4 }}>
                {user?.name || "—"}
              </div>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Mail size={12} style={{ color: "#52525b" }} />
                <span style={{ fontSize: 13, color: "#71717a" }}>{user?.email || "—"}</span>
              </div>

              {/* Status badges row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {/* Verification */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "3px 10px", borderRadius: 20,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                  background: user?.isVerified ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)",
                  border: `1px solid ${user?.isVerified ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.2)"}`,
                  color: user?.isVerified ? "#22c55e" : "#ef4444",
                }}>
                  {user?.isVerified ? <><ShieldCheck size={11} /> Verified</> : <><ShieldAlert size={11} /> Not Verified</>}
                </div>

                {/* Plan */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "3px 10px", borderRadius: 20,
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                  background: isPro ? "rgba(255,214,0,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isPro ? "rgba(255,214,0,0.25)" : "rgba(255,255,255,0.08)"}`,
                  color: isPro ? Y : "#71717a",
                }}>
                  <CreditCard size={11} />
                  {isPro ? (userPlan === "enterprise" ? "Enterprise" : "Pro") : "Free Plan"}
                </div>

                {/* Join date */}
                {user?.createdAt && (
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "3px 10px", borderRadius: 20,
                    fontSize: 10, fontWeight: 600,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "#52525b",
                  }}>
                    <Calendar size={10} />
                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <AnimatedStat value={userKeyCount} label="Keys Added" icon={Key} color={Y} />
            <AnimatedStat value={connectedCount} label="Active" icon={Zap} color="#22c55e" />
            <AnimatedStat value={PROVIDERS.length} label="Available" icon={Globe} color="#4285f4" />
          </div>

          {/* Not verified CTA */}
          {!user?.isVerified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px", borderRadius: 12, marginTop: 14,
                background: "rgba(239,68,68,0.05)",
                border: "1px solid rgba(239,68,68,0.15)",
              }}
            >
              <ShieldAlert size={15} style={{ color: "#ef4444", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, color: "#fca5a5", fontWeight: 600 }}>Email not verified</span>
                <span style={{ fontSize: 12, color: "#71717a", marginLeft: 6 }}>
                  Check your inbox to verify your account.
                </span>
              </div>
            </motion.div>
          )}

          {/* Free plan upgrade CTA */}
          {userPlan === "free" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px", borderRadius: 12, marginTop: 10,
                background: "rgba(255,214,0,0.04)",
                border: "1px solid rgba(255,214,0,0.12)",
              }}
            >
              <Sparkles size={15} style={{ color: Y, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 12, color: Y, fontWeight: 600 }}>Free Plan</span>
                <span style={{ fontSize: 12, color: "#71717a", marginLeft: 6 }}>
                  Add API keys below to unlock multi-model features, or upgrade to Pro.
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── API Keys section ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, color: "#fff",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <KeyRound size={18} style={{ color: Y }} />
            API Keys
          </h2>
          <span style={{
            fontSize: 11, fontWeight: 600,
            padding: "3px 10px", borderRadius: 20,
            background: connectedCount > 0 ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${connectedCount > 0 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)"}`,
            color: connectedCount > 0 ? "#22c55e" : "#52525b",
          }}>
            {connectedCount} / {PROVIDERS.length} connected
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#52525b", marginBottom: 18, lineHeight: 1.6 }}>
          Connect your own API keys to unlock all multi-model features.
          Keys are encrypted and stored securely.
        </p>

        {/* Key loading state */}
        {keyLoading && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 16px", borderRadius: 10,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: 14,
          }}>
            <Loader2 size={14} className="animate-spin" style={{ color: Y }} />
            <span style={{ fontSize: 13, color: "#71717a" }}>Loading key status…</span>
          </div>
        )}

        {/* Success banner */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e", fontSize: 13, fontWeight: 500,
                marginBottom: 14,
              }}
            >
              <Check size={14} /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error banner */}
        <AnimatePresence>
          {keyError && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px", borderRadius: 12,
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444", fontSize: 13,
                marginBottom: 14,
              }}
            >
              <AlertCircle size={14} />
              {typeof keyError === "string" ? keyError : "Failed to save key. Please check it and try again."}
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PROVIDERS.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <ProviderCard
                provider={provider}
                isSaved={keyStatus?.[provider.id]?.userKey ? "user" : keyStatus?.[provider.id]?.freeTier ? "free" : false}
                onSave={handleSave}
                onDelete={handleDelete}
                saving={savingProvider === provider.id}
                deleting={deletingProvider === provider.id}
              />
            </motion.div>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          marginTop: 20, padding: "14px 16px", borderRadius: 12,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ fontSize: 16, flexShrink: 0 }}>🔒</div>
          <p style={{ fontSize: 11, color: "#3f3f46", lineHeight: 1.6, margin: 0 }}>
            Keys are encrypted at rest, never logged, and you can remove them at any time.
            We <strong style={{ color: "#52525b" }}>never</strong> store your keys in plain text.
          </p>
        </div>
      </motion.div>
    </div>
  );
}