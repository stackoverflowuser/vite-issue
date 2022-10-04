import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },

  build: {
    target: "es2020"
  },
  optimizeDeps: {
    esbuildOptions: {
        // Limit target browsers due to issue: Big integer literals are not available in the configured target environment ("chrome87", "edge88", "es2020", "firefox78", "safari13" + 2 overrides)'
        target: "es2020",
            // Node.js global to browser globalThis
            define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeModulesPolyfillPlugin()
          ]

    }
},
})
