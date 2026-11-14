// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { buildThemeCss } from './compileTheme'

// #122: one two-tone keyboard focus ring for the library.

type Rule = { selector: string; body: string }

/** Every innermost `selector { declarations }` block in the compiled CSS. */
const rules = (css: string): Rule[] =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selector: m[1].trim(),
    body: m[2],
  }))

const ruleFor = (css: string, selector: string): string =>
  rules(css)
    .filter((r) => r.selector === selector)
    .map((r) => r.body)
    .join('\n')

const rulesMatching = (css: string, re: RegExp): Rule[] =>
  rules(css).filter((r) => re.test(r.selector))

/**
 * Declarations of a variant utility. Tailwind's compile() emits variants
 * nested (`.cls { &:focus-visible { … } }`); the app's build flattens them.
 */
const variantRule = (css: string, cls: string, nested: string): string => {
  const outer = css.indexOf(`${cls} {`)
  if (outer < 0) return ''
  const inner = css.indexOf(`${nested} {`, outer)
  if (inner < 0) return ''
  const start = inner + nested.length + 2
  return css.slice(start, css.indexOf('}', start))
}

describe('mcl-focus-ring utility', () => {
  it('3px outline at 2px offset in --mcl-focus-color, 2px halo in --mcl-focus-halo', async () => {
    const css = await buildThemeCss(['focus-visible:mcl-focus-ring'])
    const rule = variantRule(
      css,
      '.focus-visible\\:mcl-focus-ring',
      '&:focus-visible',
    )
    expect(rule).toMatch(/outline:\s*3px solid var\(--mcl-focus-color,/)
    expect(rule).toMatch(/outline-offset:\s*2px/)
    expect(rule).toMatch(/0 0 0 2px\s+var\(--mcl-focus-halo,/)
    // Composes with existing shadows, with fallbacks when none is set.
    expect(rule).toMatch(/var\(--tw-shadow,\s*0 0 #0000\)/)
  })

  it('defaults resolve to the theme dark-3 and light-1 tokens', async () => {
    const css = await buildThemeCss(['focus-visible:mcl-focus-ring'])
    expect(css).toMatch(/--mcl-focus-color,\s*var\(--color-dark-3\)/)
    expect(css).toMatch(/--mcl-focus-halo,\s*var\(--color-light-1\)/)
    expect(css).toMatch(/--color-dark-3:/)
    expect(css).toMatch(/--color-light-1:/)
  })

  it('works through the variants the components use', async () => {
    const css = await buildThemeCss([
      'peer-focus-visible:mcl-focus-ring',
      'has-[input:focus-visible]:mcl-focus-ring',
    ])
    expect(css).toMatch(/:has\([^{]*input:focus-visible/)
    expect(css).toMatch(/\.peer\)?:focus-visible ~/)
  })

  it('is emitted after outline-none, so it wins on a text input', async () => {
    const css = await buildThemeCss([
      'outline-none',
      'focus-visible:mcl-focus-ring',
    ])
    const ring = css.indexOf('.focus-visible\\:mcl-focus-ring')
    expect(ring).toBeGreaterThan(-1)
    expect(ring).toBeGreaterThan(css.indexOf('.outline-none'))
  })
})

describe('.btn focus', () => {
  it('rings on :focus-visible, not :focus', async () => {
    const css = await buildThemeCss([
      'btn',
      'btn-progress',
      'btn-progress-r',
      'btn-group',
    ])
    expect(css).not.toMatch(/\.btn[^{,]*:focus(?!-visible)[^{]*\{/)
    expect(ruleFor(css, '.btn:focus-visible')).toMatch(
      /outline:\s*3px solid var\(--mcl-focus-color,/,
    )
  })

  it('only the focus-visible rule sets a .btn outline colour (hover keeps the ring)', async () => {
    const css = await buildThemeCss([
      'btn',
      'btn-invert',
      'btn-progress',
      'btn-warning',
    ])
    // A colour set by any other .btn rule (e.g. `.btn.btn-invert:hover`,
    // which outranks `.btn:focus-visible`) would repaint the ring on hover.
    const offenders = rulesMatching(css, /^\.btn/)
      .filter((r) => !r.selector.includes(':focus-visible'))
      .filter((r) => /outline-color\s*:|outline\s*:[^;]*var\(/.test(r.body))
      .map((r) => r.selector)
    expect(offenders).toEqual([])
  })

  it('btn-no-ring does not remove the keyboard ring', async () => {
    const css = await buildThemeCss(['btn', 'btn-no-ring'])
    expect(css).not.toMatch(/\.btn\.btn-no-ring\s*\{[^}]*outline:\s*none/)
  })
})
