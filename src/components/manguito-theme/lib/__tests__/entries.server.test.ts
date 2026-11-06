// @vitest-environment node
import { describe, expect, it } from 'vitest'

describe('source entry points (server)', () => {
  it.each([['../index'], ['../directives'], ['../composables'], ['../util']])(
    'imports %s without a DOM',
    async (path) => {
      const mod = await import(/* @vite-ignore */ path)
      expect(Object.keys(mod).length).toBeGreaterThan(0)
    },
  )
})
