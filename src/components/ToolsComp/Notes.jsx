import React from "react";
import { motion } from "framer-motion";
import { FileText, Pencil, Share2, Type } from "lucide-react";

const Y = "#FFD600";

export default function NotesLanding() {
   return (
      <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden py-40 px-6 sm:px-12 selection:bg-[#FFD600]/20">
         <div className="max-w-[1400px] mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] rounded-[40px] p-10 md:p-16 border border-white/5 relative min-h-[400px] flex flex-col justify-center">
                  <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tighter mb-6 relative z-10">
                     Think. <br /> <span style={{ color: Y }}>Write.</span> <br /> Publish.
                  </h1>
                  <p className="text-zinc-400 text-lg md:text-xl max-w-sm mb-10 font-medium leading-relaxed relative z-10">
                     A beautiful, distraction-free markdown editor for your best ideas. Syncs instantly across all your devices.
                  </p>
                  <motion.button whileHover={{ scale: 1.05 }} className="w-max px-8 py-4 rounded-full font-black text-black flex items-center gap-2 text-lg shadow-[0_0_20px_rgba(255,214,0,0.2)]" style={{ background: Y }}>
                     Open Editor <Pencil size={18} />
                  </motion.button>
               </motion.div>

               <div className="grid grid-rows-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#1a1a1a] rounded-[40px] p-10 border border-white/5 relative overflow-hidden flex flex-col justify-center">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                           <Type size={20} color={Y} />
                        </div>
                        <h3 className="text-2xl font-black text-white">Full Markdown</h3>
                     </div>
                     <p className="text-zinc-400 font-medium leading-relaxed max-w-sm">Use standard syntax to format text instantly without taking your hands off the keyboard.</p>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] rounded-[40px] p-10 border border-white/5 relative overflow-hidden flex flex-col justify-center">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                           <Share2 size={20} color={Y} />
                        </div>
                        <h3 className="text-2xl font-black text-white">One-Click Share</h3>
                     </div>
                     <p className="text-zinc-400 font-medium leading-relaxed max-w-sm">Generate an instant read-only public link to share your notes with anyone, anywhere.</p>
                  </motion.div>
               </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-black rounded-[40px] border border-white/5 overflow-hidden relative shadow-2xl h-[400px]">
               <div className="absolute top-0 left-0 right-0 h-12 bg-[#161616] border-b border-white/5 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <div className="p-12 pl-16 pt-20">
                  <h2 className="text-4xl font-black text-white tracking-tight mb-4">The Next Great Startup</h2>
                  <p className="text-lg text-zinc-400 font-serif max-w-2xl leading-relaxed opacity-80">
                     Today marks the beginning. We need to focus heavily on utilizing the new LLM models to drive automation in the user workflow.
                     <br /><br />
                     <span style={{ color: Y }}>**Action Items:**</span><br />
                     - Research optimal model architectures.<br />
                     - Build out the landing page.
                  </p>
               </div>
            </motion.div>

         </div>
      </div>
   );
}
