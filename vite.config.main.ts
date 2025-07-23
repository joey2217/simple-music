import { defineConfig, type Plugin } from "vite";
import { builtinModules } from "node:module";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "./package.json";

const __filename = fileURLToPath(import.meta.url);

const ROOT = path.dirname(__filename);

const NODE_VERSION = 20;
const EXTERNAL = builtinModules
  .map((bm) => `node:${bm}`)
  .concat(builtinModules)
  .concat("electron", "electron/main", "electron/common", "electron/renderer");

function electronPackagePlugin(): Plugin {
  let outDir = "dist";
  return {
    name: "electron-package",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    buildStart(options) {
      return options.fs.writeFile(
        path.join(outDir, "package.json"),
        JSON.stringify({
          name: pkg.name,
          version: pkg.version,
          main: "main.mjs",
          dependencies: pkg.dependencies,
        })
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [electronPackagePlugin()],
  build: {
    target: `node${NODE_VERSION}`,
    outDir: path.join(ROOT, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: path.join(ROOT, "/src-main/index.ts"),
      },
      output: {
        format: "es",
        entryFileNames: "[name].mjs",
      },
      external: EXTERNAL,
    },
  },
});
