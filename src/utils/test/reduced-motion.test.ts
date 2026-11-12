// @vitest-environment node
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

// #111 item 2: a component whose styles animate (a Vue <Transition> class or a
// CSS animation) must also say what happens under prefers-reduced-motion.
// What it does there (fade instead of slide, finish instantly, stop) is up to
// the component; the browser check in the PR covers that.

const root = join(__dirname, '../../components')

const vueFiles = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'node_modules' || entry.name === 'dist'
        ? []
        : vueFiles(path)
    }
    return entry.name.endsWith('.vue') ? [path] : []
  })

const styleOf = (file: string): string =>
  [...readFileSync(file, 'utf8').matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)]
    .map((match) => match[1])
    .join('\n')

const animates = (css: string): boolean =>
  /-(enter|leave)-active\b/.test(css) || /\banimation\s*:/.test(css)

describe('animated component styles', () => {
  const animated = vueFiles(root).filter((file) => animates(styleOf(file)))

  it('finds the animated components', () => {
    expect(animated.length).toBeGreaterThan(0)
  })

  it('handle prefers-reduced-motion: reduce', () => {
    const missing = animated
      .filter((file) => !/prefers-reduced-motion:\s*reduce/.test(styleOf(file)))
      .map((file) => relative(root, file))
    expect(missing).toEqual([])
  })
})
