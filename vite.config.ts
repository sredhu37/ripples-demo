/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The app is served from the root path.
export default defineConfig({
  base: "/",
  plugins: [react()],
  // In development the Go API runs on :8080. The app always calls /api, so the same build works
  // behind nginx or any other proxy later.
  server: { proxy: { "/api": "http://localhost:8080" } },
  // All lessons ship in one 1.8 MB file, so the default 500 kB warning always fires.
  build: { chunkSizeWarningLimit: 2000 },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
