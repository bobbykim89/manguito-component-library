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
    const colors = [
      'primary', 'secondary', 'success', 'danger', 'info', 'warning',
      'light-1', 'light-2', 'light-3', 'light-4',
      'dark-1', 'dark-2', 'dark-3', 'dark-4',
      'black', 'white', 'transparent',
    ] as const
    for (const color of colors) {
      expect(peerCheckedBgColorVariant({ color })).toBe(`peer-checked:bg-${color}`)
      expect(peerFocusVisibleRingColorVariant({ color })).toBe(
        `peer-focus-visible:ring-${color}`,
      )
      expect(focusVisibleRingColorVariant({ color })).toBe(
        `focus-visible:ring-${color}`,
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
Expected: PASS, 7 tests.

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
Expected: PASS, 12 tests.

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
- Produces:
  ```ts
  // index.types.ts
  export interface FieldContext {
    id: string
    name: string | undefined
    errorId: string
    descriptionId: string | undefined
    invalid: ComputedRef<boolean>
    required: ComputedRef<boolean>
    disabled: ComputedRef<boolean>
    describedBy: ComputedRef<string | undefined>
    feedbackOwnedByGroup: boolean
  }
  export interface FieldOwnProps {
    id?: string
    name?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }

  // fieldContext.ts
  export const provideFieldContext: (options: FieldProviderOptions) => FieldContext
  export const useFieldContext: (own: FieldOwnProps) => FieldContext
  export interface FieldProviderOptions {
    fieldId?: string
    name?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
    hasHelpText: boolean
    ownsFeedback: boolean
  }
  ```
  Naming: `provideFieldContext` matches `provideAccordion` in `manguito-theme`'s `useCollapseState.ts` — one convention for providers across the repo, and `provide*` states plainly that it writes rather than reads. The spec was updated to match.

**`ColorMap` deletion:** `index.types.ts` currently exports `ColorMap`, consumed only by `MclCheckbox` and `MclInputSwitch` for their hand-written maps. Task 3 replaced both. It is not re-exported from `lib/index.ts`, so it is not public API and can be deleted outright. The two components still import it until plan 2 rewrites them — that is why this task does not run a build.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/common/fieldContext.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, type ComputedRef } from 'vue'
import {
  provideFieldContext,
  useFieldContext,
  type FieldProviderOptions,
} from './fieldContext'
import type { FieldContext, FieldOwnProps } from './index.types'

/** Renders nothing; exposes the injected context for assertions. */
// `default: undefined` on the booleans is load-bearing, not incidental: without
// it Vue's boolean casting turns an omitted prop into `false` and every
// inheritance test below would pass for the wrong reason. See Global Constraints.
const Child = defineComponent({
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    invalid: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  setup(props) {
    const ctx = useFieldContext(props as FieldOwnProps)
    return { ctx }
  },
  render: () => h('div'),
})

const Parent = (options: Record<string, unknown> = {}) =>
  defineComponent({
    setup() {
      provideFieldContext({
        hasHelpText: false,
        ownsFeedback: false,
        ...options,
      } as FieldProviderOptions)
      return () => h(Child)
    },
  })

// `any` deliberately: mount() is generic, so a single concrete wrapper type
// cannot accept every mount call below.
const ctxOf = (wrapper: any): FieldContext =>
  wrapper.findComponent(Child).vm.ctx as FieldContext

describe('useFieldContext — standalone (no provider)', () => {
  it('uses its own id when given one', () => {
    const wrapper = mount(Child, { props: { id: 'email' } })
    expect(ctxOf(wrapper).id).toBe('email')
  })

  it('falls back to a generated id when none is given', () => {
    const wrapper = mount(Child)
    const { id } = ctxOf(wrapper)
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  it('derives errorId from the resolved id', () => {
    const wrapper = mount(Child, { props: { id: 'email' } })
    expect(ctxOf(wrapper).errorId).toBe('email-error')
  })

  it('has no descriptionId when standalone', () => {
    const wrapper = mount(Child, { props: { id: 'email' } })
    expect(ctxOf(wrapper).descriptionId).toBeUndefined()
  })

  it('defaults invalid, required and disabled to false', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.invalid.value).toBe(false)
    expect(ctx.required.value).toBe(false)
    expect(ctx.disabled.value).toBe(false)
  })

  it('describedBy is undefined when valid', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email' } }))
    expect(ctx.describedBy.value).toBeUndefined()
  })

  it('describedBy is the error id when invalid', () => {
    const ctx = ctxOf(mount(Child, { props: { id: 'email', invalid: true } }))
    expect(ctx.describedBy.value).toBe('email-error')
  })

  it('does not claim group feedback ownership', () => {
    expect(ctxOf(mount(Child, { props: { id: 'email' } })).feedbackOwnedByGroup).toBe(
      false,
    )
  })
})

describe('useFieldContext — inheriting from a provider', () => {
  it('takes the id from the provider', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'from-group' })))
    expect(ctx.id).toBe('from-group')
    expect(ctx.errorId).toBe('from-group-error')
  })

  it('generates an id in the provider when none is given', () => {
    const ctx = ctxOf(mount(Parent()))
    expect(ctx.id).toBeTruthy()
    expect(ctx.errorId).toBe(`${ctx.id}-error`)
  })

  it('inherits name, which is what makes radio groups work', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'colour', name: 'colour-set' })))
    expect(ctx.name).toBe('colour-set')
  })

  it('defaults name to the field id when the provider gives none', () => {
    const ctx = ctxOf(mount(Parent({ fieldId: 'colour' })))
    expect(ctx.name).toBe('colour')
  })

  it('inherits invalid, required and disabled', () => {
    const ctx = ctxOf(
      mount(Parent({ fieldId: 'x', invalid: true, required: true, disabled: true })),
    )
    expect(ctx.invalid.value).toBe(true)
    expect(ctx.required.value).toBe(true)
    expect(ctx.disabled.value).toBe(true)
  })

  it('exposes descriptionId only when the provider has help text', () => {
    expect(ctxOf(mount(Parent({ fieldId: 'x' }))).descriptionId).toBeUndefined()
    expect(
      ctxOf(mount(Parent({ fieldId: 'x', hasHelpText: true }))).descriptionId,
    ).toBe('x-description')
  })

  it('orders describedBy as description then error', () => {
    const ctx = ctxOf(
      mount(Parent({ fieldId: 'x', hasHelpText: true, invalid: true })),
    )
    expect(ctx.describedBy.value).toBe('x-description x-error')
  })

  it('reports group feedback ownership when the provider owns it', () => {
    expect(ctxOf(mount(Parent({ fieldId: 'x', ownsFeedback: true }))).feedbackOwnedByGroup).toBe(
      true,
    )
  })
})

describe('useFieldContext — explicit props beat the provider', () => {
  const ParentWithChildProps = (
    provided: Record<string, unknown>,
    childProps: Record<string, unknown>,
  ) =>
    defineComponent({
      setup() {
        provideFieldContext({
          hasHelpText: false,
          ownsFeedback: false,
          ...provided,
        } as FieldProviderOptions)
        return () => h(Child, childProps)
      },
    })

  it('an explicit id wins over the provider id', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ fieldId: 'group' }, { id: 'mine' })),
    )
    expect(ctx.id).toBe('mine')
    expect(ctx.errorId).toBe('mine-error')
  })

  it('an explicit disabled=false overrides an inherited disabled=true', () => {
    // This is why invalid/required/disabled must be `boolean | undefined`:
    // with a `false` default there is no way to tell "not passed" from "passed false".
    const ctx = ctxOf(
      mount(ParentWithChildProps({ disabled: true }, { disabled: false })),
    )
    expect(ctx.disabled.value).toBe(false)
  })

  it('an omitted prop still inherits', () => {
    const ctx = ctxOf(mount(ParentWithChildProps({ disabled: true }, {})))
    expect(ctx.disabled.value).toBe(true)
  })

  it('an explicit name wins over the provider name', () => {
    const ctx = ctxOf(
      mount(ParentWithChildProps({ name: 'group-name' }, { name: 'own-name' })),
    )
    expect(ctx.name).toBe('own-name')
  })
})

describe('provideFieldContext — the returned context', () => {
  it('returns the same shape the child injects, for the group to render with', () => {
    const Group = defineComponent({
      setup() {
        const ctx: FieldContext = provideFieldContext({
          fieldId: 'x',
          hasHelpText: true,
          ownsFeedback: true,
          invalid: true,
        })
        return { ctx }
      },
      render: () => h('div'),
    })
    const ctx = mount(Group).vm.ctx as FieldContext
    expect(ctx.id).toBe('x')
    expect(ctx.errorId).toBe('x-error')
    expect(ctx.descriptionId).toBe('x-description')
    expect(ctx.feedbackOwnedByGroup).toBe(true)
    const describedBy: ComputedRef<string | undefined> = ctx.describedBy
    expect(describedBy.value).toBe('x-description x-error')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test fieldContext`
Expected: FAIL — `Failed to resolve import "./fieldContext"`.

- [ ] **Step 3: Add the types**

Replace the contents of `src/components/mcl-forms/lib/common/index.types.ts`. `ColorMap` is dropped; `InputSizeType` is kept because it is re-exported from `lib/index.ts` and is therefore public API.

```ts
import type { ComputedRef } from 'vue'

export type InputSizeType = 'sm' | 'md' | 'lg'

/**
 * Props every field control accepts on its own, independent of any
 * MclFormGroup around it. `invalid`, `required` and `disabled` are
 * deliberately `boolean | undefined`: `undefined` means "inherit from the
 * group", which a `false` default would make indistinguishable.
 */
export interface FieldOwnProps {
  id?: string
  name?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
}

/** The resolved field state a control renders from. */
export interface FieldContext {
  id: string
  name: string | undefined
  errorId: string
  descriptionId: string | undefined
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  /** description and error ids in reading order, or undefined if neither applies. */
  describedBy: ComputedRef<string | undefined>
  /**
   * True when the surrounding MclFormGroup renders the error region itself, so
   * the control must not render its own. Not reactive: it is decided at setup
   * from the *presence* of the group's error prop or slot, not from its value.
   */
  feedbackOwnedByGroup: boolean
}
```

- [ ] **Step 4: Implement the provider and consumer**

Create `src/components/mcl-forms/lib/common/fieldContext.ts`. It mirrors `manguito-theme`'s `useCollapseState.ts`: a module-private `Symbol` key, a `provide*` function, and a consumer that injects with a null default and falls back to standalone behaviour.

```ts
import { computed, inject, provide, useId, type ComputedRef } from 'vue'
import type { FieldContext, FieldOwnProps } from './index.types'

const FIELD_KEY = Symbol('mcl-field')

export interface FieldProviderOptions {
  fieldId?: string
  name?: string
  invalid?: boolean
  required?: boolean
  disabled?: boolean
  /** Whether the group renders help text, which decides if descriptionId exists. */
  hasHelpText: boolean
  /** Whether the group renders the error region itself. */
  ownsFeedback: boolean
}

/** Joins the description and error ids in reading order. */
const buildDescribedBy = (
  descriptionId: string | undefined,
  errorId: string,
  invalid: ComputedRef<boolean>,
): ComputedRef<string | undefined> =>
  computed<string | undefined>(() => {
    const ids: string[] = []
    if (descriptionId) ids.push(descriptionId)
    if (invalid.value) ids.push(errorId)
    return ids.length > 0 ? ids.join(' ') : undefined
  })

/**
 * Called by MclFormGroup. Publishes the resolved field state to descendant
 * controls and returns the same context so the group can render its own
 * label, help text and error region from it.
 *
 * @param options - the group's own prop values plus what it renders.
 * @returns the field context, also provided to descendants.
 */
export const provideFieldContext = (
  options: FieldProviderOptions,
): FieldContext => {
  const id = options.fieldId ?? useId() ?? ''
  const invalid = computed<boolean>(() => options.invalid ?? false)
  const errorId = `${id}-error`
  const descriptionId = options.hasHelpText ? `${id}-description` : undefined
  const context: FieldContext = {
    id,
    // Defaulting name to the field id is what lets a radio group work without
    // the consumer having to invent one.
    name: options.name ?? id,
    errorId,
    descriptionId,
    invalid,
    required: computed<boolean>(() => options.required ?? false),
    disabled: computed<boolean>(() => options.disabled ?? false),
    describedBy: buildDescribedBy(descriptionId, errorId, invalid),
    feedbackOwnedByGroup: options.ownsFeedback,
  }
  provide(FIELD_KEY, context)
  return context
}

/**
 * Called by every field control. Resolves each value as
 * explicit prop -> injected group context -> default, so a control works
 * identically inside an MclFormGroup and on its own.
 *
 * @param own - the control's own reactive props.
 * @returns the resolved field context.
 */
export const useFieldContext = (own: FieldOwnProps): FieldContext => {
  const group = inject<FieldContext | null>(FIELD_KEY, null)
  const fallbackId = useId() ?? ''

  // An explicit id wins, then the group's, then a generated one. Resolved once
  // rather than in a computed, because the error and description ids derive
  // from it and must stay stable for aria-describedby to keep pointing at them.
  const id = own.id ?? group?.id ?? fallbackId
  const ownsId = own.id !== undefined || group === null

  const invalid = computed<boolean>(
    () => own.invalid ?? group?.invalid.value ?? false,
  )
  const errorId = ownsId ? `${id}-error` : group!.errorId
  const descriptionId = ownsId ? undefined : group!.descriptionId

  return {
    id,
    name: own.name ?? group?.name,
    errorId,
    descriptionId,
    invalid,
    required: computed<boolean>(
      () => own.required ?? group?.required.value ?? false,
    ),
    disabled: computed<boolean>(
      () => own.disabled ?? group?.disabled.value ?? false,
    ),
    describedBy: buildDescribedBy(descriptionId, errorId, invalid),
    feedbackOwnedByGroup: group?.feedbackOwnedByGroup ?? false,
  }
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test fieldContext`
Expected: PASS, 20 tests.

Note that a control overriding the id with its own no longer shares the group's error region — `errorId` and `descriptionId` are re-derived from its own id. That is intentional: a control pointing `aria-describedby` at a region keyed to a different id would dangle.

- [ ] **Step 6: Run the whole suite**

Run: `pnpm test`
Expected: PASS. `MclCheckbox` and `MclInputSwitch` still import the now-deleted `ColorMap`, but nothing type-checks or builds them in this task, so the suite stays green. Plan 2 rewrites both.

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

  it('renders an empty alert region when invalid with no text or slot', () => {
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('')
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
  default: () => unknown
}>()
</script>

<template>
  <!--
    Conditional rather than CSS-hidden on purpose: role="alert" announces on
    insertion into the DOM, so an always-rendered container never fires.
  -->
  <div v-if="invalid" :id="id" role="alert" class="ml-3xs">
    <slot>
      <span class="text-xs text-danger">{{ text }}</span>
    </slot>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test FieldFeedback`
Expected: PASS, 6 tests.

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
- Produces: both components take `{ color?: ColorPalette; className?: string }`. `color` defaults to `'dark-4'`. Each renders `aria-hidden="true"` with `focusable="false"`, the themed fill class, and `className` appended last so callers can add sizing and transforms.

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

  it('appends className so callers can size and transform it', () => {
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

// className last so callers can override sizing and add transforms.
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

// className last so callers can override sizing and add transforms.
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
Expected: PASS, 12 tests.

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

**Deliberately still broken at the end of this plan:** `MclCheckbox.vue` and `MclInputSwitch.vue` import `ColorMap`, which Task 4 deleted. Nothing type-checks or bundles them here (`pnpm run build` for `mcl-forms` is not in the done list, and the package's `build` script runs `vite build` with no `vue-tsc` step), so the suite stays green. Plan 2's first task rewrites both. Do not add a compatibility shim to paper over this.

## Hand-off to plan 2

Plan 2 consumes, with these exact names:

| From | Name | Shape |
|---|---|---|
| `@bobbykim/manguito-theme` | `generateClass.peerCheckedBgColorVariant` | `({ color }) => string` |
| `@bobbykim/manguito-theme` | `generateClass.peerFocusVisibleRingColorVariant` | `({ color }) => string` |
| `@bobbykim/manguito-theme` | `generateClass.focusVisibleRingColorVariant` | `({ color }) => string` |
| `common/index.types` | `FieldContext`, `FieldOwnProps`, `InputSizeType` | types |
| `common/fieldContext` | `provideFieldContext(options)` | for `MclFormGroup` |
| `common/fieldContext` | `useFieldContext(own)` | for all eight controls |
| `common/useInputSurface` | `useInputSurface(props)` | text, textarea, select, file |
| `common/useToggleControl` | `useToggleControl(props)` | checkbox, radio, switch |
| `common/FieldFeedback.vue` | props `{ id, invalid, text }` + default slot | text, textarea, select, file, group |
| `assets/CaretDown.vue`, `assets/XMark.vue` | props `{ color, className }` | select, file |

**Carry this into plan 2:** every control's `invalid`, `required` and `disabled`
prop must be declared with `default: undefined` (see Global Constraints). This is
the single easiest way to break the inheritance contract built in Task 4, and it
fails silently — the props read `false` and the group is simply never consulted.

Not built here, and still owed by plan 2: `useSelectFilter.ts`, `useSelectKeyboard.ts`, the eight component rewrites, the Storybook stories and `.mdx` docs, the migration guide, and the `README.md` refresh.
