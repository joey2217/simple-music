import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import * as path from 'path'

const NODE_VERSION = 20
const ROOT = process.cwd()
const EXTERNAL = builtinModules
  .map((bm) => `node:${bm}`)
  .concat(builtinModules)
  .concat('electron')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: ROOT,
    envDir: process.cwd(),
    build: {
      sourcemap: mode === 'development' ? 'inline' : false,
      target: `node${NODE_VERSION}`,
      outDir: path.join(ROOT, 'dist'),
      emptyOutDir: true,
      minify: mode === 'development' ? false : 'esbuild',
      rollupOptions: {
        external: EXTERNAL,
        input: {
          main: path.join(__dirname, 'index.ts'),
          preload: path.join(__dirname, 'windows/preload.ts'),
        },
        output: {
          format: 'module',
          entryFileNames: '[name].mjs',
        },
      },
    },
  }
})
