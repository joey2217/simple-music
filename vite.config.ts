import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);

const ROOT = path.dirname(__filename);

// https://vitejs.dev/config/
const CHROME_VERSION = 122;

export default defineConfig({
  root: path.join(ROOT, "src"),
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.join(ROOT, "src"),
    },
  },
  build: {
    target: `chrome${CHROME_VERSION}`,
    outDir: path.join(ROOT, "dist/renderer"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(ROOT, "src/index.html"),
      },
    },
  },
});
