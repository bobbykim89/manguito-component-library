import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [vue()],
  resolve: {
    alias: {
      // Order matters: Vite matches alias entries in sequence with prefix
      // semantics, so the '/directives' subpath must come before the bare
      // package name or the shorter key shadows it and the subpath never
      // resolves. The failure mode is silent — the importing test file reports
      // "no tests" rather than failing.
      '@bobbykim/manguito-theme/directives': resolve(
        __dirname,
        '../manguito-theme/lib/directives/index.ts',
      ),
      '@bobbykim/manguito-theme': resolve(
        __dirname,
        '../manguito-theme/lib/index.ts',
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
