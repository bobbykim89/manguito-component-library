# mcl-forms Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the shared primitives that all eight `mcl-forms` components will consume — three theme cva variants, four `lib/common/` modules, two icon components — each covered by tests, with nothing yet wired into a component.

**Architecture:** Colour variants go into `manguito-theme`'s existing cva namespace so they sit with every other colour variant and gain coverage from the existing `generateClass.test.ts`. Form-specific logic stays in `mcl-forms/lib/common/` as composables, following the `useCollapseState` provide/inject pattern already in the repo (Symbol key, `provideX()`, consumer `useX()` with an inject fallback so standalone use keeps working). One internal component — `FieldFeedback.vue` — exists because the `aria-describedby` contract needs byte-identical markup, which a composable cannot enforce.

**Tech Stack:** Vue 3.5 (`useId`), TypeScript 5.9 strict, class-variance-authority, Vitest 4 + happy-dom + @vue/test-utils, pnpm workspaces + Turborepo.

**Spec:** `docs/superpowers/specs/2026-08-22-mcl-forms-refactor-design.md`

**Plan 1 of 2.** This plan covers only the foundation. The eight components, Storybook stories, migration guide and README are plan 2, which consumes everything built here.

## Global Constraints

- Node `>=22.0.0`; pnpm `10.32.1`.
- All commits use Conventional Commits (repo uses commitizen). Scope is the package name.
- `mcl-forms/tsconfig.json` sets `strict`, `noUnusedLocals` and `noUnusedParameters` — no unused imports, locals or parameters anywhere.
- Tests are colocated as `lib/**/*.test.ts` (per CLAUDE.md). Never a separate `tests/` tree.
- **No new dependencies.** `vitest`, `@vue/test-utils` and `happy-dom` are already root devDependencies and hoisted to every workspace package.
- New cva variants follow the **raw-utility** convention (`ring-*`, `before:bg-*`), not the `mcl-` prefixed one used by `bgColorVariant` / `outlineColorVariant`. Match the neighbouring variant being mirrored.
- Every exported composable carries a JSDoc block: what it does, its params, what it returns. Short single-line `//` comments above non-obvious logic. Never put `@param` blocks inside a computed body — the current code does this and it documents the wrong scope.
- Explicit return-type annotations on exported functions, matching `useCollapseState`'s style.
- `manguito-theme` must build before `mcl-forms` (Turborepo enforces `dependsOn: ["^build"]`).
- **Boolean props that must distinguish "omitted" from "explicitly false" require
  an explicit `default: undefined`.** Verified against this repo's Vue version:

  | Declaration | Omitted | Passed `false` |
  |---|---|---|
  | `{ type: Boolean }` | `false` | `false` |
  | `{ type: Boolean, default: undefined }` | `undefined` | `false` |

  Vue's boolean casting coerces an omitted `Boolean` prop to `false` unless a
  default is explicitly declared. `invalid`, `required` and `disabled` rely on
  `undefined` meaning "inherit from the group", so in `<script setup>` they must
  be written `withDefaults(defineProps<{ invalid?: boolean }>(), { invalid: undefined })`.
  Omitting them from the `withDefaults` object yields `false` and inheritance
  silently never fires.

---

### Task 1: Three additive cva variants + widened `InputType` in `manguito-theme`

**Files:**
- Modify: `src/components/manguito-theme/lib/theme/index.ts` (add three `cva` blocks after `activeRingColorVariant`, ~line 340; add three entries to the `generateClass` object, ~line 1166)
- Modify: `src/components/manguito-theme/lib/theme/static/theme.types.ts:68`
- Test: `src/components/manguito-theme/lib/theme/__tests__/generateClass.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `peerCheckedBgColorVariant(props: { color: ColorPalette }): string` → `peer-checked:bg-<color>`
  - `peerFocusVisibleRingColorVariant(props: { color: ColorPalette }): string` → `peer-focus-visible:ring-<color>`
  - `focusVisibleRingColorVariant(props: { color: ColorPalette }): string` → `focus-visible:ring-<color>`
  - All three also reachable as `generateClass.<name>`.
  - `InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'`

- [ ] **Step 1: Write the failing tests**

Append to `src/components/manguito-theme/lib/theme/__tests__/generateClass.test.ts`. Also add the three names to the existing import block at the top of that file.

```ts
describe('generateClass namespace — peer and focus-visible variants', () => {
  it('peerCheckedBgColorVariant: warning returns peer-checked:bg-warning', () => {
    expect(peerCheckedBgColorVariant({ color: 'warning' })).toBe(
      'peer-checked:bg-warning',
    )
    expect(generateClass.peerCheckedBgColorVariant({ color: 'warning' })).toBe(
      'peer-checked:bg-warning',
    )
  })
  it('peerCheckedBgColorVariant: dark-4 returns peer-checked:bg-dark-4, not dark-1', () => {
    // The hand-written maps this variant replaces both mapped dark-4 to bg-dark-1.
    expect(peerCheckedBgColorVariant({ color: 'dark-4' })).toBe(
      'peer-checked:bg-dark-4',
    )
  })
  it('peerCheckedBgColorVariant: unknown color returns empty string', () => {
    expect(peerCheckedBgColorVariant({ color: 'neon-green' as any })).toBe('')
  })
  it('peerFocusVisibleRingColorVariant: primary returns peer-focus-visible:ring-primary', () => {
    expect(peerFocusVisibleRingColorVariant({ color: 'primary' })).toBe(
      'peer-focus-visible:ring-primary',
    )
    expect(
      generateClass.peerFocusVisibleRingColorVariant({ color: 'primary' }),
    ).toBe('peer-focus-visible:ring-primary')
  })
  it('focusVisibleRingColorVariant: light-4 returns focus-visible:ring-light-4', () => {
    expect(focusVisibleRingColorVariant({ color: 'light-4' })).toBe(
      'focus-visible:ring-light-4',
    )
    expect(generateClass.focusVisibleRingColorVariant({ color: 'light-4' })).toBe(
      'focus-visible:ring-light-4',
    )
  })
  it('all three cover every ColorPalette member', () => {
    // Keyed by ColorPalette rather than written as a literal list: adding a
    // member to the palette without a variant entry then fails to compile
    // here instead of silently dropping out of the sweep. The shipped test is
    // the reference; `import type { ColorPalette } from '../static/theme.types'`.
    const expectedSuffix: Record<ColorPalette, string> = {
      primary: 'primary',
      /* ...one entry per palette member, suffix === member... */
      transparent: 'transparent',
    }
    const colors = Object.keys(expectedSuffix) as ColorPalette[]
    expect(colors).toHaveLength(17)
    for (const color of colors) {
      const suffix = expectedSuffix[color]
      expect(peerCheckedBgColorVariant({ color })).toBe(
        `peer-checked:bg-${suffix}`,
      )
      expect(peerFocusVisibleRingColorVariant({ color })).toBe(
        `peer-focus-visible:ring-${suffix}`,
      )
      expect(focusVisibleRingColorVariant({ color })).toBe(
        `focus-visible:ring-${suffix}`,
      )
    }
  })
})
```

**No runtime test for the `InputType` widening.** Vitest transpiles with esbuild
and never type-checks, so `const t: InputType[] = ['tel']` cannot fail at
runtime — a test asserting the length of a literal you just wrote asserts
nothing. The type change is verified by Step 7's build instead, where
`vue-tsc` and `vite-plugin-dts` do check it, and by plan 2 consuming it in
`MclInputText`'s `type` prop.

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd src/components/manguito-theme && pnpm test`
Expected: FAIL — `peerCheckedBgColorVariant is not exported by '../index'` (and the two siblings), plus a TypeScript error on `'tel'` not being assignable to `InputType`.

- [ ] **Step 3: Widen `InputType`**

In `src/components/manguito-theme/lib/theme/static/theme.types.ts`, replace line 68:

```ts
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'tel'
  | 'url'
  | 'search'
  | 'number'
```

- [ ] **Step 4: Add the three cva variants**

In `src/components/manguito-theme/lib/theme/index.ts`, insert after the `activeRingColorVariant` block. Write all seventeen colours explicitly in each — that is the established shape of every neighbouring variant, and it is what makes Tailwind's scanner see the class strings.

```ts
export const peerCheckedBgColorVariant = cva('', {
  variants: {
    color: {
      primary: 'peer-checked:bg-primary',
      secondary: 'peer-checked:bg-secondary',
      success: 'peer-checked:bg-success',
      danger: 'peer-checked:bg-danger',
      info: 'peer-checked:bg-info',
      warning: 'peer-checked:bg-warning',
      'light-1': 'peer-checked:bg-light-1',
      'light-2': 'peer-checked:bg-light-2',
      'light-3': 'peer-checked:bg-light-3',
      'light-4': 'peer-checked:bg-light-4',
      'dark-1': 'peer-checked:bg-dark-1',
      'dark-2': 'peer-checked:bg-dark-2',
      'dark-3': 'peer-checked:bg-dark-3',
      'dark-4': 'peer-checked:bg-dark-4',
      black: 'peer-checked:bg-black',
      white: 'peer-checked:bg-white',
      transparent: 'peer-checked:bg-transparent',
    },
  },
})

export const peerFocusVisibleRingColorVariant = cva('', {
  variants: {
    color: {
      primary: 'peer-focus-visible:ring-primary',
      secondary: 'peer-focus-visible:ring-secondary',
      success: 'peer-focus-visible:ring-success',
      danger: 'peer-focus-visible:ring-danger',
      info: 'peer-focus-visible:ring-info',
      warning: 'peer-focus-visible:ring-warning',
      'light-1': 'peer-focus-visible:ring-light-1',
      'light-2': 'peer-focus-visible:ring-light-2',
      'light-3': 'peer-focus-visible:ring-light-3',
      'light-4': 'peer-focus-visible:ring-light-4',
      'dark-1': 'peer-focus-visible:ring-dark-1',
      'dark-2': 'peer-focus-visible:ring-dark-2',
      'dark-3': 'peer-focus-visible:ring-dark-3',
      'dark-4': 'peer-focus-visible:ring-dark-4',
      black: 'peer-focus-visible:ring-black',
      white: 'peer-focus-visible:ring-white',
      transparent: 'peer-focus-visible:ring-transparent',
    },
  },
})

export const focusVisibleRingColorVariant = cva('', {
  variants: {
    color: {
      primary: 'focus-visible:ring-primary',
      secondary: 'focus-visible:ring-secondary',
      success: 'focus-visible:ring-success',
      danger: 'focus-visible:ring-danger',
      info: 'focus-visible:ring-info',
      warning: 'focus-visible:ring-warning',
      'light-1': 'focus-visible:ring-light-1',
      'light-2': 'focus-visible:ring-light-2',
      'light-3': 'focus-visible:ring-light-3',
      'light-4': 'focus-visible:ring-light-4',
      'dark-1': 'focus-visible:ring-dark-1',
      'dark-2': 'focus-visible:ring-dark-2',
      'dark-3': 'focus-visible:ring-dark-3',
      'dark-4': 'focus-visible:ring-dark-4',
      black: 'focus-visible:ring-black',
      white: 'focus-visible:ring-white',
      transparent: 'focus-visible:ring-transparent',
    },
  },
})
```

- [ ] **Step 5: Register them in the `generateClass` object**

In the same file, add three entries to the `generateClass` object next to `activeRingColorVariant`:

```ts
  peerCheckedBgColorVariant,
  peerFocusVisibleRingColorVariant,
  focusVisibleRingColorVariant,
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd src/components/manguito-theme && pnpm test`
Expected: PASS, all suites.

- [ ] **Step 7: Verify the package still builds**

Run: `cd src/components/manguito-theme && pnpm run build`
Expected: exit 0. This matters because `vite-plugin-dts` with `rollupTypes: true` will fail loudly if the new exports break type rollup.

- [ ] **Step 8: Add a changeset**

Run: `pnpm changeset`
Select `@bobbykim/manguito-theme`, choose **minor**, and use the summary:
`Add peerCheckedBgColorVariant, peerFocusVisibleRingColorVariant and focusVisibleRingColorVariant; widen InputType with tel, url, search and number.`

- [ ] **Step 9: Commit**

```bash
git add src/components/manguito-theme/lib/theme/index.ts \
        src/components/manguito-theme/lib/theme/static/theme.types.ts \
        src/components/manguito-theme/lib/theme/__tests__/generateClass.test.ts \
        .changeset
git commit -m "feat(manguito-theme): add peer-checked and focus-visible color variants

Adds peerCheckedBgColorVariant, peerFocusVisibleRingColorVariant and
focusVisibleRingColorVariant, and widens InputType with tel, url,
search and number. All additive."
```

---

### Task 2: `mcl-forms` test harness + `useInputSurface`

The vitest wiring is folded into this task because `useInputSurface` is the first deliverable that needs it — a test harness with nothing to test is not independently reviewable.

**Files:**
- Create: `src/components/mcl-forms/vitest.config.ts`
- Create: `src/components/mcl-forms/lib/common/useInputSurface.ts`
- Modify: `src/components/mcl-forms/package.json` (add `test` and `test:watch` scripts)
- Modify: `vitest.config.ts` (root — add `mcl-forms` to `projects`)
- Test: `src/components/mcl-forms/lib/common/useInputSurface.test.ts`

**Interfaces:**
- Consumes: `generateClass` and `ColorPalette` from `@bobbykim/manguito-theme`; `focusVisibleRingColorVariant` from Task 1.
- Produces:
  ```ts
  export interface InputSurfaceOptions {
    bgColor: ColorPalette
    textColor: ColorPalette
    borderColor: ColorPalette
    showBorder: boolean
    showShadow: boolean
    showHighlight: boolean
    rounded: boolean
  }
  export const useInputSurface: (
    options: InputSurfaceOptions,
  ) => ComputedRef<string>
  ```
  `options` is the component's reactive `props` object, read inside a `computed` so tracking works. Class order is fixed and load-bearing for tests: background, text, border, focus-visible ring, shadow, rounded.

- [ ] **Step 1: Create the vitest config**

Create `src/components/mcl-forms/vitest.config.ts`, mirroring `src/components/manguito-theme/vitest.config.ts`:

```ts
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineProject } from 'vitest/config'

export default defineProject({
  plugins: [vue()],
  resolve: {
    alias: {
      '@bobbykim/manguito-theme': resolve(
        __dirname,
        '../manguito-theme/lib/index.ts',
      ),
      '@bobbykim/manguito-theme/directives': resolve(
        __dirname,
        '../manguito-theme/lib/directives/index.ts',
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
```

The `directives` alias is included now because `MclSelect` imports `vClickOutside` from that subpath, and plan 2 will need it resolving.

- [ ] **Step 2: Register the project at the root**

Replace the contents of `vitest.config.ts` at the repo root:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      './src/components/manguito-theme',
      './src/components/mcl-forms',
    ],
  },
})
```

- [ ] **Step 3: Add test scripts to the package**

In `src/components/mcl-forms/package.json`, extend `scripts` to match `manguito-theme`:

```json
  "scripts": {
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 4: Write the failing test**

Create `src/components/mcl-forms/lib/common/useInputSurface.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { useInputSurface, type InputSurfaceOptions } from './useInputSurface'

const base = (): InputSurfaceOptions => ({
  bgColor: 'light-1',
  textColor: 'black',
  borderColor: 'light-4',
  showBorder: false,
  showShadow: false,
  showHighlight: true,
  rounded: false,
})

describe('useInputSurface', () => {
  it('emits background and text colour with all flags off', () => {
    const surface = useInputSurface(base())
    expect(surface.value).toBe('mcl-bg-light-1 text-black')
  })

  it('adds border-2 and the border colour when showBorder is true', () => {
    const surface = useInputSurface({ ...base(), showBorder: true })
    expect(surface.value).toBe('mcl-bg-light-1 text-black border-2 border-light-4')
  })

  it('adds the focus-visible ring only when showHighlight is false', () => {
    const withHighlight = useInputSurface({ ...base(), showHighlight: true })
    expect(withHighlight.value).not.toContain('focus-visible:ring-light-4')

    const withoutHighlight = useInputSurface({ ...base(), showHighlight: false })
    expect(withoutHighlight.value).toContain('focus-visible:ring-4')
    expect(withoutHighlight.value).toContain('focus-visible:ring-light-4')
  })

  it('adds shadow-md when showShadow is true', () => {
    const surface = useInputSurface({ ...base(), showShadow: true })
    expect(surface.value).toContain('shadow-md')
  })

  it('adds rounded-md when rounded is true', () => {
    const surface = useInputSurface({ ...base(), rounded: true })
    expect(surface.value).toContain('rounded-md')
  })

  it('keeps a stable class order across all flags', () => {
    const surface = useInputSurface({
      ...base(),
      showBorder: true,
      showShadow: true,
      showHighlight: false,
      rounded: true,
    })
    expect(surface.value).toBe(
      'mcl-bg-light-1 text-black border-2 border-light-4 ' +
        'focus-visible:ring-4 ring-offset-2 transition-all duration-300 ease-linear ' +
        'focus-visible:ring-light-4 shadow-md rounded-md',
    )
  })

  it('recomputes when the reactive source changes', () => {
    const props = reactive(base())
    const surface = useInputSurface(props)
    expect(surface.value).toContain('mcl-bg-light-1')
    props.bgColor = 'dark-3'
    expect(surface.value).toContain('mcl-bg-dark-3')
    expect(surface.value).not.toContain('mcl-bg-light-1')
  })
})
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test`
Expected: FAIL — `Failed to resolve import "./useInputSurface"`.

- [ ] **Step 6: Implement the composable**

Create `src/components/mcl-forms/lib/common/useInputSurface.ts`:

```ts
import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed, type ComputedRef } from 'vue'

export interface InputSurfaceOptions {
  bgColor: ColorPalette
  textColor: ColorPalette
  borderColor: ColorPalette
  showBorder: boolean
  showShadow: boolean
  showHighlight: boolean
  rounded: boolean
}

/**
 * Builds the shared surface classes for the text-like form controls
 * (MclInputText, MclTextArea, MclSelect, MclInputFile).
 *
 * @param options - the component's reactive `props` object. Values are read
 *   inside the computed, so reactivity is tracked without passing refs.
 * @returns a computed space-joined class string, in a fixed order:
 *   background, text, border, focus-visible ring, shadow, rounded.
 */
export const useInputSurface = (
  options: InputSurfaceOptions,
): ComputedRef<string> =>
  computed<string>(() => {
    const {
      bgColor,
      textColor,
      borderColor,
      showBorder,
      showShadow,
      showHighlight,
      rounded,
    } = options
    const classArray: string[] = [
      generateClass.bgColorVariant({ color: bgColor }),
      generateClass.textColorVariant({ color: textColor }),
    ]
    if (showBorder) {
      classArray.push(
        'border-2',
        generateClass.borderColorVariant({ color: borderColor }),
      )
    }
    // The animated highlight bar is the focus affordance when enabled; the ring
    // is only the fallback for when it is switched off.
    if (!showHighlight) {
      classArray.push(
        'focus-visible:ring-4 ring-offset-2 transition-all duration-300 ease-linear',
        generateClass.focusVisibleRingColorVariant({ color: borderColor }),
      )
    }
    if (showShadow) {
      classArray.push('shadow-md')
    }
    if (rounded) {
      classArray.push('rounded-md')
    }
    return classArray.join(' ')
  })
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test`
Expected: PASS, 9 tests.

- [ ] **Step 8: Verify both projects run from the root**

Run: `pnpm test`
Expected: PASS, two projects reported — `manguito-theme` and `mcl-forms`.

- [ ] **Step 9: Commit**

```bash
git add src/components/mcl-forms/vitest.config.ts \
        src/components/mcl-forms/package.json \
        src/components/mcl-forms/lib/common/useInputSurface.ts \
        src/components/mcl-forms/lib/common/useInputSurface.test.ts \
        vitest.config.ts
git commit -m "test(mcl-forms): add vitest project and useInputSurface composable

Extracts the border/shadow/rounded/highlight class computation that is
near-duplicated across four components, and moves the ring path from
focus: to focus-visible: so mouse users do not get rings."
```

---

### Task 3: `useToggleControl`

**Files:**
- Create: `src/components/mcl-forms/lib/common/useToggleControl.ts`
- Test: `src/components/mcl-forms/lib/common/useToggleControl.test.ts`

**Interfaces:**
- Consumes: `peerCheckedBgColorVariant`, `peerFocusVisibleRingColorVariant`, `beforeBgColorVariant`, `bgColorVariant`, `borderColorVariant` from Task 1 and the existing theme; `InputSizeType` from `../common/index.types`.
- Produces:
  ```ts
  export interface ToggleControlOptions {
    size: InputSizeType
    bgColor: ColorPalette
    checkedBgColor: ColorPalette
    indicatorColor: ColorPalette
    borderColor: ColorPalette
    showShadow: boolean
    rounded: boolean
  }
  export interface ToggleControl {
    boxClass: ComputedRef<string>       // visual span: colours, shadow, rounding
    sizeClass: ComputedRef<string>      // visual span: box + indicator dimensions
    switchVars: ComputedRef<Record<string, string>>  // CSS custom props for MclInputSwitch
  }
  export const useToggleControl: (options: ToggleControlOptions) => ToggleControl
  ```
  `boxClass` order is fixed: background, border colour, indicator (`before:bg-*`), checked background, focus-visible ring, shadow, rounding.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/common/useToggleControl.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'
import { useToggleControl, type ToggleControlOptions } from './useToggleControl'

const base = (): ToggleControlOptions => ({
  size: 'md',
  bgColor: 'light-1',
  checkedBgColor: 'warning',
  indicatorColor: 'dark-3',
  borderColor: 'dark-1',
  showShadow: false,
  rounded: false,
})

describe('useToggleControl — boxClass', () => {
  it('composes background, border, indicator, checked background and focus ring', () => {
    const { boxClass } = useToggleControl(base())
    expect(boxClass.value).toBe(
      'mcl-bg-light-1 border-dark-1 before:bg-dark-3 ' +
        'peer-checked:bg-warning peer-focus-visible:ring-2 ring-offset-2 ' +
        'peer-focus-visible:ring-dark-1',
    )
  })

  it('always emits a focus-visible ring — this is the WCAG 2.4.7 fix', () => {
    const { boxClass } = useToggleControl(base())
    expect(boxClass.value).toContain('peer-focus-visible:ring-2')
    expect(boxClass.value).toContain('peer-focus-visible:ring-dark-1')
  })

  it('maps dark-4 correctly, unlike the hand-written maps it replaces', () => {
    const { boxClass } = useToggleControl({
      ...base(),
      checkedBgColor: 'dark-4',
      indicatorColor: 'dark-4',
    })
    expect(boxClass.value).toContain('peer-checked:bg-dark-4')
    expect(boxClass.value).toContain('before:bg-dark-4')
    expect(boxClass.value).not.toContain('bg-dark-1')
  })

  it('adds drop-shadow-md when showShadow is true', () => {
    const { boxClass } = useToggleControl({ ...base(), showShadow: true })
    expect(boxClass.value).toContain('drop-shadow-md')
  })

  it('adds rounding to both box and indicator when rounded is true', () => {
    const { boxClass } = useToggleControl({ ...base(), rounded: true })
    expect(boxClass.value).toContain('rounded-md')
    expect(boxClass.value).toContain('before:rounded-[3px]')
  })

  it('recomputes when the reactive source changes', () => {
    const props = reactive(base())
    const { boxClass } = useToggleControl(props)
    expect(boxClass.value).toContain('peer-checked:bg-warning')
    props.checkedBgColor = 'success'
    expect(boxClass.value).toContain('peer-checked:bg-success')
  })
})

describe('useToggleControl — sizeClass', () => {
  it('returns small dimensions for sm', () => {
    const { sizeClass } = useToggleControl({ ...base(), size: 'sm' })
    expect(sizeClass.value).toBe('h-xs w-xs before:h-2xs before:w-2xs')
  })
  it('returns medium dimensions for md', () => {
    const { sizeClass } = useToggleControl({ ...base(), size: 'md' })
    // 12px is an arbitrary value on purpose: the indicator is half the box at
    // every size (sm 16->8, md 24->12, lg 32->16) and the token scale jumps
    // 2xs=8px -> xs=16px, so md's half has no token. Do not "fix" this to 3xs,
    // which is 4px and would shrink the indicator to a third of its size.
    expect(sizeClass.value).toBe('h-sm w-sm before:h-[12px] before:w-[12px]')
  })
  it('returns large dimensions for lg', () => {
    const { sizeClass } = useToggleControl({ ...base(), size: 'lg' })
    expect(sizeClass.value).toBe('h-md w-md before:h-xs before:w-xs')
  })
})

describe('useToggleControl — switchVars', () => {
  it('returns the four CSS custom properties for md', () => {
    const { switchVars } = useToggleControl(base())
    expect(switchVars.value).toEqual({
      '--switch-width': '45px',
      '--switch-height': '25.5px',
      '--slider-size': '19.5px',
      '--gutter-size': '3px',
    })
  })
  it('returns smaller values for sm', () => {
    const { switchVars } = useToggleControl({ ...base(), size: 'sm' })
    expect(switchVars.value['--switch-width']).toBe('30px')
    expect(switchVars.value['--slider-size']).toBe('13px')
  })
  it('returns larger values for lg', () => {
    const { switchVars } = useToggleControl({ ...base(), size: 'lg' })
    expect(switchVars.value['--switch-width']).toBe('60px')
    expect(switchVars.value['--slider-size']).toBe('26px')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test useToggleControl`
Expected: FAIL — `Failed to resolve import "./useToggleControl"`.

- [ ] **Step 3: Implement the composable**

Create `src/components/mcl-forms/lib/common/useToggleControl.ts`. The size values are carried over from `MclCheckbox` unchanged, `md`'s arbitrary `[12px]` included — see the comment in `SIZE_CLASSES` for why that one cannot use a token.

```ts
import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed, type ComputedRef } from 'vue'
import type { InputSizeType } from './index.types'

export interface ToggleControlOptions {
  size: InputSizeType
  bgColor: ColorPalette
  checkedBgColor: ColorPalette
  indicatorColor: ColorPalette
  borderColor: ColorPalette
  showShadow: boolean
  rounded: boolean
}

export interface ToggleControl {
  boxClass: ComputedRef<string>
  sizeClass: ComputedRef<string>
  switchVars: ComputedRef<Record<string, string>>
}

// Box and indicator dimensions per size. The indicator is half the box at every
// size: sm 16px->8px, md 24px->12px, lg 32px->16px. The token scale jumps from
// 2xs (8px) straight to xs (16px), so md's 12px has no token and stays an
// arbitrary value. 3xs is 4px, not 12px.
const SIZE_CLASSES: Record<InputSizeType, string> = {
  sm: 'h-xs w-xs before:h-2xs before:w-2xs',
  md: 'h-sm w-sm before:h-[12px] before:w-[12px]',
  lg: 'h-md w-md before:h-xs before:w-xs',
}

// MclInputSwitch is driven by CSS custom properties rather than utilities,
// because the knob translation distance has to match the track dimensions.
const SWITCH_VARS: Record<InputSizeType, Record<string, string>> = {
  sm: {
    '--switch-width': '30px',
    '--switch-height': '17px',
    '--slider-size': '13px',
    '--gutter-size': '2px',
  },
  md: {
    '--switch-width': '45px',
    '--switch-height': '25.5px',
    '--slider-size': '19.5px',
    '--gutter-size': '3px',
  },
  lg: {
    '--switch-width': '60px',
    '--switch-height': '34px',
    '--slider-size': '26px',
    '--gutter-size': '4px',
  },
}

/**
 * Builds the shared visual classes for the three toggle controls
 * (MclCheckbox, MclInputRadio, MclInputSwitch), whose native input is
 * overlaid at opacity-0 and whose visible box is an aria-hidden span
 * styled entirely through peer-* variants.
 *
 * @param options - the component's reactive `props` object.
 * @returns `boxClass` for the visual span, `sizeClass` for its dimensions,
 *   and `switchVars` for MclInputSwitch's CSS custom properties.
 */
export const useToggleControl = (
  options: ToggleControlOptions,
): ToggleControl => {
  const boxClass = computed<string>(() => {
    const {
      bgColor,
      borderColor,
      indicatorColor,
      checkedBgColor,
      showShadow,
      rounded,
    } = options
    const classArray: string[] = [
      generateClass.bgColorVariant({ color: bgColor }),
      generateClass.borderColorVariant({ color: borderColor }),
      generateClass.beforeBgColorVariant({ color: indicatorColor }),
      generateClass.peerCheckedBgColorVariant({ color: checkedBgColor }),
      // The native input is visually transparent, so the focus indicator has to
      // be projected onto this span. Without it there is none at all.
      'peer-focus-visible:ring-2 ring-offset-2',
      generateClass.peerFocusVisibleRingColorVariant({ color: borderColor }),
    ]
    if (showShadow) {
      classArray.push('drop-shadow-md')
    }
    if (rounded) {
      classArray.push('rounded-md before:rounded-[3px]')
    }
    return classArray.join(' ')
  })

  const sizeClass = computed<string>(() => SIZE_CLASSES[options.size])

  const switchVars = computed<Record<string, string>>(
    () => SWITCH_VARS[options.size],
  )

  return { boxClass, sizeClass, switchVars }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test useToggleControl`
Expected: PASS, 15 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/common/useToggleControl.ts \
        src/components/mcl-forms/lib/common/useToggleControl.test.ts
git commit -m "feat(mcl-forms): add useToggleControl composable

Replaces the 17-entry peerBgColor map duplicated verbatim in
MclCheckbox and MclInputSwitch (both carrying the same dark-4 typo),
and adds the peer-focus-visible ring the three toggles never had."
```

---

### Task 4: `FieldContext` type + `fieldContext.ts`

This is the interface every component in plan 2 leans on, so it gets the most thorough test suite in this plan.

**Files:**
- Modify: `src/components/mcl-forms/lib/common/index.types.ts` (add `FieldContext` and `FieldOwnProps`; delete `ColorMap`)
- Create: `src/components/mcl-forms/lib/common/fieldContext.ts`
- Test: `src/components/mcl-forms/lib/common/fieldContext.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces (the shipped contract; the authority is spec section 4, "The `MclFormGroup` context contract"):
  ```ts
  // index.types.ts
  export interface FieldOwnProps {
    id?: string
    name?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }
  export interface FieldContext {
    id: string
    name: ComputedRef<string | undefined>
    errorId: string
    descriptionId: string | undefined
    invalid: ComputedRef<boolean>
    required: ComputedRef<boolean>
    disabled: ComputedRef<boolean>
    describedBy: ComputedRef<string | undefined>
    feedbackOwnedByGroup: boolean
    isGroupLabel: boolean
  }

  // fieldContext.ts
  export const provideFieldContext: (options: FieldProviderOptions) => FieldContext
  export const useFieldContext: (
    own: FieldOwnProps,
    options?: FieldConsumerOptions,
  ) => FieldContext
  export interface FieldProviderOptions {
    fieldId?: string
    name?: MaybeRefOrGetter<string | undefined>
    invalid?: MaybeRefOrGetter<boolean | undefined>
    required?: MaybeRefOrGetter<boolean | undefined>
    disabled?: MaybeRefOrGetter<boolean | undefined>
    hasHelpText: boolean
    ownsFeedback: boolean
    isGroupLabel: boolean
  }
  export interface FieldConsumerOptions {
    rendersOwnFeedback?: boolean
  }
  ```
  Naming: `provideFieldContext` matches `provideAccordion` in `manguito-theme`'s `useCollapseState.ts` — one convention for providers across the repo, and `provide*` states plainly that it writes rather than reads.

  Five things in that contract are load-bearing, and each was measured rather than guessed:
  - **`name`/`invalid`/`required`/`disabled` on the provider are `MaybeRefOrGetter`, read through `toValue()`.** `MclFormGroup` cannot forward its `props` proxy, because `hasHelpText`/`ownsFeedback` derive from slot *presence* rather than from props — so it must build an object literal, and a literal snapshots plain values at setup. Passing plain values was measured leaving the group's `invalid` stuck at its mount-time value, so no control in the group ever received `aria-describedby`. Pass `() => props.invalid`.
  - **`isGroupLabel`** switches the group's wrapper between `<label for>` and `<fieldset>/<legend>`, and decides element ids: in fieldset mode every control generates its own (duplicate ids are invalid HTML and there is no `for` to match), in single-label mode it takes the group's id verbatim. The earlier design gave every sibling the group's id — measured as three radios all rendering `id="colour"`, with `label[for]` binding only the first.
  - **Region ids follow whoever *renders* the region**, not whoever owns the element id. `errorId` is the group's when `ownsFeedback`, else `${id}-error`; `descriptionId` is the group's whenever it has one. The two flags are independent, so a group may render help text while leaving the error region to the control.
  - **`FieldConsumerOptions.rendersOwnFeedback`** (default `true`) is how the three toggles declare that they render no `FieldFeedback` at all. The error id is then dropped from `describedBy` unless the group owns the region — otherwise a group carrying `invalid` with no `invalidFeedback` gives every radio in it an `aria-describedby` naming an element nobody renders.
  - **`name` is a `ComputedRef`, and the control side has no id fallback.** Own prop, else the group's name, else `undefined`. An id fallback would apply to all eight controls and put a generated `name` into native form submissions with no way to opt out.

**`ColorMap` deletion:** `index.types.ts` currently exports `ColorMap`, consumed only by `MclCheckbox` and `MclInputSwitch` for their hand-written maps. Task 3 replaced both. It is not re-exported from `lib/index.ts`, so it is not public API and can be deleted outright. The two components still import it until plan 2 rewrites them — that is why this task does not run a build.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/common/fieldContext.test.ts`. The shipped suite is the reference — read that file rather than a copy pasted here, since a stale copy in this plan is exactly what drifted from the code once already. Coverage:

- standalone: own id wins; generated fallback when none; `errorId` derived from the resolved id; an empty-string id treated as not supplied; `invalid`/`required`/`disabled` defaulting to `false`; `describedBy` undefined when valid.
- inheriting from a provider: id, name, `invalid`/`required`/`disabled`; `descriptionId` only when the group has help text; `describedBy` ordered description-then-error.
- explicit props beating the provider, including `disabled: false` over an inherited `true` — which is why those props must be `boolean | undefined`.
- provider reactivity through a getter, and **control-side** reactivity via `setProps` on the control's own `invalid`/`required`/`disabled`.
- `rendersOwnFeedback: false`: no error id when nobody renders a region; the group's error id when it owns one.
- fieldset mode giving siblings distinct element ids while sharing the group's error id and name, vs single-label mode taking the group's id.

Two things about the harness are load-bearing:
- the stand-in child declares `invalid`/`required`/`disabled` as `{ type: Boolean, default: undefined }`. Without it Vue's boolean casting turns an omitted prop into `false` and every inheritance test passes for the wrong reason.
- the inheritance tests must *mutate* the child's props (`await wrapper.setProps(...)`), not only read them at mount. A suite that only reads is satisfied by an implementation that snapshots `own.invalid` at setup — measured passing 71 of 71 against exactly that defect.

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test fieldContext`
Expected: FAIL — `Failed to resolve import "./fieldContext"`.

- [ ] **Step 3: Add the types**

Replace the contents of `src/components/mcl-forms/lib/common/index.types.ts` with `InputSizeType`, `FieldOwnProps` and `FieldContext` exactly as declared in the Interfaces block above; the shipped file is the reference. `ColorMap` is dropped; `InputSizeType` is kept because it is re-exported from `lib/index.ts` and is therefore public API.

`invalid`, `required` and `disabled` on `FieldOwnProps` are `boolean | undefined` on purpose: `undefined` means "inherit from the group", which a `false` default would make indistinguishable from an explicit `false`.

- [ ] **Step 4: Implement the provider and consumer**

Create `src/components/mcl-forms/lib/common/fieldContext.ts`. It mirrors `manguito-theme`'s `useCollapseState.ts`: a module-private `Symbol` key, a `provide*` function, and a consumer that injects with a null default and falls back to standalone behaviour. Spec section 4 is the authoritative description and the shipped file is the reference implementation — the code that used to be pasted into this step is what drifted, so the rules it has to satisfy are listed instead:

1. The provider reads `name`/`invalid`/`required`/`disabled` through `toValue()` *inside* computeds, never destructuring them at setup.
2. Element ids resolve as `own.id` -> the group's id when `!isGroupLabel` -> a generated fallback. One shared helper normalises every candidate, so neither an empty `own.id`, an empty `fieldId` nor a `useId()` returning `undefined` can reach an id slot and produce `aria-describedby="-error"`.
3. Region ids: `errorId` is the group's when `feedbackOwnedByGroup`, else `${id}-error`; `descriptionId` is the group's whenever it has one.
4. `describedBy` joins description then error, and omits the error id when no error region is rendered anywhere — `rendersOwnFeedback: false` and the group does not own one either.
5. `name` resolves as own prop -> group name, with **no** id fallback on the control side. The provider keeps its own `name ?? id` default, which is what makes native radio grouping work for grouped controls.
6. `invalid`/`required`/`disabled` are computeds reading `own.*` at call time, so a control's own prop changing after mount propagates.

- [ ] **Step 5: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test fieldContext`
Expected: PASS, 44 tests.

Note that region ids follow whoever *renders* the region, not whoever owns the element id: a control with its own `id` inside a group that owns the feedback still points at the group's `errorId`, because that region provably exists. What would dangle is pointing at a region nobody renders, and rules 3 and 4 above are what prevent that.

- [ ] **Step 6: Run the whole suite**

Run: `pnpm test`
Expected: PASS. `MclCheckbox` and `MclInputSwitch` still import the now-deleted `ColorMap`, but Vitest never loads them, so the suite stays green.

They are **not** invisible to the rest of the tooling, and the earlier claim that "nothing type-checks or builds them" was wrong. Measured: `src/components/mcl-forms/vite.config.ts` runs `dts({ rollupTypes: true })`, which does type-check both SFCs and prints two `TS2305: Module '"../common/index.types"' has no exported member 'ColorMap'` diagnostics; and `pnpm run story:build` runs `turbo run build` first, so it surfaces them too. The saving grace is that those diagnostics are non-fatal — `vite build` exits 0, `dist/` is emitted, and the emitted prop types are intact. So expect to see them, do not read them as something a later change introduced, and do not add a compatibility shim: plan 2's first task rewrites both components.
- [ ] **Step 7: Commit**

```bash
git add src/components/mcl-forms/lib/common/index.types.ts \
        src/components/mcl-forms/lib/common/fieldContext.ts \
        src/components/mcl-forms/lib/common/fieldContext.test.ts
git commit -m "feat(mcl-forms): add field context for label and error wiring

Adds provideFieldContext/useFieldContext so MclFormGroup can own the
id, help text and error region once instead of each control wiring
aria-describedby itself. Controls still work standalone. Drops the
now-unused ColorMap type."
```

---

### Task 5: `FieldFeedback.vue`

**Files:**
- Create: `src/components/mcl-forms/lib/common/FieldFeedback.vue`
- Test: `src/components/mcl-forms/lib/common/FieldFeedback.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks — deliberately prop-driven, not context-driven, so the group and the controls can both render it.
- Produces: a component with props `{ id: string; invalid?: boolean; text?: string }` and a default slot receiving no bindings. Renders nothing when `invalid` is falsy.

**Why the `v-if` lives inside the component, not in the callers:** `role="alert"` announces on *insertion*, not on becoming visible. `MclInputText` today renders its error container unconditionally and hides it with CSS, so the alert never fires. Putting the conditional inside `FieldFeedback` means the eight callers cannot get this wrong — which is the whole reason this is a component rather than a composable.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/common/FieldFeedback.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import FieldFeedback from './FieldFeedback.vue'

describe('FieldFeedback', () => {
  it('renders nothing when not invalid', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', text: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('renders the alert region when invalid', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true, text: 'Required' },
    })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.attributes('id')).toBe('email-error')
    expect(alert.text()).toBe('Required')
  })

  it('is inserted rather than merely unhidden, so role=alert announces', async () => {
    // The bug this component fixes: MclInputText's error container is always in
    // the DOM and CSS-hidden, so the alert never fires.
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: false, text: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ invalid: true })
    await nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('is removed again when validity is restored', async () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true, text: 'Required' },
    })
    await wrapper.setProps({ invalid: false })
    await nextTick()
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('prefers slot content over the text prop', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true, text: 'Required' },
      slots: { default: '<strong>Custom message</strong>' },
    })
    expect(wrapper.find('strong').text()).toBe('Custom message')
    expect(wrapper.text()).not.toContain('Required')
  })

  it('renders nothing when invalid with no text and no slot', () => {
    // An empty region would be an aria-describedby target with nothing to
    // announce, so having no message to show is treated as having no region.
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.text()).toBe('')
  })

  it('renders when invalid with a slot but no text prop', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true },
      slots: { default: '<strong>Custom message</strong>' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.find('strong').text()).toBe('Custom message')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test FieldFeedback`
Expected: FAIL — `Failed to resolve import "./FieldFeedback.vue"`.

- [ ] **Step 3: Implement the component**

Create `src/components/mcl-forms/lib/common/FieldFeedback.vue`:

```vue
<script setup lang="ts">
withDefaults(
  defineProps<{
    /** The id aria-describedby points at — normally `${fieldId}-error`. */
    id: string
    invalid?: boolean
    text?: string
  }>(),
  {
    invalid: false,
    text: '',
  },
)

defineSlots<{
  default?: () => unknown
}>()
</script>

<template>
  <!--
    Conditional rather than CSS-hidden on purpose: role="alert" announces on
    insertion into the DOM, so an always-rendered container never fires.
    Content is part of the condition: an empty alert region is an
    aria-describedby target with nothing to read out.
  -->
  <div
    v-if="invalid && (text || $slots.default)"
    :id="id"
    role="alert"
    class="ml-3xs"
  >
    <slot>
      <span class="text-xs text-danger">{{ text }}</span>
    </slot>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test FieldFeedback`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/common/FieldFeedback.vue \
        src/components/mcl-forms/lib/common/FieldFeedback.test.ts
git commit -m "feat(mcl-forms): add FieldFeedback error region component

One error region shared by every control, rendered conditionally so
role=alert actually announces. MclInputText's current container is
always in the DOM and CSS-hidden, so its alert never fires."
```

---

### Task 6: Reusable icon components

`CaretDown.vue` exists but is unusable by `MclSelect`, which needs a different size, a themed fill and a rotation class — so `MclSelect` inlines its own copy of the same path instead. The X icon is inlined twice, in `MclSelect` and `MclInputFile`. Both need a `className` escape hatch before plan 2 can consume them.

**Files:**
- Modify: `src/components/mcl-forms/lib/assets/CaretDown.vue`
- Create: `src/components/mcl-forms/lib/assets/XMark.vue`
- Test: `src/components/mcl-forms/lib/assets/icons.test.ts`

**Interfaces:**
- Consumes: `generateClass` and `ColorPalette` from `@bobbykim/manguito-theme`.
- Produces: both components take `{ color?: ColorPalette; className?: string }`. `color` defaults to `'dark-4'`. Each renders `aria-hidden="true"` with `focusable="false"`, the themed fill class, and `className`. There is **no default size**: Tailwind utilities of the same property resolve by stylesheet order, not class-attribute order, so appending `className` could not override a built-in `h-md w-md`. Dropping that default is what makes the icon reusable — callers must supply sizing (and any transform) via `className`, or the SVG renders at its intrinsic width.

`className` is the repo's documented convention for custom class injection (see CLAUDE.md, "Prop naming conventions").

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/assets/icons.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CaretDown from './CaretDown.vue'
import XMark from './XMark.vue'

const icons = [
  ['CaretDown', CaretDown],
  ['XMark', XMark],
] as const

describe.each(icons)('%s', (_name, Icon) => {
  it('is hidden from assistive technology', () => {
    // Both icons sit next to a labelled control, so announcing them is noise.
    // CaretDown currently carries role="img", which is wrong for a decoration.
    const svg = mount(Icon).find('svg')
    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.attributes('focusable')).toBe('false')
    expect(svg.attributes('role')).toBeUndefined()
  })

  it('applies the default fill colour', () => {
    expect(mount(Icon).find('svg').classes()).toContain('fill-dark-4')
  })

  it('applies an explicit fill colour', () => {
    const svg = mount(Icon, { props: { color: 'primary' } }).find('svg')
    expect(svg.classes()).toContain('fill-primary')
    expect(svg.classes()).not.toContain('fill-dark-4')
  })

  it('carries no default size, so className is the only sizing source', () => {
    // Appending className would not override a built-in `h-md w-md`: Tailwind
    // utilities of the same property resolve by stylesheet order, not by
    // class-attribute order. Having no default is what makes the icon reusable.
    const classes = mount(Icon).find('svg').classes()
    expect(classes.some((c) => /^h-|^w-|^size-/.test(c))).toBe(false)
  })

  it('takes its size and transforms from className', () => {
    const svg = mount(Icon, {
      props: { className: 'h-xs rotate-180' },
    }).find('svg')
    expect(svg.classes()).toContain('h-xs')
    expect(svg.classes()).toContain('rotate-180')
    expect(svg.classes()).toContain('fill-dark-4')
  })

  it('renders exactly one path', () => {
    expect(mount(Icon).findAll('path')).toHaveLength(1)
  })
})

describe('icon viewBoxes', () => {
  it('CaretDown uses the Font Awesome caret-down box', () => {
    expect(mount(CaretDown).find('svg').attributes('viewBox')).toBe('0 0 320 512')
  })
  it('XMark uses the Font Awesome xmark box', () => {
    expect(mount(XMark).find('svg').attributes('viewBox')).toBe('0 0 384 512')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test icons`
Expected: FAIL — `Failed to resolve import "./XMark.vue"`.

- [ ] **Step 3: Rewrite `CaretDown.vue`**

Replace the contents of `src/components/mcl-forms/lib/assets/CaretDown.vue`. The fixed `h-md w-md` sizing and `fill="currentColor"` are dropped in favour of the `color` and `className` props, and `role="img"` becomes `aria-hidden` — the icon is decorative next to a labelled control.

```vue
<script setup lang="ts">
import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    className?: string
  }>(),
  {
    color: 'dark-4',
    className: '',
  },
)

// No default size: appending className could not override one, since Tailwind
// utilities of the same property resolve by stylesheet order rather than
// class-attribute order. Callers must supply sizing via className.
const iconClass = computed<string>(() =>
  [generateClass.svgFillColorVariant({ color: props.color }), props.className]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    aria-hidden="true"
    focusable="false"
    :class="iconClass"
  >
    <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
    <path
      d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
    />
  </svg>
</template>
```

- [ ] **Step 4: Create `XMark.vue`**

Create `src/components/mcl-forms/lib/assets/XMark.vue` with the same interface. The path is lifted verbatim from the copies currently inlined in `MclSelect.vue:360` and `MclInputFile.vue:150`.

```vue
<script setup lang="ts">
import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    className?: string
  }>(),
  {
    color: 'dark-4',
    className: '',
  },
)

// No default size: appending className could not override one, since Tailwind
// utilities of the same property resolve by stylesheet order rather than
// class-attribute order. Callers must supply sizing via className.
const iconClass = computed<string>(() =>
  [generateClass.svgFillColorVariant({ color: props.color }), props.className]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    aria-hidden="true"
    focusable="false"
    :class="iconClass"
  >
    <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
    <path
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
    />
  </svg>
</template>
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test icons`
Expected: PASS, 14 tests.

- [ ] **Step 6: Run the whole suite and add a changeset**

Run: `pnpm test`
Expected: PASS, both projects.

Run: `pnpm changeset`
Select `@bobbykim/mcl-forms`, choose **minor**, summary:
`Add shared field-context, input-surface and toggle-control composables, a FieldFeedback error region, and reusable icon components. Internal foundation; components are unchanged in this release.`

- [ ] **Step 7: Commit**

```bash
git add src/components/mcl-forms/lib/assets/ .changeset
git commit -m "refactor(mcl-forms): make icon components reusable

CaretDown gains color and className props so MclSelect can use it
instead of inlining the same path, and it is now aria-hidden rather
than role=img. Adds XMark, currently inlined in two components."
```

---

## Definition of done

- [ ] `pnpm test` passes with both `manguito-theme` and `mcl-forms` projects reported.
- [ ] `cd src/components/manguito-theme && pnpm run build` exits 0.
- [ ] Two changesets exist: `@bobbykim/manguito-theme` minor, `@bobbykim/mcl-forms` minor.
- [ ] `src/components/mcl-forms/lib/common/` contains `index.types.ts`, `fieldContext.ts`, `useInputSurface.ts`, `useToggleControl.ts`, `InputHighlight.vue`, `FieldFeedback.vue`.
- [ ] No component file under `lib/mcl-*/` has been modified — that is plan 2.

**Deliberately still broken at the end of this plan:** `MclCheckbox.vue` and `MclInputSwitch.vue` import `ColorMap`, which Task 4 deleted. Vitest never loads either file, so `pnpm test` stays green.

They are, however, type-checked — an earlier draft of this plan claimed nothing type-checks or bundles them, and that was measured wrong. `src/components/mcl-forms/vite.config.ts` runs `dts({ rollupTypes: true })`, so `vite build` does check both SFCs and prints two `TS2305: Module '"../common/index.types"' has no exported member 'ColorMap'` diagnostics; `pnpm run story:build` runs `turbo run build` first and surfaces the same two. Both diagnostics are non-fatal: `vite build` exits 0, `dist/mcl-forms.js`, `dist/mcl-forms.umd.cjs` and `dist/index.d.ts` are all emitted, and the emitted prop types for both components are intact. Plan 2's first task rewrites both; until then, expect exactly those two errors and do not read them as a regression. Do not add a compatibility shim to paper over this.

## Hand-off to plan 2

Plan 2 consumes, with these exact names:

| From | Name | Shape |
|---|---|---|
| `@bobbykim/manguito-theme` | `generateClass.peerCheckedBgColorVariant` | `({ color }) => string` |
| `@bobbykim/manguito-theme` | `generateClass.peerFocusVisibleRingColorVariant` | `({ color }) => string` |
| `@bobbykim/manguito-theme` | `generateClass.focusVisibleRingColorVariant` | `({ color }) => string` |
| `common/index.types` | `FieldContext`, `FieldOwnProps`, `InputSizeType` | types |
| `common/fieldContext` | `provideFieldContext(options)` | for `MclFormGroup` |
| `common/fieldContext` | `useFieldContext(own, options?)` | for all eight controls; `{ rendersOwnFeedback: false }` on the three toggles |
| `common/useInputSurface` | `useInputSurface(props)` | text, textarea, select, file |
| `common/useToggleControl` | `useToggleControl(props)` | checkbox, radio, switch |
| `common/FieldFeedback.vue` | props `{ id, invalid, text }` + default slot | text, textarea, select, file, group |
| `assets/CaretDown.vue`, `assets/XMark.vue` | props `{ color, className }` | select, file |

**Carry this into plan 2** — three ways to break the foundation silently, all of
them measured during this plan:

1. **Every control's `invalid`, `required` and `disabled` prop must be declared
   with `default: undefined`** (see Global Constraints). This is the single
   easiest way to break the inheritance contract built in Task 4, and it fails
   silently — the props read `false` and the group is simply never consulted.
2. **`MclFormGroup` must pass *getters*, not plain values,** for `name`,
   `invalid`, `required` and `disabled`: `provideFieldContext({ invalid: () =>
   props.invalid, ... })`. It cannot forward its `props` proxy (`hasHelpText`
   and `ownsFeedback` come from slot presence), and the object literal it must
   build instead snapshots any plain value at setup. Measured: the group's
   `invalid` stuck at its mount-time value, so no control ever received
   `aria-describedby`. `fieldId`, `hasHelpText`, `ownsFeedback` and
   `isGroupLabel` stay plain — they are fixed at setup by construction.
3. **`useInputSurface`, `useToggleControl` and `useFieldContext` take your
   `props` proxy directly — never a spread literal.** `useInputSurface({
   ...props, showHighlight: false })` freezes every class at mount. Both
   composables make the fields their callers lack optional
   (`showHighlight` for `MclInputFile`, `rounded` for `MclInputRadio`) precisely
   so `props` can be handed over as-is, and `useFieldContext` takes its
   non-prop declarations in a second argument for the same reason.

Also from Task 4: the three toggle controls must call
`useFieldContext(props, { rendersOwnFeedback: false })`, since they render no
`FieldFeedback`; and `MclFormGroup` must carry `invalid` itself whenever it owns
the feedback region, because its `FieldFeedback` renders off the group's own
`invalid`. `MclInputRadio` owns its standalone `name` fallback — the context
does not provide one.

Not built here, and still owed by plan 2: `useSelectFilter.ts`, `useSelectKeyboard.ts`, the eight component rewrites, the Storybook stories and `.mdx` docs, the migration guide, and the `README.md` refresh.
