import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Mail, FileText, Bell, Users, Calendar,
  Globe, Slack, Database, BarChart2, Shield, Zap,
  MessageSquare, Code, Layers, GitBranch, Download,
  Upload, Clock, CreditCard, Mic, Video, Image,
  Link, Lock, PieChart, TrendingUp, Settings,
  RefreshCw, Send, BookOpen, Map, Star,
} from "lucide-react";
import { FaBrain } from "react-icons/fa";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const INTEGRATIONS = [
  // ── Productivity ─────────────────────────────────────────
  {
    id: 1, name: "Notion", category: "Productivity",
    description: "Two-way sync for pages, databases, and blocks.",
    icon: "📓", iconBg: "bg-gray-500/15", status: "connected",
    color: "text-gray-300",
  },
  {
    id: 2, name: "Google Workspace", category: "Productivity",
    description: "Docs, Sheets, Drive, and Calendar in one connection.",
    icon: "🗂️", iconBg: "bg-blue-500/15", status: "connected",
    color: "text-blue-400",
  },
  {
    id: 3, name: "Airtable", category: "Productivity",
    description: "Read and write records, trigger automations on row events.",
    icon: "🧩", iconBg: "bg-yellow-500/15", status: "connected",
    color: "text-yellow-400",
  },
  {
    id: 4, name: "Confluence", category: "Productivity",
    description: "Search, create, and update wiki pages from any workflow.",
    icon: "📘", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },
  {
    id: 5, name: "Coda", category: "Productivity",
    description: "Interact with Coda docs and automation packs.",
    icon: "⚡", iconBg: "bg-red-500/15", status: "available",
    color: "text-red-400",
  },
  {
    id: 6, name: "ClickUp", category: "Productivity",
    description: "Create tasks, update statuses, and sync time tracking.",
    icon: "✅", iconBg: "bg-purple-500/15", status: "available",
    color: "text-purple-400",
  },

  // ── Communication ─────────────────────────────────────────
  {
    id: 7, name: "Slack", category: "Communication",
    description: "Post messages, read threads, and trigger on mentions.",
    icon: "💬", iconBg: "bg-teal-500/15", status: "connected",
    color: "text-teal-400",
  },
  {
    id: 8, name: "Gmail", category: "Communication",
    description: "Send, read, label, and draft emails programmatically.",
    icon: "📧", iconBg: "bg-red-500/15", status: "connected",
    color: "text-red-400",
  },
  {
    id: 9, name: "Outlook", category: "Communication",
    description: "Microsoft email and calendar events via Graph API.",
    icon: "📨", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },
  {
    id: 10, name: "Intercom", category: "Communication",
    description: "Read and reply to customer conversations automatically.",
    icon: "🗣️", iconBg: "bg-sky-500/15", status: "available",
    color: "text-sky-400",
  },
  {
    id: 11, name: "Zendesk", category: "Communication",
    description: "Create, update, and route support tickets at scale.",
    icon: "🎫", iconBg: "bg-orange-500/15", status: "connected",
    color: "text-orange-400",
  },
  {
    id: 12, name: "Twilio", category: "Communication",
    description: "Send SMS, WhatsApp, and voice messages from workflows.",
    icon: "📱", iconBg: "bg-red-500/15", status: "available",
    color: "text-red-400",
  },

  // ── Developer ─────────────────────────────────────────────
  {
    id: 13, name: "GitHub", category: "Developer",
    description: "Read PRs, create issues, trigger on push events.",
    icon: "🐙", iconBg: "bg-gray-500/15", status: "connected",
    color: "text-gray-300",
  },
  {
    id: 14, name: "GitLab", category: "Developer",
    description: "Merge requests, pipelines, and webhook triggers.",
    icon: "🦊", iconBg: "bg-orange-500/15", status: "available",
    color: "text-orange-400",
  },
  {
    id: 15, name: "Jira", category: "Developer",
    description: "Create sprints, manage issues, and sync with GitHub.",
    icon: "🔷", iconBg: "bg-blue-500/15", status: "connected",
    color: "text-blue-400",
  },
  {
    id: 16, name: "Linear", category: "Developer",
    description: "Sync issues and cycles with automated priority scoring.",
    icon: "📐", iconBg: "bg-violet-500/15", status: "available",
    color: "text-violet-400",
  },
  {
    id: 17, name: "Sentry", category: "Developer",
    description: "Read error events and create issues from alert triggers.",
    icon: "🐛", iconBg: "bg-red-500/15", status: "connected",
    color: "text-red-400",
  },
  {
    id: 18, name: "Datadog", category: "Developer",
    description: "Query metrics, logs, and trigger on alert state changes.",
    icon: "🐕", iconBg: "bg-purple-500/15", status: "available",
    color: "text-purple-400",
  },

  // ── CRM & Sales ───────────────────────────────────────────
  {
    id: 19, name: "Salesforce", category: "CRM & Sales",
    description: "Read and write leads, opps, contacts, and custom objects.",
    icon: "☁️", iconBg: "bg-blue-500/15", status: "connected",
    color: "text-blue-400",
  },
  {
    id: 20, name: "HubSpot", category: "CRM & Sales",
    description: "Contacts, deals, sequences, and marketing emails.",
    icon: "🧲", iconBg: "bg-orange-500/15", status: "connected",
    color: "text-orange-400",
  },
  {
    id: 21, name: "Pipedrive", category: "CRM & Sales",
    description: "Pipeline stages, activities, and deal automations.",
    icon: "🔮", iconBg: "bg-green-500/15", status: "available",
    color: "text-green-400",
  },
  {
    id: 22, name: "Apollo.io", category: "CRM & Sales",
    description: "Prospect search and outbound sequence triggers.",
    icon: "🚀", iconBg: "bg-indigo-500/15", status: "available",
    color: "text-indigo-400",
  },

  // ── Finance ───────────────────────────────────────────────
  {
    id: 23, name: "Stripe", category: "Finance",
    description: "Read charges, manage subscriptions, and handle webhooks.",
    icon: "💳", iconBg: "bg-indigo-500/15", status: "connected",
    color: "text-indigo-400",
  },
  {
    id: 24, name: "QuickBooks", category: "Finance",
    description: "Sync invoices, bills, and accounting journals automatically.",
    icon: "🧾", iconBg: "bg-green-500/15", status: "available",
    color: "text-green-400",
  },
  {
    id: 25, name: "Xero", category: "Finance",
    description: "Bank reconciliation, invoicing, and payroll sync.",
    icon: "💰", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },
  {
    id: 26, name: "Brex", category: "Finance",
    description: "Read transactions and enforce spending policies at source.",
    icon: "🏦", iconBg: "bg-emerald-500/15", status: "available",
    color: "text-emerald-400",
  },

  // ── Analytics & Data ──────────────────────────────────────
  {
    id: 27, name: "Google Analytics", category: "Analytics",
    description: "Pull traffic, conversion, and cohort data on demand.",
    icon: "📊", iconBg: "bg-orange-500/15", status: "connected",
    color: "text-orange-400",
  },
  {
    id: 28, name: "Mixpanel", category: "Analytics",
    description: "Query event funnels and user retention reports.",
    icon: "📉", iconBg: "bg-purple-500/15", status: "available",
    color: "text-purple-400",
  },
  {
    id: 29, name: "Snowflake", category: "Analytics",
    description: "Run SQL queries and pipe results into workflows.",
    icon: "❄️", iconBg: "bg-sky-500/15", status: "available",
    color: "text-sky-400",
  },
  {
    id: 30, name: "BigQuery", category: "Analytics",
    description: "Schedule queries and stream results downstream.",
    icon: "🔵", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },

  // ── Storage & Media ───────────────────────────────────────
  {
    id: 31, name: "AWS S3", category: "Storage",
    description: "Upload, read, and trigger on file events in any bucket.",
    icon: "🪣", iconBg: "bg-yellow-500/15", status: "connected",
    color: "text-yellow-400",
  },
  {
    id: 32, name: "Cloudinary", category: "Storage",
    description: "Transform and deliver images and video via API.",
    icon: "🖼️", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },
  {
    id: 33, name: "Dropbox", category: "Storage",
    description: "Watch folders, move files, and generate share links.",
    icon: "📦", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },

  // ── AI & ML ───────────────────────────────────────────────
  {
    id: 34, name: "OpenAI", category: "AI & ML",
    description: "GPT-4 completions, embeddings, and image generation.",
    icon: "🤖", iconBg: "bg-green-500/15", status: "connected",
    color: "text-green-400",
  },
  {
    id: 35, name: "Pinecone", category: "AI & ML",
    description: "Upsert and query vectors for long-term memory.",
    icon: "🌲", iconBg: "bg-emerald-500/15", status: "connected",
    color: "text-emerald-400",
  },
  {
    id: 36, name: "Replicate", category: "AI & ML",
    description: "Run open-source models for image, audio, and text.",
    icon: "⚙️", iconBg: "bg-gray-500/15", status: "available",
    color: "text-gray-400",
  },

  // ── Miscellaneous ─────────────────────────────────────────
  {
    id: 37, name: "Zapier", category: "Automation",
    description: "Trigger zaps or listen for zap events inside workflows.",
    icon: "⚡", iconBg: "bg-orange-500/15", status: "available",
    color: "text-orange-400",
  },
  {
    id: 38, name: "Calendly", category: "Scheduling",
    description: "React to booking events and prep meeting briefings.",
    icon: "🗓️", iconBg: "bg-teal-500/15", status: "available",
    color: "text-teal-400",
  },
  {
    id: 39, name: "Loom", category: "Media",
    description: "Transcribe recordings and extract action items automatically.",
    icon: "🎥", iconBg: "bg-violet-500/15", status: "available",
    color: "text-violet-400",
  },
  {
    id: 40, name: "Webflow", category: "CMS",
    description: "Read and write CMS items and trigger on form submissions.",
    icon: "🌐", iconBg: "bg-blue-500/15", status: "available",
    color: "text-blue-400",
  },
];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(INTEGRATIONS.map((i) => i.category)))];

const STATUS_STYLES = {
  connected: "bg-green-500/10 text-green-400 border border-green-500/20",
  available: "bg-[#ffffff08] text-[#666] border border-white/[0.06]",
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function IntegrationsPageComp() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [connectedMap, setConnectedMap] = useState({});

  const toggle = (id, currentStatus) => {
    setConnectedMap((prev) => ({
      ...prev,
      [id]: prev[id] === undefined
        ? (currentStatus === "connected" ? "available" : "connected")
        : prev[id] === "connected" ? "available" : "connected",
    }));
  };

  const getStatus = (integration) =>
    connectedMap[integration.id] !== undefined
      ? connectedMap[integration.id]
      : integration.status;

  const filtered = INTEGRATIONS.filter((ig) => {
    const matchCat = category === "All" || ig.category === category;
    const matchSearch =
      ig.name.toLowerCase().includes(search.toLowerCase()) ||
      ig.description.toLowerCase().includes(search.toLowerCase()) ||
      ig.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const connectedCount = INTEGRATIONS.filter(
    (ig) => getStatus(ig) === "connected"
  ).length;

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6 overflow-auto w-full">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#e0e0e0]">
            Integrations
          </h1>
          <p className="mt-0.5 text-[13px] text-[#555]">
            {connectedCount} connected &middot; {INTEGRATIONS.length - connectedCount} available
          </p>
        </div>
        <button className="rounded-xl bg-[#FFD600] px-4 py-2 text-[12.5px] font-semibold text-[#111] transition-opacity hover:opacity-85">
          + Request Integration
        </button>
      </div>

      {/* Search + Category bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-white/[0.07] bg-[#141414] px-3 py-2">
          <Search size={13} className="text-[#555]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search integrations…"
            className="flex-1 bg-transparent text-[12.5px] text-[#ccc] placeholder-[#444] outline-none"
          />
        </div>

        {/* Category pills — scrollable on mobile */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                category === cat
                  ? "bg-[#FFD600] text-[#111]"
                  : "border border-white/[0.07] bg-[#141414] text-[#666] hover:text-[#aaa]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((ig, i) => {
          const status = getStatus(ig);
          const isConnected = status === "connected";

          return (
            <motion.div
              key={ig.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              whileHover={{ borderColor: "rgba(255,214,0,0.15)" }}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#141414] p-4 transition-colors hover:bg-[#171717]"
            >
              {/* Top */}
              <div className="mb-4 flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl ${ig.iconBg}`}
                >
                  {ig.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-[#ddd]">
                      {ig.name}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[status]}`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] leading-[1.5] text-[#555]">
                    {ig.description}
                  </p>
                  <span className="mt-1.5 inline-block rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-0.5 text-[10px] text-[#444]">
                    {ig.category}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => toggle(ig.id, ig.status)}
                className={`w-full rounded-xl py-2 text-[11.5px] font-semibold transition-all ${
                  isConnected
                    ? "border border-white/[0.07] bg-white/[0.04] text-[#888] hover:bg-white/[0.07] hover:text-[#bbb]"
                    : "bg-[#FFD600] text-[#111] hover:opacity-85"
                }`}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-20 text-center text-[13px] text-[#444]">
          No integrations match your search.
        </div>
      )}
    </div>
  );
}