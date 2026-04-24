import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, registerUser, googleLogin, clearError } from "../features/authSlice";
import logo from "../../lurph.png";

const Y = "#FFD600";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Svg = ({ children, size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const IUser    = (p) => <Svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;
const ILock    = (p) => <Svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Svg>;
const IMail    = (p) => <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></Svg>;
const ISparkle = (p) => <Svg {...p}><path d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"/><circle cx="12" cy="12" r="4"/></Svg>;

// ── Spinner ───────────────────────────────────────────────────────────────────
const Spinner = ({ color = "#000" }) => (
  <motion.div
    className="w-4 h-4 rounded-full border-2 flex-shrink-0"
    style={{ borderColor: `${color}30`, borderTopColor: color }}
    animate={{ rotate: 360 }}
    transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
  />
);

// ── Google SVG ────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ── Chat Bubbles for right panel ──────────────────────────────────────────────
const chatMessages = [
  { id: 1, from: "bot",  text: "Hey! Welcome to Lurph. What would you like to explore today?", delay: 0 },
  { id: 2, from: "user", text: "Explain quantum entanglement in simple terms", delay: 0.4 },
  { id: 3, from: "bot",  text: "Sure! Imagine two magic coins — flip one and the other instantly shows the opposite, no matter how far apart they are. That's quantum entanglement.", delay: 0.8 },
  { id: 4, from: "user", text: "That's wild. Can you generate a diagram too?", delay: 1.2 },
  { id: 5, from: "bot",  text: "Absolutely — generating your diagram now ✨", delay: 1.6 },
];

const features = [
  { icon: "⚡", label: "Instant answers" },
  { icon: "🗺️", label: "Build plans" },
  { icon: "🧠", label: "Focus mode" },
  { icon: "📊", label: "Generate diagrams" },
];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loadingEmail, loadingGoogle, error, isAuthenticated } = useSelector(
    (s) => s.auth
  );

  const [mode, setMode]         = useState("login");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [pass, setPass]         = useState("");
  const [confirm, setConfirm]   = useState("");
  const [focused, setFocused]   = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [localError, setLocalError] = useState("");
  const returnTo = location.state?.from || "/";

  useEffect(() => {
    // If user authenticated and submitted, redirect to /chat
    if (submitted && isAuthenticated) {
      setSubmitted(false); // Reset so we don't loop
      navigate("/chat", { replace: true });
    }
  }, [submitted, isAuthenticated, navigate]);

  useEffect(() => {
    if (error) { dispatch(clearError()); setSubmitted(false); }
  }, [email, pass, name, confirm]);

  useEffect(() => { setLocalError(""); }, [name, email, pass, confirm, mode]);

  const switchMode = (next) => {
    setMode(next);
    setName(""); setEmail(""); setPass(""); setConfirm("");
    setFocused(null); setShowPass(false);
    dispatch(clearError());
  };

  const anyLoading  = loadingEmail || loadingGoogle;
  const canLogin    = email.trim() && pass.trim() && !anyLoading;
  const canRegister = name.trim() && email.trim() && pass.trim() && confirm.trim() && !anyLoading;
  const canSubmit   = mode === "login" ? canLogin : canRegister;

  const handleSubmit = () => {
    if (!canSubmit) return;
    if (mode === "register") {
      if (pass !== confirm)  { setLocalError("Passwords don't match."); return; }
      if (pass.length < 6)   { setLocalError("Password must be at least 6 characters."); return; }
      setSubmitted(true);
      dispatch(registerUser({ name, email, password: pass }));
    } else {
      setSubmitted(true);
      dispatch(loginUser({ email, password: pass }));
    }
  };

  const handleGoogle = () => {
    if (anyLoading) return;
    setSubmitted(true);
    dispatch(googleLogin());
  };

  const displayError =
    localError ||
    (typeof error === "string" ? error : error ? "Authentication failed. Please try again." : "");

  const inputStyle = (f) => ({
    background: focused === f ? "transparent" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === f ? "transparent" : "rgba(255,255,255,0.07)"}`,
    color: "#e4e4e4",
    caretColor: Y,
    opacity: loadingGoogle ? 0.4 : 1,
  });

  const Field = ({ id, type = "text", placeholder, value, onChange, icon: Icon, extra }) => (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: focused === id ? 1 : 0 }}
        style={{ background: `${Y}08`, border: `1px solid ${Y}40` }}
        transition={{ duration: 0.2 }}
      />
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <Icon size={13} color={focused === id ? Y : "#3a3a3a"} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(id)}
        onBlur={() => setFocused(null)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={anyLoading}
        className="relative w-full pl-9 pr-4 py-[11px] rounded-2xl text-[12px] outline-none transition-all duration-200 z-10"
        style={inputStyle(id)}
      />
      {extra}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#050505]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: rgba(255,214,0,0.25); }
        .chat-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Background glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(ellipse, ${Y}06 0%, transparent 70%)` }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* Main card — wide */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full flex overflow-hidden"
        style={{
          maxWidth: "900px",
          minHeight: "580px",
          margin: "24px",
          borderRadius: "28px",
          background: "linear-gradient(145deg, rgba(18,18,22,0.99) 0%, rgba(10,10,13,0.99) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 40px 100px rgba(0,0,0,0.8), 0 0 80px ${Y}08`,
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{ background: `linear-gradient(90deg, transparent, ${Y}80, transparent)` }} />

        {/* ── LEFT: Form panel ── */}
        <div className="flex flex-col justify-center w-full md:w-[420px] flex-shrink-0 p-8 relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-7">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" >
              <img src={logo} alt="Lurph Logo" className="w-10 h-10" />
            </div>
            <span className="text-white text-sm font-black tracking-tight">Lurph</span>
          </div>

          {/* Mode tabs */}
          <div
            className="flex gap-1 p-1 rounded-2xl mb-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="flex-1 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-200"
                style={{ background: mode === m ? Y : "transparent", color: mode === m ? "#000" : "#555" }}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mb-5"
            >
              <p className="text-white text-[18px] font-black tracking-tight mb-0.5">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </p>
              <p className="text-zinc-600 text-[11px]">
                {mode === "login" ? "Sign in to your automation workspace" : "Start automating in minutes — it's free"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {displayError && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -6, height: 0 }}
                className="mb-4 px-4 py-2.5 rounded-xl text-[11px] font-medium"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
              >
                {displayError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google */}
          <motion.button
            whileHover={!anyLoading ? { scale: 1.015 } : {}}
            whileTap={!anyLoading ? { scale: 0.985 } : {}}
            onClick={handleGoogle}
            disabled={anyLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-[11px] rounded-2xl mb-5 relative overflow-hidden group transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${loadingGoogle ? `${Y}50` : "rgba(255,255,255,0.1)"}`,
              opacity: loadingEmail ? 0.4 : 1,
              cursor: anyLoading ? "not-allowed" : "pointer",
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(255,255,255,0.04)" }} />
            {loadingGoogle ? <Spinner color="#fff" /> : <GoogleIcon />}
            <span className="text-zinc-300 text-xs font-semibold relative z-10">
              {loadingGoogle
                ? mode === "login" ? "Signing in…" : "Creating account…"
                : mode === "login" ? "Continue with Google" : "Sign up with Google"}
            </span>
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07))" }} />
            <span className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.2em]">or</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.07))" }} />
          </div>

          {/* Fields */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="space-y-3"
            >
              {mode === "register" && (
                <Field id="name" placeholder="Full name" value={name} onChange={setName} icon={IUser} />
              )}
              <Field id="email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} icon={IMail} />
              <Field
                id="pass"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={pass}
                onChange={setPass}
                icon={ILock}
                extra={
                  <button
                    onClick={() => setShowPass((v) => !v)}
                    disabled={anyLoading}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold uppercase tracking-widest z-10 transition-colors"
                    style={{ color: `${Y}70` }}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                }
              />
              {mode === "register" && (
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ opacity: focused === "confirm" ? 1 : 0 }}
                    style={{ background: `${Y}08`, border: `1px solid ${Y}40` }}
                    transition={{ duration: 0.2 }}
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <ILock size={13} color={focused === "confirm" ? Y : "#3a3a3a"} />
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
                      border: confirm && pass && confirm !== pass
                        ? "1px solid rgba(239,68,68,0.4)"
                        : inputStyle("confirm").border,
                    }}
                  />
                  {confirm && pass && confirm !== pass && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold z-10" style={{ color: "#f87171" }}>✕</motion.span>
                  )}
                  {confirm && pass && confirm === pass && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] font-bold z-10" style={{ color: "#22c55e" }}>✓</motion.span>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.button
            whileHover={canSubmit ? { scale: 1.02, boxShadow: `0 16px 48px ${Y}45` } : {}}
            whileTap={canSubmit ? { scale: 0.97 } : {}}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="relative w-full py-[13px] rounded-2xl text-[13px] font-black text-black overflow-hidden transition-all duration-200 mt-4"
            style={{
              background: Y,
              opacity: !canSubmit || loadingGoogle ? 0.45 : 1,
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            {!anyLoading && (
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loadingEmail ? (
                <><Spinner color="#000" /> {mode === "login" ? "Signing In…" : "Creating Account…"}</>
              ) : mode === "login" ? "Sign In — It's Free" : "Create Account →"}
            </span>
          </motion.button>

          {/* Footer links */}
          <div className="flex items-center justify-between mt-4">
            {mode === "login" ? (
              <>
                <p className="text-zinc-700 text-[10px]">
                  No account?{" "}
                  <motion.span onClick={() => switchMode("register")} className="cursor-pointer font-semibold"
                    style={{ color: `${Y}90` }} whileHover={{ color: Y }}>
                    Create one →
                  </motion.span>
                </p>
                <span className="text-zinc-700 text-[10px] cursor-pointer hover:text-zinc-500 transition-colors">Forgot?</span>
              </>
            ) : (
              <p className="text-zinc-700 text-[10px]">
                Already have an account?{" "}
                <motion.span onClick={() => switchMode("login")} className="cursor-pointer font-semibold"
                  style={{ color: `${Y}90` }} whileHover={{ color: Y }}>
                  Sign in →
                </motion.span>
              </p>
            )}
          </div>
        </div>

        {/* ── Vertical divider ── */}
        <div className="hidden md:block w-px self-stretch my-8"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)" }} />

        {/* ── RIGHT: Chat preview panel ── */}
        <div className="hidden md:flex flex-col flex-1 justify-between p-8 relative overflow-hidden">
          {/* subtle grid bg */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 z-20 w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition-all hover:bg-[#FFD600]"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#aaa",
            }}
          >
            ✕
          </button>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,214,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
            

          {/* Headline */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: `${Y}12`, border: `1px solid ${Y}25` }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: Y }} />
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: Y }}>Live preview</span>
            </div>
            <h2 className="text-white text-[22px] font-black tracking-tight leading-tight mb-2">
              Your AI workspace,<br />
              <span style={{ color: Y }}>reimagined.</span>
            </h2>
            <p className="text-zinc-600 text-[12px] leading-relaxed mb-5">
              Ask questions, build plans, generate diagrams — all in one place.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-zinc-400"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="relative z-10 flex flex-col gap-2.5 flex-1 justify-end">
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: msg.delay + 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.from === "bot" && (
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                    style={{ background: Y }}>
                    <ISparkle size={11} color="#000" />
                  </div>
                )}
                <div
                  className="max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed"
                  style={msg.from === "user"
                    ? { background: `${Y}18`, border: `1px solid ${Y}30`, color: "#e4e4e4", borderBottomRightRadius: "6px" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "#b0b0b0", borderBottomLeftRadius: "6px" }
                  }
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="flex items-center gap-2 pl-8"
            >
              <div className="flex gap-1 px-3.5 py-2.5 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: d }} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom stats */}
          <div className="relative z-10 flex items-center gap-4 mt-5 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[["10K+", "Active users"], ["99.9%", "Uptime"], ["< 1s", "Response time"]].map(([val, label]) => (
              <div key={label} className="flex flex-col">
                <span className="text-[14px] font-black" style={{ color: Y }}>{val}</span>
                <span className="text-[10px] text-zinc-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
