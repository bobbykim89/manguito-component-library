import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (outputChunk) => {
        return outputChunk.fileName.includes('core')
      },
    }),
    dts({
      rollupTypes: true,
      include: ['lib/**/*'],
      exclude: ['**/*.css'],
    }),
  ],
  build: {
    lib: {
      entry: {
        core: resolve(__dirname, 'lib/index.ts'),
        directives: resolve(__dirname, 'lib/directives/index.ts'),
        util: resolve(__dirname, 'lib/util/index.ts'),
        composable: resolve(__dirname, 'lib/composables/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core', 'tailwindcss'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    // Allow CSS code splitting for component styles
    cssCodeSplit: false, // Keep false to inject CSS into JS for components
  },
})
