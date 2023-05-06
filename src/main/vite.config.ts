import { defineConfig } from 'vite'
import { builtinModules } from 'module'
import * as path from 'path'

const NODE_VERSION = '18'
const ROOT = path.resolve(__dirname, '../../')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    envDir: process.cwd(),
    build: {
      sourcemap: mode === 'development' ? 'inline' : false,
      target: `node${NODE_VERSION}`,
      outDir: path.join(ROOT, 'dist'),
      emptyOutDir: true,
      minify: mode === 'development' ? false : 'esbuild',
      rollupOptions: {
        external: ['electron', ...builtinModules],
        input: {
          main: path.join(__dirname, 'index.ts'),
          preload: path.join(__dirname, 'windows/preload.ts'),
        },
        output: {
          format: 'cjs',
          entryFileNames: '[name].js',
        },
      },
    },
  }
})
