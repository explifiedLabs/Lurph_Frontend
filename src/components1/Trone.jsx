import { useEffect, useState } from "react";
import ExpliIntegration from "../expli/ExpliIntegration";
import ExpliSidebar from "../expli/ExpliSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Trone() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();

  // useEffect(() => {
  //   if (!auth) {
  //     navigate("/login");
  //   }
  // }, [auth]);

  return (
    <div className="flex relative text-white h-screen bg-[#050505] overflow-hidden">
      {/* Animated Background with Multiple Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs - Changed to Warm Yellow/Amber glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-200/5 rounded-full blur-[100px] animate-pulse-slow" />

        {/* Grid Pattern Overlay - Changed from Cyan to subtle Yellow-Gold */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(250, 204, 21, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 204, 21, 0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated Scanline Effect - Subtle Warm Tint */}
        <div
          className="absolute inset-0 opacity-[0.02] animate-scan"
          style={{
            background:
              "linear-gradient(transparent 50%, rgba(250, 204, 21, 0.05) 50%)",
            backgroundSize: "100% 4px",
          }}
        />
      </div>

      <button
        className="lg:hidden absolute top-2 left-4 z-10 bg-black/70 text-white p-2 rounded-md"
        onClick={() => setIsMobileOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <ExpliSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        link={"https://explified.com/expli/"}
      />

      <Outlet />

      {/* Advanced Animation Styles */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }

        @keyframes float-slower {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 40px) scale(1.1);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }

        /* Custom Scrollbar - Updated to Yellow/Amber Gradient */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            rgba(250, 204, 21, 0.4),
            rgba(217, 119, 6, 0.4)
          );
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            rgba(250, 204, 21, 0.7),
            rgba(217, 119, 6, 0.7)
          );
        }
      `}</style>
    </div>
  );
}

export default Trone;
