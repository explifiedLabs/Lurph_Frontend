import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  Plus, MessageSquare, MoreVertical, Edit,
  Trash, GitCompare, Workflow, Puzzle,
} from "lucide-react";
import { FaTools, FaBrain, FaStickyNote } from "react-icons/fa";
import { FaCompass } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import lurphLogo from "../../../lurph.png";

import {
  fetchChats,
  removeChatFromList,
  renameChatTitle,
  startNewChat,
  clearChat,
} from "../../features/chatSlice";
import ProfileSettingsModals from "../ProfileSections/ProfileSettingsModal";

const Y = "#FFD600";
const COLLAPSED_W = 56;
const EXPANDED_W = 280;

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ label, children }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ top: r.top + r.height / 2, left: r.right + 10 });
    }
    setShow(true);
  };

  return (
    <div ref={ref} className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && createPortal(
        <div style={{ position: "fixed", top: pos.top, left: pos.left, transform: "translateY(-50%)", zIndex: 99999, pointerEvents: "none" }}>
          <motion.div
            initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}
            style={{ background: "#18191d", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 7, padding: "5px 10px", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
          >
            <div style={{ fontSize: 12, fontWeight: 500, color: "#e4e4e7", whiteSpace: "nowrap" }}>{label}</div>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ── Tools Popover ─────────────────────────────────────────────────────────────
const TOOL_ITEMS = [
  { label: "Discover", icon: FaCompass, route: "/chat/discover", color: "#3b82f6", desc: "Explore trending topics" },
  { label: "Compare", icon: GitCompare, route: "/chat/compare", color: "#8b5cf6", desc: "Compare AI side-by-side" },
  { label: "Workflows", icon: Workflow, route: "/chat/workflowpage", color: Y, desc: "Build automated workflows" },
  { label: "Integrations", icon: Puzzle, route: "/chat/integrations", color: "#10b981", desc: "Connect your tools" },
  { label: "Memory", icon: FaBrain, route: "/memory", color: "#f59e0b", desc: "Manage AI memory" },
  { label: "Notes", icon: FaStickyNote, route: "/notes", color: "#ec4899", desc: "Your saved notes" },
];

function ToolsPopover({ navigate, isExpanded }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  const computePos = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.top, left: r.right + 8 });
    }
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (btnRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const btnStyle = {
    display: "flex", alignItems: "center", gap: isExpanded ? 12 : 0,
    justifyContent: isExpanded ? "flex-start" : "center",
    width: isExpanded ? "100%" : 36, height: 36,
    padding: isExpanded ? "0 12px" : 0, borderRadius: 8, border: "none",
    background: open ? (isExpanded ? "rgba(255,214,0,0.08)" : "rgba(255,214,0,0.10)") : "transparent",
    cursor: "pointer", color: open ? Y : "#71717a", transition: "all 0.15s",
  };

  const btn = (
    <button
      ref={btnRef}
      onClick={() => { computePos(); setOpen((v) => !v); }}
      style={btnStyle}
      onMouseEnter={(e) => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
      onMouseLeave={(e) => { if (!open) e.currentTarget.style.background = "transparent"; }}
    >
      <FaTools size={isExpanded ? 14 : 15} style={{ color: open ? Y : "#71717a", flexShrink: 0 }} />
      {isExpanded && <span style={{ fontSize: 14, fontWeight: 500, color: open ? Y : "#a1a1aa" }}>Tools</span>}
    </button>
  );

  return (
    <>
      {isExpanded ? btn : <Tooltip label="Tools">{btn}</Tooltip>}
      {open && createPortal(
        <div ref={panelRef} style={{
          position: "fixed", top: pos.top, left: pos.left, zIndex: 99999, width: 230,
          background: "#16171a", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.7)", padding: 6,
          animation: "toolsIn 0.15s cubic-bezier(0.16,1,0.3,1) both",
        }}>
          <style>{`@keyframes toolsIn { from{opacity:0;transform:translateX(-8px) scale(0.96)} to{opacity:1;transform:translateX(0) scale(1)} }`}</style>
          <div style={{ padding: "6px 8px 8px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#52525b" }}>Tools &amp; Features</span>
          </div>
          {TOOL_ITEMS.map(({ label, icon: Icon, route, color, desc }) => (
            <button key={label} onClick={() => { navigate(route); setOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#d4d4d8", textAlign: "left", transition: "background 0.12s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}1a`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={13} style={{ color }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3 }}>{label}</div>
                <div style={{ fontSize: 10, color: "#52525b" }}>{desc}</div>
              </div>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}

// ── Collapse Toggle Icon ──────────────────────────────────────────────────────
function CollapseToggleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

// ── Chat Row ──────────────────────────────────────────────────────────────────
function ChatRow({ item, isActive, onSelect, onDelete, onRename }) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalPos, setPortalPos] = useState(null);
  const [renaming, setRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState("");

  const title = item?.title || "New conversation";
  const summary = item?.lastMessage ? item.lastMessage.slice(0, 60) + (item.lastMessage.length > 60 ? "..." : "") : "";

  const handleRenameSave = () => {
    if (renameVal.trim()) onRename(item._id, renameVal.trim());
    setRenaming(false);
  };

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => !renaming && onSelect(item)}
        className="group relative flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-100 mx-2"
        style={{
          background: isActive
            ? "rgba(255,214,0,0.08)"
            : hovered ? "rgba(255,255,255,0.06)" : "transparent",
          borderLeft: isActive ? `2px solid ${Y}` : "2px solid transparent",
        }}
      >
        <div className="flex-1 min-w-0">
          {renaming ? (
            <input
              autoFocus
              value={renameVal}
              onChange={(e) => setRenameVal(e.target.value)}
              onBlur={handleRenameSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSave();
                if (e.key === "Escape") setRenaming(false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="text-sm bg-transparent outline-none text-white w-full"
              style={{ borderBottom: `1px solid ${Y}` }}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                className="text-[13px] truncate leading-tight font-medium"
                style={{ color: isActive ? Y : "#d4d4d8" }}
              >
                {title}
              </div>
              {summary && (
                <div
                  className="text-[11px] truncate leading-tight"
                  style={{ color: "#71717a" }}
                >
                  {summary}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            const r = e.currentTarget.getBoundingClientRect();
            setPortalPos({ top: r.top - 6, left: r.right + 8 });
            setMenuOpen((v) => !v);
          }}
          className="flex-shrink-0 p-0.5 rounded transition-all"
          style={{ opacity: hovered || menuOpen ? 1 : 0, color: menuOpen ? Y : "#666" }}
        >
          <MoreVertical size={13} />
        </button>
      </div>

      {menuOpen && portalPos && createPortal(
        <div
          style={{ position: "fixed", top: portalPos.top, left: portalPos.left, zIndex: 99999, minWidth: 140, background: "#18191d", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", padding: 4 }}
          onMouseLeave={() => { setMenuOpen(false); setPortalPos(null); }}
        >
          <button onClick={(e) => { e.stopPropagation(); setRenaming(true); setRenameVal(title); setMenuOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-300 hover:bg-white/10 rounded-lg transition-colors">
            <Edit size={13} /> Rename
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(item._id); setMenuOpen(false); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <Trash size={13} /> Delete
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────
export default function ExpliSidebar({ isMobileOpen, setIsMobileOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the current chatId from the URL so we can highlight the right item
  // even before loadChat fulfills
  const { chatId: urlChatId } = useParams();

  const { chats, chatsLoading, activeChat } = useSelector((s) => s.chat);
  const { user } = useSelector((s) => s.auth);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Load chat list on mount
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // The active chat ID is the URL param (most reliable) or Redux activeChat
  const activeChatId = urlChatId || activeChat?._id;

  const handleNewChat = useCallback(() => {
    dispatch(clearChat());
    navigate("/chat");
    setIsMobileOpen(false);
  }, [dispatch, navigate, setIsMobileOpen]);

  // FIX: Always navigate to /chat/:chatId so ChatPanel's useEffect fires
  const handleChatSelect = useCallback((chat) => {
    navigate(`/chat/${chat._id}`);
    setIsMobileOpen(false);
  }, [navigate, setIsMobileOpen]);

  const handleDelete = useCallback((chatId) => {
    dispatch(removeChatFromList(chatId));
    // If we deleted the active chat, go back to /chat
    if (chatId === activeChatId) {
      navigate("/chat");
    }
  }, [dispatch, activeChatId, navigate]);

  const handleRename = useCallback((chatId, title) => {
    dispatch(renameChatTitle({ chatId, title }));
  }, [dispatch]);

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const q = searchQuery.toLowerCase();
    return chats.filter((c) =>
      (c.title || c.lastMessage || "").toLowerCase().includes(q)
    );
  }, [searchQuery, chats]);

  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  const toggleButton = (
    <button
      onClick={() => setIsExpanded((v) => !v)}
      style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", color: "#52525b", flexShrink: 0, transition: "all 0.15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#e4e4e7"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#52525b"; }}
    >
      <CollapseToggleIcon />
    </button>
  );

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      <motion.aside
        animate={{ width: isExpanded ? EXPANDED_W : COLLAPSED_W }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ minWidth: isExpanded ? EXPANDED_W : COLLAPSED_W, overflow: "visible", position: "relative" }}
        className={`fixed lg:static top-0 left-0 h-full z-50 flex flex-col bg-[#1a1a18] border-r border-white/[0.07] ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div style={{ position: "absolute", inset: 0, background: "#1a1a18", borderRight: "1px solid rgba(255,255,255,0.07)", zIndex: 0, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

          {/* ── Header ─────────────────────────────────────────────── */}
          {isExpanded ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 10px 12px", flexShrink: 0, gap: 6 }}>
              <div onClick={handleNewChat} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1, minWidth: 0, marginLeft: 5 }}>
                <img src={lurphLogo} alt="Lurph" style={{ width: 20, height: 20, borderRadius: 4 }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Lurph</span>
              </div>
              <Tooltip label="Collapse sidebar">{toggleButton}</Tooltip>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 0 8px", flexShrink: 0, gap: 6 }}>
              <img src={lurphLogo} alt="Lurph" style={{ width: 24, height: 24, borderRadius: 4 }} />
              <Tooltip label="Expand sidebar">{toggleButton}</Tooltip>
            </div>
          )}

          {/* ── Nav ────────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 8px 4px", flexShrink: 0 }}>
            {isExpanded ? (
              <button onClick={handleNewChat}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#a1a1aa", width: "100%", textAlign: "left" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a1a1aa"; }}
              >
                <Plus size={15} style={{ flexShrink: 0, color: "#71717a" }} />
                <span style={{ fontSize: 14, fontWeight: 500 }}>New chat</span>
              </button>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Tooltip label="New chat">
                  <button onClick={handleNewChat}
                    style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#71717a" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#e4e4e7"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717a"; }}
                  >
                    <Plus size={16} />
                  </button>
                </Tooltip>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: isExpanded ? "stretch" : "center" }}>
              <ToolsPopover navigate={navigate} isExpanded={isExpanded} />
            </div>
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 12px 10px", flexShrink: 0 }} />

          {/* ── Chat list ───────────────────────────────────────────── */}
          {isExpanded ? (
            <>
              <div style={{ padding: "0 16px 4px", flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3f3f46" }}>Recent</span>
              </div>

              <div style={{ padding: "0 12px 8px", flexShrink: 0 }}>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chats…"
                  style={{ width: "100%", padding: "6px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: "#e4e4e7", fontSize: 12, outline: "none" }}
                />
              </div>

              <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
                {chatsLoading ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 12px" }}>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{ height: 36, borderRadius: 8, background: "rgba(255,255,255,0.04)", animation: "pulse 1.5s ease-in-out infinite" }} />
                    ))}
                  </div>
                ) : filteredChats.length === 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 112, gap: 8 }}>
                    <MessageSquare size={16} color="#333" />
                    <p style={{ color: "#3f3f46", fontSize: 12, textAlign: "center" }}>
                      {searchQuery ? "No results" : "No conversations yet"}
                    </p>
                  </div>
                ) : (
                  filteredChats.map((item) => (
                    <ChatRow
                      key={item._id}
                      item={item}
                      isActive={activeChatId === item._id}
                      onSelect={handleChatSelect}
                      onDelete={handleDelete}
                      onRename={handleRename}
                    />
                  ))
                )}
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 8px", flex: 1, overflowY: "auto", scrollbarWidth: "none", alignItems: "center" }}>
              <div style={{ padding: "2px 0 4px" }}>
                <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3f3f46" }}>Recent</span>
              </div>
              {chats.slice(0, 12).map((item) => {
                const t = item?.title || item?.lastMessage || "New chat";
                const initial = t.trim()[0]?.toUpperCase() || "C";
                const isActive = activeChatId === item._id;
                return (
                  <Tooltip key={item._id} label={t.length > 32 ? t.slice(0, 32) + "…" : t}>
                    <button
                      onClick={() => handleChatSelect(item)}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        border: "none",
                        background: isActive ? "rgba(255,214,0,0.12)" : "transparent",
                        cursor: "pointer",
                        color: isActive ? Y : "#71717a",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                      onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; } }}
                      onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717a"; } }}
                    >
                      {initial}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          )}

          {/* ── Footer / Profile ────────────────────────────────────── */}
          <div style={{ flexShrink: 0, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 8px" }}>
            {isExpanded ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#71717a" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#e4e4e7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#71717a"; }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#FFD600,#D97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#000" }}>{userInitial}</span>
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#e4e4e7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{user?.name || "Profile"}</span>
                  {user?.email && (
                    <span style={{ fontSize: 10, color: "#52525b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{user.email}</span>
                  )}
                </div>
              </button>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Tooltip label={user?.name || "Profile"}>
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#FFD600,#D97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#000" }}>{userInitial}</span>
                      </div>
                    )}
                  </button>
                </Tooltip>
              </div>
            )}
          </div>

        </div>
      </motion.aside>

      <ProfileSettingsModals isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}