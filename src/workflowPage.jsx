import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView } from "framer-motion";

const Y = "#FFD600";

// ─── MINI SVG ICONS ───────────────────────────────────────────────────────────
const Ic = ({ d, size = 18, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const IZap     = (p) => <Ic {...p} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />;
const ISlack   = (p) => <Ic {...p} d={["M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z","M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z","M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z","M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z","M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z","M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z","M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z","M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"]} />;
const IGithub  = (p) => <Ic {...p} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />;
const IMail    = (p) => <Ic {...p} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","m22 7-10 7L2 7"]} />;
const IDB      = (p) => <Ic {...p} d={["M12 2C7 2 3 3.34 3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5c0-1.66-4-3-9-3z","M3 5c0 1.66 4 3 9 3s9-1.34 9-3","M3 12c0 1.66 4 3 9 3s9-1.34 9-3"]} />;
const ISearch  = (p) => <Ic {...p} d={["M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z","m21 21-4.35-4.35"]} />;
const ICheck   = (p) => <Ic {...p} d="M20 6 9 17l-5-5" />;
const IArrow   = (p) => <Ic {...p} d={["M5 12h14","m12 5 7 7-7 7"]} />;
const IClock   = (p) => <Ic {...p} d={["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z","M12 6v6l4 2"]} />;
const IFilter  = (p) => <Ic {...p} d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
const ICode    = (p) => <Ic {...p} d={["m16 18 6-6-6-6","m8 6-6 6 6 6"]} />;
const IWebhook = (p) => <Ic {...p} d="M18 16.98h-5.99c-1.1 0-1.95.68-2.23 1.61-.7 2.24-2.27 3.41-4.78 3.41-2.9 0-5-2.1-5-5s2.1-5 5-5h.6c.44-1.7 2.2-3 4.4-3 2 0 3.7 1.18 4.3 3H18c1.1 0 2 .9 2 2s-.9 2-2 2z" />;
const IGlobe   = (p) => <Ic {...p} d={["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"]} />;
const INotion  = (p) => <Ic {...p} d={["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z","M8 8h8M8 12h6M8 16h4"]} />;
const IStar    = (p) => <Ic {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
const IPlay    = (p) => <Ic {...p} fill={p.color||"currentColor"} d="M5 3l14 9-14 9V3z" />;

// ─── NODE PILL ────────────────────────────────────────────────────────────────
const NodePill = ({ icon: Icon, label, color, x, y, ports = 1, active = false, delay = 0, output = true, input = true }) => (
  <motion.div
    className="absolute select-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 22 }}
    whileHover={{ scale: 1.07, zIndex: 50 }}
  >
    {/* Input port */}
    {input && (
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-zinc-700 -left-1.5 top-1/2 -translate-y-1/2 z-10"
        style={{ background: active ? color : "#1a1a1a" }}
        animate={active ? { boxShadow: [`0 0 0px ${color}`, `0 0 8px ${color}`, `0 0 0px ${color}`] } : {}}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
    )}
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
      style={{
        background: active ? `${color}18` : "rgba(18,18,18,0.95)",
        border: `1px solid ${active ? `${color}50` : "rgba(255,255,255,0.08)"}`,
        backdropFilter: "blur(12px)",
        minWidth: 148,
      }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}22` }}>
        <Icon size={15} color={color} />
      </div>
      <div className="min-w-0">
        <p className="text-white text-xs font-bold leading-none truncate">{label}</p>
        {active && <p className="text-[9px] mt-0.5 uppercase tracking-widest" style={{ color }}>running</p>}
      </div>
    </div>
    {/* Output port */}
    {output && (
      <motion.div
        className="absolute w-3 h-3 rounded-full border-2 border-zinc-700 -right-1.5 top-1/2 -translate-y-1/2 z-10"
        style={{ background: active ? color : "#1a1a1a" }}
        animate={active ? { boxShadow: [`0 0 0px ${color}`, `0 0 8px ${color}`, `0 0 0px ${color}`] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
      />
    )}
  </motion.div>
);

// ─── SVG ANIMATED EDGE ───────────────────────────────────────────────────────
const Edge = ({ x1, y1, x2, y2, color = Y, active = false, delay = 0 }) => {
  const cx1 = x1 + (x2 - x1) * 0.5;
  const cy1 = y1;
  const cx2 = x1 + (x2 - x1) * 0.5;
  const cy2 = y2;
  const d = `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
  return (
    <g>
      {/* static dim path */}
      <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
      {active && (
        <>
          {/* glow path */}
          <path d={d} fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
          {/* traveling dot */}
          <motion.circle r="4" fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
          >
            <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${delay}s`} path={d} />
          </motion.circle>
        </>
      )}
    </g>
  );
};

// ─── CANVAS HERO ─────────────────────────────────────────────────────────────
const WorkflowCanvas = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 2400); return () => clearInterval(t); }, []);
  const activeIdx = tick % 6;

  // Node layout — absolute positions inside a 900×420 canvas
  const nodes = [
    { icon: IClock,   label: "Scheduler",    color: "#a78bfa", x: 30,  y: 180, input: false, output: true,  delay: 0   },
    { icon: IWebhook, label: "Webhook",       color: "#38bdf8", x: 30,  y: 280, input: false, output: true,  delay: 0.1 },
    { icon: IMail,    label: "Gmail Trigger", color: "#f87171", x: 220, y: 140, input: true,  output: true,  delay: 0.2 },
    { icon: IFilter,  label: "IF / Filter",   color: Y,         x: 220, y: 260, input: true,  output: true,  delay: 0.3 },
    { icon: ICode,    label: "JS Function",   color: "#4ade80", x: 420, y: 180, input: true,  output: true,  delay: 0.4 },
    { icon: IDB,      label: "Postgres",      color: "#60a5fa", x: 420, y: 300, input: true,  output: true,  delay: 0.5 },
    { icon: ISlack,   label: "Slack Notify",  color: "#818cf8", x: 630, y: 140, input: true,  output: true,  delay: 0.6 },
    { icon: IMail,    label: "Send Email",    color: "#f87171", x: 630, y: 270, input: true,  output: false, delay: 0.7 },
    { icon: IGithub,  label: "GitHub PR",     color: "#d4d4d4", x: 630, y: 370, input: true,  output: false, delay: 0.8 },
  ];

  // Edges: [from port x, from port y, to port x, to port y]
  const edges = [
    { x1: 192, y1: 199, x2: 220,  y2: 159, color: "#a78bfa" },
    { x1: 192, y1: 199, x2: 220,  y2: 279, color: "#a78bfa" },
    { x1: 192, y1: 299, x2: 220,  y2: 279, color: "#38bdf8" },
    { x1: 381, y1: 159, x2: 420,  y2: 199, color: "#f87171" },
    { x1: 381, y1: 279, x2: 420,  y2: 319, color: Y         },
    { x1: 581, y1: 199, x2: 630,  y2: 159, color: "#4ade80" },
    { x1: 581, y1: 199, x2: 630,  y2: 289, color: "#4ade80" },
    { x1: 581, y1: 319, x2: 630,  y2: 389, color: "#60a5fa" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem]" style={{ height: 420, background: "rgba(8,8,8,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}>
      {/* dot-grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px"
      }} />
      {/* edge glow center */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,214,0,0.04), transparent)" }} />

      {/* SVG edges */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        {edges.map((e, i) => (
          <Edge key={i} {...e} active={activeIdx >= i * 0.5} delay={i * 0.15} />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <NodePill key={i} {...n} active={activeIdx % nodes.length === i} />
      ))}

      {/* Top bar — n8n-style chrome */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: Y }}>
            <span className="text-[9px] font-black text-black">L</span>
          </div>
          <span className="text-zinc-400 text-xs font-bold">Lurph Canvas</span>
          <span className="text-zinc-700 text-xs mx-1">/</span>
          <span className="text-zinc-600 text-xs">New workflow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-zinc-600">Live · 3 active runs</span>
          <div className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer" style={{ background: Y }}>
            <IPlay size={10} color="#000" />
            <span className="text-[11px] font-black text-black">Execute</span>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 px-5 py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.4)" }}>
        {["9 nodes","3 triggers","4 executions today","~120ms avg"].map(s => (
          <span key={s} className="text-[10px] text-zinc-700">{s}</span>
        ))}
      </div>
    </div>
  );
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 30); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300"
      style={{ background: sc ? "rgba(5,5,5,0.95)" : "transparent", backdropFilter: sc ? "blur(20px)" : "none", borderBottom: sc ? "1px solid rgba(255,214,0,0.1)" : "none" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: Y }}>
          <span className="text-black font-black text-xs">L</span>
        </div>
        <span className="text-white font-black text-lg tracking-tight">Lurph</span>
        <span className="ml-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide text-black" style={{ background: Y }}>Workflows</span>
      </motion.div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        {["Canvas","Templates","Nodes","Docs"].map(l => <a key={l} href="#" className="text-zinc-600 hover:text-white transition-colors">{l}</a>)}
      </div>
      <div className="flex items-center gap-3">
        <button className="text-zinc-500 hover:text-white text-sm transition-colors">Sign in</button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="px-5 py-2 rounded-xl font-bold text-black text-sm" style={{ background: Y }}>
          Try Free
        </motion.button>
      </div>
    </motion.nav>
  );
};

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────
const Hero = () => {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }); const sy = useSpring(my, { stiffness: 50, damping: 20 });
  const onMove = useCallback(e => { mx.set((e.clientX / window.innerWidth - 0.5) * 30); my.set((e.clientY / window.innerHeight - 0.5) * 30); }, []);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden" onMouseMove={onMove}>
      {/* BG glow */}
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[200px]" style={{ background: `${Y}0d` }} />
      </motion.div>
      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.35em]" style={{ background: `${Y}10`, color: Y, border: `1px solid ${Y}28` }}>
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: Y }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            Visual Workflow Automation
          </div>
        </motion.div>

        {/* headline */}
        <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-center text-[clamp(2.8rem,8vw,8rem)] font-black text-white tracking-tighter leading-none mb-6">
          Build workflows<br />
          <span style={{ color: Y }}>visually.</span>{" "}
          <span className="text-zinc-700">Deploy</span><br />
          <span className="text-zinc-700">instantly.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
          className="text-center text-zinc-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Lurph's node-based workflow engine lets you connect any app, add AI logic, and automate complex processes — all on a live canvas. No vendor lock-in. Full control.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-4 mb-16">
          <motion.button whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${Y}40` }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black text-black text-base" style={{ background: Y }}>
            <IPlay size={16} color="#000" /> Open Canvas
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-white text-base border border-white/10 hover:border-white/20 transition-colors">
            <ISearch size={16} color="currentColor" /> Browse Templates
          </motion.button>
        </motion.div>

        {/* Canvas */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <WorkflowCanvas />
        </motion.div>
      </div>
    </section>
  );
};

// ─── SECTION 2: NODE TYPES ────────────────────────────────────────────────────
const nodeTypes = [
  { icon: IClock,   label: "Triggers",     color: "#a78bfa", desc: "Schedule, webhook, event — 40+ ways to start a workflow automatically." },
  { icon: IFilter,  label: "Logic",        color: Y,         desc: "IF / Switch / Merge / Loop — full conditional branching without code." },
  { icon: ICode,    label: "Code",         color: "#4ade80", desc: "Run JavaScript or Python inline. Full access to all node data." },
  { icon: IDB,      label: "Data",         color: "#60a5fa", desc: "Read, write, query — Postgres, MySQL, Redis, MongoDB, S3 and more." },
  { icon: IGlobe,   label: "HTTP / API",   color: "#f97316", desc: "Call any REST or GraphQL endpoint with full auth support." },
  { icon: IZap,     label: "AI Nodes",     color: "#e879f9", desc: "LLM calls, embeddings, RAG chains, agents — built into the canvas." },
];

const NodeTypeCard = ({ icon: Icon, label, color, desc, delay }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
    whileHover={{ y: -6 }} className="group p-6 rounded-3xl cursor-default"
    style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.05)" }}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={18} color={color} />
      </div>
      <span className="text-white font-bold text-sm">{label}</span>
    </div>
    <p className="text-zinc-600 text-sm leading-relaxed">{desc}</p>
    <div className="mt-4 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
      Browse nodes <IArrow size={12} color={color} />
    </div>
  </motion.div>
);

const NodeTypesSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: Y }}>Node Library</p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
          Every node type<br /><span className="text-zinc-700">you'll ever need.</span>
        </h2>
        <p className="text-zinc-500 mt-4 max-w-lg mx-auto">400+ pre-built nodes. Write custom ones in minutes. Each node shows inputs and outputs live as you build.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {nodeTypes.map((n, i) => <NodeTypeCard key={i} {...n} delay={i * 0.07} />)}
      </div>
    </div>
  </section>
);

// ─── SECTION 3: WORKFLOW TEMPLATES ───────────────────────────────────────────
const templates = [
  { title: "Slack → GitHub Issue",    desc: "React to a Slack message and auto-create a GitHub issue with labels.", tags: ["Slack","GitHub","Trigger"], color: "#818cf8", runs: "12.4k" },
  { title: "AI Email Triage",         desc: "Classify incoming Gmail threads by urgency using GPT-4, then route to Notion.", tags: ["Gmail","AI","Notion"],  color: "#e879f9", runs: "8.1k"  },
  { title: "Scheduled DB Backup",     desc: "Every night: dump Postgres → compress → upload to S3 → notify on Slack.", tags: ["Postgres","S3","Cron"],  color: "#60a5fa", runs: "21k"   },
  { title: "Lead Enrichment",         desc: "New HubSpot contact → enrich with Clearbit → score → assign to rep.", tags: ["HubSpot","API","Filter"],color: Y,         runs: "5.7k"  },
  { title: "PR Review Reminder",      desc: "If a GitHub PR has no review after 24h, ping the team in Slack.", tags: ["GitHub","Slack","Cron"],  color: "#4ade80", runs: "9.3k"  },
  { title: "Invoice Processor",       desc: "Parse PDF invoices with AI, extract line items, push to Airtable.", tags: ["Email","AI","Airtable"],  color: "#f87171", runs: "3.2k"  },
];

const TemplateCard = ({ title, desc, tags, color, runs, delay }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
    whileHover={{ y: -6 }} className="group p-6 rounded-3xl cursor-pointer relative overflow-hidden"
    style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.05)" }}>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
      style={{ background: `radial-gradient(circle at 0% 0%, ${color}0a, transparent 60%)` }} />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-bold text-sm leading-snug pr-4">{title}</h3>
        <span className="text-[9px] font-black text-zinc-600 flex-shrink-0">{runs} runs</span>
      </div>
      <p className="text-zinc-600 text-xs leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ background: `${color}15`, color }}>
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-zinc-700 group-hover:text-white transition-colors">
        Use template <IArrow size={11} color="currentColor" />
      </div>
    </div>
  </motion.div>
);

const TemplatesSection = () => (
  <section className="py-32 px-6" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,214,0,0.015), transparent)" }}>
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: Y }}>Templates</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
            Start from a<br /><span className="text-zinc-700">template.</span>
          </h2>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors">
          Browse all 400+ templates <IArrow size={14} color="currentColor" />
        </button>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((t, i) => <TemplateCard key={i} {...t} delay={i * 0.07} />)}
      </div>
    </div>
  </section>
);

// ─── SECTION 4: EXECUTION LIVE FEED ──────────────────────────────────────────
const executions = [
  { name: "Slack → GitHub Issue",  status: "success", ms: 142,  time: "2s ago" },
  { name: "AI Email Triage",       status: "running", ms: null,  time: "now"    },
  { name: "DB Backup Cron",        status: "success", ms: 3241,  time: "6m ago" },
  { name: "Lead Enrichment",       status: "error",   ms: null,  time: "12m ago"},
  { name: "PR Review Reminder",    status: "success", ms: 89,    time: "18m ago"},
  { name: "Invoice Processor",     status: "success", ms: 2100,  time: "1h ago" },
];

const statusConfig = { success: { color: "#4ade80", label: "Success" }, running: { color: Y, label: "Running" }, error: { color: "#f87171", label: "Error" } };

const ExecutionRow = ({ name, status, ms, time, delay }) => {
  const { color, label } = statusConfig[status];
  return (
    <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }}
      className="flex items-center justify-between py-3 border-b border-white/4">
      <div className="flex items-center gap-3">
        <motion.div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }}
          animate={status === "running" ? { opacity: [1, 0.3, 1] } : {}} transition={{ duration: 1.2, repeat: Infinity }} />
        <span className="text-zinc-300 text-sm font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: `${color}14`, color }}>{label}</span>
        <span className="text-zinc-700 text-xs w-14 text-right">{ms ? `${ms}ms` : "—"}</span>
        <span className="text-zinc-700 text-xs w-14 text-right">{time}</span>
      </div>
    </motion.div>
  );
};

const ExecutionSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: Y }}>Live Execution</p>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
          Watch every run<br /><span className="text-zinc-700">in real-time.</span>
        </h2>
        <p className="text-zinc-500 leading-relaxed mb-8">Every workflow execution is logged end-to-end. Inspect inputs, outputs, and timing for every single node. Debug in seconds, not hours.</p>
        <div className="grid grid-cols-2 gap-4">
          {[["< 200ms","Median latency"],["99.9%","Execution uptime"],["Full logs","Per node"],["Replay","Any run"]].map(([v,l]) => (
            <div key={l} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-black text-lg" style={{ color: Y }}>{v}</p>
              <p className="text-zinc-600 text-xs mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="rounded-3xl overflow-hidden" style={{ background: "rgba(8,8,8,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-white text-sm font-bold">Executions</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-600 text-xs">Live</span>
          </div>
        </div>
        <div className="px-6 pb-4">
          {executions.map((e, i) => <ExecutionRow key={i} {...e} delay={i * 0.08} />)}
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── SECTION 5: CODE + VISUAL ─────────────────────────────────────────────────
const CodeSection = () => {
  const ref = useRef(null); const inView = useInView(ref, { once: true });
  const codeLines = [
    { t: "comment", v: "// Custom node logic — runs inside the workflow" },
    { t: "code",    v: "const items = $input.all();" },
    { t: "code",    v: "" },
    { t: "comment", v: "// Filter and transform data inline" },
    { t: "code",    v: "return items" },
    { t: "code",    v: "  .filter(i => i.json.status === 'active')" },
    { t: "code",    v: "  .map(i => ({" },
    { t: "code",    v: "    json: {" },
    { t: "key",     v: "      id: i.json.id," },
    { t: "key",     v: "      score: i.json.value * 1.15" },
    { t: "code",    v: "    }" },
    { t: "code",    v: "  }));" },
  ];
  return (
    <section ref={ref} className="py-32 px-6" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,214,0,0.01), transparent)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Code block */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}
          className="rounded-3xl overflow-hidden" style={{ background: "rgba(6,6,6,0.98)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "monospace" }}>
          <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {["#f87171","#fbbf24","#4ade80"].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }} />)}
            <span className="text-zinc-600 text-xs ml-2 font-mono">function_node.js</span>
          </div>
          <div className="p-6 space-y-1">
            {codeLines.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center gap-4">
                <span className="text-zinc-700 text-xs w-5 text-right select-none">{l.v ? i + 1 : ""}</span>
                <span className="text-sm" style={{ color: l.t === "comment" ? "#4a5568" : l.t === "key" ? Y : "#a1a1aa" }}>{l.v}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
          <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: Y }}>Code When You Need It</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
            Visual <span style={{ color: Y }}>and</span><br />code. Together.
          </h2>
          <p className="text-zinc-500 leading-relaxed mb-8">Drop into a code node anywhere in your workflow. Write JavaScript or Python. See the output instantly. No context switching, no local environment.</p>
          <ul className="space-y-3">
            {["Full npm / pip package access","Node outputs visible as you type","AI autocomplete built in","Runs in an isolated sandbox"].map((item, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${Y}20` }}>
                  <ICheck size={11} color={Y} />
                </div>
                <span className="text-zinc-400 text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

// ─── SECTION 6: TESTIMONIALS ─────────────────────────────────────────────────
const testimonials = [
  { q: "Lurph's canvas feels like n8n but faster and more polished. I migrated 40 workflows in a weekend.", n: "Arjun Patel", r: "Platform Engineer", co: "Scalez" },
  { q: "Finally an automation tool where I can drop into code without losing the visual overview. The JS node is a game-changer.", n: "Maria Torres", r: "Backend Lead", co: "Infra.io" },
  { q: "Our ops team now builds their own workflows. No eng tickets. The canvas is just that intuitive.", n: "David Kim", r: "Head of Ops", co: "Runwise" },
];

const TestimonialsSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
          Builders <span style={{ color: Y }}>love</span><br />the canvas.
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }} className="p-7 rounded-3xl" style={{ background: "rgba(10,10,10,0.9)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex mb-4">{[1,2,3,4,5].map(s => <IStar key={s} size={12} color={Y} />)}</div>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">"{t.q}"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-black flex-shrink-0" style={{ background: Y }}>{t.n[0]}</div>
              <div>
                <p className="text-white text-sm font-bold leading-none">{t.n}</p>
                <p className="text-zinc-600 text-xs mt-0.5">{t.r} · {t.co}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── SECTION 7: CTA ───────────────────────────────────────────────────────────
const CTA = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  return (
    <section ref={ref} className="py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[180px] rounded-full" style={{ background: `${Y}16` }} />
      </div>
      <motion.div style={{ scale, opacity }} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.35em]"
          style={{ background: `${Y}10`, color: Y, border: `1px solid ${Y}28` }}
          animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: Y }} animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          Open Beta — Free to Start
        </motion.div>
        <h2 className="text-[clamp(3rem,11vw,10rem)] font-black text-white tracking-tighter leading-none mb-6">
          BUILD<br /><span style={{ color: Y }}>WORKFLOWS.</span>
        </h2>
        <p className="text-zinc-500 text-lg mb-12 max-w-lg mx-auto">Open the canvas. Connect your first nodes. Ship your first automation in under 10 minutes.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button whileHover={{ scale: 1.06, boxShadow: `0 24px 70px ${Y}50` }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-12 py-5 rounded-full font-black text-black text-lg" style={{ background: Y }}>
            <IPlay size={18} color="#000" /> Open the Canvas
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="px-12 py-5 rounded-full font-bold text-white text-lg border border-white/10 hover:border-white/20 transition-colors">
            View Templates
          </motion.button>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-700 text-[10px] font-black uppercase tracking-widest">
          <span>© 2025 Lurph Labs</span>
          <div className="flex gap-8">{["Docs","GitHub","Discord","Status","Privacy"].map(l => <a key={l} href="#" className="hover:text-zinc-400 transition-colors">{l}</a>)}</div>
          <span>San Francisco, CA</span>
        </div>
      </motion.div>
    </section>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function LurphWorkflows() {
  return (
    <div style={{ background: "#050505", color: "#71717a", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFD600; }
        ::selection { background: rgba(255,214,0,0.2); }
      `}</style>
 
      <Hero />
      <NodeTypesSection />
      <TemplatesSection />
      <ExecutionSection />
      <CodeSection />
      <TestimonialsSection />
      <CTA />
    </div>
  );
}