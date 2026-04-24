import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import LurphApp from "./components/LurphComp";
import LurphWorkflows from "./components/workflowPage";
import LurphNav from "./components/LurphNav";
import LurphFooter from "./components/LurphFooter";
import LurphBlogDetail from "./components/LurphBlogDetail";
import { CMSProvider } from "../hooks/useCMS";
import BlogMainPage from "./components/LurphBlog";
import LurphDynamicPage from "./components/LurphDynamicPages";

import Trone from "./lurphChatComp/Trone";
import ChatPanel from "./lurphChatComp/lurphChat/ChatPanel";
import HomeComp from "./lurphChatComp/lurphChat/HomeComp";
import ProjectsComp from "./lurphChatComp/lurphChat/ProjectsComp";
import WorkflowsComp from "./lurphChatComp/lurphChat/WorkflowsComp";
import ProjectCanvas from "./lurphChatComp/lurphChat/projectCanvas/ProjectCanvas";
import WorkflowsPageComp from "./lurphChatComp/lurphChat/workflowPageComp";
import IntegrationsPageComp from "./lurphChatComp/lurphChat/IntegrationsComp";
import LoginPage from "./components/LoginPage";

import { fetchMe } from "./features/authSlice";
import LurphCommunity from "./components/communityPage";

// import Notes from "./components/ToolsComp/Notes";
// import AiSubtitlerGenerator from "./components/ToolsComp/AiSubtitlerGenerator";
import VideoGeneratorLanding from "./components/ToolsComp/VideoGenerator";
import NotesLanding from "./components/ToolsComp/Notes";
import AiSubtitlerGeneratorLanding from "./components/ToolsComp/AiSubtitlerGenerator";
import SlideShowMakerLanding from "./components/ToolsComp/SlideShowMaker";
import GifGeneratorLanding from "./components/ToolsComp/GifGenerator";
import ImageStylerLanding from "./components/ToolsComp/ImageStyler";
import BgRemoverLanding from "./components/ToolsComp/BgRemover";
import TextToMemeGeneratorLanding from "./components/ToolsComp/TextToMemeGenerator";

// ── Auth initializer — runs once on app boot ──────────────────────────────────
// This is the fix for the "refresh logs me out" bug.
// We call fetchMe immediately so Redux rehydrates user from the session cookie.
function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return children;
}

// ── Shows a full-screen spinner while the initial fetchMe is in flight ─────────
function AppGate({ children }) {
  const loadingUser = useSelector((s) => s.auth.loadingUser);
  // Only block render on the very first load (user is still null AND loading)
  const user = useSelector((s) => s.auth.user);
  const isFirstLoad = loadingUser && user === null;

  if (isFirstLoad) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#050505",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "2.5px solid rgba(255,255,255,0.1)",
            borderTopColor: "#FFD600",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return children;
}

// ── Redirects unauthenticated users to "/" ─────────────────────────────────────
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const loadingUser = useSelector((s) => s.auth.loadingUser);

  // While fetchMe is still in flight, don't redirect yet
  if (loadingUser) return null;

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function PublicLayout({ children }) {
  const { pathname } = useLocation();
  const isChatRoute = pathname.startsWith("/chat");
  const isLoginRoute = pathname === "/login";

  return (
    <>
      {!isChatRoute && !isLoginRoute && <LurphNav />}
      {children}
      {!isChatRoute && !isLoginRoute && <LurphFooter />}
    </>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <AppGate>
          <PublicLayout>
            <Routes>
              {/* ── Public routes ──────────────────────────────────────────── */}
              <Route path="/" element={<LurphApp />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/workflows" element={<LurphWorkflows />} />
              <Route path="/community" element={<LurphCommunity />} />

              <Route path="/AI-Subtitler" element={<AiSubtitlerGeneratorLanding />} />
              <Route path="/notes" element={<NotesLanding />} />
              <Route path="/video-generator" element={<VideoGeneratorLanding />} />
              <Route path="/Slideshow" element={<SlideShowMakerLanding />} />
              <Route path="/gif-generator" element={<GifGeneratorLanding />} />
              <Route path="/image-styler" element={<ImageStylerLanding />} />
              <Route path="/bg-remover" element={<BgRemoverLanding />} />
              <Route path="/Text-to-meme" element={<TextToMemeGeneratorLanding />} />


              <Route path="/blog" element={<BlogMainPage />} />
              <Route path="/blog/:slug" element={<LurphBlogDetail />} />
              <Route path=":slug" element={<LurphDynamicPage />} />

              {/* ── Protected chat routes ─────────────────────────────────── */}
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Trone />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ChatPanel />} />
                <Route path="home" element={<HomeComp />} />
                <Route path="projects" element={<ProjectsComp />} />
                <Route path="project/:projectId" element={<ProjectCanvas />} />
                <Route path="workflows" element={<WorkflowsComp />} />
                <Route path=":chatId" element={<ChatPanel />} />
                <Route path="workflowpage" element={<WorkflowsPageComp />} />
                <Route path="integrations" element={<IntegrationsPageComp />} />
              </Route>
            </Routes>
          </PublicLayout>
        </AppGate>
      </AuthInitializer>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <CMSProvider>
        <AppRoutes />
      </CMSProvider>
    </Provider>
  );
}

export default App;