import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [vue()],
  resolve: {
    alias: {
      // Subpath keys must come before the bare package name: Vite matches
      // alias entries in order with prefix semantics.
      '@bobbykim/manguito-theme/util': resolve(
        __dirname,
        '../manguito-theme/lib/util/index.ts',
      ),
      '@bobbykim/manguito-theme': resolve(
        __dirname,
        '../manguito-theme/lib/index.ts',
      ),
    },
  },
  test: {
    name: 'mcl-cards',
    environment: 'jsdom',
    globals: true,
    include: ['lib/**/*.test.ts'],
  },
})
