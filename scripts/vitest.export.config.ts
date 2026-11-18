/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Only used by the one-time curriculum export.
export default defineConfig({
  plugins: [react()],
  test: { environment: "node", include: ["scripts/export-seed.test.ts"] },
});
