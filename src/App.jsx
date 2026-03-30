import { BrowserRouter, Route, Routes } from "react-router-dom";

import WorkflowPage from "./workflowPage";
import LurphApp from "./ExpliComp";
import LurphWorkflows from "./workflowPage";
import LurphNavbar from "./LurphNav";
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

function App() {
  return (
    <BrowserRouter>
      {/* Global Navbar remains fixed on all pages */}
      <LurphNavbar />

      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LurphApp />} />

        <Route path="/expli" element={<Trone />}>
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

        {/* Workflows Page Route */}
        <Route path="/workflows" element={<LurphWorkflows />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
