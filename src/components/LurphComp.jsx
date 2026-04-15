import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  googleLogin,
  clearError,
} from "../features/authSlice";

const Y = "#FFD600";

// ─── INLINE SVG ICONS ────────────────────────────────────────────────────────
const Svg = ({ children, size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
const IZap = (p) => (
  <Svg {...p}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Svg>
);
const IGlobe = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);
const ILink = (p) => (
  <Svg {...p}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Svg>
);
const ICpu = (p) => (
  <Svg {...p}>
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M15 9V5a2 2 0 0 0-4 0v4M9 9H5a2 2 0 0 0 0 4h4M9 15H5a2 2 0 0 0 0 4h4M15 15h4a2 2 0 0 0 0-4h-4M15 9h4a2 2 0 0 0 0-4h-4M9 15v4a2 2 0 0 0 4 0v-4" />
  </Svg>
);
const ISearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </Svg>
);
const ICheck = (p) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);
const IArrow = (p) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
);
const ISlack = (p) => (
  <Svg {...p}>
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
  </Svg>
);
const IGithub = (p) => (
  <Svg {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);
const INotion = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h4" />
  </Svg>
);
const IDrive = (p) => (
  <Svg {...p}>
    <path d="m8.5 2 7.5 13H1L8.5 2z" />
    <path d="M15 9 22 22H8L15 9z" />
    <path d="M1 22h22" />
  </Svg>
);
const IMail = (p) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </Svg>
);
const IDatabase = (p) => (
  <Svg {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </Svg>
);
const ICalendar = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);
const IWorkflow = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="5" height="5" rx="1" />
    <rect x="16" y="3" width="5" height="5" rx="1" />
    <rect x="9" y="16" width="5" height="5" rx="1" />
    <path d="M5.5 8v4a2 2 0 0 0 2 2H11" />
    <path d="M18.5 8v4a2 2 0 0 1-2 2H13" />
  </Svg>
);
const IStar = (p) => (
  <Svg {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);
const IFile = (p) => (
  <Svg {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </Svg>
);
const IUser = (p) => (
  <Svg {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);
const ILock = (p) => (
  <Svg {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);
const IVideo = (p) => (
  <Svg {...p}>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </Svg>
);
const IUsers = (p) => (
  <Svg {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);
const ISend = (p) => (
  <Svg {...p}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </Svg>
);
const ISparkle = (p) => (
  <Svg {...p}>
    <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
    <circle cx="12" cy="12" r="4" />
  </Svg>
);
const INameTag = (p) => (
  <Svg {...p}>
    <rect x="2" y="6" width="20" height="14" rx="2" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="12" y1="12" x2="12" y2="12" />
    <path d="M8 12h.01M12 12h.01M16 12h.01M8 16h8" />
  </Svg>
);

// ─── SPINNER (reusable) ───────────────────────────────────────────────────────
const Spinner = ({ color = "#000" }) => (
  <motion.div
    className="w-4 h-4 rounded-full border-2 flex-shrink-0"
    style={{ borderColor: `${color}30`, borderTopColor: color }}
    animate={{ rotate: 360 }}
    transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
  />
);

// ─── PARTICLES ───────────────────────────────────────────────────────────────
const ParticleBG = () => {
  const particles = Array.from({ length: 22 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, delay: Math.random() * 6, dur: Math.random() * 8 + 6 }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: Y, opacity: 0 }} animate={{ opacity: [0, 0.35, 0], y: [0, -55, 0], x: [0, Math.random() * 28 - 14, 0] }} transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
};

// ─── LOGIN / REGISTER PANEL ───────────────────────────────────────────────────
const LoginPanel = () => {
  const dispatch = useDispatch();
  

  const { loadingEmail, loadingGoogle, error, isAuthenticated } = useSelector(
    (s) => s.auth,
  );

  // ── mode toggle ──────────────────────────────────────────────────────────────
  const [mode, setMode] = useState("login"); // "login" | "register"

  // ── fields ───────────────────────────────────────────────────────────────────
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [focused, setFocused] = useState(null);
  const [showPass, setShowPass] = useState(false);
  // Only redirect when the user explicitly triggered a login/register in this session
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  // Redirect to /chat only after an active submit succeeds — not on stale Redux state
  useEffect(() => {
    if (submitted && isAuthenticated) navigate("/chat");
  }, [submitted, isAuthenticated, navigate]);

  // clear error whenever user types
  useEffect(() => {
    if (error) {
      dispatch(clearError());
      setSubmitted(false);
    }
  }, [email, pass, name, confirm]);

  // reset fields when switching mode
  const switchMode = (next) => {
    setMode(next);
    setName("");
    setEmail("");
    setPass("");
    setConfirm("");
    setFocused(null);
    setShowPass(false);
    dispatch(clearError());
  };

  const anyLoading = loadingEmail || loadingGoogle;

  // ── submit guards ─────────────────────────────────────────────────────────────
  const canLogin = email.trim() && pass.trim() && !anyLoading;
  const canRegister =
    name.trim() && email.trim() && pass.trim() && confirm.trim() && !anyLoading;
  const canSubmit = mode === "login" ? canLogin : canRegister;

  // ── inline validation for register ───────────────────────────────────────────
  const [localError, setLocalError] = useState("");
  useEffect(() => {
    setLocalError("");
  }, [name, email, pass, confirm, mode]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (mode === "register") {
      if (pass !== confirm) {
        setLocalError("Passwords don't match.");
        return;
      }
      if (pass.length < 6) {
        setLocalError("Password must be at least 6 characters.");
        return;
      }
      setSubmitted(true);
      dispatch(registerUser({ name, email, password: pass }));
    } else {
      setSubmitted(true);
      dispatch(loginUser({ email, password: pass }));
    }
  };

  const handleGoogleLogin = () => {
    if (anyLoading) return;
    setSubmitted(true);
    dispatch(googleLogin());
  };

  const displayError =
    localError ||
    (typeof error === "string"
      ? error
      : error
        ? "Authentication failed. Please try again."
        : "");

  // ── shared input style ────────────────────────────────────────────────────────
  const inputStyle = (f) => ({
    background: focused === f ? "transparent" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === f ? "transparent" : "rgba(255,255,255,0.07)"}`,
    color: "#e4e4e4",
    caretColor: Y,
    opacity: loadingGoogle ? 0.4 : 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(22,22,26,0.98) 0%, rgba(14,14,16,0.99) 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.75), 0 0 60px ${Y}0a`,
      }}
    >
      {/* top accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${Y}80, transparent)`,
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${Y}0d 0%, transparent 70%)`,
        }}
      />

      <div className="p-12">
        {/* ── mode toggle tabs ── */}
        <div
          className="flex gap-1 p-1 rounded-2xl mb-6"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {["login", "register"].map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="flex-1 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200"
              style={{
                background: mode === m ? Y : "transparent",
                color: mode === m ? "#000" : "#555",
              }}
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* heading */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-white text-[17px] font-black tracking-tight mb-0.5">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </p>
            <p className="text-zinc-600 text-[11px] mb-6">
              {mode === "login"
                ? "Sign in to your automation workspace"
                : "Start automating in minutes — it's free"}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Error banner ── */}
        <AnimatePresence>
          {displayError && (
            <motion.div
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              className="mb-4 px-4 py-2.5 rounded-xl text-[11px] font-medium"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              {displayError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Google SSO ── */}
        <motion.button
          whileHover={!anyLoading ? { scale: 1.015 } : {}}
          whileTap={!anyLoading ? { scale: 0.985 } : {}}
          onClick={handleGoogleLogin}
          disabled={anyLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-[11px] rounded-2xl mb-5 relative overflow-hidden group transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${loadingGoogle ? `${Y}50` : "rgba(255,255,255,0.1)"}`,
            opacity: loadingEmail ? 0.4 : 1,
            cursor: anyLoading ? "not-allowed" : "pointer",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
          {loadingGoogle ? (
            <Spinner color="#fff" />
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="flex-shrink-0"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          <span className="text-zinc-300 text-xs font-semibold relative z-10">
            {loadingGoogle
              ? mode === "login"
                ? "Signing in…"
                : "Creating account…"
              : mode === "login"
                ? "Continue with Google"
                : "Sign up with Google"}
          </span>
        </motion.button>

        {/* divider */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.07))",
            }}
          />
          <span className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.2em]">
            or
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(255,255,255,0.07))",
            }}
          />
        </div>

        {/* ── Fields — animate in/out when mode switches ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-3"
          >
            {/* Name — register only */}
            {mode === "register" && (
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{ opacity: focused === "name" ? 1 : 0 }}
                  style={{ background: `${Y}08`, border: `1px solid ${Y}40` }}
                  transition={{ duration: 0.2 }}
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <IUser size={13} color={focused === "name" ? Y : "#3a3a3a"} />
                </div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={anyLoading}
                  className="relative w-full pl-9 pr-4 py-[11px] rounded-2xl text-[12px] outline-none transition-all duration-200 z-10"
                  style={inputStyle("name")}
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{ opacity: focused === "email" ? 1 : 0 }}
                style={{ background: `${Y}08`, border: `1px solid ${Y}40` }}
                transition={{ duration: 0.2 }}
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <IMail size={13} color={focused === "email" ? Y : "#3a3a3a"} />
              </div>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                disabled={anyLoading}
                className="relative w-full pl-9 pr-4 py-[11px] rounded-2xl text-[12px] outline-none transition-all duration-200 z-10"
                style={inputStyle("email")}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{ opacity: focused === "pass" ? 1 : 0 }}
                style={{ background: `${Y}08`, border: `1px solid ${Y}40` }}
                transition={{ duration: 0.2 }}
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <ILock size={13} color={focused === "pass" ? Y : "#3a3a3a"} />
              </div>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                disabled={anyLoading}
                className="relative w-full pl-9 pr-14 py-[11px] rounded-2xl text-[12px] outline-none transition-all duration-200 z-10"
                style={inputStyle("pass")}
              />
              <button
                onClick={() => setShowPass((v) => !v)}
                disabled={anyLoading}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest z-10 transition-colors"
                style={{ color: `${Y}70` }}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm password — register only */}
            {mode === "register" && (
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{ opacity: focused === "confirm" ? 1 : 0 }}
                  style={{ background: `${Y}08`, border: `1px solid ${Y}40` }}
                  transition={{ duration: 0.2 }}
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <ILock
                    size={13}
                    color={focused === "confirm" ? Y : "#3a3a3a"}
                  />
                </div>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setFocused("confirm")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={anyLoading}
                  className="relative w-full pl-9 pr-4 py-[11px] rounded-2xl text-[12px] outline-none transition-all duration-200 z-10"
                  style={{
                    ...inputStyle("confirm"),
                    border:
                      confirm && pass && confirm !== pass
                        ? "1px solid rgba(239,68,68,0.4)"
                        : inputStyle("confirm").border,
                  }}
                />
                {/* live mismatch hint */}
                {confirm && pass && confirm !== pass && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold z-10"
                    style={{ color: "#f87171" }}
                  >
                    ✕
                  </motion.span>
                )}
                {confirm && pass && confirm === pass && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold z-10"
                    style={{ color: "#22c55e" }}
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA button ── */}
        <motion.button
          whileHover={
            canSubmit ? { scale: 1.02, boxShadow: `0 16px 48px ${Y}45` } : {}
          }
          whileTap={canSubmit ? { scale: 0.97 } : {}}
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="relative w-full py-[13px] rounded-2xl text-[13px] font-black text-black overflow-hidden transition-all duration-200 mt-5"
          style={{
            background: Y,
            opacity: !canSubmit || loadingGoogle ? 0.45 : 1,
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          {/* shimmer */}
          {!anyLoading && (
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
              }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loadingEmail ? (
              <>
                <Spinner color="#000" />{" "}
                {mode === "login" ? "Signing In…" : "Creating Account…"}
              </>
            ) : mode === "login" ? (
              "Sign In — It's Free"
            ) : (
              "Create Account →"
            )}
          </span>
        </motion.button>

        {/* ── bottom link ── */}
        <div className="flex items-center justify-between mt-4">
          {mode === "login" ? (
            <>
              <p className="text-zinc-700 text-[10px]">
                No account?{" "}
                <motion.span
                  onClick={() => switchMode("register")}
                  className="cursor-pointer font-semibold"
                  style={{ color: `${Y}90` }}
                  whileHover={{ color: Y }}
                >
                  Create one →
                </motion.span>
              </p>
              <span className="text-zinc-700 text-[10px] cursor-pointer hover:text-zinc-500 transition-colors">
                Forgot?
              </span>
            </>
          ) : (
            <p className="text-zinc-700 text-[10px]">
              Already have an account?{" "}
              <motion.span
                onClick={() => switchMode("login")}
                className="cursor-pointer font-semibold"
                style={{ color: `${Y}90` }}
                whileHover={{ color: Y }}
              >
                Sign in →
              </motion.span>
            </p>
          )}
        </div>
      </div>

      <div
        className="h-[1px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${Y}20, transparent)`,
        }}
      />
    </motion.div>
  );
};

// ─── AI CHAT PANEL ───────────────────────────────────────────────────────────
// const ClaudeChatPanel = () => {
//   const messages = [
//     {
//       role: "user",
//       text: "Connect my Gmail to Slack and notify me when I get emails from VIPs",
//     },
//     {
//       role: "ai",
//       text: "Sure! I'll set up a workflow that watches your Gmail for VIP contacts and forwards them to a Slack DM instantly.",
//     },
//     { role: "user", text: "Also schedule a summary every morning at 9am" },
//     {
//       role: "ai",
//       text: "Done — daily digest at 9:00 AM posts to #daily-summary. Both automations are live.",
//       typing: true,
//     },
//   ];
//   const [visibleCount, setVisibleCount] = useState(0);
//   useEffect(() => {
//     const timers = messages.map((_, i) =>
//       setTimeout(() => setVisibleCount(i + 1), i * 900 + 400),
//     );
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ delay: 0.3, duration: 0.6 }}
//       className="relative rounded-3xl overflow-hidden flex flex-col"
//       style={{
//         background: "rgba(12,12,14,0.95)",
//         border: "1px solid rgba(255,255,255,0.08)",
//         boxShadow: `0 40px 120px rgba(0,0,0,0.8)`,
//         height: 380,
//         backdropFilter: "blur(20px)",
//       }}
//     >
//       <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
//         <div className="flex gap-1.5">
//           <div className="w-3 h-3 rounded-full bg-red-500/70" />
//           <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
//           <div className="w-3 h-3 rounded-full bg-green-500/70" />
//         </div>
//         <div className="flex items-center gap-2 ml-2">
//           <div
//             className="w-6 h-6 rounded-lg flex items-center justify-center"
//             style={{ background: Y }}
//           >
//             <ISparkle size={12} color="#000" />
//           </div>
//           <span className="text-white text-xs font-bold">Lurph AI</span>
//         </div>
//         <div className="ml-auto flex items-center gap-1.5">
//           <motion.span
//             className="w-2 h-2 rounded-full"
//             style={{ background: "#22c55e" }}
//             animate={{ opacity: [1, 0.4, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//           />
//           <span className="text-zinc-600 text-[10px]">Active</span>
//         </div>
//       </div>
//       <div className="flex-1 overflow-hidden px-4 py-4 space-y-3">
//         {messages.slice(0, visibleCount).map((msg, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 12, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.35 }}
//             className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
//           >
//             {msg.role === "ai" && (
//               <div
//                 className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
//                 style={{ background: Y }}
//               >
//                 <ISparkle size={13} color="#000" />
//               </div>
//             )}
//             <div
//               className="max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed"
//               style={
//                 msg.role === "user"
//                   ? {
//                       background: `${Y}18`,
//                       color: Y,
//                       border: `1px solid ${Y}25`,
//                     }
//                   : {
//                       background: "rgba(255,255,255,0.05)",
//                       color: "#ccc",
//                       border: "1px solid rgba(255,255,255,0.06)",
//                     }
//               }
//             >
//               {msg.text}
//               {msg.typing && i === visibleCount - 1 && (
//                 <motion.span className="inline-flex gap-0.5 ml-1">
//                   {[0, 1, 2].map((d) => (
//                     <motion.span
//                       key={d}
//                       className="w-1 h-1 rounded-full inline-block"
//                       style={{ background: "#555" }}
//                       animate={{ y: [0, -3, 0] }}
//                       transition={{
//                         duration: 0.6,
//                         delay: d * 0.15,
//                         repeat: Infinity,
//                       }}
//                     />
//                   ))}
//                 </motion.span>
//               )}
//             </div>
//             {msg.role === "user" && (
//               <div
//                 className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
//                 style={{ background: "rgba(255,255,255,0.08)" }}
//               >
//                 <IUser size={13} color="#888" />
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//       <div className="px-4 pb-4">
//         <div
//           className="flex items-center gap-3 px-4 py-3 rounded-2xl"
//           style={{
//             background: "rgba(255,255,255,0.04)",
//             border: "1px solid rgba(255,255,255,0.07)",
//           }}
//         >
//           <span className="text-zinc-700 text-xs flex-1">
//             Ask Lurph to automate anything…
//           </span>
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             className="w-7 h-7 rounded-xl flex items-center justify-center cursor-pointer"
//             style={{ background: Y }}
//           >
//             <ISend size={12} color="#000" />
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// ─── FLOATING FILE ────────────────────────────────────────────────────────────
const FloatingFile = ({
  name,
  type,
  size,
  color,
  x,
  y,
  rotate,
  delay,
  floatY,
}) => (
  <motion.div
    className="absolute flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl pointer-events-none"
    style={{
      left: x,
      top: y,
      background: "rgba(12,12,14,0.92)",
      border: "1px solid rgba(255,255,255,0.07)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      backdropFilter: "blur(12px)",
      rotate,
      zIndex: 30,
    }}
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: [0, floatY, 0] }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: {
        duration: 4 + Math.random() * 2,
        delay: delay + 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <div
      className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}18` }}
    >
      <IFile size={13} color={color} />
    </div>
    <div>
      <p className="text-white text-[11px] font-bold leading-none">{name}</p>
      <p className="text-zinc-600 text-[9px] mt-0.5">
        {type} · {size}
      </p>
    </div>
  </motion.div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const words = ["Automate", "Connect", "Integrate", "Orchestrate"];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setWordIdx((i) => (i + 1) % words.length), 2500); return () => clearInterval(t); }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ paddingTop: "120px" }}>
      {/* bg glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px]" style={{ background: `${Y}07` }} />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px]" style={{ background: "rgba(66,133,244,0.04)" }} />
        <div className="absolute top-[40%] left-[15%] w-[320px] h-[320px] rounded-full blur-[120px]" style={{ background: `${Y}05` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,214,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.025) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 flex flex-col lg:flex-row gap-16 items-center justify-between pt-16 pb-24">

        {/* ── LEFT: headline + chat UI ── */}
        <div className="flex-1 max-w-[520px] w-full flex flex-col gap-0">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit text-[10px] font-black uppercase tracking-[0.3em]" style={{ background: "rgba(255,214,0,0.08)", color: Y, borderColor: `${Y}30` }}>
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: Y }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            AI-Native · 150+ Connectors
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h1 className="font-black text-white tracking-tighter leading-[1.1] mb-3" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              <div className="flex flex-wrap items-center gap-x-3">
                <div className="relative h-[1.1em] overflow-hidden min-w-[1.1em]">
                  <AnimatePresence mode="wait">
                    <motion.span key={wordIdx} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -20, filter: "blur(4px)" }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} style={{ color: Y, display: "inline-block" }}>{words[wordIdx]}</motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-zinc-200">Everything.</span>
              </div>
            </h1>
            <p className="text-zinc-400 text-[16px] md:text-lg leading-relaxed mb-10 font-medium max-w-[420px]">The AI-native engine that connects your tools and automates your entire stack.</p>
          </motion.div>

          {/* Chat UI on the left */}
          {/* <ClaudeChatPanel /> */}

          {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex gap-8 mt-7 pl-1">
            {[["150+", "Integrations"], ["10M+", "Workflows/mo"], ["99.9%", "Uptime"]].map(([n, l]) => (
              <div key={l} className="relative">
                <div className="absolute -top-1 -left-1 w-1 h-1 rounded-full" style={{ background: Y }} />
                <p className="text-xl font-black pl-2" style={{ color: Y }}>{n}</p>
                <p className="text-zinc-600 text-[9px] font-medium uppercase tracking-widest mt-0.5 pl-2">{l}</p>
              </div>
            ))}
          </motion.div> */}
        </div>

        {/* ── RIGHT: login panel only ── */}
        <div className="flex-1 max-w-[570px] w-full">
          <LoginPanel />
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="text-zinc-700 text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 rounded-full" style={{ background: `linear-gradient(to bottom, ${Y}80, transparent)` }} />
      </motion.div>
    </section>
  );
};

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const StepCard = ({ num, title, desc, icon: Icon, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ x: 8 }}
    className="flex gap-6 p-6 rounded-3xl cursor-pointer transition-all duration-300"
    style={{
      background: isActive ? "rgba(255,214,0,0.06)" : "transparent",
      border: isActive ? `1px solid ${Y}30` : "1px solid transparent",
    }}
  >
    <div
      className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
      style={{ background: isActive ? Y : "rgba(255,255,255,0.05)" }}
    >
      <Icon size={22} color={isActive ? "#000" : "#555"} />
    </div>
    <div>
      <p
        className="text-[10px] font-black uppercase tracking-widest mb-1"
        style={{ color: isActive ? Y : "#444" }}
      >
        Step {num}
      </p>
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-zinc-600 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const steps = [
    {
      icon: ILink,
      title: "Connect Your Stack",
      desc: "One-click OAuth connections to Slack, GitHub, Notion, Gmail, and 146 more tools. No code, no config files.",
    },
    {
      icon: ISearch,
      title: "Define Your Trigger",
      desc: "Pick the event that starts your workflow — a new message, a commit, a form submission, or a scheduled time.",
    },
    {
      icon: IWorkflow,
      title: "Build with AI",
      desc: "Describe what you want in plain language. Lurph's AI drafts the workflow, maps the data, and handles edge cases.",
    },
    {
      icon: IZap,
      title: "Deploy & Scale",
      desc: "Publish instantly. Your automations run in Lurph's serverless cloud — no infra, unlimited scale.",
    },
  ];
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
            style={{ color: Y }}
          >
            How Lurph Works
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Four steps to
            <br />
            <span className="text-zinc-700">total automation.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.3 }}
              >
                <StepCard
                  {...s}
                  num={i + 1}
                  isActive={active === i}
                  onClick={() => setActive(i)}
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="relative rounded-[3rem] overflow-hidden p-8"
            style={{
              background: "rgba(10,10,10,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
              minHeight: 400,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: Y }}
                  >
                    {(() => {
                      const I = steps[active].icon;
                      return <I size={20} color="#000" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {steps[active].title}
                    </p>
                    <p className="text-zinc-600 text-xs">
                      Step {active + 1} of 4
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    "Trigger received",
                    "Parsing context...",
                    "Executing action",
                    "Delivering output",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background:
                          i === active % 4
                            ? `${Y}12`
                            : "rgba(255,255,255,0.03)",
                        border: `1px solid ${i === active % 4 ? `${Y}30` : "rgba(255,255,255,0.04)"}`,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: i === active % 4 ? Y : "#333" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: i === active % 4 ? Y : "#555" }}
                      >
                        {item}
                      </span>
                      {i < active % 4 && <ICheck size={14} color="#22c55e" />}
                    </motion.div>
                  ))}
                </div>
                <div
                  className="mt-6 h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: Y, width: `${(active + 1) * 25}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── INTEGRATIONS ─────────────────────────────────────────────────────────────
const IntegrationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const integrations = [
    { icon: ISlack, name: "Slack", color: "#4A154B" },
    { icon: IGithub, name: "GitHub", color: "#aaaaaa" },
    { icon: IDrive, name: "Drive", color: "#34A853" },
    { icon: IMail, name: "Gmail", color: "#EA4335" },
    { icon: INotion, name: "Notion", color: "#ffffff" },
    { icon: ICalendar, name: "Calendar", color: "#4285F4" },
    { icon: IDatabase, name: "Postgres", color: "#336791" },
    { icon: IGlobe, name: "Webhooks", color: Y },
    { icon: IWorkflow, name: "Zapier", color: "#FF4A00" },
    { icon: ILink, name: "REST API", color: "#22c55e" },
    { icon: IMail, name: "Outlook", color: "#0078D4" },
    { icon: ICpu, name: "OpenAI", color: "#10a37f" },
  ];
  const Marquee = ({ items, reverse }) => (
    <div
      className="overflow-hidden mb-6 relative"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-4"
        animate={{ x: reverse ? [-1200, 0] : [0, -1200] }}
        transition={{
          duration: reverse ? 26 : 22,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.map((g, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/5"
            style={{ background: "rgba(255,255,255,0.02)", minWidth: 160 }}
          >
            <g.icon size={20} color={g.color} />
            <span className="text-sm font-medium text-zinc-500">{g.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
  return (
    <section
      ref={ref}
      className="py-40 px-6"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(255,214,0,0.02), transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
            style={{ color: Y }}
          >
            Integrations
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Works with your
            <br />
            <span className="text-zinc-700">whole stack.</span>
          </h2>
          <p className="text-zinc-500 mt-6 max-w-lg mx-auto text-lg">
            Connect to 150+ apps with one click. No API keys, no webhooks, no
            headaches.
          </p>
        </motion.div>
        <Marquee items={[...integrations, ...integrations]} />
        <Marquee
          items={[
            ...integrations.slice(6),
            ...integrations,
            ...integrations.slice(0, 6),
          ]}
          reverse
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <button className="text-zinc-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 mx-auto">
            View all 150+ integrations <IArrow size={14} color="currentColor" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const FeatureCard = ({ icon: Icon, title, desc, highlight, wide }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -8 }}
      className={`relative rounded-[2.5rem] p-8 overflow-hidden group ${wide ? "md:col-span-2" : ""}`}
      style={{
        background: highlight ? Y : "rgba(10,10,10,0.9)",
        border: highlight ? "none" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {!highlight && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${Y}08, transparent 60%)`,
          }}
        />
      )}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: highlight ? "rgba(0,0,0,0.15)" : `${Y}15` }}
      >
        <Icon size={22} color={highlight ? "#000" : Y} />
      </div>
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: highlight ? "#000" : "#fff" }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed text-sm"
        style={{ color: highlight ? "rgba(0,0,0,0.6)" : "#555" }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

const FeaturesSection = () => (
  <section className="py-40 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p
          className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
          style={{ color: Y }}
        >
          Features
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
          Built for builders
          <br />
          <span className="text-zinc-700">who move fast.</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FeatureCard
          icon={ICpu}
          title="AI-Powered Logic"
          desc="Describe what you want in plain English. Lurph writes the logic, handles the conditionals, and adapts automatically."
        />
        <FeatureCard
          icon={IZap}
          title="Sub-second Execution"
          desc="Every workflow runs on serverless edge infrastructure. Triggers fire in under 200ms, globally."
        />
        <FeatureCard
          icon={IGlobe}
          title="Start Automating Today"
          highlight
          desc="Get access to all features free for 14 days. No credit card."
        />
        <FeatureCard
          icon={IDatabase}
          title="Full Data Lineage"
          desc="Every step of every run is logged, searchable, and auditable. Know exactly what happened and why."
          wide
        />
        <FeatureCard
          icon={ILink}
          title="Custom API Actions"
          desc="Not in our library? Build your own connector with any REST or GraphQL API in minutes."
        />
        <FeatureCard
          icon={ISearch}
          title="Smart Debugging"
          desc="AI-assisted error messages explain exactly what went wrong and suggest the fix — often in one click."
        />
      </div>
    </div>
  </section>
);
// ─── PRICING (LOCKED) ─────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="7" fill={Y} fillOpacity="0.15" />
    <path d="M4 7l2 2 4-4" stroke={Y} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CardLockOverlay = () => (
  <div style={{ position: "absolute", inset: 0, borderRadius: 16, zIndex: 10, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: "14px 16px", pointerEvents: "none" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "4px 10px 4px 8px", backdropFilter: "blur(6px)" }}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
        <path d="M4 5V3.5a2 2 0 1 1 4 0V5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>LOCKED</span>
    </div>
  </div>
);
// ─── PRICING ──────────────────────────────────────────────────────────────────
const PricingCard = ({ delay = 0, tier, price, desc, features, highlight = false, ctaLabel = "Get Started", ctaStyle = "default" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    style={{ position: "relative", borderRadius: 16, padding: highlight ? "2px" : undefined, background: highlight ? `linear-gradient(135deg, ${Y}55 0%, ${Y}11 60%, transparent 100%)` : undefined, userSelect: "none" }}
  >
    <CardLockOverlay />
    {highlight && <div style={{ position: "absolute", inset: 0, borderRadius: 16, boxShadow: `0 0 60px 10px ${Y}22`, pointerEvents: "none" }} />}
    <div style={{ background: highlight ? "#111" : "#0d0d0d", border: highlight ? "none" : "1px solid rgba(255,255,255,0.07)", borderRadius: highlight ? 14 : 16, padding: "32px 28px 28px", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: highlight ? Y : "rgba(255,255,255,0.35)" }}>{tier}</span>
        {highlight && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#000", background: Y, borderRadius: 999, padding: "3px 10px" }}>Popular</span>}
      </div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: price === "Custom" ? 36 : 52, fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{price}</span>
        {price !== "Free" && price !== "Custom" && <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>/mo</span>}
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 28, lineHeight: 1.6 }}>{desc}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckIcon />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{f}</span>
          </li>
        ))}
      </ul>
      <button disabled style={{ marginTop: 32, width: "100%", padding: "13px 0", borderRadius: 10, border: "none", cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, letterSpacing: "0.05em", transition: "all 0.2s", ...(ctaStyle === "primary" ? { background: Y, color: "#000", opacity: 0.85 } : ctaStyle === "outline" ? { background: "transparent", border: `1px solid ${Y}55`, color: Y, opacity: 0.7 } : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }) }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginRight: 5, opacity: 0.5 }}>
          <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 5V3.5a2 2 0 1 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {ctaLabel}
      </button>
    </div>
  </motion.div>
);

const PricingSection = () => (
  <section className="py-40 px-6" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,214,0,0.015), transparent)" }}>
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] mb-4" style={{ color: Y }}>Pricing</p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Start free.<br /><span className="text-zinc-700">Scale forever.</span></h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard delay={0} tier="Starter" price="Free" desc="For solo builders exploring automation." features={["5 active workflows", "500 runs/month", "10 connectors", "Community support"]} ctaLabel="Get Started" ctaStyle="default" />
        <PricingCard delay={0.1} tier="Pro" price="$29" desc="For teams shipping at speed." features={["Unlimited workflows", "50,000 runs/month", "All 150+ connectors", "AI workflow builder", "Priority support", "Custom triggers"]} highlight ctaLabel="Get Started" ctaStyle="primary" />
        <PricingCard delay={0.2} tier="Enterprise" price="Custom" desc="For orgs that need control and scale." features={["Unlimited everything", "SLA guarantees", "SSO & audit logs", "Dedicated infrastructure", "Custom AI models", "White-glove onboarding"]} ctaLabel="Talk to Sales" ctaStyle="outline" />
      </div>
    </div>
  </section>
);
// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TestimonialCard = ({ quote, name, role, company, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -6 }}
    className="p-8 rounded-3xl"
    style={{
      background: "rgba(10,10,10,0.9)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div className="flex mb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <IStar key={i} size={14} color={Y} />
      ))}
    </div>
    <p className="text-zinc-300 leading-relaxed mb-6 text-sm">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-black"
        style={{ background: Y }}
      >
        {name[0]}
      </div>
      <div>
        <p className="text-white text-sm font-bold">{name}</p>
        <p className="text-zinc-600 text-xs">
          {role} · {company}
        </p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => (
  <section className="py-40 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p
          className="text-[11px] font-black uppercase tracking-[0.4em] mb-4"
          style={{ color: Y }}
        >
          Testimonials
        </p>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
          Teams love
          <br />
          <span className="text-zinc-700">Lurph.</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <TestimonialCard
          delay={0}
          quote="We replaced 4 different automation tools with Lurph. Setup took an afternoon. ROI was immediate."
          name="Priya Mehta"
          role="Head of Engineering"
          company="Dataflow"
        />
        <TestimonialCard
          delay={0.1}
          quote="The AI workflow builder is genuinely magical. I described what I needed and it built it. No Zapier zap ever did that."
          name="James Okafor"
          role="Founder"
          company="ScaleOps"
        />
        <TestimonialCard
          delay={0.2}
          quote="Our support team now handles 3x the volume with the same headcount. Lurph automates the repetitive 80%."
          name="Sofia Chen"
          role="VP Operations"
          company="Nexarith"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-20 text-center"
      >
        <p className="text-zinc-700 text-xs uppercase tracking-widest mb-8 font-bold">
          Trusted by fast-moving teams at
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {[
            "Dataflow",
            "ScaleOps",
            "Nexarith",
            "Vectorize",
            "LoopLabs",
            "Cortex",
          ].map((co) => (
            <span
              key={co}
              className="text-zinc-700 font-black text-lg tracking-tight hover:text-zinc-500 transition-colors cursor-default"
            >
              {co}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── CTA ──────────────────────────────────────────────────────────────────────
const CTASection = () => (
  
  <section className="py-40 px-6 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-[200px] rounded-full"
        style={{ background: `${Y}18` }}
      />
    </div>
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <motion.div
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em]"
        style={{ background: `${Y}10`, color: Y, border: `1px solid ${Y}30` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.span
          className="w-2 h-2 rounded-full"
          style={{ background: Y }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        Now in Open Beta
      </motion.div>
      <h2 className="text-[clamp(3rem,12vw,11rem)] font-black text-white tracking-tighter leading-none mb-8">
        LURPH<span style={{ color: Y }}>.</span>
      </h2>
      <p className="text-zinc-500 text-xl max-w-xl mx-auto mb-12">
        Stop duct-taping your tools together. Start automating everything with
        AI.
      </p>
      <motion.button
        whileHover={{ scale: 1.06, boxShadow: `0 30px 80px ${Y}50` }}
        
        whileTap={{ scale: 0.97 }}
        className="px-14 py-5 rounded-full font-black text-black text-xl transition-all"
        onClick={()=>window.location.href="/login"}
        style={{ background: Y }}
      >
        Start Free — No Card Needed
      </motion.button>
    </div>
  </section>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function LurphApp() {
  return (
    <div
      className="bg-[#050505] text-zinc-400 font-sans overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFD600; }
        ::selection { background: rgba(255,214,0,0.25); }
      `}</style>
      <ParticleBG />
      <HeroSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <FeaturesSection />
      <PricingSection />
      {/* <TestimonialsSection /> */}
      <CTASection />
    </div>
  );
}
