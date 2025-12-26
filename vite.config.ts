import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/", // ⚡ حتما root باشه
  preview: {
    port: 5173,
    host: true,
    open: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      injectRegister: 'auto', // ⚡ تغییر دادیم
      manifest: {
        name: "اتوپین سرویس",
        short_name: "AutoPin",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#3FBD6E",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
