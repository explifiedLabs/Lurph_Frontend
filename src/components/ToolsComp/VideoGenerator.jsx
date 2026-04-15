import React from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, Video, Film, Zap } from "lucide-react";

const Y = "#FFD600";

export default function VideoGeneratorLanding() {
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
                  {/* Abstract background glow */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFD600]/10 blur-[150px] rounded-full pointer-events-none" />

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-max mb-8">
                     <div className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
                     <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Lurph Studio V3.0</span>
                  </div>

                  <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[1.05] tracking-tighter mb-6">
                     Turn text into <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${Y}, #fff)` }}>Cinematic</span> Video.
                  </h1>

                  <p className="text-zinc-400 text-lg md:text-xl max-w-xl mb-12 font-medium leading-relaxed">
                     Our next-generation AI video model understands physical dynamics, camera motion, and hyper-realistic lighting. Generate cinematic masterpieces from simple text prompts.
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full font-black text-black flex items-center gap-2 text-lg" style={{ background: Y }}>
                        Generate Video <Sparkles size={20} />
                     </motion.button>
                     <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 rounded-full font-bold text-white flex items-center gap-2 text-lg border border-white/20 hover:bg-white/5">
                        View Demo Reel <Play size={18} fill="currentColor" />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Right Hero Image/Video Bento */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-5 bg-black rounded-[40px] border border-white/5 overflow-hidden relative group h-[500px] lg:h-auto"
               >
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Cinematic generation" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                  {/* Floating prompt pill */}
                  <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <p className="text-sm font-medium text-white italic">"A neon-lit cyberpunk city aerial fly-through at midnight, 4k, hyper-detailed, photorealistic..."</p>
                  </div>
               </motion.div>

            </div>

            {/* LOWER BENTO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

               {/* Stat Card */}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 flex flex-col justify-center relative overflow-hidden">
                  <h2 className="text-6xl font-black mb-4" style={{ color: Y }}>2M+</h2>
                  <h3 className="text-xl font-bold text-white mb-2">Videos Generated</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                     Join thousands of creators, filmmakers, and marketers who are saving thousands of hours using Lurph's AI.
                  </p>
                  <Video size={100} className="absolute right-[-20px] bottom-[-20px] text-white/5 mix-blend-overlay" />
               </motion.div>

               {/* Feature Card 1 */}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1a1a1a] rounded-[40px] p-10 border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD600]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/10 relative z-10">
                     <Film size={24} color={Y} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 relative z-10">Director Mode</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                     Control camera angles, pan, tilt, and zoom. You are the director. Dial in exactly how the shot should behave.
                  </p>
               </motion.div>

               {/* Feature Card 2 */}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 relative overflow-hidden flex flex-col justify-between">
                  <div>
                     <h3 className="text-2xl font-black text-white mb-3">Lightning Fast</h3>
                     <p className="text-zinc-400 text-sm leading-relaxed">
                        Our custom H100 clusters render 4-second cinematic clips in under 30 seconds.
                     </p>
                  </div>
                  <div className="mt-8 flex gap-2 overflow-hidden">
                     <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#FFD600] w-full" /></div>
                     <div className="h-1 w-1/3 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#FFD600] w-1/2 animate-pulse" /></div>
                     <div className="h-1 w-1/4 bg-white/10 rounded-full" />
                  </div>
               </motion.div>

            </div>
         </div>
      </div>
   );
}
