import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Y = "#FFD600";

export default function LurphChatComingSoon() {
  const words = ["LurphChat", "Coming", "Soon."];
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), 1800);
    return () => clearInterval(t);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/")
  };

  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;900&display=swap');`}</style>

      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: "absolute",
          top: 28,
          right: 32,
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 12,
          color: "rgba(255,255,255,0.4)",
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          padding: "8px 18px",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "#fff";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        }}
      >
        Logout
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(4rem, 14vw, 12rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: index === 0 ? Y : "#ffffff",
            margin: 0,
            userSelect: "none",
          }}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}