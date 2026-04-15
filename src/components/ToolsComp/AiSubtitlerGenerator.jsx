import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Captions, Wand2, Languages, MoveUpRight, Zap, Globe, Sparkles, Clock, Shield, Play, Lock } from "lucide-react";

const Y = "#FFD600";

const fadeUp = (delay = 0) => ({
   initial: { opacity: 0, y: 30 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: 0.6, delay },
});

const WORDS = ["Learn", "AI", "in", "10 Minutes!"];

export default function AiSubtitlerGeneratorLanding() {
   const [activeWord, setActiveWord] = useState(3);
   const [counter, setCounter] = useState(0);

   useEffect(() => {
      let i = 0;
      const t = setInterval(() => {
         setActiveWord(i % WORDS.length);
         i++;
      }, 600);
      return () => clearInterval(t);
   }, []);

   useEffect(() => {
      let c = 0;
      const t = setInterval(() => {
         c += 2;
         setCounter(c);
         if (c >= 99.8) clearInterval(t);
      }, 20);
      return () => clearInterval(t);
   }, []);

   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#FFD600]/20">
         {/* NAV */}


         <div className="max-w-[1320px] mx-auto px-6 sm:px-12 py-40">

            {/* ─── HERO ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

               {/* Hero Left */}
               <motion.div
                  {...fadeUp(0)}
                  className="bg-[#111] rounded-[36px] p-12 md:p-16 flex flex-col justify-center border border-white/5 relative min-h-[500px] overflow-hidden"
               >
                  <div className="absolute right-[-60px] bottom-[-60px] w-[300px] h-[300px] rounded-full bg-[#FFD600]/5 blur-3xl pointer-events-none" />

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 w-max">
                     <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
                     <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">AutoCaption V2.0</span>
                  </div>

                  <h1 className="text-[clamp(3rem,5.5vw,5rem)] font-black leading-[1.05] tracking-tighter mb-6">
                     Generate dynamic <br />
                     subtitles{" "}
                     <span style={{ color: Y }}>instantly.</span>
                  </h1>

                  <p className="text-zinc-400 text-lg max-w-md mb-12 font-medium leading-relaxed">
                     Capture attention and increase engagement. Our speech-to-text AI creates highly accurate,
                     word-by-word animated subtitles tailored for viral TikToks and Shorts.
                  </p>

                  <div className="flex flex-wrap gap-4">
                     <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 32px rgba(255,214,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full font-black text-black flex items-center gap-2 text-base"
                        style={{ background: Y }}
                     >
                        Transcribe Video <Wand2 size={18} />
                     </motion.button>
                     <motion.button
                        whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        className="px-8 py-4 rounded-full font-bold text-white flex items-center gap-2 text-base border border-white/15 bg-transparent"
                     >
                        <Play size={16} /> Watch Demo
                     </motion.button>
                  </div>
               </motion.div>

               {/* Hero Right Bento */}
               <div className="grid grid-cols-2 gap-5">
                  {/* Accuracy stat */}
                  <motion.div
                     {...fadeUp(0.1)}
                     className="bg-zinc-900 rounded-[32px] p-10 border border-white/5 flex flex-col items-center justify-center text-center"
                  >
                     <div className="w-14 h-14 rounded-full bg-[#FFD600]/10 flex items-center justify-center mb-5">
                        <Languages size={28} color={Y} />
                     </div>
                     <h3 className="text-4xl font-black text-white mb-1">{counter.toFixed(1)}%</h3>
                     <p className="text-zinc-400 font-medium text-sm">Whisper Accuracy</p>
                  </motion.div>

                  {/* Languages stat */}
                  <motion.div
                     {...fadeUp(0.2)}
                     className="bg-[#1a1a1a] rounded-[32px] p-10 border border-white/5 relative overflow-hidden flex flex-col justify-center"
                  >
                     <h3 className="text-4xl font-black text-white mb-3">50+</h3>
                     <p className="text-zinc-400 font-medium text-sm leading-relaxed">
                        Supported languages instantly translated & aligned.
                     </p>
                     <MoveUpRight size={90} className="absolute right-[-18px] top-[-18px] text-white/4" />
                  </motion.div>

                  {/* Karaoke preview */}
                  <motion.div
                     {...fadeUp(0.3)}
                     className="col-span-2 bg-[#111] rounded-[32px] p-10 border border-white/5 relative flex flex-col overflow-hidden"
                  >
                     <h3 className="text-xl font-black text-white mb-2 relative z-10">Viral Styles out of the Box</h3>
                     <p className="text-zinc-400 text-sm max-w-xs mb-6 relative z-10">
                        Reverse-engineered from the most popular creator fonts and karaoke animations.
                     </p>
                     <div className="bg-black border border-white/10 rounded-2xl px-6 py-7 relative z-10 text-center font-black text-3xl shadow-2xl">
                        {WORDS.map((word, i) => (
                           <span
                              key={i}
                              className="transition-all duration-300"
                              style={{
                                 color: i === activeWord ? Y : "rgba(255,255,255,0.35)",
                                 transform: i === activeWord ? "scale(1.08)" : "scale(1)",
                                 display: "inline-block",
                                 marginRight: "8px",
                                 filter: i === activeWord ? `drop-shadow(0 0 12px ${Y})` : "none",
                              }}
                           >
                              {word}
                           </span>
                        ))}
                     </div>
                     <div className="absolute right-0 bottom-0 w-1/2 h-full bg-[#FFD600]/8 blur-[80px]" />
                  </motion.div>
               </div>
            </div>

            {/* ─── HOW IT WORKS + MINI CARDS ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5 mb-5">
               <motion.div
                  {...fadeUp(0.1)}
                  className="bg-[#111] rounded-[36px] p-12 border border-white/5 flex flex-col gap-6"
               >
                  <div>
                     <h2 className="text-3xl font-black tracking-tight leading-tight mb-3">
                        From upload to <span style={{ color: Y }}>viral</span> in seconds.
                     </h2>
                     <p className="text-zinc-400 text-sm leading-relaxed">
                        Three simple steps — no editing experience required.
                     </p>
                  </div>
                  <div className="flex flex-col gap-4">
                     {[
                        { n: "01", title: "Upload your video", desc: "Drag & drop any MP4, MOV, or paste a TikTok / YouTube link." },
                        { n: "02", title: "AI transcribes & aligns", desc: "Whisper-powered engine generates word-level timestamps in under 30s." },
                        { n: "03", title: "Pick a style & export", desc: "Choose from 20+ viral styles, customize colors, then export as MP4 or SRT." },
                     ].map((s) => (
                        <div
                           key={s.n}
                           className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-[#FFD600]/30 transition-colors group"
                        >
                           <div
                              className="min-w-[36px] h-9 rounded-full flex items-center justify-center text-xs font-black border"
                              style={{ color: Y, borderColor: "rgba(255,214,0,0.3)", background: "rgba(255,214,0,0.08)" }}
                           >
                              {s.n}
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-white mb-1">{s.title}</h4>
                              <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               <div className="flex flex-col gap-5">
                  <motion.div {...fadeUp(0.2)} className="bg-[#1a1a1a] rounded-[28px] p-8 border border-white/5 flex-1">
                     <h4 className="font-bold text-sm mb-2">Supported Formats</h4>
                     <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
                        Works with every major video format and short-form platform.
                     </p>
                     <div className="flex flex-wrap gap-2">
                        {["MP4", "MOV", "AVI", "WebM", "TikTok", "YouTube", "Reels", "Shorts"].map((t) => (
                           <span
                              key={t}
                              className="px-3 py-1 rounded-full text-xs font-bold"
                              style={{ background: "rgba(255,214,0,0.1)", border: "1px solid rgba(255,214,0,0.2)", color: Y }}
                           >
                              {t}
                           </span>
                        ))}
                     </div>
                  </motion.div>

                  <motion.div {...fadeUp(0.3)} className="bg-[#111] rounded-[28px] p-8 border border-white/5 flex-1">
                     <h4 className="font-bold text-sm mb-2">Processing Speed</h4>
                     <p className="text-zinc-500 text-sm mb-4 leading-relaxed">
                        Real-time waveform analysis with GPU-accelerated transcription.
                     </p>
                     <div className="flex items-end gap-1 h-12">
                        {[14, 28, 20, 38, 26, 44, 32, 48, 36, 42, 30, 46, 38, 50, 42].map((h, i) => (
                           <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{
                                 height: `${h}px`,
                                 background: Y,
                                 opacity: 0.5 + (i / 20),
                                 animation: `wave${i % 3} ${0.8 + (i % 4) * 0.2}s ease-in-out infinite alternate`,
                              }}
                           />
                        ))}
                     </div>
                  </motion.div>
               </div>
            </div>

            {/* ─── FEATURES GRID ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
               {[
                  { icon: <Zap size={22} color={Y} />, title: "Real-time Processing", desc: "GPU-accelerated transcription delivers captions in under 30 seconds for most videos." },
                  { icon: <Globe size={22} color={Y} />, title: "50+ Languages", desc: "Auto-detect and translate into any supported language with native-level alignment." },
                  { icon: <Sparkles size={22} color={Y} />, title: "20+ Viral Styles", desc: "Pre-built animations inspired by top creators — just pick and go." },
                  { icon: <Clock size={22} color={Y} />, title: "Word-level Timing", desc: "Every single word gets its own timestamp for perfect karaoke-style animations." },
                  { icon: <Shield size={22} color={Y} />, title: "Private & Secure", desc: "Your videos are processed in isolated environments and deleted after export." },
                  { icon: <Captions size={22} color={Y} />, title: "SRT / VTT Export", desc: "Export raw subtitle files for use in Premiere Pro, CapCut, or any editor." },
               ].map((f, i) => (
                  <motion.div
                     key={i}
                     {...fadeUp(i * 0.08)}
                     whileHover={{ y: -4, borderColor: "rgba(255,214,0,0.25)" }}
                     className="bg-[#111] rounded-[28px] p-8 border border-white/5 transition-colors"
                  >
                     <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                        style={{ background: "rgba(255,214,0,0.1)" }}
                     >
                        {f.icon}
                     </div>
                     <h4 className="font-bold text-base mb-2">{f.title}</h4>
                     <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
               ))}
            </div>

            {/* ─── STYLES SHOWCASE ─── */}
            <motion.div
               {...fadeUp(0.1)}
               className="bg-[#0e0e0e] rounded-[36px] p-12 border border-white/5 mb-5 overflow-hidden relative"
            >
               <h2 className="text-3xl font-black tracking-tight mb-2">
                  Pick your <span style={{ color: Y }}>aesthetic.</span>
               </h2>
               <p className="text-zinc-500 text-sm mb-8">Every style is fully customizable — fonts, colors, sizes, shadows.</p>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                     { label: "Classic Yellow", el: <span className="text-2xl font-black" style={{ color: Y }}>Caption.</span> },
                     { label: "Outline", el: <span className="text-2xl font-black" style={{ WebkitTextStroke: "1.5px #fff", color: "transparent" }}>Caption.</span> },
                     { label: "Highlight", el: <span className="text-xl font-black px-3 py-1 rounded-md" style={{ background: Y, color: "#000" }}>Caption.</span> },
                     { label: "Underline", el: <span className="text-2xl font-black text-white" style={{ borderBottom: `3px solid ${Y}`, paddingBottom: "4px" }}>Caption.</span> },
                  ].map((s, i) => (
                     <motion.div
                        key={i}
                        whileHover={{ scale: 1.04, borderColor: "rgba(255,214,0,0.5)" }}
                        className="bg-black border border-white/8 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer min-h-[110px]"
                     >
                        {s.el}
                        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{s.label}</span>
                     </motion.div>
                  ))}
               </div>
            </motion.div>

            {/* ─── TESTIMONIALS ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
               {[
                  { stars: 5, text: "My views literally doubled after I started using AutoCaption. The karaoke style is insane.", name: "Marcus R.", handle: "@marcusreels" },
                  { stars: 5, text: "I've tried 6 caption tools. Nothing comes close to the accuracy on non-English videos.", name: "Yuki T.", handle: "@yukicreates" },
                  { stars: 5, text: "Set up in 2 minutes. Had captions on my first video in under 5. This is the one.", name: "Priya S.", handle: "@priyaedits" },
               ].map((t, i) => (
                  <motion.div
                     key={i}
                     {...fadeUp(i * 0.1)}
                     className="bg-[#111] rounded-[24px] p-7 border border-white/5"
                  >
                     <div className="mb-4 text-base tracking-widest" style={{ color: Y }}>
                        {"★".repeat(t.stars)}
                     </div>
                     <p className="text-zinc-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                     <div className="flex items-center gap-3">
                        <div
                           className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs text-black"
                           style={{ background: Y }}
                        >
                           {t.name[0]}
                        </div>
                        <div>
                           <p className="font-bold text-sm">{t.name}</p>
                           <p className="text-zinc-500 text-xs">{t.handle}</p>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* ─── BOTTOM CTA + PRICING ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
               {/* CTA */}
               <motion.div
                  {...fadeUp(0.1)}
                  className="rounded-[36px] p-12 flex flex-col justify-center"
                  style={{ background: Y }}
               >
                  <h2 className="text-[2.4rem] font-black text-black leading-tight tracking-tight mb-4">
                     Start captioning<br />for free today.
                  </h2>
                  <p className="text-black/60 mb-8 text-sm leading-relaxed">
                     No credit card required. 60 minutes of free transcription every month.
                  </p>
                  <div className="flex flex-wrap gap-3">
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full font-black text-white bg-black flex items-center gap-2 text-sm"
                     >
                        Create Free Account <Wand2 size={16} />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Pricing Card */}
           <motion.div
  {...fadeUp(0.2)}
  className="bg-[#111] rounded-[36px] p-10 border border-white/5 flex flex-col relative overflow-hidden group grayscale-[0.5] opacity-80"
>
  {/* Header Section */}
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-black text-zinc-400">Pro Plan</h3>
    <span
      className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5"
      style={{ background: "rgba(255,255,255,0.05)", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <Lock size={12} /> Locked
    </span>
  </div>

  {/* Coming Soon Section (Replaced Pricing) */}
  <div className="mb-1 flex items-baseline gap-2">
    <div className="text-4xl font-black tracking-tight leading-none text-zinc-200">
      Coming Soon
    </div>
  </div>
  <p className="text-zinc-600 text-sm mb-8">This plan is currently under development.</p>

  {/* Features List */}
  <ul className="flex flex-col gap-3 mb-8">
    {[
      "Unlimited transcription minutes",
      "All 20+ viral subtitle styles",
      "50+ language support",
      "4K video export",
      "Priority GPU processing",
      "SRT / VTT / ASS file export",
    ].map((item) => (
      <li key={item} className="flex items-center gap-3 text-sm text-zinc-500">
        <span
          className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black opacity-30"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
        >
          ✓
        </span>
        {item}
      </li>
    ))}
  </ul>

  {/* Locked Button */}
  <motion.button
    disabled
    className="w-full py-4 rounded-full font-black text-zinc-400 text-sm mt-auto cursor-not-allowed flex items-center justify-center gap-2"
    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
  >
    <Lock size={16} /> 
    Join Waitlist
  </motion.button>

  {/* Optional: Subtle Glass Overlay to make it feel "untouchable" */}
  <div className="absolute inset-0 bg-transparent z-10" />
</motion.div>
            </div>

            {/* FOOTER */}
            <div className="text-center text-zinc-600 text-xs pt-16 mt-10 border-t border-white/5">
               © 2025 AutoCaption. All rights reserved. · Built with Whisper AI
            </div>
         </div>

         <style>{`
        @keyframes wave0 { from { height: 60% } to { height: 100% } }
        @keyframes wave1 { from { height: 40% } to { height: 90% } }
        @keyframes wave2 { from { height: 50% } to { height: 80% } }
      `}</style>
      </div>
   );
}