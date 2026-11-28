import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
// GitHub Pages serves this repo at /ivanma/
export default defineConfig({
  plugins: [react()],
  base: "/ivanma/",
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        stats: fileURLToPath(new URL("./stats.html", import.meta.url)),
      },
    },
  },
});
