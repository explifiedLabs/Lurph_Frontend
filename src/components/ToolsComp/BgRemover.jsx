import React from "react";
import { motion } from "framer-motion";
import { Eraser, ImageIcon, Sparkles, CheckCircle2 } from "lucide-react";

const Y = "#FFD600";

export default function BgRemoverLanding() {
   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden py-40 px-6 sm:px-12 selection:bg-[#FFD600]/20">
         <div className="max-w-[1400px] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                  className="bg-[#111] rounded-[40px] p-10 md:p-16 flex flex-col justify-center border border-white/5 relative min-h-[500px]"
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 w-max">
                     <Eraser size={16} color={Y} />
                     <span className="text-xs font-bold uppercase tracking-widest text-[#FFD600]">Magic BG Eraser</span>
                  </div>

                  <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[1] tracking-tighter mb-6 relative z-10">
                     Flawless cutouts in <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(90deg, ${Y}, #f97316)` }}>seconds.</span>
                  </h1>

                  <p className="text-zinc-400 text-xl max-w-lg mb-12 font-medium leading-relaxed relative z-10">
                     Drop an image and watch our AI instantly identify the subject, isolate complex hair edges, and remove the background with pixel-perfect accuracy.
                  </p>

                  <div className="mt-auto">
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 rounded-full font-black text-black flex items-center gap-3 text-lg" style={{ background: Y }}>
                        Upload Image to Try <ImageIcon size={20} />
                     </motion.button>
                  </div>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-zinc-900 rounded-[40px] border border-white/5 overflow-hidden relative min-h-[500px] shadow-2xl flex items-center justify-center p-8"
               >
                  {/* Fake checkerboard background */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px" }} />

                  <img src="https://images.unsplash.com/photo-1510616022132-9976466385f8?q=80&w=800&auto=format&fit=crop" className="relative z-10 w-full max-w-md object-contain rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" alt="Cutout" />

                  <div className="absolute top-8 right-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-xl">
                     <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"><CheckCircle2 size={24} className="text-green-500" /></div>
                     <div>
                        <p className="text-white font-bold text-sm">Background Removed</p>
                        <p className="text-zinc-400 text-xs text-green-400">0.8 seconds</p>
                     </div>
                  </div>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#1a1a1a] rounded-[40px] p-10 border border-white/5 relative flex items-center justify-between group overflow-hidden">
                  <div className="relative z-10 max-w-xs">
                     <h3 className="text-3xl font-black text-white mb-4">API Access</h3>
                     <p className="text-zinc-400">Integrate our background removal into your own app with just 3 lines of code.</p>
                  </div>
                  <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                     <span className="font-mono text-[#FFD600] font-bold">{'</>'}</span>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#FFD600]/5 blur-[60px] rounded-full" />
               </motion.div>

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 flex items-center justify-between">
                  <div className="max-w-xs">
                     <h3 className="text-3xl font-black text-white mb-4">100% Free Edge Smoothing</h3>
                     <p className="text-zinc-400">No weird halos. Fur and hair are retained perfectly by our neural net.</p>
                  </div>
               </motion.div>
            </div>
         </div>
      </div>
   );
}
