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
        return outputChunk.fileName.includes('mcl-dropdown')
      },
    }),
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'MclDropdown',
      fileName: 'mcl-dropdown',
    },
    rollupOptions: {
      external: ['vue', '@bobbykim/manguito-theme'],
      output: {
        globals: {
          vue: 'Vue',
          '@bobbykim/manguito-theme': 'ManguitoTheme',
        },
      },
    },
  },
})
