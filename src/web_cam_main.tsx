import React from "react";
import ReactDOM from "react-dom/client";
import App from "./web_cam_app.tsx";
import "./index.css";
import { ThemeProvider } from "./components/darkmode/index.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not set");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
        <App />
      </ClerkProvider>
    </ThemeProvider>
  </React.StrictMode>
);

window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
