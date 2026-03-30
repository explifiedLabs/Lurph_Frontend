import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CMSProvider } from "../hooks/useCMS.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import { ExpliProvider } from "./context/ExpliContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ExpliProvider>
        <CMSProvider>
          <App />
        </CMSProvider>
      </ExpliProvider>
    </AuthProvider>
  </StrictMode>,
);
