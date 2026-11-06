import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'test-utils',
    environment: 'jsdom',
    include: ['*.test.ts'],
  },
})
