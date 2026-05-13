import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [vue()],
  resolve: {
    alias: {
      '@bobbykim/manguito-theme': resolve(__dirname, 'lib/index.ts'),
    },
  },
  test: {
    name: 'manguito-theme',
    environment: 'happy-dom',
    globals: true,
    include: ['lib/**/*.test.ts'],
  },
})
