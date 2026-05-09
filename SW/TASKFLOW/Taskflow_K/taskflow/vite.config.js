import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  // @stomp/stompjs / transitive deps expect Node's `global` (browser has globalThis)
  define: { global: "globalThis" },
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  server: {
    proxy: {
      // Auth microservice (matches docker-compose host port 18081)
      "/api/auth": { target: "http://localhost:18081", changeOrigin: true, secure: false },
      "/api/admin": { target: "http://localhost:18081", changeOrigin: true, secure: false },
      // Direct service connections (temporary fix to bypass gateway issues)
      // NOTE: Projects now goes through Gateway for proper role-based access control
      // "/api/projects": { target: "http://localhost:18082", changeOrigin: true, secure: false },
      "/api/tasks": { target: "http://localhost:18083", changeOrigin: true, secure: false },
      "/api/notifications": { target: "http://localhost:18084", changeOrigin: true, secure: false },
      // Everything else via API Gateway
      "/api": { target: "http://localhost:18080", changeOrigin: true, secure: false },
      "/swagger": { target: "http://localhost:18080", changeOrigin: true, secure: false },
      // STOMP/SockJS on notification-service (docker-compose host port 18084); avoids gateway CORS + 404 if gateway image is stale
      "/notifications": {
        target: "http://localhost:18084",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "react-vendor";
          }
        },
      },
    },
  },
});
