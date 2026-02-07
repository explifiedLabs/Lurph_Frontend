import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Bot,
  Zap,
  Globe,
  Shield,
  Clock,
  BarChart3,
  Star,
  Layers,
  ArrowRight,
  Code,
  MessageSquare,
  Cpu,
  MoreHorizontal,
  User,
  Image as ImageIcon,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Key,
  Lock,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import logo from "../src/expli1-logo.png";
import mainlogo from "../src/Explified_logo.png";
import { useState } from "react";

// --- Configuration ---
// Base Color: #23b5b5 (Cyan)

const ExpliHeader = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-white/5"
    >
      {/* Content wrapper to center items, but header background is full width */}
      <div className="grid grid-cols-3 items-center  px-4 sm:px-6 py-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <a
          href="https://explified.com/"
          className="flex items-center space-x-2 justify-self-start"
        >
          <div className="bg-[#23b5b5]/10 p-1 rounded-lg">
            <img src={logo} className="h-12 w-12 text-[#23b5b5]" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white">
            Expli
          </span>
          <span className="text-xs md:text-sm font-semibold text-[#23b5b5] tracking-normal">
            <a
              href="https://explified.com"
              rel="noopener noreferrer"
              className="text-[13px] font-medium tracking-wide"
              style={{ color: "#1B8F8F" }}
            >
              by Explified
            </a>
          </span>
        </a>

        {/* Nav links – scroll to sections on the same page */}
        <nav className="hidden md:flex items-center space-x-8 justify-self-center">
          <a
            href="#integrations"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Integrations
          </a>
          <a
            href="#product"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Product
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Pricing
          </a>
          <a
            href="#resources"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Resources
          </a>
        </nav>

        {/* Sign in only – brand color button */}
        <div className="flex items-center justify-self-end">
          <a
            href="https://app.explified.com/expli"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-[#23b5b5] text-[#020617] hover:bg-[#1e9d9d] transition-colors shadow-lg"
          >
            Try now
          </a>
        </div>
      </div>
    </motion.header>
  );
};

// --- Floating Blob Component for Ambient Background Animation ---
const FloatingBlob = ({ size, color, top, left, duration, delay }) => (
  <motion.div
    initial={{ opacity: 0.3, scale: 0.8 }}
    animate={{
      y: ["0%", "10%", "0%"],
      x: ["0%", "5%", "0%"],
      scale: [0.9, 1.1, 0.9],
      opacity: [0.3, 0.6, 0.3],
      rotate: [0, 30, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    className="absolute rounded-full pointer-events-none filter blur-3xl mix-blend-screen opacity-50"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      top: top,
      left: left,
      zIndex: 0,
    }}
  />
);

// --- Reusable Animated Section Wrapper ---
const AnimatedSection = ({
  children,
  className,
  delay = 0.1,
  duration = 0.8,
}) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: duration, ease: "easeOut", delay: delay }}
    className={className}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
  </motion.section>
);

// --- Animated Connecting Line Component ---
const ConnectingLine = ({ from, to, curvature = 50, delay = 0 }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      {/* Base Line */}
      <motion.path
        d={`M${from.x} ${from.y} C ${from.x + curvature} ${from.y}, ${
          to.x - curvature
        } ${to.y}, ${to.x} ${to.y}`}
        fill="none"
        stroke="#23b5b5"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      {/* Animated Pulse */}
      <motion.path
        d={`M${from.x} ${from.y} C ${from.x + curvature} ${from.y}, ${
          to.x - curvature
        } ${to.y}, ${to.x} ${to.y}`}
        fill="none"
        stroke="#23b5b5"
        strokeWidth="2"
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 0.3, 0],
          pathOffset: [0, 1, 1],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        style={{ strokeLinecap: "round" }}
      />
      {/* Floating Orb */}
      <motion.circle r="3" fill="#23b5b5" filter="url(#glow)">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={`M${from.x} ${from.y} C ${from.x + curvature} ${from.y}, ${
            to.x - curvature
          } ${to.y}, ${to.x} ${to.y}`}
          begin={`${delay}s`}
        />
      </motion.circle>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

// --- Hero Floating Cards ---
// Card 1: Bot Response (Top Left)
const BotResponseCard = ({ style }) => (
  <motion.div
    initial={{ opacity: 0, x: -20, rotate: -5 }}
    animate={{ opacity: 1, x: 0, rotate: 0 }}
    transition={{ delay: 0.5 }}
    style={style}
    className="absolute left-4 top-20 md:left-[10%] md:top-[180px] w-64 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl z-20"
  >
    <div className="flex items-center space-x-2 mb-3">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <span className="text-xs font-medium text-slate-400">Bot response</span>
    </div>
    <div className="space-y-3">
      <div className="bg-slate-800/50 p-2 rounded-lg">
        <p className="text-xs text-slate-300">
          How many payment methods for this?
        </p>
      </div>
      <div className="flex gap-2">
        <span className="px-2 py-1 rounded-full bg-[#23b5b5]/10 text-[#23b5b5] text-[10px] border border-[#23b5b5]/20">
          Offer
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] border border-slate-700">
          Contact us
        </span>
        <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] border border-slate-700">
          Issues
        </span>
      </div>
    </div>
  </motion.div>
);

// Card 2: User List (Top Right)
const UserListCard = ({ style }) => (
  <motion.div
    initial={{ opacity: 0, x: 20, rotate: 5 }}
    animate={{ opacity: 1, x: 0, rotate: 0 }}
    transition={{ delay: 0.7 }}
    style={style}
    className="absolute right-4 top-20 md:right-[10%] md:top-[150px] w-64 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl z-20"
  >
    <div className="flex justify-between items-center mb-4">
      <span className="text-xs font-medium text-slate-400">User list</span>
      <MoreHorizontal className="w-4 h-4 text-slate-500" />
    </div>
    <div className="space-y-3">
      {[
        { name: "James Lamo", role: "james@mail.com", bg: "bg-purple-500" },
        { name: "Stevie Wonder", role: "stevie@mail.com", bg: "bg-yellow-500" },
        { name: "Mick Dral", role: "mick@mail.com", bg: "bg-green-500" },
      ].map((u, i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full ${u.bg} flex items-center justify-center text-[10px] text-white font-bold`}
          >
            {u.name.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">{u.name}</div>
            <div className="text-[10px] text-slate-500">{u.role}</div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Card 3: Chat List History (Center Low)
const ChatListHistory = ({ style }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    style={style}
    className="absolute left-1/2 -translate-x-1/2 top-[450px] w-[90%] md:w-[400px] bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl z-20"
  >
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs font-medium text-slate-400">
        Question list history
      </span>
      <div className="w-4 h-4 rounded-full border border-slate-600" />
    </div>
    <div className="space-y-3">
      {[
        {
          q: "How many payment methods for this?",
          time: "Just now",
          icon: User,
          color: "text-blue-400",
        },
        {
          q: "I need you, help with this",
          time: "2 min ago",
          icon: Bot,
          color: "text-[#23b5b5]",
        },
        {
          q: "Hello would like to know more information...",
          time: "5 min ago",
          icon: User,
          color: "text-blue-400",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-2 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
        >
          <div className={`mt-0.5 p-1 rounded-md bg-slate-800 ${item.color}`}>
            <item.icon size={12} />
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-300 line-clamp-1">{item.q}</div>
            <div className="text-[10px] text-slate-600">{item.time}</div>
          </div>
          <MoreHorizontal size={12} className="text-slate-600" />
        </div>
      ))}
    </div>
  </motion.div>
);

// Card 4: System Status (Bottom Left)
const SystemStatusCard = ({ style }) => (
  <motion.div
    initial={{ opacity: 0, x: -10, y: 10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay: 1.1 }}
    style={style}
    className="absolute left-4 top-[500px] md:left-[5%] md:top-[550px] w-40 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-xl p-4 shadow-2xl z-20"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-slate-400">System Status</span>
      <CheckCircle size={14} className="text-green-500" />
    </div>
    <p className="text-2xl font-bold text-green-400 mb-1">Operational</p>
    <p className="text-[10px] text-slate-500">All services running smoothly</p>
    <div className="mt-3 text-[10px] text-slate-600">
      Latency: <span className="text-slate-300">85ms</span>
    </div>
  </motion.div>
);

// Card 5: Sentiment Score (Bottom Right)
const SentimentScoreCard = ({ style }) => (
  <motion.div
    initial={{ opacity: 0, x: 10, y: 10 }}
    animate={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay: 1.3 }}
    style={style}
    className="absolute right-4 top-[500px] md:right-[5%] md:top-[580px] w-44 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 rounded-xl p-4 shadow-2xl z-20"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-slate-400">
        Sentiment Score
      </span>
      <TrendingUp size={14} className="text-yellow-400" />
    </div>
    <p className="text-3xl font-bold text-white mb-1 flex items-baseline">
      92<span className="text-base text-yellow-400 ml-1">+2%</span>
    </p>
    <p className="text-[10px] text-slate-500">Positive customer interactions</p>
    <div className="mt-3 text-[10px] text-slate-600 flex justify-between">
      <span className="text-red-400 flex items-center">
        <TrendingDown size={10} className="mr-0.5" /> 8% Negative
      </span>
    </div>
  </motion.div>
);

// --- Feature Card Component ---
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: "easeOut", delay: delay }}
    whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(35, 181, 181, 0.2)" }}
    className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-[#23b5b5]/30 transition-all group relative overflow-hidden"
  >
    <div className="absolute inset-0 w-full h-full opacity-5 bg-gradient-to-br from-[#23b5b5] to-transparent pointer-events-none" />
    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#23b5b5]/10 transition-colors">
      <Icon className="text-slate-400 group-hover:text-[#23b5b5] transition-colors" />
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-200">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </motion.div>
);

// --- BYOK Section ---
const BYOKSection = () => (
  <AnimatedSection
    className="py-24 bg-[#020617] border-t border-slate-900 w-full"
    delay={0.1}
  >
    <div
      id="product"
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="inline-flex items-center gap-2 text-[#23b5b5] font-semibold tracking-wider text-sm uppercase"
        >
          <Key className="w-4 h-4" />
          BYOK Security
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mt-3 text-white"
        >
          Bring your own key.
          <br />
          Keep full control.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 mt-4 text-lg max-w-xl"
        >
          Plug in your own OpenAI, Anthropic, or other LLM keys. Expli
          orchestrates conversations, logging, and analytics — your usage and
          billing stay with your own provider.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-3 text-sm text-slate-300"
        >
          {[
            "Keys are stored encrypted-at-rest with rotation.",
            "Per-environment keys (dev, staging, production).",
            "Fine-grained control on which bots use which key.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#23b5b5] mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-tr from-[#23b5b5] via-cyan-500 to-slate-900 rounded-3xl opacity-40 blur-xl" />
        <div className="relative bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#23b5b5]/20 flex items-center justify-center">
                <Lock className="w-4 h-4 text-[#23b5b5]" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Key Manager</div>
                <div className="text-sm text-slate-200">
                  Production workspace
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
              Encrypted
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400">Connected Models</span>
                <span className="text-[10px] text-slate-500">
                  Auto-rotate enabled
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                {[
                  { name: "OpenAI", short: "openai", active: true },
                  { name: "Anthropic", short: "claude", active: true },
                  { name: "Custom", short: "proxy", active: false },
                ].map((m) => (
                  <div
                    key={m.name}
                    className={`rounded-xl px-3 py-2 border flex flex-col gap-1 ${
                      m.active
                        ? "border-[#23b5b5]/60 bg-[#23b5b5]/5"
                        : "border-slate-700 bg-slate-900/50"
                    }`}
                  >
                    <span
                      className={`text-[10px] uppercase tracking-wide ${
                        m.active ? "text-[#23b5b5]" : "text-slate-500"
                      }`}
                    >
                      {m.short}
                    </span>
                    <span className="text-[11px] text-slate-200">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Usage routing</span>
                <span className="text-[10px] text-slate-500">
                  Per-bot rules
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Support Bot → OpenAI</span>
                <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                  Default
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">
                  Analytics Bot → Anthropic
                </span>
                <span className="px-2 py-1 rounded-full bg-slate-800 text-slate-400">
                  High context
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </AnimatedSection>
);

// --- Pricing Section (Coming Soon, no numbers) ---
const PricingSection = ({ hovered, setHovered }) => (
  <AnimatedSection
    className="py-24 bg-gradient-to-b from-slate-950 to-[#020617] border-t border-slate-900 w-full"
    delay={0.1}
  >
    <div id="pricing" className="text-center mb-14">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-[#23b5b5] font-semibold tracking-wider text-sm uppercase"
      >
        Pricing
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold mt-3 text-white"
      >
        Simple plans, coming soon.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mt-4 max-w-xl mx-auto"
      >
        We&apos;re finalizing pricing that works for teams of every size. No
        hidden fees, no surprise add-ons.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        {
          name: "Starter",
          badge: "For early teams",
          perks: [
            "Single workspace",
            "Basic analytics",
            "Up to a few team members",
          ],
        },
        {
          name: "Growth",
          badge: "Most flexible",
          highlight: true,
          perks: [
            "Multiple workspaces",
            "Advanced analytics",
            "Priority routing & BYOK",
          ],
        },
        {
          name: "Enterprise",
          badge: "Custom rollouts",
          perks: [
            "Dedicated support",
            "Custom data residency",
            "Security reviews & SSO",
          ],
        },
      ].map((plan, idx) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          onHoverStart={() => setHovered(idx)}
          onHoverEnd={() => setHovered(1)}
          viewport={{ once: true, margin: "-100px" }}
          className={`relative rounded-3xl border p-8 flex flex-col gap-5 bg-slate-950/80 transition-all duration-300 ${
            hovered === idx
              ? "border-[#23b5b5] shadow-[0_0_40px_rgba(35,181,181,0.35)]"
              : "border-slate-800"
          }`}
        >
          {plan.highlight && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#23b5b5] text-xs font-semibold text-slate-900">
              Recommended
            </span>
          )}
          <div className="text-left">
            <div className="text-sm text-slate-400 mb-1">{plan.badge}</div>
            <div className="text-2xl font-bold text-white">{plan.name}</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[#23b5b5] font-semibold">
              Coming soon
            </span>
          </div>
          <ul className="mt-2 space-y-2 text-sm text-slate-300 flex-1">
            {plan.perks.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#23b5b5] mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://app.explified.com/expli"
            target="_blank"
            rel="noreferrer"
            className={`mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              plan.highlight
                ? "bg-[#23b5b5] text-slate-900 hover:bg-[#1fa0a0]"
                : "bg-slate-900 text-slate-100 hover:bg-slate-800"
            }`}
          >
            Notify me
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </motion.div>
      ))}
    </div>
  </AnimatedSection>
);

// --- Main App Component ---

const Expli = () => {
  const { scrollYProgress } = useScroll();
  const [hovered, setHovered] = useState(1);

  console.log(hovered);

  // Transforms for hero cards
  const card1Y = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const card1X = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.4], [0, -5]);
  const card1Opacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.5]);

  const card2Y = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const card2X = useTransform(scrollYProgress, [0, 0.4], [0, 70]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.4], [0, 5]);
  const card2Opacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.5]);

  const card3Y = useTransform(scrollYProgress, [0, 0.4], [0, 50]);
  const card3Opacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0]);

  const card4Y = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const card4X = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.4], [0, -3]);
  const card4Opacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.6]);

  const card5Y = useTransform(scrollYProgress, [0, 0.4], [0, -70]);
  const card5X = useTransform(scrollYProgress, [0, 0.4], [0, 50]);
  const card5Rotate = useTransform(scrollYProgress, [0, 0.4], [0, 3]);
  const card5Opacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.6]);

  const card1Style = {
    y: card1Y,
    x: card1X,
    rotate: card1Rotate,
    opacity: card1Opacity,
  };
  const card2Style = {
    y: card2Y,
    x: card2X,
    rotate: card2Rotate,
    opacity: card2Opacity,
  };
  const card3Style = { y: card3Y, opacity: card3Opacity };
  const card4Style = {
    y: card4Y,
    x: card4X,
    rotate: card4Rotate,
    opacity: card4Opacity,
  };
  const card5Style = {
    y: card5Y,
    x: card5X,
    rotate: card5Rotate,
    opacity: card5Opacity,
  };

  // CTA transforms
  const ctaScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const ctaY = useTransform(scrollYProgress, [0, 0.2], [0, -10]);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-[#23b5b5]/30 relative w-full overflow-x-hidden">
      {/* Background Grid and Floating Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(35,181,181,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(35,181,181,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <FloatingBlob
        size="600px"
        color="#23b5b5"
        top="5%"
        left="5%"
        duration={18}
        delay={0}
      />
      <FloatingBlob
        size="400px"
        color="#4f46e5"
        top="30%"
        left="70%"
        duration={15}
        delay={5}
      />
      <FloatingBlob
        size="300px"
        color="#f97316"
        top="60%"
        left="30%"
        duration={12}
        delay={10}
      />

      <ExpliHeader />

      {/* Hero Section */}
      <main className="relative pt-40 pb-40 min-h-[1000px] w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main Text Content */}
          <div className="relative z-30 text-center max-w-6xl mx-auto mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
            >
              <span className="whitespace-nowrap">
                A Powerful Virtual Assistant
              </span>
              <br />
              With <span className="text-[#23b5b5]">AI Power.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base text-slate-400 mb-8 max-w-xl mx-auto"
            >
              Help your virtual assistant without headaches, supported by AI
              technology.
            </motion.p>
          </div>

          {/* Central Interaction Area */}
          <div className="relative w-full max-w-[1000px] mx-auto h-[600px]">
            {/* Central CTA – single Coming Soon pill */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ scale: ctaScale, y: ctaY }}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-full max-w-md z-30"
            >
              <a
                href="https://app.explified.com/expli"
                target="_blank"
                rel="noreferrer"
                className="relative group block"
              >
                {/* Animated glow border */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(14,101,101,0.2)",
                      "0 0 25px rgba(14,101,101,0.6)",
                      "0 0 10px rgba(14,101,101,0.2)",
                    ],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-1 rounded-full opacity-70 blur-md bg-gradient-to-r from-[#0e6565] to-[#23b5b5]"
                />

                {/* Main pill */}
                <motion.div
                  whileHover={{
                    scale: 1.07,
                    backgroundColor: "#0b3f3f",
                    boxShadow: "0 12px 35px rgba(35,181,181,0.45)",
                  }}
                  animate={{
                    y: ["0px", "-6px", "0px"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative bg-gradient-to-r from-[#11a493] to-[#0c9191] 
             border border-[#5eead4]/30 
             rounded-full px-7 py-3 shadow-[0_8px_30px_rgba(20,184,166,0.35)] 
             flex items-center justify-center"
                >
                  <span className="text-sm font-semibold text-black tracking-wide">
                    Try now
                  </span>

                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="absolute right-3 w-2 h-2 rounded-full bg-white/70"
                  />
                </motion.div>
              </a>
            </motion.div>

            {/* Connecting Lines */}
            <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
              <ConnectingLine
                from={{ x: 500, y: 35 }}
                to={{ x: 200, y: 200 }}
                curvature={-100}
                delay={0}
              />
              <ConnectingLine
                from={{ x: 500, y: 35 }}
                to={{ x: 800, y: 200 }}
                curvature={100}
                delay={1.5}
              />
              <ConnectingLine
                from={{ x: 500, y: 35 }}
                to={{ x: 500, y: 450 }}
                curvature={0}
                delay={0.8}
              />

              <ConnectingLine
                from={{ x: 500, y: 450 }}
                to={{ x: 150, y: 580 }}
                curvature={-50}
                delay={2.5}
              />
              <ConnectingLine
                from={{ x: 500, y: 450 }}
                to={{ x: 850, y: 610 }}
                curvature={50}
                delay={3.5}
              />

              <ConnectingLine
                from={{ x: 200, y: 200 }}
                to={{ x: 800, y: 200 }}
                curvature={0}
                delay={4.5}
              />
            </div>

            {/* Floating Cards */}
            <BotResponseCard style={card1Style} />
            <UserListCard style={card2Style} />
            <ChatListHistory style={card3Style} />
            <SystemStatusCard style={card4Style} />
            <SentimentScoreCard style={card5Style} />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="absolute left-[30%] top-[250px] bg-[#0f172a] border border-slate-800 p-3 rounded-xl shadow-lg z-20 w-48 hidden md:block"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-300">
                  Please note
                </span>
                <MoreHorizontal size={12} className="text-slate-600" />
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg mb-2">
                <div className="font-serif text-lg italic text-slate-400">
                  T
                </div>
                <div className="h-1 w-12 bg-slate-700 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-slate-800 text-slate-500">
                  <ImageIcon size={10} />
                </div>
                <span className="text-[10px] text-slate-500">
                  Image Processing
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-[#020617] to-slate-950 w-full">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-[#23b5b5] font-semibold tracking-wider text-sm uppercase"
          >
            Powerful Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mt-2 text-white"
          >
            Everything you need to scale
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: "Global Reach",
              desc: "Connect with customers anywhere in the world with real-time translation.",
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              desc: "Bank-grade encryption and SOC2 compliance to keep data safe.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Responses generated in milliseconds using advanced caching.",
            },
            {
              icon: Clock,
              title: "24/7 Availability",
              desc: "Never miss a query. Expli works tirelessly around the clock.",
            },
            {
              icon: BarChart3,
              title: "Deep Analytics",
              desc: "Gain insights into customer sentiment and query patterns.",
            },
            {
              icon: Cpu,
              title: "Custom Models",
              desc: "Fine-tune the AI on your specific business data and documents.",
            },
          ].map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={i * 0.1} />
          ))}
        </div>
      </AnimatedSection>

      {/* BYOK Section */}
      <BYOKSection />

      {/* Integrations */}
      <AnimatedSection
        className="py-24 border-t border-slate-900 bg-[#020617] relative w-full"
        delay={0.1}
      >
        <div
          id="integrations"
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 text-[#23b5b5] font-semibold tracking-wider text-sm uppercase"
            >
              <Globe className="w-4 h-4" />
              Ecosystem
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mt-2 text-white"
            >
              Seamless Integrations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 mt-4 text-lg"
            >
              Connect Expli with your favorite tools. We support over 50+
              integrations out of the box so you can get started in minutes.
            </motion.p>
          </div>
          <a href="https://app.explified.com/integrations">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-white font-semibold hover:text-[#23b5b5] transition-colors group"
            >
              View all integrations{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Slack", icon: MessageSquare, desc: "Chat directly" },
            { name: "VS Code", icon: Code, desc: "Code assistant" },
            { name: "Notion", icon: Layers, desc: "Knowledge base" },
            { name: "Zapier", icon: Zap, desc: "Automate workflows" },
            { name: "Discord", icon: MessageSquare, desc: "Community mod" },
            { name: "GitHub", icon: Code, desc: "PR Reviews" },
            { name: "Jira", icon: Layers, desc: "Ticket management" },
            { name: "Intercom", icon: MessageSquare, desc: "Customer support" },
          ].map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-[#23b5b5]/50 transition-all cursor-pointer group flex items-center gap-4 shadow-md"
            >
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-[#23b5b5] group-hover:text-slate-900 transition-colors text-slate-400">
                <tool.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-200">{tool.name}</h4>
                <p className="text-xs text-slate-500">{tool.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Pricing (Coming soon) */}
      <PricingSection hovered={hovered} setHovered={setHovered} />

      {/* Bottom Innovation Section */}
      <AnimatedSection className="py-24 relative overflow-hidden w-full">
        <div className="text-center">
          <div className="relative h-[400px] max-w-4xl mx-auto flex justify-center items-end pb-10">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(35,181,181,0)",
                  "0 0 40px rgba(35,181,181,0.8)",
                  "0 0 20px rgba(35,181,181,0)",
                ],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-[#23b5b5] rounded-2xl flex items-center justify-center relative z-20 shadow-2xl"
            >
              <Sparkles className="text-white w-8 h-8" fill="white" />
            </motion.div>

            <svg
              className="absolute bottom-18 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none z-10 max-w-4xl"
              viewBox="0 0 800 300"
              preserveAspectRatio="xMidYBottom meet"
            >
              <path
                d="M400 300 C 400 200, 100 200, 100 100"
                fill="none"
                stroke="#23b5b5"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <path
                d="M400 300 C 400 200, 250 200, 250 150"
                fill="none"
                stroke="#23b5b5"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <path
                d="M400 300 C 400 200, 550 200, 550 150"
                fill="none"
                stroke="#23b5b5"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <path
                d="M400 300 C 400 200, 700 200, 700 100"
                fill="none"
                stroke="#23b5b5"
                strokeWidth="1"
                strokeOpacity="0.3"
              />

              <motion.path
                d="M400 300 C 400 200, 100 200, 100 100"
                stroke="#23b5b5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="30 10"
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M400 300 C 400 200, 700 200, 700 100"
                stroke="#23b5b5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="30 10"
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
              />
              <motion.path
                d="M400 300 C 400 200, 250 200, 250 150"
                stroke="#23b5b5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="30 10"
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
              <motion.path
                d="M400 300 C 400 200, 550 200, 550 150"
                stroke="#23b5b5"
                strokeWidth="2"
                fill="none"
                strokeDasharray="30 10"
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5,
                }}
              />

              <circle cx="100" cy="100" r="4" fill="#23b5b5" />
              <circle cx="250" cy="150" r="4" fill="#23b5b5" />
              <circle cx="550" cy="150" r="4" fill="#23b5b5" />
              <circle cx="700" cy="100" r="4" fill="#23b5b5" />
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute left-[12.5%] bottom-[76%] -translate-x-1/2 bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700"
            >
              <span className="text-xs text-[#23b5b5] font-semibold">
                Deep Learning
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute left-[31.25%] bottom-[59%] -translate-x-1/2 bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700"
            >
              <span className="text-xs text-[#23b5b5] font-semibold">
                NLP Core
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute left-[68.75%] bottom-[59%] -translate-x-1/2 bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700"
            >
              <span className="text-xs text-[#23b5b5] font-semibold">
                Automation
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute left-[87.5%] bottom-[76%] -translate-x-1/2 bg-slate-800/80 backdrop-blur px-3 py-1 rounded-full border border-slate-700"
            >
              <span className="text-xs text-[#23b5b5] font-semibold">
                Analytics
              </span>
            </motion.div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl md:text-4xl font-bold mt-8 mb-4"
          >
            Innovations in the field of chatbots
            <br />
            that transform the industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-2xl mx-auto"
          >
            With our advanced chatbot solutions, you will be able to maximize
            customer engagement and efficiency to a whole new level.
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Global Explified Footer (replaces old footer) */}
      <footer className="bg-black pt-16 pb-8 border-t border-white/10 text-sm w-full">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {/* Top link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-gray-400">
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://labs.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Labs
                  </a>
                </li>
                <li>
                  <a
                    href="https://stream.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Stream
                  </a>
                </li>
                <li>
                  <a
                    href="https://developer.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Developer
                  </a>
                </li>
                <li>
                  <a
                    href="https://affiliate.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Affiliate
                  </a>
                </li>
                <li>
                  <a
                    href="https://beacon.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Beacon
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://notes.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Notes
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/quickshot/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    QuickShot
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/youtube-summarizer"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Youtube Summariser
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/yt-insight-saas/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    YT Insight
                  </a>
                </li>
                <li>
                  <a
                    href="https://expli.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Expli
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://explified.com/blog"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://projects.explified.com/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Our Projects
                  </a>
                </li>
                <li>
                  <a
                    href="https://community.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://academy.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Academy
                  </a>
                </li>
                <li>
                  <a
                    href="https://events.explified.com"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://explified.com/about-us/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/partners/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/terms-of-service/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/privacy-policy/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://explified.com/refund-terms/"
                    className="hover:text-[#23b5b5] transition-colors"
                  >
                    Refund Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center">
                <img src={mainlogo} className="h-6 w-10 text-[#23b5b5]" />
              </div>
              <span className="font-semibold text-white text-base">
                Explified
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              <a
                href="https://instagram.com/explified"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-xs md:text-sm">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/explified/"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-xs md:text-sm">LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@explified"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span className="text-xs md:text-sm">YouTube</span>
              </a>
              <a
                href="https://x.com/explified"
                className="flex items-center gap-2 hover:text-[#23b5b5] transition-colors"
              >
                <Twitter className="w-4 h-4" />
                <span className="text-xs md:text-sm">Twitter / X</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Expli;
