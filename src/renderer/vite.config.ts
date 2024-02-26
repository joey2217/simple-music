import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'node:path'

// https://vitejs.dev/config/
const ROOT = process.cwd()
const CHROME_VERSION = 122

const cspMate = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const htmlPlugin: () => PluginOption = () => {
  return {
    name: 'html-transform',
    apply: 'build',
    transformIndexHtml(html: string) {
      return html.replace(/<title>/, `${cspMate}\n\t\t<title>`)
    },
  }
}

export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react()],
  build: {
    target: `chrome${CHROME_VERSION}`,
    outDir: path.join(ROOT, 'dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(__dirname, 'index.html'),
      },
    },
  },
})
