import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiCpu, FiFileText, FiMessageCircle, FiTarget, FiMail, FiBarChart2, FiCheckCircle, FiList, FiRefreshCw, FiCreditCard } from "react-icons/fi";

const Y = "#FFD600";

const WORKFLOWS_BY_CATEGORY = {
  "AI Workflows": [
    {
      id: 1,
      name: "AI Content Generator",
      desc: "Generate blog posts using GPT-4",
      tags: ["AI", "No code"],
      difficulty: "Beginner",
      Icon: FiCpu,
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "Summarize Documents",
      desc: "Summarize documents for documents",
      tags: ["AI", "No code"],
      difficulty: "Beginner",
      Icon: FiFileText,
      color: "#06b6d4",
    },
    {
      id: 3,
      name: "Chatbot Automation",
      desc: "Create set up chatbot automation",
      tags: ["AI", "No code"],
      difficulty: "Beginner",
      Icon: FiMessageCircle,
      color: "#8b5cf6",
    },
  ],
  "Marketing": [
    {
      id: 4,
      name: "Lead Capture to CRM",
      desc: "Sync new contacts forms to your CRM",
      tags: ["Marketing", "CRM"],
      difficulty: "Beginner",
      Icon: FiTarget,
      color: "#f59e0b",
    },
    {
      id: 5,
      name: "Email Campaign Automation",
      desc: "Captures an email campaign automation",
      tags: ["Email", "Marketing"],
      difficulty: "Beginner",
      Icon: FiMail,
      color: "#10b981",
    },
    {
      id: 6,
      name: "Daily Report Generator",
      desc: "Daily report generated to your report",
      tags: ["Reporting", "Marketing"],
      difficulty: "Beginner",
      Icon: FiBarChart2,
      color: "#ec4899",
    },
  ],
  "Productivity": [
    {
      id: 7,
      name: "Task Sync (Notion + Slack)",
      desc: "Sync tasks between Notion and Slack",
      tags: ["Productivity", "Integration"],
      difficulty: "Intermediate",
      Icon: FiCheckCircle,
      color: "#10b981",
    },
    {
      id: 8,
      name: "Webhook to Google Sheets",
      desc: "Send data directly webhook to google sheets",
      tags: ["Data", "Google"],
      difficulty: "Intermediate",
      Icon: FiList,
      color: "#06b6d4",
    },
    {
      id: 9,
      name: "API Data Sync",
      desc: "Sync live and sync across API data sync",
      tags: ["API", "Data"],
      difficulty: "Intermediate",
      Icon: FiRefreshCw,
      color: "#3b82f6",
    },
  ],
  "Integrations": [
    {
      id: 10,
      name: "Stripe Payment Sync",
      desc: "Sync latest data complete webhook to",
      tags: ["Payment", "Integration"],
      difficulty: "Intermediate",
      Icon: FiCreditCard,
      color: "#f59e0b",
    },
  ],
};

const WORKFLOW_CARD = ({ workflow, navigate }) => {
  const difficultyColors = {
    Beginner: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
    Intermediate: { bg: "rgba(250,204,21,0.15)", color: Y },
    Advanced: { bg: "rgba(239,68,68,0.15)", color: "#ef4444" },
  };

  const colors = difficultyColors[workflow.difficulty] || difficultyColors.Beginner;
  const Icon = workflow.Icon;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      style={{
        background: "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(15,15,15,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 16,
        cursor: "pointer",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div style={{ 
          width: 40, 
          height: 40, 
          borderRadius: "8px",
          background: `${workflow.color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: workflow.color,
          fontSize: 18,
        }}>
          <Icon size={20} />
        </div>
        <div
          style={{
            background: colors.bg,
            color: colors.color,
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {workflow.difficulty}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white mb-1">{workflow.name}</h3>
      <p className="text-xs text-zinc-500 mb-3">{workflow.desc}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {workflow.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "#a1a1aa",
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

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/chat/workflows");
        }}
        style={{
          background: Y,
          color: "#000",
          width: "100%",
          padding: "8px 12px",
          borderRadius: 6,
          border: "none",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = "0.9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        Use Workflow
      </button>
    </motion.div>
  );
};

export default function WorkflowsComp() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const categories = ["All", ...Object.keys(WORKFLOWS_BY_CATEGORY)];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredWorkflows = useMemo(() => {
    const allWorkflows = Object.values(WORKFLOWS_BY_CATEGORY).flat();

    return allWorkflows.filter((workflow) => {
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" ||
        Object.keys(WORKFLOWS_BY_CATEGORY).find(
          (cat) => cat === categoryFilter && WORKFLOWS_BY_CATEGORY[cat].some((w) => w.id === workflow.id)
        );
      const matchesDifficulty =
        difficultyFilter === "All" || workflow.difficulty === difficultyFilter;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, categoryFilter, difficultyFilter]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#050505]">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-white/[0.07] bg-[#080808] px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Workflows</h1>
            <p className="text-sm text-zinc-500 mt-1">Explore and launch pre-built automation instantly</p>
          </div>
          <motion.button
            onClick={() => navigate("/chat/project/new")}
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
            New Workflow
          </motion.button>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 border-b border-white/[0.07] bg-[#080808] px-8 py-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.04)",
              borderRadius: 8,
              padding: "0 12px",
              flex: 1,
              maxWidth: 300,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Search size={16} style={{ color: "#52525b" }} />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 13,
                flex: 1,
                padding: "8px 0",
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: 6 }}>
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setategoryFilter(cat)}
                style={{
                  background:
                    categoryFilter === cat
                      ? `rgba(255,214,0,0.12)`
                      : "transparent",
                  color:
                    categoryFilter === cat ? Y : "#52525b",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: `1px solid ${
                    categoryFilter === cat ? `${Y}33` : "rgba(255,255,255,0.08)"
                  }`,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ width: 1, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />

          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#52525b", textTransform: "uppercase", letterSpacing: "0.05em", paddingTop: 6 }}>
              Difficulty:
            </span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                style={{
                  background:
                    difficultyFilter === diff
                      ? `rgba(255,214,0,0.12)`
                      : "transparent",
                  color:
                    difficultyFilter === diff ? Y : "#52525b",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: `1px solid ${
                    difficultyFilter === diff ? `${Y}33` : "rgba(255,255,255,0.08)"
                  }`,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {categoryFilter === "All"
          ? Object.entries(WORKFLOWS_BY_CATEGORY).map(([category, workflows]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">{category}</h2>
                  <button
                    onClick={() => setategoryFilter(category)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: Y,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    View All →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workflows
                    .filter(
                      (w) =>
                        (difficultyFilter === "All" || w.difficulty === difficultyFilter) &&
                        (searchQuery === "" ||
                          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .slice(0, 3)
                    .map((workflow, idx) => (
                      <motion.div
                        key={workflow.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <WORKFLOW_CARD workflow={workflow} navigate={navigate} />
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))
          : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkflows.map((workflow, idx) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <WORKFLOW_CARD workflow={workflow} navigate={navigate} />
                  </motion.div>
                ))}
              </div>

              {filteredWorkflows.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 300,
                    color: "#52525b",
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                  <p style={{ fontSize: 14, fontWeight: 500 }}>No workflows found</p>
                  <p style={{ fontSize: 12, color: "#52525b", marginTop: 4 }}>
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </motion.div>
          )}
      </div>
    </div>
  );
}
