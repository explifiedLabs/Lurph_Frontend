/**
 * WelcomeScreen.jsx  — fixed
 *
 * Fixes:
 *  1. Uses flex layout from parent (ChatPanel passes a centred flex container)
 *  2. Input max-width matches ChatPanel's input max-width (760px)
 *  3. No height:100% dependency — fills whatever space its parent gives
 */

import React from "react";
import { motion } from "framer-motion";

const SUGGESTIONS = [
  { icon: "✦", label: "Explain quantum computing simply"             },
  { icon: "✦", label: "Write a Python script to parse CSV files"     },
  { icon: "✦", label: "Compare React vs Vue for a large project"     },
  { icon: "✦", label: "Summarise the latest AI research trends"      },
  { icon: "✦", label: "Draft a professional cold-outreach email"     },
  { icon: "✦", label: "Debug this error: undefined is not a function"},
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent:"center",
        width:         "100%",
        padding:       "40px 24px 24px",
        gap:           28,
        textAlign:     "center",
        boxSizing:     "border-box",
      }}
    >
      {/* ── Wordmark ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
      >
        {/* Glow ring behind the wordmark */}
        <div style={{ position: "relative", display: "inline-flex" }}>
          <div
            style={{
              position:  "absolute",
              inset:     -20,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,214,0,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <h1
            style={{
              fontSize:   "clamp(2.4rem, 6vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin:     0,
              background: "linear-gradient(135deg, #fff 0%, #FFD600 55%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              position:   "relative",
            }}
          >
            Lurph
          </h1>
        </div>
        <p style={{ color: "#3f3f46", fontSize: 13, margin: 0, fontWeight: 400, letterSpacing: "0.01em" }}>
          Ask anything across multiple AI models at once
        </p>
      </motion.div>

      {/* ── Suggestion grid ──────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          display:        "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap:            10,
          width:          "100%",
          maxWidth:       700,
        }}
      >
        {SUGGESTIONS.map((s) => (
          <motion.button
            key={s.label}
            variants={item}
            onClick={() => onSuggestionClick?.(s.label)}
            style={{
              display:     "flex",
              alignItems:  "center",
              gap:         9,
              padding:     "11px 16px",
              background:  "#141418",
              border:      "1px solid rgba(255,255,255,0.07)",
              borderRadius: 13,
              fontSize:    13,
              color:       "#a1a1aa",
              cursor:      "pointer",
              fontFamily:  "inherit",
              textAlign:   "left",
              transition:  "all 0.15s",
              lineHeight:  1.4,
            }}
            whileHover={{
              scale:       1.02,
              borderColor: "rgba(255,214,0,0.2)",
              color:       "#e4e4e7",
              background:  "#18181c",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{ color: "#FFD600", fontSize: 10, flexShrink: 0 }}>
              {s.icon}
            </span>
            {s.label}
          </motion.button>
        ))}
      </motion.div>

      {/* ── Subtle badge ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        6,
          padding:    "5px 12px",
          background: "rgba(255,214,0,0.04)",
          border:     "1px solid rgba(255,214,0,0.1)",
          borderRadius: 999,
          fontSize:   11,
          color:      "#4a4a4a",
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD600", opacity: 0.6 }} />
        Select multiple models above to compare responses side-by-side
      </motion.div>
    </div>
  );
}