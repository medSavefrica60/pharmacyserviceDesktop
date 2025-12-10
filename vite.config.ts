import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  clearScreen: false,
  server: {
    port: 1420,
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/public/**",
        "**/src-tauri/**",
      ],
    },
    strictPort: true,
  },
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
