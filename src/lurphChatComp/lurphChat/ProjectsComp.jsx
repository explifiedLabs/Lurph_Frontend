import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreHorizontal, Play, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiBarChart2, FiTarget, FiSettings, FiTool, FiShoppingBag, FiMessageCircle } from "react-icons/fi";

const Y = "#FFD600";

const PROJECTS_DATA = [
  {
    id: 1,
    name: "Marketing Automation",
    desc: "Marketing automations and email campaigns",
    workflows: 5,
    lastUpdated: "2h ago",
    status: "Active",
    Icon: FiBarChart2,
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Lead Pipeline",
    desc: "Organize and first-sending automation",
    workflows: 5,
    lastUpdated: "2h ago",
    status: "Active",
    Icon: FiTarget,
    color: "#f59e0b",
  },
  {
    id: 3,
    name: "Content Engine",
    desc: "Create a multifunction automation and content engine",
    workflows: 5,
    lastUpdated: "2h ago",
    status: "Active",
    Icon: FiSettings,
    color: "#8b5cf6",
  },
  {
    id: 4,
    name: "Project Engine",
    desc: "Create automation needs and engine in content engine",
    workflows: 5,
    lastUpdated: "2h ago",
    status: "Active",
    Icon: FiTool,
    color: "#10b981",
  },
  {
    id: 5,
    name: "E-commerce Sync",
    desc: "E-commerce a sync and be e-commerce sync",
    workflows: 5,
    lastUpdated: "2h ago",
    status: "Active",
    Icon: FiShoppingBag,
    color: "#ec4899",
  },
  {
    id: 6,
    name: "Customer Support Hub",
    desc: "Customer support hub connect over customer support services",
    workflows: 5,
    lastUpdated: "2h ago",
    status: "Draft",
    Icon: FiMessageCircle,
    color: "#06b6d4",
  },
];

const PROJECT_CARD = ({ project, navigate }) => {
  const statusColors = {
    Active: { bg: "rgba(16,185,129,0.15)", color: "#10b981" },
    Draft: { bg: "rgba(107,114,128,0.15)", color: "#6b7280" },
    Completed: { bg: "rgba(34,197,94,0.15)", color: "#22c55e" },
  };

  const colors = statusColors[project.status] || statusColors.Active;

  const Icon = project.Icon;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 0 0 1px ${Y}80` }}
      style={{
        background: "linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(15,15,15,0.8) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "none",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "8px",
            background: `${project.color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: project.color,
          }}
        >
          <Icon size={20} />
        </div>
        <div
          style={{
            background: colors.bg,
            color: colors.color,
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {project.status}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white mb-1">{project.name}</h3>
      <p className="text-xs text-zinc-500 mb-4">{project.desc}</p>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
        <div style={{ fontSize: 12, color: "#a1a1aa" }}>
          <span style={{ fontWeight: 600, color: "#fff" }}>{project.workflows}</span> Workflows
        </div>
        <div style={{ fontSize: 11, color: "#52525b" }}>
          Last updated {project.lastUpdated}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/chat/project/${project.id}`);
          }}
          style={{
            background: "transparent",
            border: `1px solid ${Y}55`,
            color: Y,
            padding: "6px 12px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            flex: 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${Y}15`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Play size={10} style={{ display: "inline", marginRight: 4 }} />
          Open Project
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "none",
            color: "#71717a",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#e4e4e7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "#71717a";
          }}
        >
          <Edit size={10} style={{ display: "inline", marginRight: 4 }} />
          Edit
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "transparent",
            border: "none",
            color: "#71717a",
            padding: "6px 8px",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "#e4e4e7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#71717a";
          }}
        >
          <MoreHorizontal size={14} />
        </button>
      </div>
    </motion.div>
  );
};

export default function ProjectsComp() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [sortBy, setSortBy] = useState("Last updated");

  const filteredProjects = useMemo(() => {
    let filtered = PROJECTS_DATA.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort
    if (sortBy === "Last updated") {
      filtered = filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    } else if (sortBy === "Name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, statusFilter, sortBy]);

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
            <h1 className="text-2xl font-bold text-white">Projects</h1>
            <p className="text-sm text-zinc-500 mt-1">Manage and organize your automation workflows</p>
          </div>
          <motion.button
            onClick={() => navigate("/chat/new-project")}
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
            New Project
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
              placeholder="Search projects..."
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

          <div style={{ display: "flex", gap: 2 }}>
            {["Active", "Draft", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  background:
                    statusFilter === status
                      ? `rgba(255,214,0,0.12)`
                      : "transparent",
                  color:
                    statusFilter === status ? Y : "#52525b",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: `1px solid ${
                    statusFilter === status
                      ? `${Y}33`
                      : "rgba(255,255,255,0.08)"
                  }`,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {status}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#a1a1aa",
              padding: "6px 12px",
              borderRadius: 6,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <option>Last updated</option>
            <option>Name</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <PROJECT_CARD project={project} navigate={navigate} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
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
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 14, fontWeight: 500 }}>No projects found</p>
            <p style={{ fontSize: 12, color: "#52525b", marginTop: 4 }}>
              Create a new project to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
