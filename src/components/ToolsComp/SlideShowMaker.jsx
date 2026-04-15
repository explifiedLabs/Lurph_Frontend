import React from "react";
import { motion } from "framer-motion";
import { Presentation, Layout, MonitorPlay, Sparkles } from "lucide-react";

const Y = "#FFD600";

export default function SlideShowMakerLanding() {
   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden py-40 px-6 sm:px-12 selection:bg-[#FFD600]/20">
         <div className="max-w-[1400px] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

               {/* Left Hero */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                  className="lg:col-span-8 bg-[#111] rounded-[40px] p-10 md:p-16 flex flex-col justify-center border border-white/5 relative overflow-hidden h-[600px] lg:h-[700px]"
               >
                  <div className="absolute inset-0 z-0">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#FFD600]/10 blur-[120px] rounded-full pointer-events-none" />
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD600]/30 bg-[#FFD600]/10 mb-8 w-max relative z-10">
                     <Presentation size={16} color={Y} />
                     <span className="text-xs font-bold uppercase tracking-widest text-[#FFD600]">Presentify Pro</span>
                  </div>

                  <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[1] tracking-tighter mb-6 relative z-10">
                     Pitch decks <br /> that literally <br /> <span className="text-white bg-white/10 px-4 rounded-3xl backdrop-blur inline-block mt-2">Sell Themselves.</span>
                  </h1>

                  <p className="text-zinc-400 text-xl max-w-xl mb-12 font-medium leading-relaxed relative z-10">
                     Leave PowerPoint in the past. Generate interactive, beautifully animated presentations in minutes using simple markdown or drag-and-drop.
                  </p>

                  <div className="flex gap-4 relative z-10 mt-auto">
                     <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-5 rounded-[24px] font-black text-black flex items-center gap-3 text-lg" style={{ background: Y }}>
                        Create Slideshow <Layout size={20} />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Right Column Bentos */}
               <div className="lg:col-span-4 grid grid-rows-2 gap-6 h-[600px] lg:h-[700px]">
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-zinc-900 rounded-[40px] p-10 border border-white/5 group relative overflow-hidden flex flex-col justify-end">
                     <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                     <h3 className="text-3xl font-black text-white relative z-10 mb-2">Beautiful Themes</h3>
                     <p className="text-zinc-400 font-medium relative z-10">Hand-crafted by world-class UI designers.</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 relative flex flex-col justify-center">
                     <MonitorPlay size={40} color={Y} className="mb-6" />
                     <h3 className="text-3xl font-black text-white mb-2">Auto-Animate</h3>
                     <p className="text-zinc-400 font-medium leading-relaxed">Magic Move transitions element properties seamlessly between slides.</p>
                  </motion.div>
               </div>

            </div>
         </div>
      </div>
   );
}
