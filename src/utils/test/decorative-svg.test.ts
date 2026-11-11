// @vitest-environment node
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

// #111 item 1: inline SVG icons in this library are decorative (the control
// around them carries the name), so each one must be hidden from assistive
// tech and kept out of the tab order (old Edge/IE focus SVGs by default).
// A meaningful SVG opts out by declaring role="img" and naming itself.

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

const svgTags = (file: string) => {
  const source = readFileSync(file, 'utf8')
  return [...source.matchAll(/<svg\b[^>]*>/g)].map((match) => ({
    where: `${relative(root, file)}:${source.slice(0, match.index).split('\n').length}`,
    tag: match[0],
  }))
}

describe('inline SVGs in component sources', () => {
  const tags = vueFiles(root).flatMap(svgTags)

  it('finds the SVGs to check', () => {
    expect(tags.length).toBeGreaterThan(0)
  })

  it('hides every decorative SVG from assistive tech and focus', () => {
    const offenders = tags
      .filter(({ tag }) => !/\brole="img"/.test(tag))
      .filter(
        ({ tag }) =>
          !/\baria-hidden="true"/.test(tag) || !/\bfocusable="false"/.test(tag),
      )
      .map(({ where }) => where)
    expect(offenders).toEqual([])
  })
})
