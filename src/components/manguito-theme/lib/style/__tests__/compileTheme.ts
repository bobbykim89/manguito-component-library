import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'

// Compiles mcl-theme-v4.css the way an app does (`@import 'tailwindcss'` then
// the theme) and builds only the given class candidates, so tests can read
// the real CSS the theme produces.
const require = createRequire(import.meta.url)
const { compile } = require('tailwindcss') as typeof import('tailwindcss')
const tailwindDir = dirname(require.resolve('tailwindcss/package.json'))
const themePath = resolve(__dirname, '../mcl-theme-v4.css')

export const buildThemeCss = async (candidates: string[]): Promise<string> => {
  const source = `@import 'tailwindcss';\n${readFileSync(themePath, 'utf8')}`
  const compiler = await compile(source, {
    base: dirname(themePath),
    loadStylesheet: async (id: string) => {
      const file =
        id === 'tailwindcss'
          ? 'index.css'
          : `${id.replace(/^tailwindcss\//, '')}`
      return {
        path: resolve(tailwindDir, file),
        base: tailwindDir,
        content: readFileSync(resolve(tailwindDir, file), 'utf8'),
      }
    },
  })
  return compiler.build(candidates)
}
