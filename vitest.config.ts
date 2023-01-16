import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    proxy: {
      '/netease': {
        target: 'https://music.163.com/weapi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/netease/, ''),
      },
      '/api163': {
        target: 'https://music.163.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api163/, ''),
      },
    },
  },
  test: {
    testTimeout: 10000,
  },
})
