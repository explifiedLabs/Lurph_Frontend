import React, { useState } from "react";
import {
  INTEGRATION_PROVIDERS,
  PROVIDER_HELP_STEPS,
  PROVIDER_DOC_URL,
} from "../utils/data/TroneData";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { Lock, Plus, X } from "lucide-react";

function IntegrationModal({
  providerKeys,
  setProviderKeys,
  setShowIntegrationsModal,
  setClosedChats,
  closedChats,
}) {
  const [integrationTab, setIntegrationTab] = useState("my");
  const [integrationSearch, setIntegrationSearch] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [selectedProviderKey, setSelectedProviderKey] = useState("");
  const [showProviderHelp, setShowProviderHelp] = useState(false);

  // ✅ New: state for Coming Soon popup
  const [showComingSoon, setShowComingSoon] = useState(false);
  // ✅ Function to handle Update Preferences button
  const handleUpdatePreferences = () => {
    setShowComingSoon(true);
    // Auto close popup after 2.5s
    setTimeout(() => setShowComingSoon(false), 2500);
  };
  async function verifyProviderKey(providerId, apiKey) {
    try {
      switch (providerId) {
        case "openai": {
          const res = await fetch("https://api.openai.com/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          return res.ok;
        }

        case "gemini": {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
          );
          return res.ok;
        }

        case "anthropic": {
          const res = await fetch("https://api.anthropic.com/v1/models", {
            headers: {
              "x-api-key": apiKey,
            },
          });
          return res.ok;
        }

        case "mistral": {
          const res = await fetch("https://api.mistral.ai/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          return res.ok;
        }

        case "cohere": {
          const res = await fetch("https://api.cohere.ai/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          return res.ok;
        }

        case "grok": {
          const res = await fetch("https://api.x.ai/v1/models", {
            headers: { Authorization: `Bearer ${apiKey}` },
          });
          return res.ok;
        }

        default:
          return false;
      }
    } catch (err) {
      console.error("Verification error:", err);
      return false;
    }
  }

  const handleOpenProvider = (providerId) => {
    setSelectedProviderId(providerId);
    const existing = providerKeys?.[providerId] || "";
    setSelectedProviderKey(existing);
    setShowProviderHelp(false);
  };

  const handleSaveProviderKey = async (providerId, useAfterSave = false) => {
    const isValid = await verifyProviderKey(providerId, selectedProviderKey);

    if (!isValid) {
      alert("❌ Invalid API key. Please check and try again.");
      return;
    }
    const next = { ...(providerKeys || {}), [providerId]: selectedProviderKey };
    try {
      localStorage.setItem("provider_keys", JSON.stringify(next));
    } catch (err) {
      console.log(err);
    }
    setProviderKeys(next);
    if (useAfterSave) {
      try {
        localStorage.setItem("active_provider", providerId);
      } catch (err) {
        console.log(err);
      }
    }
    setShowIntegrationsModal(false);
    setSelectedProviderId(null);
  };

  const handleRemoveProvider = (providerId) => {
    const next = { ...(providerKeys || {}), [providerId]: "" };
    try {
      localStorage.setItem("provider_keys", JSON.stringify(next));
    } catch (err) {
      console.log(err);
    }
    setProviderKeys(next);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={() => setShowIntegrationsModal(false)}
      />
      <div
        className={`relative w-full
    ${showProviderHelp ? "max-w-4xl" : "max-w-2xl"}
    bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl
    p-4 sm:p-6
    max-h-[90vh] overflow-y-auto
  `}
      >
        <button
          aria-label="Close"
          onClick={() => setShowIntegrationsModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#FFD600] transition-colors duration-200 z-10 p-1"
        >
          <FiX size={24} />
        </button>

        <h2 className="font-bold text-2xl mb-1 text-white">Integrations</h2>
        <p className="text-gray-500 text-sm mb-6">
          Manage API keys, model versions, and active AI models.
        </p>

        {!selectedProviderId && (
          <>
            {/* Tabs - Updated to Lurph Yellow */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <button
                onClick={() => setIntegrationTab("my")}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  integrationTab === "my"
                    ? "bg-gradient-to-br from-[#FFD600] to-[#D97706] text-black "
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                My Keys
              </button>

              <button
                onClick={() => setIntegrationTab("add")}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  integrationTab === "add"
                    ? "bg-gradient-to-br from-[#FFD600] to-[#D97706] text-black"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                Add Keys
              </button>
            </div>

            {/* Search - Focus ring updated */}
            <div className="relative mb-6">
              <input
                type="text"
                value={integrationSearch}
                onChange={(e) => setIntegrationSearch(e.target.value)}
                placeholder="Search integrations..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#FFD600]/50 focus:border-[#FFD600]/30 transition-all"
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>

            <div className="space-y-3">
              {INTEGRATION_PROVIDERS.filter((p) => {
                const matchesTab =
                  integrationTab === "my" ? Boolean(providerKeys[p.id]) : true;
                const q = integrationSearch.trim().toLowerCase();
                return matchesTab && p.name.toLowerCase().includes(q);
              }).map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleOpenProvider(p.id)}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white/[0.03] rounded-xl border border-white/5 px-4 py-4 hover:border-[#FFD600]/30 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:border-[#FFD600]/20 group-hover:text-[#FFD600] transition-all">
                        {Icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm group-hover:text-[#FFD600] transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-gray-500 text-xs">{p.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={p.defaultModel ?? ""}
                          className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 bg-[#121212] appearance-none pr-8 focus:border-[#FFD600]/50 outline-none"
                        >
                          {p.dropdown?.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-xs" />
                      </div>

                      {/* Toggle - Switched Indigo to Lurph Yellow */}
                      {integrationTab === "my" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setClosedChats((prev) => ({
                              ...prev,
                              [p.id]: !prev[p.id],
                            }));
                          }}
                          className={`ml-2 w-10 h-5 flex items-center rounded-full transition-colors ${
                            !closedChats[p.id] ? "bg-[#FFD600]" : "bg-gray-700"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              !closedChats[p.id]
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleUpdatePreferences}
              className="w-full mt-8 py-3 bg-gradient-to-br from-[#FFD600] to-[#D97706] text-black rounded-xl font-bold hover:bg-[#eab308] transition-all shadow-[0_4px_20px_rgba(250,204,21,0.2)]"
            >
              Update preferences
            </button>

            <div className="w-full mt-6 pt-4 border-t border-white/5 flex flex-col items-center cursor-default">
              <div className="font-bold mb-1 text-white">
                Upgrade and Unlock{" "}
                <span className="text-[#FFD600]">Premium AI Models</span>
              </div>
              <div className="text-xs text-gray-500">
                Access all six top AI models for just{" "}
                <span className="text-[#FFD600] font-bold">$12/month</span>.
              </div>
            </div>
          </>
        )}

        {/* Selected Provider View */}
        {selectedProviderId && (
          <div className="mt-4">
            <button
              className="text-sm text-gray-500 hover:text-[#FFD600] mb-6 flex items-center gap-2 transition-all"
              onClick={() => setSelectedProviderId(null)}
            >
              ← Back to Integrations
            </button>
            {/* ... (Apply similar bg-white/5 and border-white/10 logic here) */}

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all"
                onClick={() => handleSaveProviderKey(selectedProviderId, false)}
              >
                Save
              </button>
              <button
                className="px-6 py-2.5 rounded-xl bg-[#FFD600] text-black font-bold hover:bg-[#eab308] transition-all"
                onClick={() => handleSaveProviderKey(selectedProviderId, true)}
              >
                Save & Use
              </button>
            </div>
          </div>
        )}

        {/* Coming Soon Modal - Refined for Lurph */}
        {showComingSoon && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div className="bg-[#0f0f12] border border-[#FFD600]/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 w-80 text-center animate-fade-in">
              <div className="w-16 h-16 bg-[#FFD600]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-[#FFD600]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                This feature will be available in an upcoming release.
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="w-full px-4 py-2 bg-[#FFD600] text-black rounded-lg font-bold hover:bg-[#eab308] transition-all"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IntegrationModal;
