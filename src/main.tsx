import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
    <App />

    </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
