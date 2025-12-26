import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      filename: "registerSW.js",
      manifestFilename: "manifest.webmanifest",
      includeAssets: ["icons/*.png"],
      workbox: {
        navigateFallback: "/index.html",
      },
      manifest: {
        name: "اتوپین سرویس",
        short_name: "اتوپین",
        description: "سرویس آنلاین اتوپین",
        start_url: "./",
        scope: "./",
        display: "standalone",
        theme_color: "#3FBD6E",
        background_color: "#ffffff",
        icons: [
          {
            src: "./icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
