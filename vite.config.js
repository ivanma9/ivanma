import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// GitHub Pages serves this repo at /ivanma/
export default defineConfig({ plugins: [react()], base: "/ivanma/" });
