import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from "./src/renderer/vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      testTimeout: 10000,
    },
  })
)
