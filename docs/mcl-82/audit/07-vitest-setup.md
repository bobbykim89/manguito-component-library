# Vitest Setup Viability

## Current State

### Test coverage

There are **zero test files** anywhere in the repository. A search for `*.test.*`, `*.spec.*`, vitest, jest, cypress, and playwright configuration files returns nothing. The only testing-adjacent tooling present is:

- `@storybook/test` (`^8.6.12`) in root `devDependencies` — this is Storybook's interaction-test addon, which can run play functions inside stories. However, no stories currently use `play` functions; all existing stories are simple render-only examples.
- `@storybook/addon-a11y` — the Storybook accessibility panel, which runs axe-core checks on stories in the browser. Again, no stories have been written to exercise this programmatically.

The root `tsconfig.json` has `"**/*.spec.ts"` in its `exclude` array, suggesting test files were anticipated but never created.

### Storybook as a substitute

The Storybook stories serve as the library's primary quality-assurance mechanism today. Stories exist for all major components and form the basis for visual verification. However, Storybook stories are:
- Not run in CI automatically (no `package:test` or similar script in `package.json`).
- Not assertions — they render components but do not verify behavior, props, events, or ARIA attributes programmatically.
- Not regression-safe — a change that breaks a component would only be caught if someone manually opens Storybook and looks at every story.

---

## How the Monorepo Structure Affects Setup

### pnpm workspace + Lerna

Each of the 10 packages under `src/components/*` has its own `vite.config.ts`, `tsconfig.json`, and `package.json`. The workspace is managed by pnpm with `@bobbykim/manguito-theme` referenced as `workspace:*` in dependent packages.

This structure presents a choice: **one shared Vitest config at the root** vs. **per-package Vitest configs**.

#### Shared root config (recommended)

Vitest natively supports monorepos via its `projects` option (Vitest workspace mode):

```ts
// vitest.workspace.ts (root)
import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'src/components/*/vitest.config.ts',
])
```

Each package's `vitest.config.ts` would extend a shared base. This approach:
- Runs all package tests with a single `pnpm test` command at the root.
- Supports per-package configuration overrides (e.g., `manguito-theme` needs different coverage thresholds than a thin wrapper package).
- Integrates naturally with the existing Lerna setup — `lerna run test` would also work per-package.
- Aligns with the Turborepo migration path (document [02](./02-monorepo-tooling.md)) — Turborepo can cache and parallelize `test` tasks.

#### Per-package configs without a workspace file

Each package could add its own `vitest.config.ts` independently and run `pnpm test` inside each package directory. This works but means there is no single command to test everything, and coverage cannot be aggregated across packages.

### The `@bobbykim/manguito-theme` dependency resolution challenge

Packages like `mcl-collapse` depend on `@bobbykim/manguito-theme` via `workspace:*`. During testing, Vitest must resolve this to the source under `src/components/manguito-theme/lib/`, not a built `dist/`. Two approaches:

1. **Vitest alias in shared base config**: Add a resolve alias in the shared Vitest config pointing `@bobbykim/manguito-theme` to the source directory. This avoids having to build `manguito-theme` before running tests.
   ```ts
   resolve: {
     alias: {
       '@bobbykim/manguito-theme': path.resolve(
         __dirname, 'src/components/manguito-theme/lib/index.ts'
       ),
     },
   }
   ```

2. **Build `manguito-theme` first**: Keep the current pnpm workspace resolution and always run `package:build` for `manguito-theme` before testing. This is simpler but adds a build step to the test workflow.

Approach 1 is better for developer iteration speed.

---

## What Types of Tests Make Sense

### Unit tests — high value, low friction

The `manguito-theme` package contains pure TypeScript logic in `generateClass`, `ValidateMclClass`, and all the static class objects. These have no Vue dependencies and are excellent candidates for unit tests:

```ts
// theme/__tests__/generateClass.test.ts
import { describe, expect, it } from 'vitest'
import { generateClass } from '../theme'

describe('generateClass', () => {
  it('returns bg class for a valid color', () => {
    expect(generateClass('BGCOLOR', 'primary')).toBe('bg-primary')
  })
  it('returns a single space for invalid color', () => {
    expect(generateClass('BGCOLOR', 'neon-green' as any)).toBe(' ')
  })
})
```

The `observeVisibleAttr` composable, `vClickOutside`, `vCollapse`, and `vToggle` directives all have discrete logic that can be unit-tested without mounting full Vue components.

### Component tests — medium value, medium friction

Vue Test Utils (`@vue/test-utils`) with Vitest is the standard stack for testing Vue 3 SFCs in jsdom or happy-dom. Component tests would verify:
- Props render expected DOM output.
- Events fire on user interaction.
- `v-model` bindings update correctly.
- ARIA attributes are present and correct.
- Keyboard interactions work as expected.

Example for `Modal.vue`:
```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Modal from '../Modal.vue'

describe('Modal', () => {
  it('is not visible when visible=false', () => {
    const wrapper = mount(Modal)
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })
  it('emits open when toggle() is called', async () => {
    const wrapper = mount(Modal)
    await wrapper.vm.open()
    expect(wrapper.emitted('open')).toBeTruthy()
  })
})
```

Challenges for component tests in this library:
- **SCSS styles**: Some components use `<style scoped lang="scss">`. Vitest with jsdom does not evaluate CSS. Classes will be present in the DOM but visual effects cannot be asserted. This is acceptable for behavioral tests.
- **Transitions**: Vue `<Transition>` components behave differently in test environments. `@vue/test-utils` provides `flushPromises()` and `wrapper.vm.$nextTick()` to handle async transitions, but animation-dependent behavior (e.g., `toggleComplete` in Modal/Sidebar that gates `closeModal`) needs care.
- **MutationObserver**: The `observeVisibleAttr` composable uses `useMutationObserver` from `@vueuse/core`. jsdom supports `MutationObserver` natively, so this should work, but testing the full `vToggle` → DOM attribute → `observeVisibleAttr` → component state chain requires care.
- **`@floating-ui/vue`** in `MclSelect`: The floating-ui library uses `ResizeObserver` and `getBoundingClientRect()`. These are not fully supported in jsdom and may require a happy-dom environment or mocking.

### Visual regression tests — lower priority for now

Tools like Chromatic (already integrated as `@chromatic-com/storybook` in devDependencies) or Playwright visual comparison can catch unintended visual changes. Chromatic specifically can snapshot all Storybook stories. However, this requires:
- A Chromatic account and project key.
- Stories that render deterministically (no random data, no date-dependent content).

This is viable but lower priority than behavioral tests, which catch correctness bugs rather than purely visual regressions.

### Storybook interaction tests — pragmatic middle ground

The `@storybook/test` package enables writing `play` functions inside stories that use `@testing-library/user-event` style interactions:

```ts
export const ModalOpenClose: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const openButton = canvas.getByRole('button', { name: /open/i })
    await userEvent.click(openButton)
    await expect(canvas.getByRole('dialog')).toBeInTheDocument()
  },
}
```

These run in the actual browser (via `storybook test --watch`) and work well for testing interactions that depend on CSS transitions or layout. This could complement unit/component tests without requiring a full jsdom setup.

---

## Good Candidates for an Initial Testing Pass

### Priority 1: `manguito-theme` pure logic

These have no browser or Vue dependencies and can be tested with zero extra setup:

| File | What to test |
|---|---|
| `theme/static/colors.ts` | `MclColor` properties contain correct Tailwind strings |
| `theme/validator/index.ts` | All `validate*` methods for valid and invalid inputs |
| `theme/mcl-theme/index.ts` | `generateClass` dispatches correctly for each type |
| `directives/shared.fn.ts` | `getTargetId`, `getTargetElem`, `hasVisibleAttr`, `toggleVisibility` |
| `composables/observeVisible.ts` | Attribute change triggers callback with correct boolean |

### Priority 2: Form components with known bugs

The `peer-inavlid` typo and `MclInputText` validation feedback are confirmed bugs that tests would catch:

| Component | What to test |
|---|---|
| `MclInputText` | `invalidFeedback` slot renders when input is invalid |
| `MclSelect` | Keyboard navigation (arrow keys), ESC clears and closes, `aria-expanded` toggles |
| `MclCheckbox` | `checkbox-click` event fires with correct value; model updates |
| `MclInputSwitch` | Model binding; ARIA state |

### Priority 3: Overlay components (Modal, Sidebar)

These are the most complex and have the most critical bugs (accessibility gaps from document [01](./01-accessibility.md)):

| Component | What to test |
|---|---|
| `Modal` | Opens/closes on `toggle()`/`open()`/`close()`; emits `open`/`close`; `visible` prop sync; scroll lock |
| `Sidebar` | Same as Modal + placement-specific behavior |
| `Collapse` | Toggle works; accordion group closes sibling; `open`/`close` events |

---

## Existing Tooling That Affects Setup

### Vite configs

Every package has a `vite.config.ts` oriented entirely toward library builds (no `test` block). Adding Vitest requires either:
- Adding a `test` block to each package's existing `vite.config.ts` (co-located approach).
- Creating a separate `vitest.config.ts` per package that extends the existing config (cleaner separation).

The separate `vitest.config.ts` approach is recommended to avoid polluting build configs with test configuration.

### TypeScript

All packages use `moduleResolution: "bundler"`, which Vitest supports natively. The `strict: true`, `noUnusedLocals`, and `noUnusedParameters` flags in package tsconfigs are good and should carry over to test files. The root `tsconfig.json` already excludes `**/*.spec.ts`, meaning test files won't interfere with the Storybook app's TypeScript compilation.

### SCSS

Packages that use `<style scoped lang="scss">` require Sass to be available to Vitest's transformer. Sass is already a devDependency in all packages that use it, so this is not a blocker — Vitest's Vite transformer will handle SCSS files automatically.

### `@vueuse/core` and `@floating-ui/vue`

Both are runtime dependencies in some packages. `@vueuse/core` composables like `useScrollLock` and `useMutationObserver` interact with the DOM and should work in happy-dom (a faster alternative to jsdom that has better support for modern browser APIs).

**Recommendation**: use `happy-dom` as the test environment instead of jsdom. It resolves the `ResizeObserver` and `getBoundingClientRect` gaps.

---

## Recommended Setup

### Step 1: Install shared test dependencies at the root

```bash
pnpm add -D -w vitest @vue/test-utils happy-dom @vitest/coverage-v8
```

### Step 2: Create a shared base Vitest config

```ts
// vitest.shared.ts (root)
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@bobbykim/manguito-theme': path.resolve(
        __dirname, 'src/components/manguito-theme/lib/index.ts'
      ),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
})
```

### Step 3: Create per-package `vitest.config.ts` files

```ts
// src/components/manguito-theme/vitest.config.ts
import { mergeConfig } from 'vitest/config'
import sharedConfig from '../../../vitest.shared'

export default mergeConfig(sharedConfig, {
  test: {
    include: ['lib/**/*.test.ts'],
  },
})
```

### Step 4: Add `test` scripts to each `package.json`

```json
"scripts": {
  "build": "vite build",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

### Step 5: Add root-level test command

```json
// root package.json
"scripts": {
  "package:test": "lerna run test"
}
```

Or with Turborepo (per document [02](./02-monorepo-tooling.md)):
```json
// turbo.json
{
  "tasks": {
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

### Step 6: Update scaffold script

The `scripts/index.mjs` package creation tool generates `vite.config.ts` and `package.json` for each new package. After Vitest is established, add `vitest.config.ts` and a `test` script to the templates (`scripts/templates/_vite.config.md` and `scripts/templates/_package.md`) so all future packages are test-ready from creation.

---

## Vue Test Utils vs. Other Options

| Tool | Verdict |
|---|---|
| **`@vue/test-utils`** | **Recommended.** Official Vue testing library, full support for `<script setup>`, `defineExpose`, `v-model`, slots, and directives. Actively maintained. |
| **`@testing-library/vue`** | An alternative built on `@vue/test-utils` that encourages user-centric queries (by role, label text). Good for accessibility-focused tests (relevant given document [01](./01-accessibility.md)). Can be used alongside `@vue/test-utils`. |
| **Playwright component testing** | Runs in a real browser; handles CSS, transitions, and layout correctly. Higher setup cost; slower than jsdom-based tests. Best reserved for end-to-end flows once unit/component tests are in place. |
| **Storybook play functions** | Good complement to unit tests for interaction flows. Already has `@storybook/test` installed. Limited to browser-based execution, no CI coverage reporting. |

**Practical recommendation**: Start with `@vue/test-utils` + Vitest for the `manguito-theme` unit tests and form component behavioral tests. Add `@testing-library/vue` queries for accessibility assertions (checking for `role`, `aria-label`, etc.) once the accessibility fixes from document [01](./01-accessibility.md) are applied.
