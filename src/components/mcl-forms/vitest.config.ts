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
      '@bobbykim/manguito-theme/directives': resolve(
        __dirname,
        '../manguito-theme/lib/directives/index.ts',
      ),
    },
  },
  test: {
    name: 'mcl-forms',
    environment: 'happy-dom',
    globals: true,
    include: ['lib/**/*.test.ts'],
  },
})
