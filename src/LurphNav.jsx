import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { useCMS } from "../hooks/useCMS"; // Adjust path to your hook
import logo from "/lurph.png"; // Adjust path to your logo

const BRAND_YELLOW = "#FFD600";

// Helper to map icons based on titles from your CMS
const getIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("complex") || t.includes("screenshot") || t.includes("master"))
    return <Box size={18} />;
  if (t.includes("web") || t.includes("docify")) return <Globe size={18} />;
  if (t.includes("integration") || t.includes("vidsum"))
    return <Layers size={18} />;
  if (t.includes("workflow") || t.includes("frame") || t.includes("wireframe"))
    return <LayoutGrid size={18} />;
  if (t.includes("eng") || t.includes("automation"))
    return <Zap size={18} className="text-orange-500" />;
  if (t.includes("startup") || t.includes("rocket"))
    return <Rocket size={18} className="text-cyan-400" />;
  if (t.includes("infra")) return <Cpu size={18} className="text-yellow-500" />;
  if (t.includes("data"))
    return <Database size={18} className="text-blue-400" />;
  if (t.includes("revenue") || t.includes("currency"))
    return <BarChart3 size={18} className="text-blue-500" />;
  if (t.includes("app") || t.includes("mobile"))
    return <Smartphone size={18} />;
  return <LayoutGrid size={18} />;
};

const MegaMenu = ({ menuData }) => {
  // We extract categories like "Chrome", "Figma", "Shopify" from the nested CMS object
  const sections = Object.entries(menuData || {})
    .filter(([key, value]) => key !== "url" && typeof value === "object")
    .map(([key, value]) => ({ ...value, key, title: value.title || key }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      // w-max makes the card grow horizontally based on column count
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-max max-w-[95vw] bg-[#0A0A0A] border border-white/10 rounded-[28px] shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-[1000] p-10 flex gap-12"
    >
      {sections.map((section) => (
        <div key={section.key} className="min-w-[200px] flex-shrink-0">
          {/* Section Header (e.g., CHROME, FIGMA) */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 font-syne">
              {section.title}
            </span>
            {/* Show "NEW" badge if specified in data or for specific sections */}
            {(section.title.toLowerCase().includes("industries") ||
              section.isNew) && (
              <span className="bg-[#19CCCC] text-black text-[9px] font-black px-1.5 py-0.5 rounded-[4px] uppercase">
                NEW
              </span>
            )}
          </div>

          {/* Vertical List of Items */}
          <div className="flex flex-col gap-6">
            {section.items?.map((item, i) => (
              <a
                key={i}
                href={item.url || "#"}
                className="group flex items-center gap-4 outline-none no-underline"
              >
                {/* Icon Container */}
                <div className="w-11 h-11 rounded-full bg-zinc-900/50 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-[#FFD600]/40 group-hover:bg-[#FFD600]/10 group-hover:scale-110">
                  <div className="text-zinc-500 group-hover:text-[#FFD600] transition-colors">
                    {getIcon(item.title)}
                  </div>
                </div>
                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-white group-hover:text-[#FFD600] transition-colors leading-tight">
                    {item.title}
                  </span>
                  {item.desc && (
                    <span className="text-[12px] text-zinc-500 font-medium mt-1 group-hover:text-zinc-400">
                      {item.desc}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default function LurphNavbar() {
  const { data, isLoading } = useCMS(); // Using your hook here
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // header keys are "Labs", "Products", etc.
  const menuKeys = data?.header ? Object.keys(data.header) : [];

  return (
    <div className="fixed top-0 inset-x-0 z-[1000] flex justify-center px-4 pt-6 pointer-events-none">
      <motion.nav
        onMouseLeave={() => setHoveredMenu(null)}
        className={`w-full max-w-5xl rounded-full flex items-center justify-between px-6 py-2.5 border transition-all duration-500 pointer-events-auto ${
          scrolled || hoveredMenu
            ? "bg-black/80 backdrop-blur-2xl border-white/10 shadow-2xl"
            : "bg-white/5 backdrop-blur-md border-white/5"
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} className="w-8 h-8 object-contain" alt="Lurph" />
          <span className="text-xl font-bold tracking-tighter text-white font-syne">
            Lurph<span className="text-[#FFD600]">.</span>
          </span>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {isLoading ? (
            <div className="flex gap-4 px-4">
              <div className="h-4 w-16 bg-white/5 animate-pulse rounded-full" />
              <div className="h-4 w-16 bg-white/5 animate-pulse rounded-full" />
            </div>
          ) : (
            menuKeys.map((key) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setHoveredMenu(key)}
              >
                <button
                  className={`px-4 py-2 text-sm font-bold flex items-center gap-1.5 transition-all rounded-full hover:bg-white/5 ${
                    hoveredMenu === key
                      ? `text-[${BRAND_YELLOW}]`
                      : "text-white/60 hover:text-white"
                  }`}
                  style={{ color: hoveredMenu === key ? BRAND_YELLOW : "" }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${hoveredMenu === key ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {hoveredMenu === key && (
                    <MegaMenu menuData={data.header[key]} />
                  )}
                </AnimatePresence>
              </div>
            ))
          )}

          <Link
            to="/blog"
            className={`px-4 py-2 text-sm font-bold rounded-full hover:bg-white/5 transition-all ${
              location.pathname.startsWith("/blog")
                ? `text-[${BRAND_YELLOW}]`
                : "text-white/60 hover:text-white"
            }`}
            style={{
              color: location.pathname.startsWith("/blog") ? BRAND_YELLOW : "",
            }}
          >
            Blog
          </Link>
        </div>

        {/* CTA Button */}
        <motion.a
          href="https://auth.explified.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#FFD600] text-black px-6 py-2.5 rounded-full text-[13px] font-black font-syne flex items-center gap-2 shadow-[0_10px_20px_rgba(255,214,0,0.2)]"
        >
          Try Lurph <ArrowRight size={16} />
        </motion.a>
      </motion.nav>
    </div>
  );
}
