import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, Image as ImageIcon, Sparkles, Wand2, Settings2 } from "lucide-react";

const Y = "#FFD600";

export default function GifGeneratorLanding() {
   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden py-40 px-6 sm:px-12 selection:bg-[#FFD600]/20">
         <div className="max-w-[1400px] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

               {/* Left Text Content */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                  className="lg:col-span-5 bg-[#111] rounded-[40px] p-10 md:p-14 flex flex-col justify-center border border-white/5 relative"
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 w-max">
                     <div className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
                     <span className="text-xs font-bold uppercase tracking-widest text-[#FFD600]">Lightning Fast</span>
                  </div>

                  <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-black leading-[1] tracking-tighter mb-6 relative z-10">
                     GIFs the way <br /> they <span className="text-white opacity-40">should be.</span>
                  </h1>

                  <p className="text-zinc-400 text-lg max-w-sm mb-12 font-medium leading-relaxed relative z-10">
                     Convert videos or image sequences into ultra-optimized, high-quality GIFs without watermark. Total control over framerate, resolution and compression.
                  </p>

                  <div className="mt-auto">
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-5 rounded-[20px] font-black text-black flex items-center justify-center gap-2 text-lg" style={{ background: Y }}>
                        Open Generator <Wand2 size={20} />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Right Bento Cards */}
               <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Visual Representation */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 bg-[#1a1a1a] rounded-[40px] border border-white/5 overflow-hidden relative shadow-2xl h-[350px] flex items-center justify-center group">
                     <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" alt="demo" />

                     <div className="relative z-10 w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center">
                        <span className="font-black text-xl text-white">GIF</span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Format</span>
                     </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5">
                     <Settings2 size={32} color={Y} className="mb-6" />
                     <h3 className="text-2xl font-black text-white mb-3">Lossless Export</h3>
                     <p className="text-zinc-500 font-medium">Advanced color quantization retains up to 90% of original fidelity while shrinking size.</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 bg-gradient-to-br from-[#111] to-[#FFD600]/10">
                     <h3 className="text-5xl font-black text-white mb-3">60 FPS</h3>
                     <p className="text-zinc-400 font-medium leading-relaxed mb-6">Silky smooth animations perfectly loopable.</p>
                     <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-[#FFD600] w-full" />
                     </div>
                  </motion.div>
               </div>

            </div>
         </div>
      </div>
   );
}
