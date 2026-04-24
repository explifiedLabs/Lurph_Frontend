import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MessageSquare, Zap, GitBranch, Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiZap, FiUsers, FiMail, FiCreditCard, FiShare2, FiSearch, FiCheck } from "react-icons/fi";

const Y = "#FFD600";

const WORKFLOW_TEMPLATES = [
  {
    id: 1,
    name: "AI Content Generator",
    desc: "Generate blog posts using GPT-4",
    Icon: FiZap,
    tags: ["AI", "Content"],
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Lead Capture Automation",
    desc: "Sync new contacts forms to your CRM",
    Icon: FiUsers,
    tags: ["Sales", "CRM"],
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Email to Google Sheets",
    desc: "Automatically save attachments from Gmail",
    Icon: FiMail,
    tags: ["Email", "Data"],
    color: "#10b981"
  },
  {
    id: 4,
    name: "Stripe Payment Sync",
    desc: "Update inventory after completed purchase",
    Icon: FiCreditCard,
    tags: ["Payment", "Sync"],
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Social Media Scheduler",
    desc: "Post scheduled content across platforms",
    Icon: FiShare2,
    tags: ["Social", "Marketing"],
    color: "#ec4899"
  },
  {
    id: 6,
    name: "Data Enrichment Hub",
    desc: "Fetch company info based on email domain",
    Icon: FiSearch,
    tags: ["Data", "API"],
    color: "#06b6d4"
  },
];

export default function HomeComp() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const [workflowDesc, setWorkflowDesc] = useState("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const handleNewWorkflow = () => {
    navigate("/chat/project/new");
  };

  const handleTemplateClick = (template) => {
    navigate("/chat/workflows");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/[0.07] bg-[#080808] px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {getGreeting()}, {user?.name || "there"}
              </h1>
              <p className="text-sm text-zinc-500 mt-1">Build your next automation</p>
            </div>
            <motion.button
              onClick={handleNewWorkflow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: Y,
                color: "#000",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Plus size={16} />
              New
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* New Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-lg font-bold text-white mb-4">New Workflow</h2>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255,214,0,0.08) 0%, rgba(255,214,0,0.02) 100%)",
              border: "1px solid rgba(255,214,0,0.15)",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <textarea
              placeholder="Describe the workflow you want to build..."
              value={workflowDesc}
              onChange={(e) => setWorkflowDesc(e.target.value)}
              className="w-full bg-transparent text-white placeholder-zinc-600 outline-none resize-none text-sm"
              rows={3}
              style={{ fontFamily: "inherit" }}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setWorkflowDesc("")}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#a1a1aa",
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Clear
              </button>
              <button
                onClick={handleNewWorkflow}
                style={{
                  background: Y,
                  color: "#000",
                  padding: "8px 16px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Create
              </button>
            </div>
          </div>
        </motion.div>

        {/* Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Start with a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WORKFLOW_TEMPLATES.map((template, idx) => {
              const Icon = template.Icon;
              const isHighlighted = idx === 2; // Highlight 3rd item like in photo
              return (
                <motion.button
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                  whileHover={{ y: -4, boxShadow: `0 12px 24px ${template.color}15` }}
                  style={{
                    background: isHighlighted 
                      ? "linear-gradient(135deg, rgba(255,214,0,0.05) 0%, rgba(255,214,0,0.02) 100%)"
                      : "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(15,15,15,0.8) 100%)",
                    border: isHighlighted 
                      ? "1px solid rgba(255,214,0,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: 20,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    position: "relative",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div style={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: "8px",
                      background: `${template.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: template.color,
                      fontSize: 20,
                    }}>
                      <Icon size={20} />
                    </div>
                    {isHighlighted && (
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: `${Y}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: Y,
                      }}>
                        <FiCheck size={14} />
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{template.name}</h3>
                  <p className="text-xs text-zinc-500 mb-3">{template.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: `${template.color}15`,
                          color: template.color,
                          padding: "2px 8px",
                          borderRadius: 4,
                          fontSize: 10,
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
