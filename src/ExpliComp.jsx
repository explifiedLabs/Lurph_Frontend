import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useInView,
} from "framer-motion";

const Y = "#FFD600";

// ─── INLINE SVG ICONS ────────────────────────────────────────────────────────
const Svg = ({ children, size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
const IZap = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);
const IGlobe = ({ size, color }) => (
  <Svg size={size} color={color}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);
const ILink = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Svg>
);
const ICpu = ({ size, color }) => (
  <Svg size={size} color={color}>
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M15 9V5a2 2 0 0 0-4 0v4M9 9H5a2 2 0 0 0 0 4h4M9 15H5a2 2 0 0 0 0 4h4M15 15h4a2 2 0 0 0 0-4h-4M15 9h4a2 2 0 0 0 0-4h-4M9 15v4a2 2 0 0 0 4 0v-4" />
  </Svg>
);
const ISearch = ({ size, color }) => (
  <Svg size={size} color={color}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </Svg>
);
const ICheck = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);
const IArrow = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
);
const ISlack = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
  </Svg>
);
const IGithub = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);
const INotion = ({ size, color }) => (
  <Svg size={size} color={color}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h4" />
  </Svg>
);
const IDrive = ({ size, color }) => (
  <Svg size={size} color={color}>
    <path d="m8.5 2 7.5 13H1L8.5 2z" />
    <path d="M15 9 22 22H8L15 9z" />
    <path d="M1 22h22" />
  </Svg>
);
const IMail = ({ size, color }) => (
  <Svg size={size} color={color}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </Svg>
);
const IDatabase = ({ size, color }) => (
  <Svg size={size} color={color}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </Svg>
);
const ICalendar = ({ size, color }) => (
  <Svg size={size} color={color}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);
const IWorkflow = ({ size, color }) => (
  <Svg size={size} color={color}>
    <rect x="3" y="3" width="5" height="5" rx="1" />
    <rect x="16" y="3" width="5" height="5" rx="1" />
    <rect x="9" y="16" width="5" height="5" rx="1" />
    <path d="M5.5 8v4a2 2 0 0 0 2 2H11" />
    <path d="M18.5 8v4a2 2 0 0 1-2 2H13" />
  </Svg>
);
const IStar = ({ size, color }) => (
  <Svg size={size} color={color}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

// ─── FLOATING PARTICLE BG ────────────────────────────────────────────────────
const ParticleBG = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    dur: Math.random() * 8 + 6,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: Y,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────
const ConnectorOrb = ({ icon: Icon, label, color, x, y, delay }) => (
  <motion.div
    className="absolute flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-xl"
    style={{ left: x, top: y, background: "rgba(15,15,15,0.85)" }}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      opacity: { duration: 0.6, delay },
      scale: { duration: 0.6, delay },
    }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{ background: `${color}22` }}
    >
      <Icon size={18} color={color} />
    </div>
    <div>
      <p className="text-white text-xs font-bold leading-none">{label}</p>
      <p className="text-zinc-600 text-[10px] mt-0.5 uppercase tracking-widest">
        connected
      </p>
    </div>
    <div
      className="w-2 h-2 rounded-full"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
  </motion.div>
);

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMove = useCallback((e) => {
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
  }, []);

  const words = ["Automate", "Connect", "Integrate", "Orchestrate"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setWordIdx((i) => (i + 1) % words.length),
      2500,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMove}
    >
      {/* BG glow */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px]"
          style={{ background: `${Y}14` }}
        />
      </motion.div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,214,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Connector orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <ConnectorOrb
          icon={ISlack}
          label="Slack"
          color="#4A154B"
          x="5%"
          y="28%"
          delay={0}
        />
        <ConnectorOrb
          icon={IGithub}
          label="GitHub"
          color="#aaaaaa"
          x="8%"
          y="58%"
          delay={0.4}
        />
        <ConnectorOrb
          icon={IDrive}
          label="Drive"
          color="#34A853"
          x="75%"
          y="24%"
          delay={0.8}
        />
        <ConnectorOrb
          icon={IMail}
          label="Gmail"
          color="#EA4335"
          x="72%"
          y="58%"
          delay={1.2}
        />
        <ConnectorOrb
          icon={INotion}
          label="Notion"
          color="#ffffff"
          x="82%"
          y="76%"
          delay={1.6}
        />
        <ConnectorOrb
          icon={ICalendar}
          label="Calendar"
          color="#4285F4"
          x="3%"
          y="76%"
          delay={2.0}
        />
      </div>

      {/* Core orb */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{
            background: "rgba(255,214,0,0.08)",
            color: Y,
            borderColor: `${Y}30`,
          }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: Y }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Workflow Automation · AI Native · 150+ Connectors
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-[clamp(3rem,10vw,9rem)] font-black text-white tracking-tighter leading-none mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              style={{ color: Y, display: "block" }}
            >
              {words[wordIdx]}
            </motion.span>
          </AnimatePresence>
          <span className="text-zinc-200">Everything.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl text-zinc-500 text-lg leading-relaxed mb-10 font-medium"
        >
          Lurph is the AI-native workflow engine that connects your tools,
          automates your processes, and unlocks intelligence across your entire
          stack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 20px 60px ${Y}40` }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-2xl font-black text-black text-lg transition-all"
            style={{ background: Y }}
          >
            Start Automating Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.06)" }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 rounded-2xl font-bold text-white text-lg border border-white/10 transition-all"
          >
            Watch Demo →
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-10 mt-14"
        >
          {[
            ["150+", "Integrations"],
            ["10M+", "Workflows run"],
            ["99.9%", "Uptime SLA"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-black" style={{ color: Y }}>
                {n}
              </p>
              <p className="text-zinc-600 text-xs font-medium uppercase tracking-widest mt-1">
                {l}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-zinc-700 text-[10px] uppercase tracking-widest">
          Scroll
        </span>
        <div
          className="w-px h-12 rounded-full"
          style={{
            background: `linear-gradient(to bottom, ${Y}80, transparent)`,
          }}
        />
      </motion.div>
    </section>
  );
};

// ─── SECTION 2: HOW IT WORKS ──────────────────────────────────────────────────
const StepCard = ({ num, title, desc, icon: Icon, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ x: 8 }}
    className="flex gap-6 p-6 rounded-3xl cursor-pointer transition-all duration-300"
    style={{
      background: isActive ? "rgba(255,214,0,0.06)" : "transparent",
      border: isActive ? `1px solid ${Y}30` : "1px solid transparent",
    }}
  >
    <div
      className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
      style={{ background: isActive ? Y : "rgba(255,255,255,0.05)" }}
    >
      <Icon size={22} color={isActive ? "#000" : "#555"} />
    </div>
    <div>
      <p
        className="text-[10px] font-black uppercase tracking-widest mb-1"
        style={{ color: isActive ? Y : "#444" }}
      >
        Step {num}
      </p>
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-zinc-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const steps = [
    {
      icon: ILink,
      title: "Connect Your Stack",
      desc: "One-click OAuth connections to Slack, GitHub, Notion, Gmail, and 146 more tools. No code, no config files.",
    },
    {
      icon: ISearch,
      title: "Define Your Trigger",
      desc: "Pick the event that starts your workflow — a new message, a commit, a form submission, or a scheduled time.",
    },
    {
      icon: IWorkflow,
      title: "Build with AI",
      desc: "Describe what you want in plain language. Lurph's AI drafts the workflow, maps the data, and handles edge cases.",
    },
    {
      icon: IZap,
      title: "Deploy & Scale",
      desc: "Publish instantly. Your automations run in Lurph's serverless cloud — no infra, unlimited scale.",
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
            style={{ color: Y }}
          >
            How Lurph Works
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Four steps to
            <br />
            <span className="text-zinc-700">total automation.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div className="space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <StepCard
                  {...s}
                  num={i + 1}
                  isActive={active === i}
                  onClick={() => setActive(i)}
                />
              </motion.div>
            ))}
          </div>

          {/* Visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="relative rounded-[3rem] overflow-hidden p-8"
            style={{
              background: "rgba(10,10,10,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: 400,
            }}
          >
            {/* Animated connection lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.3 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.line
                  key={i}
                  x1="0"
                  y1={`${i * 25}%`}
                  x2="100%"
                  y2={`${i * 25 + 10}%`}
                  stroke={Y}
                  strokeWidth="0.5"
                  strokeDasharray="6 6"
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.4,
                  }}
                />
              ))}
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* Step visual */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: Y }}
                  >
                    {(() => {
                      const I = steps[active].icon;
                      return <I size={20} color="#000" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {steps[active].title}
                    </p>
                    <p className="text-zinc-600 text-xs">
                      Step {active + 1} of 4
                    </p>
                  </div>
                </div>

                {/* Mock workflow lines */}
                <div className="space-y-3">
                  {[
                    "Trigger received",
                    "Parsing context...",
                    "Executing action",
                    "Delivering output",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background:
                          i === active % 4
                            ? `${Y}12`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${i === active % 4 ? `${Y}30` : "rgba(255,255,255,0.04)"}`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: i === active % 4 ? Y : "#333" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: i === active % 4 ? Y : "#555" }}
                      >
                        {item}
                      </span>
                      {i < active % 4 && <ICheck size={14} color="#22c55e" />}
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div
                  className="mt-6 h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: Y, width: `${(active + 1) * 25}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 3: INTEGRATIONS ──────────────────────────────────────────────────
const IntegrationCard = ({ icon: Icon, name, color, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col items-center gap-3 p-6 rounded-3xl cursor-pointer transition-all"
      style={{
        background: hovered ? `${color}10` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `${color}40` : "rgba(255,255,255,0.05)"}`,
      }}
    >
      <Icon size={36} color={hovered ? color : "#444"} />
      <span
        className="text-xs font-bold tracking-wide"
        style={{ color: hovered ? color : "#555" }}
      >
        {name}
      </span>
    </motion.div>
  );
};

const IntegrationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const integrations = [
    { icon: ISlack, name: "Slack", color: "#4A154B" },
    { icon: IGithub, name: "GitHub", color: "#aaaaaa" },
    { icon: IDrive, name: "Drive", color: "#34A853" },
    { icon: IMail, name: "Gmail", color: "#EA4335" },
    { icon: INotion, name: "Notion", color: "#ffffff" },
    { icon: ICalendar, name: "Calendar", color: "#4285F4" },
    { icon: IDatabase, name: "Postgres", color: "#336791" },
    { icon: IGlobe, name: "Webhooks", color: Y },
    { icon: IWorkflow, name: "Zapier", color: "#FF4A00" },
    { icon: ILink, name: "REST API", color: "#22c55e" },
    { icon: IMail, name: "Outlook", color: "#0078D4" },
    { icon: ICpu, name: "OpenAI", color: "#10a37f" },
  ];
  return (
    <section
      ref={ref}
      className="py-40 px-6"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(255,214,0,0.02), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
            style={{ color: Y }}
          >
            Integrations
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Works with your
            <br />
            <span className="text-zinc-700">whole stack.</span>
          </h2>
          <p className="text-zinc-500 mt-6 max-w-lg mx-auto text-lg">
            Connect to 150+ apps with one click. No API keys, no webhooks, no
            headaches.
          </p>
        </motion.div>

        {/* Scrolling marquee rows */}
        <div
          className="overflow-hidden mb-6 relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {[...integrations, ...integrations].map((g, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5"
                style={{ background: "rgba(255,255,255,0.02)", minWidth: 160 }}
              >
                <g.icon size={20} color={g.color} />
                <span className="text-sm font-medium text-zinc-500">
                  {g.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <div
          className="overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-4"
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            {[
              ...integrations.slice(6),
              ...integrations,
              ...integrations.slice(0, 6),
            ].map((g, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5"
                style={{ background: "rgba(255,255,255,0.02)", minWidth: 160 }}
              >
                <g.icon size={20} color={g.color} />
                <span className="text-sm font-medium text-zinc-500">
                  {g.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-4 mt-12">
          {integrations.map((g, i) => (
            <IntegrationCard key={i} {...g} delay={i * 0.05} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <button className="text-zinc-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 mx-auto">
            View all 150+ integrations <IArrow size={14} color="currentColor" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ─── SECTION 4: FEATURES ─────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, highlight, wide }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -8 }}
      className={`relative rounded-[2.5rem] p-8 overflow-hidden group ${wide ? "md:col-span-2" : ""}`}
      style={{
        background: highlight ? Y : "rgba(10,10,10,0.9)",
        border: highlight ? "none" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {!highlight && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${Y}08, transparent 60%)`,
          }}
        />
      )}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: highlight ? "rgba(0,0,0,0.15)" : `${Y}15` }}
      >
        <Icon size={22} color={highlight ? "#000" : Y} />
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: highlight ? "#000" : "#fff" }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed text-sm"
        style={{ color: highlight ? "rgba(0,0,0,0.6)" : "#555" }}
      >
        {desc}
      </p>
      {highlight && (
        <motion.div className="absolute bottom-6 right-6" whileHover={{ x: 4 }}>
          <IArrow size={24} color="#000" />
        </motion.div>
      )}
    </motion.div>
  );
};

const FeaturesSection = () => (
  <section className="py-40 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p
          className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
          style={{ color: Y }}
        >
          Features
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
          Built for builders
          <br />
          <span className="text-zinc-700">who move fast.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FeatureCard
          icon={ICpu}
          title="AI-Powered Logic"
          desc="Describe what you want in plain English. Lurph writes the logic, handles the conditionals, and adapts to changes automatically."
        />
        <FeatureCard
          icon={IZap}
          title="Sub-second Execution"
          desc="Every workflow runs on serverless edge infrastructure. Triggers fire in under 200ms, globally."
        />
        <FeatureCard
          icon={IGlobe}
          title="Join the Beta"
          highlight
          title="Start Automating Today"
          desc="Get access to all features free for 14 days. No credit card."
          wide={false}
        />
        <FeatureCard
          icon={IDatabase}
          title="Full Data Lineage"
          desc="Every step of every run is logged, searchable, and auditable. Know exactly what happened and why."
          wide
        />
        <FeatureCard
          icon={ILink}
          title="Custom API Actions"
          desc="Not in our library? Build your own connector with any REST or GraphQL API in minutes."
        />
        <FeatureCard
          icon={ISearch}
          title="Smart Debugging"
          desc="AI-assisted error messages explain exactly what went wrong and suggest the fix — often in one click."
        />
      </div>
    </div>
  </section>
);

// ─── SECTION 5: PRICING ───────────────────────────────────────────────────────
const PricingCard = ({ tier, price, desc, features, highlight, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="relative rounded-[2.5rem] p-8 flex flex-col"
    style={{
      background: highlight
        ? `linear-gradient(135deg, ${Y}18, ${Y}06)`
        : "rgba(10,10,10,0.9)",
      border: `1px solid ${highlight ? `${Y}40` : "rgba(255,255,255,0.06)"}`,
    }}
  >
    {highlight && (
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-black"
        style={{ background: Y }}
      >
        Most Popular
      </div>
    )}
    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-3">
      {tier}
    </p>
    <div className="flex items-end gap-1 mb-2">
      <span className="text-5xl font-black text-white">{price}</span>
      {price !== "Free" && price !== "Custom" && (
        <span className="text-zinc-600 mb-2">/mo</span>
      )}
    </div>
    <p className="text-zinc-600 text-sm mb-8">{desc}</p>
    <div className="space-y-3 flex-1 mb-8">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${Y}20` }}
          >
            <ICheck size={11} color={Y} />
          </div>
          <span className="text-zinc-400 text-sm">{f}</span>
        </div>
      ))}
    </div>
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all"
      style={
        highlight
          ? { background: Y, color: "#000" }
          : {
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
            }
      }
    >
      {price === "Custom" ? "Talk to Sales" : "Get Started"}
    </motion.button>
  </motion.div>
);

const PricingSection = () => (
  <section
    className="py-40 px-6"
    style={{
      background:
        "linear-gradient(to bottom, transparent, rgba(255,214,0,0.015), transparent)",
    }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p
          className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
          style={{ color: Y }}
        >
          Pricing
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
          Start free.
          <br />
          <span className="text-zinc-700">Scale forever.</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          delay={0}
          tier="Starter"
          price="Free"
          desc="For solo builders exploring automation."
          features={[
            "5 active workflows",
            "500 runs/month",
            "10 connectors",
            "Community support",
          ]}
        />
        <PricingCard
          delay={0.1}
          tier="Pro"
          price="$29"
          desc="For teams shipping at speed."
          features={[
            "Unlimited workflows",
            "50,000 runs/month",
            "All 150+ connectors",
            "AI workflow builder",
            "Priority support",
            "Custom triggers",
          ]}
          highlight
        />
        <PricingCard
          delay={0.2}
          tier="Enterprise"
          price="Custom"
          desc="For orgs that need control and scale."
          features={[
            "Unlimited everything",
            "SLA guarantees",
            "SSO & audit logs",
            "Dedicated infrastructure",
            "Custom AI models",
            "White-glove onboarding",
          ]}
        />
      </div>
    </div>
  </section>
);

// ─── SECTION 6: TESTIMONIALS ─────────────────────────────────────────────────
const TestimonialCard = ({ quote, name, role, company, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -6 }}
    className="p-8 rounded-3xl"
    style={{
      background: "rgba(10,10,10,0.9)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <IStar key={i} size={14} color={Y} />
      ))}
    </div>
    <p className="text-zinc-300 leading-relaxed mb-6 text-sm">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-black"
        style={{ background: Y }}
      >
        {name[0]}
      </div>
      <div>
        <p className="text-white text-sm font-bold">{name}</p>
        <p className="text-zinc-600 text-xs">
          {role} · {company}
        </p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => (
  <section className="py-40 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p
          className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
          style={{ color: Y }}
        >
          Testimonials
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
          Teams love
          <br />
          <span className="text-zinc-700">Lurph.</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TestimonialCard
          delay={0}
          quote="We replaced 4 different automation tools with Lurph. Setup took an afternoon. ROI was immediate."
          name="Priya Mehta"
          role="Head of Engineering"
          company="Dataflow"
        />
        <TestimonialCard
          delay={0.1}
          quote="The AI workflow builder is genuinely magical. I described what I needed and it built it. No Zapier zap ever did that."
          name="James Okafor"
          role="Founder"
          company="ScaleOps"
        />
        <TestimonialCard
          delay={0.2}
          quote="Our support team now handles 3x the volume with the same headcount. Lurph automates the repetitive 80%."
          name="Sofia Chen"
          role="VP Operations"
          company="Nexarith"
        />
      </div>

      {/* Trusted by strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-20 text-center"
      >
        <p className="text-zinc-700 text-xs uppercase tracking-widest mb-8 font-bold">
          Trusted by fast-moving teams at
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {[
            "Dataflow",
            "ScaleOps",
            "Nexarith",
            "Vectorize",
            "LoopLabs",
            "Cortex",
          ].map((co) => (
            <span
              key={co}
              className="text-zinc-700 font-black text-lg tracking-tight hover:text-zinc-500 transition-colors cursor-default"
            >
              {co}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── SECTION 7: FINAL CTA ─────────────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="py-40 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-[200px] rounded-full"
          style={{ background: `${Y}18` }}
        />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.div
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em]"
          style={{ background: `${Y}10`, color: Y, border: `1px solid ${Y}30` }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: Y }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Now in Open Beta
        </motion.div>

        <h2 className="text-[clamp(3rem,12vw,11rem)] font-black text-white tracking-tighter leading-none mb-8">
          LURPH<span style={{ color: Y }}>.</span>
        </h2>
        <p className="text-zinc-500 text-xl max-w-xl mx-auto mb-12">
          Stop duct-taping your tools together. Start automating everything with
          AI.
        </p>

        <div className="flex flex-wrap gap-5 justify-center">
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: `0 30px 80px ${Y}50` }}
            whileTap={{ scale: 0.97 }}
            className="px-14 py-5 rounded-full font-black text-black text-xl transition-all"
            style={{ background: Y }}
          >
            Start Free — No Card Needed
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, borderColor: Y }}
            whileTap={{ scale: 0.97 }}
            className="px-14 py-5 rounded-full font-bold text-white text-xl border border-white/10 transition-all"
          >
            Book a Demo
          </motion.button>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-700 text-[10px] font-black uppercase tracking-widest">
          <span>© 2025 Lurph Labs Inc.</span>
          <div className="flex gap-8">
            {["Twitter", "LinkedIn", "Privacy", "Status", "Docs"].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-zinc-400 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <span>San Francisco, CA</span>
        </div>
      </motion.div>
    </section>
  );
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function LurphApp() {
  return (
    <div
      className="bg-[#050505] text-zinc-400 font-sans overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFD600; }
        ::selection { background: rgba(255,214,0,0.25); }
      `}</style>
      <ParticleBG />

      <HeroSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
