// Sidebar.jsx
import React, { useState } from "react";
import SidebarItem from "../ai-fiesta/SidebarItem";
import ChatHistoryPopover from "./ChatHistoryPopover";
import ToolsPopover from "../ai-fiesta/ToolsPopover";
import {
  FaPlus,
  FaRegCommentDots,
  FaRegFileAlt,
  FaTools,
} from "react-icons/fa";
import ExpliIntegration from "./ExpliIntegration";
import { Link, useNavigate } from "react-router-dom";
import SettingsModal from "./SettingsModal";
import SettingsPortal from "./SettingsPortal";
import { ChevronLeft, CircleUserRound, LayoutDashboard } from "lucide-react";
import { IoIosGitCompare } from "react-icons/io";
import ProfileSettingsModal from "../components/subLayoutComponents/ProfileSettingsModal";
import { useExpli } from "../context/ExpliContext";

export default function ExpliSidebar({
  activeSection,
  setActiveSection,
  isMobileOpen,
  setIsMobileOpen,
}) {
  const { newChat } = useExpli();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      section: "dashboard",
      url: "/",
    },
    {
      icon: FaRegFileAlt,
      label: "Discover",
      section: "discover",
      url: "discover",
    },
    {
      icon: IoIosGitCompare, // Placeholder icon, using LayoutDashboard from lucide-react as imported
      label: "Compare",
      section: "compare",
      url: "compare",
    },
  ];

  const [showHistory, setShowHistory] = React.useState(false);
  const [showTools, setShowTools] = React.useState(false);

  return (
    <>
      {/* Overlay (mobile only) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
      fixed lg:static top-0 left-0 h-full
      z-50
      w-16 lg:w-16
      flex flex-col justify-between py-2
      bg-[#050505] text-white border-r border-white/5 shadow-inner
      transition-transform duration-300
      ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
      >
        <div className="flex flex-col items-center gap-3">
          <button
            className="lg:hidden text-gray-300 text-xl"
            onClick={() => setIsMobileOpen(false)}
          >
            ✕
          </button>

          {/* Logo - Updated to Yellow Gradient and Shadow */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer bg-[linear-gradient(135deg,#FFD600,#D97706)] shadow-[0_4px_16px_rgba(250,204,21,0.25)]"
            onClick={() => {
              navigate("/expli");
              newChat();
            }}
            title="Expli"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black" /* Stroke changed to black for better contrast on yellow */
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>

          {/* New Chat + history */}
          <div className="flex flex-col items-center gap-2 relative">
            <button
              onClick={() => setShowHistory(true)}
              className="flex flex-col items-center w-full py-2 hover:bg-white/5 rounded-xl 
          transition relative group
          hover:text-[#FFD600] text-gray-400"
              title="Chat History"
            >
              <FaRegCommentDots size={20} />
              <span
                className={`text-[11px] mt-1 font-semibold group-hover:text-[#FFD600] text-gray-500`}
              >
                Chats
              </span>
            </button>
          </div>

          {/* main nav */}
          <div className="space-y-2">
            {sidebarItems.map((it) => (
              <SidebarItem
                key={it.section}
                icon={it.icon}
                label={it.label}
                active={activeSection === it.section}
                /* Note: Ensure SidebarItem component also uses #FFD600 for its active state */
                onClick={() => {
                  navigate(it.url);
                  setIsMobileOpen(false);
                }}
              />
            ))}

            <ExpliIntegration />
          </div>
        </div>

        {/* account */}
        <div className="flex flex-col items-center gap-2">
          {/* tools popover */}
          <div
            className="relative my-3"
            onMouseEnter={() => setShowTools(true)}
            onMouseLeave={() => setShowTools(false)}
          >
            <div className="group">
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#141414] to-[#1b1b1b] text-gray-200 border border-white/10 hover:text-[#FFD600] shadow">
                <FaTools size={18} />
              </button>
              <span className="sr-only">Tools</span>
            </div>

            <ToolsPopover visible={showTools} />
          </div>

          <div className="flex flex-col items-center pb-4">
            <button
              onClick={() => setIsProfileSettingsOpen(true)}
              className="flex flex-col items-center gap-1 px-2 py-3 rounded-lg text-gray-300 hover:text-[#FFD600] hover:bg-white/5 transition-all"
            >
              <CircleUserRound className="w-5 h-5" />
              <span className="text-[11px] font-medium">Profile</span>
            </button>

            <div
              onClick={() => navigate("/")}
              className="p-2 mt-2 cursor-pointer flex items-center justify-center text-gray-500 hover:text-white"
            >
              <ChevronLeft size={30} />
            </div>
          </div>
        </div>
      </aside>

      {/* Chat History Modal */}
      <ChatHistoryPopover
        visible={showHistory}
        onClose={() => setShowHistory(false)}
      />

      <ProfileSettingsModal
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      />
    </>
  );
}
