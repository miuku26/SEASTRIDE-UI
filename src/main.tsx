import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const resizeObserverLoopErrMessage = "ResizeObserver loop completed with undelivered notifications.";
window.addEventListener("error", (e) => {
  if (e.message === resizeObserverLoopErrMessage || e.message === "ResizeObserver loop limit exceeded") {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && /ResizeObserver loop/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
