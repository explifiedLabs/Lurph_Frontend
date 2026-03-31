import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import LurphApp from "./ExpliComp";
import LurphWorkflows from "./workflowPage";
import LurphNav from "./components/LurphNav";
import LurphFooter from "./components/LurphFooter";
import LurphBlogDetail from "./components/LurphBlogDetail";
import { CMSProvider } from "../hooks/useCMS";
import BlogMainPage from "./components/LurphBlog";
import LurphDynamicPage from "./components/LurphDynamicPages";
import LurphChatComingSoon from "./components/LurphChat";

import Trone from "./components1/Trone";
import DiscoverPage from "./components1/DiscoverPage";
import NewsPage from "./components1/NewsPage";
import BuildPlan from "./expli/v3/BuildPlan";
import AskQuestion from "./expli/v3/AskQuestion";
import DiagramBuilder from "./expli/v3/DiagramBuilder";
import SmartFlashcards from "./expli/v3/SmartFlashcards";
import CompareChat from "./expli/CompareChat";
import CompareSelection from "./expli/CompareSelection";
import ChatPanel from "./expli/ChatPanel";

// Redirects unauthenticated users to "/" instead of rendering the route.
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <LurphNav />
      <Routes>
        <Route path="/" element={<LurphApp />} />
        {/* <Route path="/chat" element={<ProtectedRoute></ProtectedRoute>} /> */}
        <Route path="/workflows" element={<LurphWorkflows />} />
        <Route path="/blog" element={<BlogMainPage />} />
        <Route path="/blog/:slug" element={<LurphBlogDetail />} />
        <Route path=":slug" element={<LurphDynamicPage />} />

        <Route path="/chat" element={<Trone />}>
          <Route index element={<ChatPanel />} />
          <Route path="ask" element={<AskQuestion />} />
          <Route path="plans" element={<BuildPlan />} />
          <Route path="diagrams" element={<DiagramBuilder />} />
          <Route path="flashcards" element={<SmartFlashcards />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="discover/:newsTitle" element={<NewsPage />} />
          <Route path="compare" element={<CompareSelection />} />
          <Route path="compare/chat" element={<CompareChat />} />
        </Route>
      </Routes>
      <LurphFooter />
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
