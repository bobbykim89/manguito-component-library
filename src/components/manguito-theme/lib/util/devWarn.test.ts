// @vitest-environment node
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { transformWithEsbuild } from 'vite'
import { describe, expect, it, vi } from 'vitest'

// Build devWarn the way a consumer's Vite (esbuild define) or webpack 5 dev
// build does: `process.env.NODE_ENV` is replaced, `process` itself is not
// defined in the browser (#128).
const load = async (define?: Record<string, string>) => {
  const source = readFileSync(resolve(__dirname, 'devWarn.ts'), 'utf8')
  const { code } = await transformWithEsbuild(source, 'devWarn.ts', {
    loader: 'ts',
    format: 'cjs',
    define,
  })
  const module = { exports: {} as { devWarn: (m: string) => void } }
  // run with no `process` in scope, as in a browser
  new Function('module', 'exports', 'process', code)(
    module,
    module.exports,
    undefined,
  )
  return module.exports.devWarn
}
const buildFor = (nodeEnv: string) =>
  load({ 'process.env.NODE_ENV': JSON.stringify(nodeEnv) })

describe('devWarn in a bundled browser build (#128)', () => {
  it('warns in a development build with no process global', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    ;(await buildFor('development'))('hello')
    expect(warn).toHaveBeenCalledWith('hello')
    warn.mockRestore()
  })

  it('stays silent in a production build', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    ;(await buildFor('production'))('hello')
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  it('does not throw unbundled in a browser', async () => {
    const devWarn = await load()
    expect(() => devWarn('x')).not.toThrow()
  })
})
