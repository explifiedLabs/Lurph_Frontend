import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search, Mail, FileText, Bell, Users, Calendar,
  Globe, Slack, Database, BarChart2, Shield, Zap,
  MessageSquare, Code, Layers, Repeat, GitBranch,
  Filter, Download, Upload, Clock, Star, Tag,
  Clipboard, PieChart, TrendingUp, AlertCircle,
  BookOpen, Send, RefreshCw, Link, Eye, Lock,
  CreditCard, Map, Mic, Video, Image, Settings,
} from "lucide-react";
import { FaBrain } from "react-icons/fa";

const WORKFLOWS = [
  // ── Original 6 ──────────────────────────────────────────────
  {
    id: 1,
    name: "Research Summarizer",
    description: "Fetches articles, extracts key points, and sends a daily digest to your inbox.",
    icon: "🧠", iconBg: "bg-purple-500/15", status: "active",
    tools: [
      { label: "Web Search", icon: Search,  color: "text-blue-400" },
      { label: "Email",      icon: Mail,    color: "text-green-400" },
      { label: "Memory",     icon: FaBrain, color: "text-purple-400" },
    ],
  },
  {
    id: 2,
    name: "Competitor Monitor",
    description: "Tracks competitor pricing pages weekly and logs changes to a shared spreadsheet.",
    icon: "📊", iconBg: "bg-blue-500/15", status: "active",
    tools: [
      { label: "Web Search", icon: Search,   color: "text-blue-400" },
      { label: "Sheets",     icon: FileText, color: "text-green-400" },
      { label: "Alerts",     icon: Bell,     color: "text-orange-400" },
    ],
  },
  {
    id: 3,
    name: "Content Drafter",
    description: "Generates blog drafts from a topic brief and saves them to Notion automatically.",
    icon: "✍️", iconBg: "bg-green-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
      { label: "Templates",  icon: Globe,    color: "text-pink-400" },
    ],
  },
  {
    id: 4,
    name: "Lead Qualifier",
    description: "Scores inbound leads from form submissions and notifies the sales team via Slack.",
    icon: "🔔", iconBg: "bg-orange-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Slack",      icon: Slack,   color: "text-teal-400" },
      { label: "CRM",        icon: Users,   color: "text-green-400" },
    ],
  },
  {
    id: 5,
    name: "Meeting Prep Bot",
    description: "Pulls calendar events and prepares a briefing doc with attendee context before each call.",
    icon: "🗓️", iconBg: "bg-teal-500/15", status: "draft",
    tools: [
      { label: "Calendar",   icon: Calendar, color: "text-teal-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
    ],
  },
  {
    id: 6,
    name: "Social Scheduler",
    description: "Repurposes long-form content into tweets and LinkedIn posts, then schedules them.",
    icon: "📱", iconBg: "bg-pink-500/15", status: "draft",
    tools: [
      { label: "Claude API",  icon: FaBrain,  color: "text-purple-400" },
      { label: "Web Search",  icon: Search,   color: "text-blue-400" },
      { label: "Scheduler",   icon: Calendar, color: "text-pink-400" },
    ],
  },

  // ── New 34 ───────────────────────────────────────────────────
  {
    id: 7,
    name: "Invoice Processor",
    description: "Parses incoming invoice emails, extracts line items, and pushes them to QuickBooks.",
    icon: "🧾", iconBg: "bg-yellow-500/15", status: "active",
    tools: [
      { label: "Email",    icon: Mail,     color: "text-green-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "QuickBooks", icon: CreditCard, color: "text-yellow-400" },
    ],
  },
  {
    id: 8,
    name: "Support Ticket Router",
    description: "Classifies incoming support tickets by urgency and assigns them to the right team.",
    icon: "🎫", iconBg: "bg-red-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,       color: "text-purple-400" },
      { label: "Zendesk",    icon: MessageSquare, color: "text-orange-400" },
      { label: "Slack",      icon: Slack,         color: "text-teal-400" },
    ],
  },
  {
    id: 9,
    name: "Data Pipeline Monitor",
    description: "Watches ETL jobs, detects anomalies in row counts, and pages on-call engineers.",
    icon: "🔍", iconBg: "bg-cyan-500/15", status: "active",
    tools: [
      { label: "Database", icon: Database, color: "text-cyan-400" },
      { label: "Alerts",   icon: Bell,     color: "text-orange-400" },
      { label: "Slack",    icon: Slack,    color: "text-teal-400" },
    ],
  },
  {
    id: 10,
    name: "PR Review Summarizer",
    description: "Reads GitHub PRs, summarizes changes, and posts a plain-English comment automatically.",
    icon: "🔀", iconBg: "bg-indigo-500/15", status: "active",
    tools: [
      { label: "GitHub",     icon: GitBranch, color: "text-gray-400" },
      { label: "Claude API", icon: FaBrain,   color: "text-purple-400" },
      { label: "Slack",      icon: Slack,     color: "text-teal-400" },
    ],
  },
  {
    id: 11,
    name: "Onboarding Emailer",
    description: "Sends personalized onboarding sequences triggered by new user sign-ups in your CRM.",
    icon: "👋", iconBg: "bg-emerald-500/15", status: "active",
    tools: [
      { label: "CRM",      icon: Users,   color: "text-green-400" },
      { label: "Email",    icon: Mail,    color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
    ],
  },
  {
    id: 12,
    name: "Weekly Report Builder",
    description: "Aggregates KPIs from multiple dashboards and assembles a PDF report every Monday.",
    icon: "📈", iconBg: "bg-blue-500/15", status: "active",
    tools: [
      { label: "Analytics",  icon: BarChart2, color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain,   color: "text-purple-400" },
      { label: "Email",      icon: Mail,      color: "text-green-400" },
    ],
  },
  {
    id: 13,
    name: "Contract Analyzer",
    description: "Scans uploaded contracts for risky clauses and flags them with a severity score.",
    icon: "📝", iconBg: "bg-amber-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Storage",    icon: Download, color: "text-amber-400" },
      { label: "Email",      icon: Mail,     color: "text-green-400" },
    ],
  },
  {
    id: 14,
    name: "Churn Predictor",
    description: "Runs weekly ML scoring on user activity data and flags at-risk accounts for the CS team.",
    icon: "⚠️", iconBg: "bg-red-500/15", status: "active",
    tools: [
      { label: "Database",   icon: Database,     color: "text-cyan-400" },
      { label: "Claude API", icon: FaBrain,      color: "text-purple-400" },
      { label: "CRM",        icon: Users,        color: "text-green-400" },
    ],
  },
  {
    id: 15,
    name: "Bug Triage Bot",
    description: "Reads Sentry errors, deduplicates them, and creates prioritized GitHub issues.",
    icon: "🐛", iconBg: "bg-orange-500/15", status: "active",
    tools: [
      { label: "Sentry",     icon: AlertCircle, color: "text-red-400" },
      { label: "Claude API", icon: FaBrain,     color: "text-purple-400" },
      { label: "GitHub",     icon: GitBranch,   color: "text-gray-400" },
    ],
  },
  {
    id: 16,
    name: "Customer Interview Digest",
    description: "Transcribes recorded calls, extracts pain points, and syncs insights to Notion.",
    icon: "🎙️", iconBg: "bg-violet-500/15", status: "active",
    tools: [
      { label: "Transcribe", icon: Mic,      color: "text-violet-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
    ],
  },
  {
    id: 17,
    name: "SEO Audit Runner",
    description: "Crawls your site weekly, identifies broken links and missing meta tags, and emails a report.",
    icon: "🔗", iconBg: "bg-teal-500/15", status: "active",
    tools: [
      { label: "Web Search", icon: Search,  color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Email",      icon: Mail,    color: "text-green-400" },
    ],
  },
  {
    id: 18,
    name: "News Aggregator",
    description: "Collects top stories across 10 RSS feeds, deduplicates them, and posts a Slack digest at 9 AM.",
    icon: "📰", iconBg: "bg-sky-500/15", status: "active",
    tools: [
      { label: "RSS/Web",  icon: Globe, color: "text-sky-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Slack",    icon: Slack, color: "text-teal-400" },
    ],
  },
  {
    id: 19,
    name: "Refund Approver",
    description: "Reviews refund requests against policy rules and auto-approves low-risk ones in Stripe.",
    icon: "💳", iconBg: "bg-green-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,    color: "text-purple-400" },
      { label: "Stripe",     icon: CreditCard, color: "text-green-400" },
      { label: "Email",      icon: Mail,       color: "text-blue-400" },
    ],
  },
  {
    id: 20,
    name: "Inventory Reorder",
    description: "Monitors stock levels in real time and triggers purchase orders when thresholds are crossed.",
    icon: "📦", iconBg: "bg-yellow-500/15", status: "active",
    tools: [
      { label: "Database",   icon: Database, color: "text-cyan-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Email",      icon: Mail,     color: "text-green-400" },
    ],
  },
  {
    id: 21,
    name: "A/B Test Analyst",
    description: "Polls experiment results nightly, runs significance tests, and sends a verdict summary.",
    icon: "🔬", iconBg: "bg-indigo-500/15", status: "active",
    tools: [
      { label: "Analytics",  icon: BarChart2, color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain,   color: "text-purple-400" },
      { label: "Slack",      icon: Slack,     color: "text-teal-400" },
    ],
  },
  {
    id: 22,
    name: "Docs Updater",
    description: "Detects code changes in GitHub and automatically updates the corresponding docs pages.",
    icon: "📚", iconBg: "bg-lime-500/15", status: "active",
    tools: [
      { label: "GitHub",     icon: GitBranch, color: "text-gray-400" },
      { label: "Claude API", icon: FaBrain,   color: "text-purple-400" },
      { label: "Notion",     icon: FileText,  color: "text-blue-400" },
    ],
  },
  {
    id: 23,
    name: "Sentiment Tracker",
    description: "Monitors product mentions on Twitter and Reddit and scores brand sentiment daily.",
    icon: "💬", iconBg: "bg-pink-500/15", status: "active",
    tools: [
      { label: "Web Search", icon: Search,   color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Sheets",     icon: FileText, color: "text-green-400" },
    ],
  },
  {
    id: 24,
    name: "Compliance Checker",
    description: "Reviews new feature releases against GDPR and SOC-2 checklists before deployment.",
    icon: "🛡️", iconBg: "bg-red-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "GitHub",     icon: Lock,    color: "text-gray-400" },
      { label: "Slack",      icon: Slack,   color: "text-teal-400" },
    ],
  },
  {
    id: 25,
    name: "Job Posting Writer",
    description: "Takes a hiring brief and generates polished, inclusive job descriptions ready to post.",
    icon: "💼", iconBg: "bg-blue-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
      { label: "Email",      icon: Mail,     color: "text-green-400" },
    ],
  },
  {
    id: 26,
    name: "Error Log Summarizer",
    description: "Aggregates application error logs every hour and posts a concise summary to the ops channel.",
    icon: "🖥️", iconBg: "bg-gray-500/15", status: "active",
    tools: [
      { label: "Database",   icon: Database,    color: "text-cyan-400" },
      { label: "Claude API", icon: FaBrain,     color: "text-purple-400" },
      { label: "Slack",      icon: Slack,       color: "text-teal-400" },
    ],
  },
  {
    id: 27,
    name: "Campaign ROI Tracker",
    description: "Pulls ad spend from Google and Meta, maps it to pipeline, and sends a weekly ROI report.",
    icon: "📣", iconBg: "bg-orange-500/15", status: "active",
    tools: [
      { label: "Analytics",  icon: PieChart,  color: "text-orange-400" },
      { label: "Claude API", icon: FaBrain,   color: "text-purple-400" },
      { label: "Email",      icon: Mail,      color: "text-green-400" },
    ],
  },
  {
    id: 28,
    name: "Renewal Reminder",
    description: "Identifies contracts expiring in 30/60/90 days and sends personalised renewal emails.",
    icon: "🔄", iconBg: "bg-teal-500/15", status: "active",
    tools: [
      { label: "CRM",        icon: Users,    color: "text-green-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Email",      icon: Mail,     color: "text-blue-400" },
    ],
  },
  {
    id: 29,
    name: "Video Caption Generator",
    description: "Transcribes uploaded videos and generates SRT caption files with speaker labels.",
    icon: "🎬", iconBg: "bg-purple-500/15", status: "active",
    tools: [
      { label: "Video",      icon: Video,   color: "text-violet-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Storage",    icon: Upload,  color: "text-blue-400" },
    ],
  },
  {
    id: 30,
    name: "Survey Insight Extractor",
    description: "Processes NPS survey responses, groups themes, and auto-generates an insights deck.",
    icon: "📋", iconBg: "bg-emerald-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,    color: "text-purple-400" },
      { label: "Sheets",     icon: FileText,   color: "text-green-400" },
      { label: "Slides",     icon: Layers,     color: "text-blue-400" },
    ],
  },
  {
    id: 31,
    name: "Pricing Page Monitor",
    description: "Screenshots your own pricing page nightly and alerts you if layout or copy drifts.",
    icon: "👁️", iconBg: "bg-cyan-500/15", status: "active",
    tools: [
      { label: "Web Search", icon: Eye,    color: "text-cyan-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Slack",      icon: Slack,  color: "text-teal-400" },
    ],
  },
  {
    id: 32,
    name: "Deal Desk Assistant",
    description: "Reviews non-standard contract requests, checks approval thresholds, and routes to the right exec.",
    icon: "🤝", iconBg: "bg-amber-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "CRM",        icon: Users,    color: "text-green-400" },
      { label: "Email",      icon: Mail,     color: "text-blue-400" },
    ],
  },
  {
    id: 33,
    name: "Code Review Notifier",
    description: "Pings reviewers in Slack when a PR has been waiting more than 24 hours without feedback.",
    icon: "⏰", iconBg: "bg-red-500/15", status: "active",
    tools: [
      { label: "GitHub",  icon: GitBranch, color: "text-gray-400" },
      { label: "Clock",   icon: Clock,     color: "text-red-400" },
      { label: "Slack",   icon: Slack,     color: "text-teal-400" },
    ],
  },
  {
    id: 34,
    name: "Product Changelog Writer",
    description: "Converts merged PRs and release notes into a user-friendly changelog post each sprint.",
    icon: "🚀", iconBg: "bg-indigo-500/15", status: "active",
    tools: [
      { label: "GitHub",     icon: GitBranch, color: "text-gray-400" },
      { label: "Claude API", icon: FaBrain,   color: "text-purple-400" },
      { label: "Notion",     icon: FileText,  color: "text-blue-400" },
    ],
  },
  {
    id: 35,
    name: "Ad Copy Generator",
    description: "Creates 5 variations of Google / Meta ad copy from a product brief and a target persona.",
    icon: "✨", iconBg: "bg-yellow-500/15", status: "active",
    tools: [
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Sheets",     icon: FileText, color: "text-green-400" },
      { label: "Email",      icon: Mail,     color: "text-blue-400" },
    ],
  },
  {
    id: 36,
    name: "Internal Wiki Linker",
    description: "Scans new Notion pages for topics that lack internal links and suggests relevant connections.",
    icon: "🔗", iconBg: "bg-violet-500/15", status: "active",
    tools: [
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Slack",      icon: Slack,    color: "text-teal-400" },
    ],
  },
  {
    id: 37,
    name: "Geo Expansion Researcher",
    description: "Pulls market-size data and regulatory info for target expansion countries and compiles a briefing.",
    icon: "🌍", iconBg: "bg-green-500/15", status: "draft",
    tools: [
      { label: "Web Search", icon: Search,  color: "text-blue-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
    ],
  },
  {
    id: 38,
    name: "Image Alt-Text Writer",
    description: "Processes image uploads in bulk and generates SEO-optimised alt text for each one.",
    icon: "🖼️", iconBg: "bg-pink-500/15", status: "draft",
    tools: [
      { label: "Storage",    icon: Image,   color: "text-pink-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Sheets",     icon: FileText, color: "text-green-400" },
    ],
  },
  {
    id: 39,
    name: "Podcast Show Notes",
    description: "Transcribes episodes and drafts chapters, key quotes, and a summary ready for publish.",
    icon: "🎧", iconBg: "bg-orange-500/15", status: "draft",
    tools: [
      { label: "Transcribe", icon: Mic,      color: "text-violet-400" },
      { label: "Claude API", icon: FaBrain,  color: "text-purple-400" },
      { label: "Notion",     icon: FileText, color: "text-blue-400" },
    ],
  },
  {
    id: 40,
    name: "Proposal Personalizer",
    description: "Pulls CRM deal context and customises a proposal template for each prospect automatically.",
    icon: "📄", iconBg: "bg-sky-500/15", status: "draft",
    tools: [
      { label: "CRM",        icon: Users,   color: "text-green-400" },
      { label: "Claude API", icon: FaBrain, color: "text-purple-400" },
      { label: "Email",      icon: Mail,    color: "text-blue-400" },
    ],
  },
];

const STATUS_STYLES = {
  active: "bg-green-500/10 text-green-400 border border-green-500/20",
  draft:  "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
};

const FILTERS = ["All", "Active", "Drafts"];

export default function WorkflowsPageComp() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = WORKFLOWS.filter((wf) => {
    const matchStatus =
      filter === "All" ||
      (filter === "Active" && wf.status === "active") ||
      (filter === "Drafts" && wf.status === "draft");
    const matchSearch =
      wf.name.toLowerCase().includes(search.toLowerCase()) ||
      wf.description.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6 overflow-auto">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#e0e0e0]">
            Workflows
          </h1>
          <p className="mt-0.5 text-[13px] text-[#555]">
            {WORKFLOWS.filter((w) => w.status === "active").length} active &middot;{" "}
            {WORKFLOWS.filter((w) => w.status === "draft").length} drafts
          </p>
        </div>
        <button
          onClick={() => navigate("/chat/project/new")}
          className="rounded-xl bg-[#FFD600] px-4 py-2 text-[12.5px] font-semibold text-[#111] transition-opacity hover:opacity-85"
        >
          + New Workflow
        </button>
      </div>

      {/* Search + Filter bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 min-w-[180px] items-center gap-2 rounded-xl border border-white/[0.07] bg-[#141414] px-3 py-2">
          <Search size={13} className="text-[#555]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows…"
            className="flex-1 bg-transparent text-[12.5px] text-[#ccc] placeholder-[#444] outline-none"
          />
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                filter === f
                  ? "bg-[#FFD600] text-[#111]"
                  : "border border-white/[0.07] bg-[#141414] text-[#666] hover:text-[#aaa]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((wf, i) => (
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.02 }}
            whileHover={{ borderColor: "rgba(255,214,0,0.2)" }}
            // onClick={() => navigate(`/workflows/${wf.id}`)}
            className="cursor-pointer rounded-2xl border border-white/[0.06] bg-[#141414] p-4 transition-colors hover:bg-[#171717]"
          >
            {/* Top row */}
            <div className="mb-3 flex items-start gap-3">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl ${wf.iconBg}`}
              >
                {wf.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold text-[#ddd]">
                    {wf.name}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[wf.status]}`}
                  >
                    {wf.status}
                  </span>
                </div>
                <p className="mt-1 text-[11.5px] leading-[1.5] text-[#555]">
                  {wf.description}
                </p>
              </div>
            </div>

            {/* Tools used */}
            <div className="flex flex-wrap gap-1.5">
              {wf.tools.map((tool) => (
                <div
                  key={tool.label}
                  className="flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1"
                >
                  <tool.icon size={10} className={tool.color} />
                  <span className="text-[10.5px] text-[#555]">{tool.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-20 text-center text-[13px] text-[#444]">
          No workflows match your search.
        </div>
      )}
    </div>
  );
}