import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://sportspace.io.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
