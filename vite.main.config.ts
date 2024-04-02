import { defineConfig } from 'vite'
import { builtinModules } from 'node:module'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)

const ROOT = path.dirname(__filename)

const NODE_VERSION = 20
const EXTERNAL = builtinModules
  .map((bm) => `node:${bm}`)
  .concat(builtinModules)
  .concat('electron')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      sourcemap: mode === 'development' ? 'inline' : false,
      target: `node${NODE_VERSION}`,
      outDir: path.join(ROOT, 'dist'),
      emptyOutDir: true,
      minify: mode === 'development' ? false : 'esbuild',
      rollupOptions: {
        external: EXTERNAL,
        input: {
          main: path.join(ROOT, '/src-main/index.ts'),
          preload: path.join(__dirname, '/src-main/windows/preload.ts'),
        },
        output: {
          format: 'module',
          entryFileNames: '[name].mjs',
        },
      },
    },
  }
})
