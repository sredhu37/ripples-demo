/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The app is served from the root path.
export default defineConfig({
  base: "/",
  plugins: [react()],
  // All lessons ship in one 1.8 MB file, so the default 500 kB warning always fires.
  build: { chunkSizeWarningLimit: 2000 },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
