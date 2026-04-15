import React from "react";
import { motion } from "framer-motion";
import { Smile, Sparkles, ImagePlus, ThumbsUp } from "lucide-react";

const Y = "#FFD600";

export default function TextToMemeGeneratorLanding() {
   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden py-40 px-6 sm:px-12 selection:bg-[#FFD600]/20">
         <div className="max-w-[1400px] mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
               {/* Left Hero */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
                  className="lg:col-span-8 bg-[#111] rounded-[40px] p-12 md:p-20 flex flex-col justify-center border border-white/5 relative overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #161616 0%, #0a0a0a 100%)" }}
               >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/20 w-max mb-8">
                     <Smile size={16} color={Y} />
                     <span className="text-xs font-black uppercase tracking-widest text-[#FFD600]">MemeGen Pro</span>
                  </div>

                  <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[1] tracking-tighter mb-6 relative z-10">
                     Go Viral <br /> <span className="text-white opacity-40">Without</span> Trying.
                  </h1>

                  <p className="text-zinc-400 text-xl max-w-lg mb-12 font-medium leading-relaxed relative z-10">
                     Access 5,000+ blank templates, auto-generate captions with AI, and export in 4k. The ultimate tool for social media managers and shitposters alike.
                  </p>

                  <div className="flex gap-4">
                     <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-5 rounded-[24px] font-black text-black flex items-center gap-3 text-lg shadow-[0_0_30px_rgba(255,214,0,0.3)]" style={{ background: Y }}>
                        Start Creating <Sparkles size={20} />
                     </motion.button>
                  </div>
               </motion.div>

               {/* Right Stat Bento */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-4 bg-[#FFD600] rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative group text-black"
               >
                  <div>
                     <h2 className="text-7xl font-black tracking-tighter mb-2">5k+</h2>
                     <p className="font-bold text-lg opacity-80">Official Blank Templates</p>
                  </div>
                  <div className="mt-8 bg-black/10 rounded-3xl p-6 backdrop-blur">
                     <p className="font-bold mb-4">Weekly Trending:</p>
                     <div className="flex -space-x-4">
                        {["1g8my4", "1ur9b0", "30b1gx"].map((id, i) => (
                           <div key={i} className="w-16 h-16 rounded-full border-4 border-[#FFD600] overflow-hidden bg-white shadow-xl">
                              <img src={`https://i.imgflip.com/${id}.jpg`} className="w-full h-full object-cover" />
                           </div>
                        ))}
                        <div className="w-16 h-16 rounded-full border-4 border-[#FFD600] bg-black text-white flex items-center justify-center font-bold shadow-xl text-xs">+99</div>
                     </div>
                  </div>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-1 border border-white/5 bg-[#111] rounded-[40px] p-10">
                  <ImagePlus size={32} color={Y} className="mb-6" />
                  <h3 className="text-2xl font-black text-white mb-3">Custom Uploads</h3>
                  <p className="text-zinc-500">Bring your own images and let our AI expand the borders instantly.</p>
               </motion.div>
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="col-span-2 border border-white/5 bg-[#1a1a1a] rounded-[40px] p-10 flex flex-col md:flex-row justify-between items-center group overflow-hidden">
                  <div className="max-w-sm mb-6 md:mb-0 relative z-10">
                     <h3 className="text-3xl font-black text-white mb-3">AI Caption Writer</h3>
                     <p className="text-zinc-400">Writer's block? Our tuned language model generates highly context-aware jokes for any image.</p>
                  </div>
                  {/* Visual mock */}
                  <div className="bg-black border border-white/10 rounded-2xl p-4 shadow-2xl relative z-10">
                     <div className="bg-zinc-900 rounded py-2 px-4 mb-2 text-[#FFD600] font-black uppercase text-xl">ME WHEN THE APP CRASHES</div>
                     <div className="bg-zinc-800 rounded h-24 flex items-center justify-center border border-white/5 font-bold uppercase text-zinc-600">Image Space</div>
                  </div>
               </motion.div>
            </div>

         </div>
      </div>
   );
}
