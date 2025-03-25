import { defineConfig } from "vite";
import { builtinModules } from "node:module";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const ROOT = path.dirname(__filename);

const NODE_VERSION = 20;
const EXTERNAL = builtinModules
  .map((bm) => `node:${bm}`)
  .concat(builtinModules)
  .concat("electron", "electron/main", "electron/common", "electron/renderer");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: `node${NODE_VERSION}`,
    outDir: path.join(ROOT, "dist"),
    emptyOutDir: true,
    // lib: {
    //   entry: {
    //     preload: path.join(ROOT, '/src-main/windows/preload.ts'),
    //   },
    //   formats: ['cjs'],
    //   fileName: (_format, entryName) => entryName + '.cjs',
    // },
    rollupOptions: {
      input: {
        preload: path.join(ROOT, "/src-main/windows/preload.ts"),
      },
      output: {
        format: "cjs",
        entryFileNames: "[name].cjs",
      },
      external: EXTERNAL,
    },
  },
});
