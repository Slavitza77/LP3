import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./base.css";
import "./styles.css";
import "./carrito.css";
import "./tema.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
