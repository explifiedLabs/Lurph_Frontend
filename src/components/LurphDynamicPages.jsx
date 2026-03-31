import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Home,
  RefreshCw,
  FileQuestion,
  Zap,
} from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const pageCache = {};
const SITE_ID = "69c7aac4b4e0d5c00d96e3f2";
const API_BASE = "https://cmsapi-pf6diz22ka-uc.a.run.app/api/pages";
const BRAND = "#FFD600";

// ─── SHIMMER SKELETON ───────────────────────────────────────────────────────
function ShimmerBlock({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-[#111111] ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,214,0,0.07) 50%, transparent 100%)`,
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function SkeletonLoader() {
  return (
    <motion.div
      className="min-h-screen w-full max-w-4xl mx-auto px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Tag line shimmer */}
      <ShimmerBlock className="h-4 w-24 mb-8" />

      {/* Title */}
      <ShimmerBlock className="h-14 w-4/5 mb-3" />
      <ShimmerBlock className="h-14 w-2/3 mb-10" />

      {/* Divider */}
      <div className="h-px w-full bg-[#1a1a1a] mb-10" />

      {/* Paragraph lines */}
      {[100, 95, 88, 92, 75].map((w, i) => (
        <ShimmerBlock
          key={i}
          className="h-4 mb-4"
          style={{ width: `${w}%` }}
        />
      ))}

      {/* Section heading */}
      <ShimmerBlock className="h-8 w-1/3 mt-14 mb-6" />

      {[97, 89, 93, 70].map((w, i) => (
        <ShimmerBlock
          key={i}
          className="h-4 mb-4"
          style={{ width: `${w}%` }}
        />
      ))}

      {/* Image placeholder */}
      <ShimmerBlock className="h-56 w-full mt-14 rounded-2xl" />
    </motion.div>
  );
}

// ─── 404 PAGE ───────────────────────────────────────────────────────────────
function NotFound({ slug }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Icon block */}
      <motion.div
        className="relative mb-10"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-2xl"
          style={{ background: `${BRAND}22` }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="relative w-24 h-24 rounded-3xl flex items-center justify-center border"
          style={{
            background: "#0d0d0d",
            borderColor: `${BRAND}33`,
            boxShadow: `0 0 0 1px ${BRAND}11, 0 20px 60px -10px ${BRAND}22`,
          }}
        >
          <FileQuestion size={40} style={{ color: BRAND }} strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* 404 number */}
      <motion.p
        className="text-xs font-mono tracking-[0.3em] mb-3 uppercase"
        style={{ color: BRAND }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        Error 404
      </motion.p>

      <motion.h1
        className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Page Not Found
      </motion.h1>

      <motion.p
        className="text-[#666] text-lg mb-2 max-w-md leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {slug ? (
          <>
            <span className="font-mono text-sm px-2 py-0.5 rounded" style={{ background: "#111", color: BRAND }}>
              /{slug}
            </span>{" "}
            doesn't exist or has been removed.
          </>
        ) : (
          "The page you're looking for doesn't exist or has been removed."
        )}
      </motion.p>

      <motion.div
        className="flex gap-3 mt-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: BRAND }}
        >
          <Home size={16} />
          Go Home
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 border border-[#222] text-[#aaa] hover:text-white hover:border-[#333]"
        >
          <RefreshCw size={15} />
          Try Again
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── CONTENT PAGE ───────────────────────────────────────────────────────────
function PageContent({ page }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      className="min-h-screen w-full max-w-4xl mx-auto px-6 py-20 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >


      {/* Title */}
      {page.title && (
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]"
        >
          {page.title}
        </motion.h1>
      )}

      {/* Yellow accent rule */}
      <motion.div
        variants={itemVariants}
        className="h-px w-full mb-10"
        style={{ background: `linear-gradient(90deg, ${BRAND}66, transparent)` }}
      />

      {/* HTML Content */}
      <motion.div
        variants={itemVariants}
        className="lurph-dynamic-content w-full"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      {/* Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .lurph-dynamic-content {
            color: #a0a0a0;
            line-height: 1.9;
            font-size: 1.1rem;
            font-family: 'Georgia', 'Times New Roman', serif;
          }
          .lurph-dynamic-content > * + * { margin-top: 1.6em; }

          .lurph-dynamic-content h1,
          .lurph-dynamic-content h2,
          .lurph-dynamic-content h3,
          .lurph-dynamic-content h4 {
            font-family: ui-sans-serif, system-ui, sans-serif;
            color: #ffffff;
            letter-spacing: -0.02em;
            font-weight: 800;
          }
          .lurph-dynamic-content h1 { font-size: 2.6rem; margin-top: 2em; line-height: 1.1; }
          .lurph-dynamic-content h2 { font-size: 1.9rem; margin-top: 2em; padding-left: 1rem; border-left: 3px solid ${BRAND}; }
          .lurph-dynamic-content h3 { font-size: 1.35rem; margin-top: 1.5em; color: #e0e0e0; }
          .lurph-dynamic-content h4 { font-size: 1.1rem; margin-top: 1.2em; color: #c0c0c0; }

          .lurph-dynamic-content p { color: #999; }

          .lurph-dynamic-content a {
            color: ${BRAND};
            text-decoration: none;
            border-bottom: 1px solid ${BRAND}55;
            transition: border-color 0.2s, color 0.2s;
            font-weight: 500;
          }
          .lurph-dynamic-content a:hover { border-bottom-color: ${BRAND}; color: #fff; }

          .lurph-dynamic-content ul,
          .lurph-dynamic-content ol {
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            color: #999;
          }
          .lurph-dynamic-content li { margin-bottom: 0.5rem; }
          .lurph-dynamic-content li::marker { color: ${BRAND}; }

          .lurph-dynamic-content blockquote {
            border-left: 3px solid ${BRAND};
            margin: 2.5rem 0;
            padding: 1.25rem 1.75rem;
            background: #0d0d0d;
            border-radius: 0 0.75rem 0.75rem 0;
            font-style: italic;
            color: #777;
          }

          .lurph-dynamic-content img {
            border-radius: 1rem;
            max-width: 100%;
            height: auto;
            margin: 2.5rem 0;
            border: 1px solid #1a1a1a;
            box-shadow: 0 20px 60px -15px rgba(0,0,0,0.7);
          }

          .lurph-dynamic-content hr {
            border: none;
            border-top: 1px solid #1a1a1a;
            margin: 3rem 0;
          }

          .lurph-dynamic-content pre {
            background: #0d0d0d;
            border: 1px solid #1e1e1e;
            padding: 1.5rem;
            border-radius: 0.75rem;
            overflow-x: auto;
            margin: 2rem 0;
          }
          .lurph-dynamic-content code {
            background: rgba(255, 214, 0, 0.08);
            color: ${BRAND};
            padding: 0.2em 0.45em;
            border-radius: 0.3rem;
            font-size: 0.87em;
            font-family: ui-monospace, 'Fira Code', monospace;
          }
          .lurph-dynamic-content pre code {
            background: transparent;
            color: #c0c0c0;
            padding: 0;
          }

          .lurph-dynamic-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 2rem 0;
            font-size: 0.95rem;
          }
          .lurph-dynamic-content th {
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 2px solid ${BRAND}44;
            color: ${BRAND};
            font-family: ui-sans-serif, sans-serif;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
          }
          .lurph-dynamic-content td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #1a1a1a;
            color: #888;
          }
          .lurph-dynamic-content tr:hover td { background: #0d0d0d; }

          .lurph-dynamic-content strong { color: #ddd; font-weight: 700; }
          .lurph-dynamic-content em { color: #888; }
        `,
      }} />
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function LurphDynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPage = async () => {
      // 1. Cache hit
      if (pageCache[slug]) {
        setPage(pageCache[slug]);
        applyMeta(pageCache[slug]);
        setLoading(false);
        return;
      }

      // 2. Reset
      setLoading(true);
      setPage(null);
      setError(false);

      try {
        const res = await fetch(`${API_BASE}/${slug}`, {
          signal: abortController.signal,
          headers: { "x-site-id": SITE_ID },
        });
        const result = await res.json();

        if (result.success && result.data) {
          pageCache[slug] = result.data;
          setPage(result.data);
          applyMeta(result.data);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("LurphDynamicPage fetch error:", err);
        setError(true);
        setLoading(false);
      }
    };

    if (slug) fetchPage();

    return () => {
      abortController.abort();
      document.title = "Lurph";
    };
  }, [slug]);

  const applyMeta = (data) => {
    document.title = data.metaTitle || data.title || "Lurph";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = data.metaDescription || "";
  };

  return (
    <div
      style={{ background: "#080808", minHeight: "100vh" }}
      className="relative"
    >
      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Brand accent top bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-50"
        style={{ background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton">
              <SkeletonLoader />
            </motion.div>
          ) : error || !page ? (
            <motion.div key="error">
              <NotFound slug={slug} />
            </motion.div>
          ) : (
            <motion.div key={slug}>
              <PageContent page={page} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}