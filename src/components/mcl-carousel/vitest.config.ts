import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [vue()],
  resolve: {
    alias: {
      '@bobbykim/manguito-theme': resolve(
        __dirname,
        '../manguito-theme/lib/index.ts',
      ),
    },
  },
  test: {
    name: 'mcl-carousel',
    environment: 'jsdom',
    globals: true,
    include: ['lib/**/*.test.ts'],
  },
})
