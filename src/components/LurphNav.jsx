import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // keep as-is per original
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Box,
  Zap,
  Layers,
  Cpu,
  Database,
  BarChart3,
  Globe,
  LayoutGrid,
  Rocket,
  Smartphone,
  Lock,
} from "lucide-react";
import { useCMS } from "../../hooks/useCMS.jsx";
import logo from "../../lurph.png";

const BRAND_YELLOW = "#FFD600";
const MAX_COLS = 5;

// ─── ICON RESOLVER ───────────────────────────────────────────────────────────
const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("complex") || t.includes("screenshot") || t.includes("master"))
    return <Box size={15} />;
  if (t.includes("web") || t.includes("docify")) return <Globe size={15} />;
  if (t.includes("integration") || t.includes("vidsum"))
    return <Layers size={15} />;
  if (t.includes("workflow") || t.includes("frame") || t.includes("wireframe"))
    return <LayoutGrid size={15} />;
  if (t.includes("eng") || t.includes("automation")) return <Zap size={15} />;
  if (t.includes("startup") || t.includes("rocket"))
    return <Rocket size={15} />;
  if (t.includes("infra")) return <Cpu size={15} />;
  if (t.includes("data")) return <Database size={15} />;
  if (t.includes("revenue") || t.includes("currency"))
    return <BarChart3 size={15} />;
  if (t.includes("app") || t.includes("mobile"))
    return <Smartphone size={15} />;
  return <LayoutGrid size={15} />;
};

// ─── MEGA MENU ───────────────────────────────────────────────────────────────
const MegaMenu = ({ menuData }) => {
  const sections = Object.entries(menuData || {})
    .filter(([key, value]) => key !== "url" && typeof value === "object")
    .map(([key, value]) => ({ ...value, key, title: value.title || key }));

  const rows = [];
  for (let i = 0; i < sections.length; i += MAX_COLS) {
    rows.push(sections.slice(i, i + MAX_COLS));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.985 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="lurph-megamenu absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max max-w-[92vw] z-[1000]"
      style={{
        background: "#0e0e0f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "20px",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)",
        maxHeight: "70vh",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "22px 26px 0 26px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>{`
        .lurph-megamenu::-webkit-scrollbar { display: none; }
        @keyframes lurphPulse {
          0%,100% { opacity: 0.2; transform: scale(0.8); }
          50%      { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>

      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {rowIndex > 0 && (
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.055) 15%, rgba(255,255,255,0.055) 85%, transparent 100%)",
                margin: "18px -26px",
              }}
            />
          )}

          <div style={{ display: "flex" }}>
            {row.map((section, colIndex) => (
              <React.Fragment key={section.key}>
                {colIndex > 0 && (
                  <div
                    style={{
                      width: "1px",
                      alignSelf: "stretch",
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0.05) 80%, transparent 100%)",
                      margin: "0 22px",
                      flexShrink: 0,
                    }}
                  />
                )}

                <div style={{ minWidth: "168px", paddingBottom: "22px" }}>
                  {/* Section label */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.16)",
                      }}
                    >
                      {section.title}
                    </span>
                    {(section.title.toLowerCase().includes("industries") ||
                      section.isNew) && (
                      <span
                        style={{
                          background: "#19CCCC",
                          color: "#000",
                          fontSize: "7px",
                          fontWeight: 900,
                          padding: "2px 5px",
                          borderRadius: "3px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Items */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    {section.items?.map((item, i) => {
                      const href = item.url || "#";
                      // Show lock icon badge for any item whose title includes "workflow"
                      const isWorkflow = item.title
                        ?.toLowerCase()
                        .includes("workflow");

                      return (
                        <a
                          key={i}
                          href={href}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "9px",
                            padding: "5px 8px",
                            margin: "0 -8px",
                            borderRadius: "9px",
                            textDecoration: "none",
                            transition: "background 0.12s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(255,255,255,0.04)";
                            const icon =
                              e.currentTarget.querySelector(".lm-icon");
                            if (icon) {
                              icon.style.borderColor = "rgba(255,214,0,0.25)";
                              icon.style.color = "#FFD600";
                            }
                            const title =
                              e.currentTarget.querySelector(".lm-title");
                            if (title)
                              title.style.color = "rgba(255,255,255,0.92)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            const icon =
                              e.currentTarget.querySelector(".lm-icon");
                            if (icon) {
                              icon.style.borderColor = "rgba(255,255,255,0.06)";
                              icon.style.color = "rgba(255,255,255,0.28)";
                            }
                            const title =
                              e.currentTarget.querySelector(".lm-title");
                            if (title)
                              title.style.color = "rgba(255,255,255,0.62)";
                          }}
                        >
                          <div
                            className="lm-icon"
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "7px",
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.06)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              color: "rgba(255,255,255,0.28)",
                              transition:
                                "border-color 0.12s ease, color 0.12s ease",
                            }}
                          >
                            {getIcon(item.title)}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              minWidth: 0,
                            }}
                          >
                            {/* Title row — lock badge only for workflow items */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <span
                                className="lm-title"
                                style={{
                                  fontSize: "12.5px",
                                  fontWeight: 550,
                                  color: "rgba(255,255,255,0.62)",
                                  lineHeight: 1.25,
                                  transition: "color 0.12s ease",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.title}
                              </span>
                              {isWorkflow && (
                                <Lock
                                  size={10}
                                  style={{
                                    color: "rgba(255,214,0,0.55)",
                                    flexShrink: 0,
                                    marginTop: "1px",
                                  }}
                                />
                              )}
                            </div>
                            {item.desc && (
                              <span
                                style={{
                                  fontSize: "10px",
                                  color: "rgba(255,255,255,0.2)",
                                  marginTop: "1px",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {item.desc}
                              </span>
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </React.Fragment>
      ))}

      {/* Sticky bottom fade + scroll hint dots */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          height: "48px",
          marginTop: "-48px",
          pointerEvents: "none",
          background: "linear-gradient(to top, #0e0e0f 35%, transparent 100%)",
          borderRadius: "0 0 20px 20px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "11px",
          gap: "5px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "rgba(255,214,0,0.45)",
              animation: `lurphPulse 1.6s ease-in-out ${i * 0.22}s infinite`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── MAIN NAVBAR ─────────────────────────────────────────────────────────────
export default function LurphNavbar() {
  const { data, isLoading } = useCMS();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();
   const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuKeys = data?.header ? Object.keys(data.header) : [];

  const handleCategoryClick = (menuKey) => {
    const categoryUrl = data?.header?.[menuKey]?.url;
    if (!categoryUrl) return;
    window.location.href = categoryUrl;
  };

  return (
    <div className="fixed top-0 inset-x-0 z-[1000] flex justify-center px-4 pt-6 pointer-events-none">
      <motion.nav
        onMouseLeave={() => setHoveredMenu(null)}
        className="w-full max-w-5xl rounded-full flex items-center justify-between px-6 py-2.5 border transition-all duration-500 pointer-events-auto"
        style={{
          background:
            scrolled || hoveredMenu
              ? "rgba(0,0,0,0.85)"
              : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderColor:
            scrolled || hoveredMenu
              ? "rgba(255,255,255,0.09)"
              : "rgba(255,255,255,0.04)",
          boxShadow:
            scrolled || hoveredMenu ? "0 24px 48px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8 object-contain" alt="Lurph" />
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <Link to="/" className="group" style={{ textDecoration: "none" }}>
              <span
                className="text-xl font-bold tracking-tighter text-white"
                style={{
                  fontFamily: "var(--font-syne, inherit)",
                  lineHeight: 1,
                }}
              >
                Lurph<span style={{ color: BRAND_YELLOW }}>.</span>
              </span>
            </Link>
            <a
              href="https://explified.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "9.5px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.38)",
                textDecoration: "none",
                letterSpacing: "0.04em",
                lineHeight: 1,
                transition: "color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
              }
            >
              by Explified
            </a>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {isLoading ? (
            <div className="flex gap-4 px-4">
              <div className="h-4 w-16 bg-white/5 animate-pulse rounded-full" />
              <div className="h-4 w-16 bg-white/5 animate-pulse rounded-full" />
            </div>
          ) : (
            menuKeys.map((key) => {
              const isWorkflowsKey = key.toLowerCase() === "workflows";

              // ── Workflows: plain link, no dropdown ──────────────────────
              if (isWorkflowsKey) {
                return (
                  <Link
                    key={key}
                    to="/workflows"
                    className="px-4 py-2 text-sm font-bold flex items-center gap-1.5 rounded-full hover:bg-white/5 transition-all"
                    style={{
                      color: location.pathname.startsWith("/workflows")
                        ? BRAND_YELLOW
                        : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <Lock size={12} style={{ opacity: 0.45 }} />
                  </Link>
                );
              }

              // ── All other keys: dropdown as before ───────────────────────
              const hasUrl = !!data?.header?.[key]?.url;

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(key)}
                >
                  <button
                    onClick={() => handleCategoryClick(key)}
                    className="px-4 py-2 text-sm font-bold flex items-center gap-1.5 transition-all rounded-full hover:bg-white/5"
                    style={{
                      color:
                        hoveredMenu === key
                          ? BRAND_YELLOW
                          : "rgba(255,255,255,0.55)",
                      cursor: hasUrl ? "pointer" : "default",
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <ChevronDown
                      size={13}
                      style={{
                        transition: "transform 0.3s",
                        transform:
                          hoveredMenu === key
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {hoveredMenu === key && (
                      <MegaMenu menuData={data.header[key]} />
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}

          {/* Blog link */}
          <Link
            to="/blog"
            className="px-4 py-2 text-sm font-bold rounded-full hover:bg-white/5 transition-all"
            style={{
              color: location.pathname.startsWith("/blog")
                ? BRAND_YELLOW
                : "rgba(255,255,255,0.55)",
            }}
          >
            Blog
          </Link>
        </div>

        {/* CTA */}
        <motion.a
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
          style={{
            background: BRAND_YELLOW,
            color: "#000",
            padding: "10px 22px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 900,
            fontFamily: "var(--font-syne, inherit)",
            boxShadow: "0 8px 24px rgba(255,214,0,0.22)",
            textDecoration: "none",
          }}
        >
          Get started <ArrowRight size={15} />
        </motion.a>
      </motion.nav>
    </div>
  );
}
