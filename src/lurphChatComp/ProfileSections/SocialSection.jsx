import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  Link2,
  Unlink2,
} from "lucide-react";
import { motion } from "framer-motion";

const SocialSection = () => {
  const [socials, setSocials] = useState([
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      connected: false,
      url: "https://linkedin.com",
    },
    {
      id: "twitter",
      label: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      connected: true,
      username: "johndoe",
      url: "https://twitter.com",
    },
    {
      id: "youtube",
      label: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      connected: false,
      url: "https://youtube.com",
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      connected: false,
      url: "https://instagram.com",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      connected: false,
      url: "https://facebook.com",
    },
  ]);

  const toggleSocial = (id) => {
    setSocials(
      socials.map((social) =>
        social.id === id ? { ...social, connected: !social.connected } : social,
      ),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Social Accounts
        </h2>
        <p className="text-gray-500 font-medium">
          Connect your social media profiles to your account
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {socials.map((social, index) => (
          <motion.div
            key={social.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#0A0A0A] border border-white/15 rounded-2xl p-5 flex items-center justify-between hover:border-[#FFD600]/20 transition-all duration-300 group shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3.5 rounded-xl transition-all duration-300 ${
                  social.connected
                    ? "bg-[#FFD600] text-black shadow-[0_0_15px_rgba(255,214,0,0.2)]"
                    : "bg-white/5 text-gray-600 group-hover:text-gray-400"
                }`}
              >
                {social.icon}
              </div>
              <div>
                <p className="text-white font-bold tracking-tight">
                  {social.label}
                </p>
                {social.connected && social.username ? (
                  <p className="text-sm font-semibold text-[#FFD600]/80">
                    @{social.username}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wider text-[10px]">
                    Not connected
                  </p>
                )}
              </div>
            </div>

            <motion.button
              onClick={() => toggleSocial(social.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                social.connected
                  ? "bg-red-500/10 border border-red-500/20 text-red-500/80 hover:bg-red-500/20"
                  : "bg-[#FFD600]/10 border border-[#FFD600]/30 text-[#FFD600] hover:bg-[#FFD600] hover:text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.connected ? (
                <>
                  <Unlink2 className="w-3.5 h-3.5" />
                  Disconnect
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5" />
                  Connect
                </>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Tip Box - Themed to Gold */}
      <div className="mt-10 p-5 bg-[#FFD600]/5 border border-[#FFD600]/10 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#FFD600]/40" />
        <p className="text-[#FFD600]/80 text-sm leading-relaxed">
          <span className="font-black mr-2 uppercase tracking-tighter">
            💡 Pro Tip:
          </span>
          Connecting your social accounts helps you automate cross-platform
          intelligence and unlock native Lurph intelligence across your entire
          stack.
        </p>
      </div>
    </motion.div>
  );
};

export default SocialSection;
