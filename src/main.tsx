import "./main.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "@/providers/providers";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./settings/customTheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <Providers />
    </ChakraProvider>
  </StrictMode>
);
