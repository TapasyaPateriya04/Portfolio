import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Long-lived vendor code in its own chunks so app changes don't bust their cache.
const vendorChunks = [
  ["react", /node_modules[/\\](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[/\\]/],
  ["motion", /node_modules[/\\](framer-motion|motion-dom|motion-utils)[/\\]/],
];

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        manualChunks(id) {
          return vendorChunks.find(([, re]) => re.test(id))?.[0];
        },
      },
    },
  },
});
