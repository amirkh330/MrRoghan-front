import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "@/providers/providers";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./settings/customTheme";
import { QueryClient } from "@tanstack/react-query";
import Clarity from "@microsoft/clarity";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("SW registered", reg))
      .catch((err) => console.log("SW registration failed", err));
  });
}

const projectId = "urkzmdg19s";

if (import.meta.env.PROD) {
  Clarity.init(projectId);
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <Providers />
    </ChakraProvider>
  </StrictMode>
);
export const queryClient = new QueryClient();
