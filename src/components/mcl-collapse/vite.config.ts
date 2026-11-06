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
        return outputChunk.fileName.includes('mcl-collapse')
      },
    }),
    // tests import the theme's SSR harness, which is outside this package's rootDir
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      exclude: ['lib/**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'MclCollapse',
      fileName: 'mcl-collapse',
    },
    rollupOptions: {
      external: ['vue', /^@bobbykim\/manguito-theme(\/.*)?$/],
      output: {
        globals: {
          vue: 'Vue',
          '@bobbykim/manguito-theme': 'ManguitoTheme',
          '@bobbykim/manguito-theme/directives': 'ManguitoThemeDirectives',
          '@bobbykim/manguito-theme/util': 'ManguitoThemeUtil',
          '@bobbykim/manguito-theme/composable': 'ManguitoThemeComposable',
        },
      },
    },
  },
})
