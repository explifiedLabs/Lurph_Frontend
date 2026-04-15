import React, { useCallback } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Hammer,
  Share2,
  Search,
  ArrowRight,
  Play,
  Database,
  Recycle,
  Lightbulb,
  Award,
  Zap
} from "lucide-react";

const Y = "#FFD600";

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const Hero = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const onMove = useCallback((e) => {
    mx.set((e.clientX / window.innerWidth - 0.5) * 30);
    my.set((e.clientY / window.innerHeight - 0.5) * 30);
  }, [mx, my]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden"
      onMouseMove={onMove}
    >
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[200px]" style={{ background: `${Y}0d` }} />
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ background: `${Y}10`, color: Y, border: `1px solid ${Y}20` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: Y }} />
          Introducing Explified Community 2.0
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center text-[clamp(2.5rem,7vw,5.5rem)] font-black text-white tracking-tighter leading-[1.1] mb-6"
        >
          Turn Workflows Into
          <br />
          <span style={{ backgroundImage: `linear-gradient(90deg, ${Y}, #fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Valuable Assets</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center text-zinc-400 text-lg sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          Stop rebuilding the wheel. Discover, share, and monetize AI workflows in a community built for creators, engineers, and visionaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4 mb-24"
        >
          <motion.button whileHover={{ scale: 1.05, boxShadow: `0 20px 50px ${Y}40` }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-black text-sm transition-colors hover:brightness-110" style={{ background: Y }}>
            Join the Community <ArrowRight size={16} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shadow-lg">
            <Play size={14} fill="currentColor" /> Watch Demo
          </motion.button>
        </motion.div>

        {/* Hero Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
          className="relative w-full max-w-4xl h-[320px] md:h-[280px]"
        >
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.2 }}>
            <line x1="25%" y1="20%" x2="50%" y2="50%" stroke={Y} strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="75%" y1="80%" x2="50%" y2="50%" stroke={Y} strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="60%" y1="20%" x2="50%" y2="50%" stroke={Y} strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Central Node */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center z-20"
            style={{ background: "rgba(10,10,10,0.95)", border: `1px solid ${Y}50`, boxShadow: `0 0 40px ${Y}20` }}
            animate={{ boxShadow: [`0 0 20px ${Y}20`, `0 0 50px ${Y}40`, `0 0 20px ${Y}20`] }} transition={{ duration: 3, repeat: Infinity }}
          >
            <Share2 size={28} color={Y} />
          </motion.div>

          {/* Data Pipeline Node */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="absolute top-[5%] sm:top-[12%] left-[10%] px-4 py-3 rounded-xl flex flex-col justify-center gap-2 z-10 cursor-default shadow-xl"
            style={{ background: "rgba(18,18,18,0.8)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <div className="flex items-center gap-2">
              <Database size={14} className="text-blue-400" />
              <span className="text-white text-xs font-bold leading-none">Data Pipeline v2</span>
            </div>
            <div className="w-[120px] h-1 rounded-full bg-blue-500/20 mt-1"><div className="w-2/3 h-1 rounded-full bg-blue-500" /></div>
          </motion.div>

          {/* LLM Agent Node */}
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            className="absolute bottom-[5%] sm:bottom-[10%] right-[5%] sm:right-[15%] px-5 py-4 rounded-2xl flex flex-col justify-center gap-3 z-10 cursor-default shadow-xl"
            style={{ background: "rgba(18,18,18,0.8)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#f97316]/20 flex items-center justify-center"><Database size={10} className="text-[#f97316]" /></div>
              <span className="text-white text-sm font-bold leading-none">LLM Agent Setup</span>
            </div>
            <div className="flex gap-2">
               <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">GPT-4</span>
               <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">LangChain</span>
               <span className="w-1.5 h-1.5 bg-red-500 rounded-full self-center ml-1" />
            </div>
          </motion.div>

          {/* User Activity Pill */}
          <motion.div
            animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[10%] sm:right-[30%] px-3 py-1.5 rounded-full flex items-center gap-2 z-10 shadow-lg"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden bg-white/10 shrink-0 border border-white/10">
               <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-zinc-300 text-[9px] leading-none mb-[2px]">Sarah forked this</span>
              <span className="text-zinc-600 text-[8px] leading-none">2 mins ago</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── LIFECYCLE SECTION ────────────────────────────────────────────────────────
const LifecycleSection = () => {
  return (
    <section className="py-24 px-6 relative bg-[#0a0a0a]">
       <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-4">The Lifecycle of a Workflow</h2>
             <p className="text-zinc-500 text-sm md:text-base">From an idea in your head to a deployed asset used by thousands.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center z-10">
              {/* Connecting Background Line */}
              <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] z-0" style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)` }}>
                 <div className="absolute top-0 left-[40%] right-[40%] h-[2px]" style={{ background: Y, boxShadow: `0 0 10px ${Y}` }} />
              </div>

              {[
                { icon: Hammer, title: "1. Build", desc: "Construct complex AI pipelines using our visual node editor or code directly.", color: "#71717a", glow: false },
                { icon: Share2, title: "2. Share", desc: "Publish to the community. Add documentation, variables, and usage instructions.", color: Y, glow: true },
                { icon: Search, title: "3. Discover", desc: "Others find your workflow, fork it, improve it, and credit your original work.", color: "#71717a", glow: false },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative z-10 flex flex-col items-center group">
                   <motion.div whileHover={{ y: -4, rotate: step.glow ? 5 : 0 }} className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-colors" style={{ background: step.glow ? "rgba(10,10,10,0.9)" : "rgba(20,20,20,0.8)", border: `1px solid ${step.glow ? `${Y}40` : "rgba(255,255,255,0.05)"}`, boxShadow: step.glow ? `0 0 50px ${Y}20` : "none" }}>
                      <step.icon size={24} color={step.color} className="transition-transform group-hover:scale-110" />
                   </motion.div>
                   <h3 className="text-white font-bold text-lg mb-2" style={{ color: step.glow ? Y : "white" }}>{step.title}</h3>
                   <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-[240px]">{step.desc}</p>
                </motion.div>
              ))}
          </div>
       </div>
    </section>
  )
}

// ─── SPLIT FEATURE SECTION ────────────────────────────────────────────────────
const MoreThanProcess = () => {
  return (
    <section className="py-32 px-6 relative">
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <h2 className="text-4xl md:text-[3.5rem] font-black text-white tracking-tighter leading-[1.1] mb-6">
                Your workflow<br/>becomes <span style={{ color: Y }}>more than<br/>just a process.</span>
             </h2>
             <p className="text-zinc-400 leading-relaxed mb-10 text-sm md:text-base max-w-md">
                When you build in isolation, your innovations die with the project. In the Explified Community, your workflows become building blocks for the future.
             </p>
             <button className="flex items-center gap-2 text-sm font-bold transition-colors hover:brightness-110" style={{ color: Y }}>
               Explore Top Workflows <ArrowRight size={16} />
             </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[400px] w-full flex items-center justify-center group cursor-default">
             <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity group-hover:opacity-30">
               <svg className="w-full h-full">
                  <line x1="30%" y1="20%" x2="60%" y2="50%" stroke={Y} strokeDasharray="4 4" />
                  <line x1="60%" y1="50%" x2="75%" y2="25%" stroke={Y} strokeDasharray="4 4" />
                  <line x1="60%" y1="50%" x2="40%" y2="80%" stroke={Y} strokeDasharray="4 4" />
                  <line x1="60%" y1="50%" x2="80%" y2="75%" stroke={Y} strokeDasharray="4 4" />
               </svg>
             </div>
             
             {/* Central Dot */}
             <div className="absolute top-[50%] left-[60%] w-3 h-3 rounded-full shadow-[0_0_20px_#FFD600]" style={{ background: Y, transform: 'translate(-50%, -50%)' }} />

             {[
               { icon: Recycle, label: "Reusable", top: "15%", left: "30%" },
               { icon: Lightbulb, label: "Show your thinking", top: "25%", left: "75%", highlight: true },
               { icon: Award, label: "Build credibility", top: "80%", left: "40%" },
               { icon: Zap, label: "Learn faster", top: "75%", left: "80%" },
             ].map((node, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="absolute px-4 py-2.5 rounded-full flex items-center gap-2 border border-white/10 shadow-lg" style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)', background: "rgba(10,10,10,0.9)", borderColor: node.highlight ? `${Y}50` : "rgba(255,255,255,0.1)", boxShadow: node.highlight ? `0 0 20px ${Y}15` : "none" }}>
                   <node.icon size={13} color={node.highlight ? Y : "#FFD600"} className={node.highlight ? "opacity-100" : "opacity-70"} />
                   <span className="text-white text-[11px] font-bold whitespace-nowrap">{node.label}</span>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  )
}

// ─── INTEGRATION SECTION ──────────────────────────────────────────────────────
const IntegrationSection = () => {
  return (
    <section className="py-32 px-6 relative bg-[#080808]">
       <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Frictionless Integration</h2>
             <p className="text-zinc-500 text-sm md:text-base">Importing a community workflow takes seconds, not hours.</p>
          </div>

          <div className="relative">
             {/* Progress Bar Background */}
             <div className="hidden md:block absolute top-[11px] left-[10%] right-[10%] h-[2px] bg-white/5 rounded-full md:left-[12.5%] md:right-[12.5%]" />
             {/* Active Bar */}
             <motion.div initial={{ width: "0%" }} whileInView={{ width: "75%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }} className="hidden md:block absolute top-[11px] left-[10%] h-[2px] rounded-full shadow-[0_0_10px_#FFD600] md:left-[12.5%]" style={{ background: Y }} />

             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { num: "01", title: "Search", desc: "Find the perfect workflow template in the community hub." },
                  { num: "02", title: "Fork", desc: "Click to duplicate the entire structure into your workspace." },
                  { num: "03", title: "Configure", desc: "Connect your APIs and adjust parameters to fit your needs." },
                  { num: "04", title: "Deploy", desc: "Run your new asset instantly with zero infrastructure setup." },
                ].map((step, i) => (
                   <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="pt-2 flex flex-col items-center md:items-start text-center md:text-left group cursor-default">
                       {/* Step dot */}
                       <div className="hidden md:block w-[16px] h-[16px] rounded-full mx-auto mb-10 border-[3px] border-[#080808] z-20 relative transition-transform duration-300 group-hover:scale-125" style={{ background: Y, boxShadow: i === 3 ? `0 0 20px ${Y}` : "none", width: i === 3 ? 24 : 16, height: i === 3 ? 24 : 16, marginTop: i === 3 ? -4 : 0 }} />
                       
                       <motion.div whileHover={{ y: -4 }} className="p-7 rounded-3xl bg-[#0e0e0e] border border-white/5 w-full h-[180px] flex flex-col items-start text-left hover:border-white/10 hover:bg-[#121212] transition-all shadow-xl group-hover:shadow-2xl">
                          <span className="text-xs font-black mb-3" style={{ color: Y }}>{step.num}</span>
                          <h4 className="text-white text-base font-bold mb-3">{step.title}</h4>
                          <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
                       </motion.div>
                   </motion.div>
                ))}
             </div>
          </div>
       </div>
    </section>
  )
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────
const CTA = () => {
  return (
    <section className="py-40 px-6 flex justify-center relative shadow-2xl">
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[150px] rounded-full opacity-30" style={{ background: Y }} />
       </div>
       <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full max-w-4xl p-14 md:p-20 rounded-[40px] text-center relative overflow-hidden" style={{ background: "rgba(10,10,10,0.9)", border: `1px solid rgba(255,214,0,0.15)`, boxShadow: "0 20px 80px rgba(0,0,0,0.5)" }}>
          <div className="absolute inset-0 pointer-events-none rounded-[40px] opacity-[0.25]" style={{ boxShadow: `inset 0 0 120px ${Y}` }} />
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6 relative z-10">
            Ready to join the<br/>
            <span style={{ color: Y }}>Evolution?</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-12 relative z-10">
            Stop building in the dark. Bring your ideas to the Explified Community and watch them grow.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 relative z-10">
             <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4.5 rounded-full font-black text-black text-[15px]" style={{ background: Y, boxShadow: `0 15px 40px ${Y}40` }}>
                Start Building for Free
             </motion.button>
             <button className="text-white font-bold text-sm hover:text-zinc-300 transition-colors">
                Browse Workflows
             </button>
          </div>
       </motion.div>
    </section>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function LurphCommunity() {
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
      
      {/* Background dot grid for entire page consistency */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      
      <div className="relative z-10">
        <Hero />
        <LifecycleSection />
        <MoreThanProcess />
        <IntegrationSection />
        <CTA />
      </div>
    </div>
  );
}
