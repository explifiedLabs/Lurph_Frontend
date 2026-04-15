import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Palette, ArrowRight, Aperture, Layers } from "lucide-react";

const Y = "#FFD600";

export default function ImageStylerLanding() {
   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden py-40 px-6 sm:px-12 selection:bg-[#FFD600]/20">
         <div className="max-w-[1400px] mx-auto">

            {/* HERO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
               {/* Left Hero Content */}
               <motion.div
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="lg:col-span-7 bg-[#111] rounded-[40px] p-10 md:p-16 flex flex-col justify-center border border-white/5 relative overflow-hidden"
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-max mb-8">
                     <div className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
                     <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Styler v2.5</span>
                  </div>

                  <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tighter mb-6">
                     Transform images <br />
                     with <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${Y}, #fff)` }}>One Click.</span>
                  </h1>

                  <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed">
                     Upload any photo and let our AI style transfer engine recreate it in over 50+ hand-crafted artistic styles. From Cyberpunk to Renaissance, completely alter the mood instantly.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full font-black text-black flex items-center gap-2 text-lg" style={{ background: Y }}>
                        Try New Version <Sparkles size={20} />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Right Hero Image */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-5 bg-black rounded-[40px] border border-white/5 overflow-hidden relative group h-[500px] lg:h-auto"
               >
                  {/* Before/After Split Mock */}
                  <div className="absolute inset-0 w-full h-full flex">
                     <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" className="w-1/2 h-full object-cover filter grayscale opacity-70" alt="Original" />
                     <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" className="w-1/2 h-full object-cover" alt="Styled" style={{ filter: "sepia(0.5) hue-rotate(-30deg) saturate(2)" }} />

                     {/* Divider line */}
                     <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10 -translate-x-1/2 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                           <div className="flex gap-1"><div className="w-0.5 h-3 bg-zinc-400" /><div className="w-0.5 h-3 bg-zinc-400" /></div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* LOWER BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 flex flex-col justify-center">
                  <h2 className="text-6xl font-black mb-4" style={{ color: Y }}>50+</h2>
                  <h3 className="text-xl font-bold text-white mb-2">Curated Styles</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">Instantly apply studio-quality artistic filters that understand depth and context.</p>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1a1a1a] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10 relative z-10">
                     <Aperture size={24} color={Y} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Retain Details</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Our AI preserves essential facial features and structures while completely replacing the texture and lighting.</p>
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 relative">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10 relative z-10">
                     <Layers size={24} color={Y} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Batch Processing</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">Apply a consistent art direction across hundreds of photos simultaneously.</p>
               </motion.div>
            </div>
         </div>
      </div>
   );
}
