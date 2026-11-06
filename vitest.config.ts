import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      './src/components/manguito-theme',
      './src/components/mcl-forms',
      './src/components/mcl-collapse',
      './src/components/mcl-header',
      './src/components/mcl-tabs',
      './src/components/mcl-dropdown',
    ],
  },
})
