import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { WeddingProvider } from "./context/WeddingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/:slug"
          element={
            <WeddingProvider>
              <App />
            </WeddingProvider>
          }
        />
        <Route path="/" element={<Navigate to="/ema-ignasius" replace />} />
        <Route path="*" element={<Navigate to="/ema-ignasius" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);