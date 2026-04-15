import React, { useState } from "react";
import {
  X, User, Users, Workflow, Zap, Building2,
  History, HelpCircle, LogOut, BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AccountsSection      from "./AccountsSection";
import SocialSection        from "./SocialSection";
import WorkflowsSection     from "./WorkflowsSection";
import IntegrationsSection  from "./IntegrationsSection";
import EnterpriseSection    from "./EnterpriseSection";
import HistorySection       from "./HistorySection";
import ContactSupportSection from "./ContactSupportSection";
import FAQSection           from "./FAQSection";

import { logoutUser, clearAuth } from "../../features/authSlice";
import { clearChat } from "../../features/chatSlice";

const generalSections = [
  { id: "accounts",  label: "Accounts",  icon: User,     description: "Manage your account details" },
  { id: "social",    label: "Social",    icon: Users,    description: "Connect social media accounts" },
  { id: "workflows", label: "Workflows", icon: Workflow, description: "Manage your workflows" },
];

const otherSections = [
  { id: "integrations", label: "Integrations",    icon: Zap,       description: "Manage integrations" },
  { id: "enterprise",   label: "Enterprise",       icon: Building2, description: "Enterprise settings" },
  { id: "history",      label: "History",          icon: History,   description: "View history" },
  { id: "faq",          label: "FAQ",              icon: BookOpen,  description: "Frequently asked questions" },
  { id: "contact",      label: "Contact Support",  icon: HelpCircle,description: "Get help" },
];

const renderContent = (activeSection) => {
  switch (activeSection) {
    case "accounts":     return <AccountsSection />;
    case "social":       return <SocialSection />;
    case "workflows":    return <WorkflowsSection />;
    case "integrations": return <IntegrationsSection />;
    case "enterprise":   return <EnterpriseSection />;
    case "history":      return <HistorySection />;
    case "faq":          return <FAQSection />;
    case "contact":      return <ContactSupportSection />;
    default:             return null;
  }
};

const ProfileSettingsModals = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState("accounts");
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const handleSectionChange = (section) => setActiveSection(section);

  const handleSignOut = async () => {
    onClose();
    // Dispatch the thunk — this hits the backend logout endpoint
    await dispatch(logoutUser());
    // Belt-and-suspenders: clear local state immediately even if request fails
    dispatch(clearAuth());
    dispatch(clearChat());
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-6xl h-[85vh] max-h-[85vh] bg-[#050505] rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(255,214,0,0.1)] overflow-hidden flex flex-col">

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200 text-gray-500 hover:text-[#FFD600]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-1 overflow-hidden">

                {/* Sidebar nav */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="w-64 border-r border-white/5 bg-black/20 overflow-y-auto"
                >
                  <div className="p-4 space-y-6">

                    {/* General */}
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFD600]/50 mb-4 px-4">
                        General
                      </h3>
                      <div className="space-y-1">
                        {generalSections.map(({ id, label, icon: Icon }) => {
                          const isActive = activeSection === id;
                          return (
                            <motion.button
                              key={id}
                              onClick={() => handleSectionChange(id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                isActive
                                  ? "bg-[#FFD600]/10 text-[#FFD600]"
                                  : "text-gray-500 hover:text-white hover:bg-white/5"
                              }`}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="activeIndicator"
                                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#FFD600] rounded-full"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                              <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-[#FFD600]" : "text-gray-600 group-hover:text-[#FFD600]/80"}`} />
                              <span className="font-bold text-sm tracking-tight">{label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-white/5 mx-2" />

                    {/* Other */}
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFD600]/50 mb-4 px-4">
                        Other
                      </h3>
                      <div className="space-y-1">
                        {otherSections.map(({ id, label, icon: Icon }) => {
                          const isActive = activeSection === id;
                          return (
                            <motion.button
                              key={id}
                              onClick={() => handleSectionChange(id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                                isActive
                                  ? "bg-[#FFD600]/10 text-[#FFD600]"
                                  : "text-gray-500 hover:text-white hover:bg-white/5"
                              }`}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {isActive && (
                                <motion.div
                                  layoutId="activeIndicator"
                                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#FFD600] rounded-full"
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                              )}
                              <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? "text-[#FFD600]" : "text-gray-600 group-hover:text-[#FFD600]/80"}`} />
                              <span className="font-bold text-sm tracking-tight">{label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-white/5 mx-2" />

                    {/* Sign Out */}
                    <motion.button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/80 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-bold text-sm tracking-tight">Sign Out</span>
                    </motion.button>

                  </div>
                </motion.div>

                {/* Content area */}
                <div className="flex-1 overflow-y-auto bg-black/40">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-8"
                    >
                      {renderContent(activeSection)}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileSettingsModals;