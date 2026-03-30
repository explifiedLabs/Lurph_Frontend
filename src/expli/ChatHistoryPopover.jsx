import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, MessageSquare, MoreVertical, Share, Trash } from "lucide-react";
import { useExpli } from "../context/ExpliContext";
import { formatText } from "../utils/data/TroneData";
import ChatMenuPortal from "./ChatMenuPortal";
import { useNavigate } from "react-router-dom";

export default function ChatHistoryPopover({ visible, onClose }) {
  const {
    newChat,
    chatHistory,
    setChatHistory,
    setCurrentMessages,
    setCurrentMessagesGemini,
    setCurrentMessagesOpenAI,
  } = useExpli();

  const [hoverChat, setHoverChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [portalPos, setPortalPos] = useState(null);
  const navigate = useNavigate();

  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  // ✅ FIXED SEARCH LOGIC (checks question + nested qa text)
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return chatHistory;
    const q = searchQuery.toLowerCase();
    return chatHistory.filter((item) => {
      const mainQuestion = item?.question?.toLowerCase() || "";
      const qaSummary = item?.qa?.[0]?.promptSummary?.toLowerCase() || "";
      const qaQuestion = item?.qa?.[0]?.question?.toLowerCase() || "";
      return (
        mainQuestion.includes(q) ||
        qaSummary.includes(q) ||
        qaQuestion.includes(q)
      );
    });
  }, [searchQuery, chatHistory]);

  const handleHistoryClick = useCallback(
    (session) => {
      setCurrentMessages([]);
      setCurrentMessagesOpenAI([]);
      setCurrentMessagesGemini([]);

      const messagesExpli = [];
      const messagesOpenAI = [];
      const messagesGemini = [];

      session.qa.forEach((qaItem) => {
        const userMsg = {
          sender: "user",
          text: qaItem.question,
          timestamp: qaItem.timestamp,
        };

        qaItem.answers.forEach((ans) => {
          const botMsg = {
            sender: "bot",
            text: ans.text,
            timestamp: qaItem.timestamp,
          };
          if (ans.tool === "expli") {
            messagesExpli.push(userMsg, botMsg);
          } else if (ans.tool === "openai") {
            messagesOpenAI.push(userMsg, botMsg);
          } else if (ans.tool === "gemini") {
            messagesGemini.push(userMsg, botMsg);
          }
        });
      });

      setCurrentMessages(messagesExpli);
      setCurrentMessagesOpenAI(messagesOpenAI);
      setCurrentMessagesGemini(messagesGemini);
    },
    [setCurrentMessages, setCurrentMessagesOpenAI, setCurrentMessagesGemini],
  );

  const handleRenameSave = (id) => {
    if (!renameValue.trim()) {
      setRenamingId(null);
      return;
    }

    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              question: renameValue.trim(),
              qa: chat.qa?.map((qaItem, i) =>
                i === 0
                  ? { ...qaItem, promptSummary: renameValue.trim() }
                  : qaItem,
              ),
            }
          : chat,
      ),
    );

    setRenamingId(null);
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#0a0a0c] text-gray-200 rounded-xl shadow-2xl p-5 w-[650px] h-[60vh] overflow-hidden border border-white/5"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                <h2 className="text-lg font-semibold text-white">
                  Chat History
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors text-lg font-bold px-2"
                >
                  ✕
                </button>
              </div>

              {/* Search - Focus ring updated to Yellow */}
              <input
                type="text"
                placeholder="Search chat history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-3 px-3 py-2 bg-white/5 border border-white/10 rounded-md text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#FFD600]/50 focus:border-[#FFD600]/30 transition-all"
              />

              {/* Chat list */}
              <div className="max-h-[55vh] overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-800">
                {filteredHistory && filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoverChat(item.id)}
                      onMouseLeave={() => setHoverChat(null)}
                      onClick={() => {
                        navigate("/expli");
                        handleHistoryClick(item);
                        setMenuOpen(false);
                        onClose();
                      }}
                      className="group hover:bg-white/5 rounded-lg px-2 py-2 transition-all duration-200 cursor-pointer relative border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center justify-between">
                        {renamingId === item.id ? (
                          <input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={() => handleRenameSave(item.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleRenameSave(item.id);
                              if (e.key === "Escape") setRenamingId(null);
                            }}
                            /* Rename Border - Updated to Yellow */
                            className="text-sm bg-transparent border-b border-[#FFD600] outline-none text-white w-full"
                          />
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: formatText(
                                item?.qa?.[0]?.promptSummary || item?.question,
                              ),
                            }}
                            className="text-sm text-gray-400 group-hover:text-gray-200 truncate pr-8"
                          />
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = e.target.getBoundingClientRect();
                            setPortalPos({
                              top: rect.top - 6,
                              left: rect.right + 10,
                            });
                            setMenuOpen(menuOpen === item.id ? null : item.id);
                          }}
                          className={`absolute right-2 p-1 rounded text-gray-500 hover:text-[#FFD600] transition-all ${
                            hoverChat === item.id || menuOpen === item.id
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-600">
                    <div className="text-center">
                      <MessageSquare
                        size={24}
                        className="mx-auto mb-2 opacity-20"
                      />
                      <p className="text-sm">No chat history found</p>
                    </div>
                  </div>
                )}
              </div>

              {/* New Chat Button - Updated to Lurph Yellow Gradient Theme */}
              <button
                onClick={() => {
                  navigate("/expli");
                  newChat();
                  onClose();
                }}
                className="mt-4 w-full bg-[#FFD600]/10 text-[#FFD600] text-sm font-semibold py-2.5 rounded-lg border border-[#FFD600]/20 hover:bg-[#FFD600] hover:text-black transition-all duration-300"
              >
                + New Chat
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat action menu portal (Context Menu) */}
      {menuOpen && portalPos && (
        <ChatMenuPortal
          position={portalPos}
          onClose={() => {
            setMenuOpen(null);
            setPortalPos(null);
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(null);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-t-lg transition-colors"
          >
            <Share size={14} /> Share
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const chat = chatHistory.find((c) => c.id === menuOpen);
              setRenamingId(menuOpen);
              setRenameValue(
                chat?.qa?.[0]?.promptSummary || chat?.question || "",
              );
              setMenuOpen(null);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-white/10 transition-colors"
          >
            <Edit size={14} /> Rename
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const updatedHistory = chatHistory.filter(
                (h) => h.id !== menuOpen,
              );
              setChatHistory(updatedHistory);
              setMenuOpen(null);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-b-lg transition-colors"
          >
            <Trash size={14} /> Delete
          </button>
        </ChatMenuPortal>
      )}
    </>
  );
}
