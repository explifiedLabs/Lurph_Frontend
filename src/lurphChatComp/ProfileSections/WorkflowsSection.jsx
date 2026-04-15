import React from "react";
import { Workflow, FileText, ExternalLink, Zap, Mail } from "lucide-react";
import { motion } from "framer-motion";

const WorkflowsSection = () => {
  const workflows = [
    {
      id: "expli",
      title: "Expli",
      description: "Create and manage your Expli workflows",
      icon: <Zap className="w-5 h-5" />,
      url: "/expli",
      color: "from-cyan-500 to-teal-500",
    },
    {
      id: "notes",
      title: "Notes",
      description: "Organize notes and collaborate seamlessly",
      icon: <FileText className="w-5 h-5" />,
      url: "/notes",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "email-updates",
      title: "Daily Email Updates",
      description: "AI-powered email summaries sent to Telegram",
      icon: <Mail className="w-5 h-5" />,
      url: "/email-updates",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">
          My Workflows
        </h2>
        <p className="text-gray-500 text-sm font-medium">
          Access and manage your workflow tools
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {workflows.map((workflow, index) => (
          <motion.a
            key={workflow.id}
            href={workflow.url}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ translateY: -3 }}
            className="group relative overflow-hidden rounded-xl border border-white/15 hover:border-[#FFD600]/40 transition-all shadow-xl"
          >
            {/* Subtle hover glow matching the Lurph site feel */}
            <div className="absolute inset-0 bg-[#FFD600] opacity-0 group-hover:opacity-[0.03] transition-opacity" />

            <div className="relative bg-[#0A0A0A] p-4">
              <div className="flex items-start justify-between mb-3">
                {/* Icon container themed to the yellow brand color */}
                <div className="p-2.5 rounded-lg bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.2)]">
                  {workflow.icon}
                </div>
              </div>
              <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#FFD600] transition-colors">
                {workflow.title}
              </h3>
              <p className="text-gray-500 text-xs mb-3 leading-relaxed">
                {workflow.description}
              </p>
              <div className="flex items-center gap-1.5 text-[#FFD600] font-black text-[10px] uppercase tracking-widest group-hover:gap-2 transition-all">
                Open Workflow
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Bottom Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mt-6 p-4 bg-[#0A0A0A] border border-white/5 rounded-xl shadow-inner"
      >
        <h3 className="text-white text-sm font-bold mb-1 flex items-center gap-2">
          <Workflow className="w-4 h-4 text-[#FFD600]" />
          More Workflows Coming Soon
        </h3>
        <p className="text-gray-500 text-xs font-medium">
          We’re adding more workflow tools to automate and streamline your
          tasks.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WorkflowsSection;
