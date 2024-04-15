import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [
vue(),
cssInjectedByJsPlugin({
jsAssetsFilterFunction: (outputChunk) => {
return outputChunk.fileName.includes('{%fileName%}')
},
}),
],
build: {
lib: {
entry: resolve({%dirname%}, 'lib/index.ts'),
name: '{%packageName}',
fileName: '{%fileName%}',
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
