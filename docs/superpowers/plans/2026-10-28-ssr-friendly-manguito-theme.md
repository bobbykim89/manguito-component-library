# SSR-Friendly manguito-theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every `manguito-theme` base component server-render without crashing, hydrate with zero warnings, and put its real content in server HTML. Make every published package importable in Node. Prove all of this with tests.

**Architecture:** A small test-only SSR harness (`renderOnServer` / `hydrate`) drives two kinds of test per component: `*.server.test.ts` files run in a Node environment where `document` is undefined, and `*.test.ts` files run in jsdom and hydrate server HTML. A separate post-build script imports every built `dist` entry in plain Node, because source tests resolve dependencies differently from what Nuxt loads. Component fixes move browser-only work after mount instead of hiding components behind client-only wrappers.

**Tech Stack:** Vue 3.5 (`vue/server-renderer`, `createSSRApp`), Vitest 4 (`projects`), jsdom 29, `@vue/test-utils`, Vite 6/7 library mode, Turborepo, Changesets.

**Spec:** `docs/superpowers/specs/2026-10-28-ssr-friendly-manguito-theme-design.md`

## Global Constraints

- No public API changes: props, slots, emits, exposed methods, and the `@bobbykim/manguito-theme` export paths (`.`, `./directives`, `./util`, `./composable`, `./mcl-theme-v4.css`) stay the same.
- Never make visible-on-first-paint content client-only (`ClientSideRender`, `<ClientOnly>`, or "render nothing until mounted"). Gating content that is closed and invisible on first paint is allowed.
- Server-render tests must run where `document` is undefined (`// @vitest-environment node`). Never rely on a DOM environment for them.
- `ClientSideRender` stays exported from `./util`, and nothing inside the library uses it.
- Component CSS delivery (`vite-plugin-css-injected-by-js`) is unchanged. First-paint styling is out of scope.
- Do not remove `vToggle`, `vCollapse`, or `observeVisibleAttr`.
- Commits use the repo's conventional format `type(scope): subject` (for example `fix(manguito-theme): ...`, `test(mcl-tabs): ...`). `pnpm commit` is interactive, so agents run `git commit -m` with the same format.
- Work on branch `fix/ssr-friendly-manguito-theme`, never on `master`.
- Theme scripts, harness and tests live outside the published `files` (`dist`, `README.md`, `CHANGELOG.md`). Nothing new is exported from a published entry.

## Review Focus

1. **A Modal or Sidebar server-rendered open (`visible: true`) must be closable after hydration.** `close()` is gated on `toggleComplete`, which is set in `@after-enter`. If the `appear` transition never completes on hydrated nodes, the dialog can never close. _Test in Task 3._
2. **A Modal or Sidebar unmounted while open (a Nuxt route change) must release the scroll lock.** Otherwise the next page can't scroll. _Test in Task 3._
3. **`Collapse` ids must match between server and client, both with an explicit `id` and with `useId()`, including several panels inside one `AccordionGroup`.** A mismatch breaks `aria-controls`-style wiring in consumers. _Test in Task 4._
4. **A `HeaderHorizontal` with `fadeInOnScroll` hydrated on a page reloaded mid-scroll (`window.scrollY` > `scrollDistance`) must produce no hydration warning.** The spec says to apply the scroll-derived class after mount if it would. _Test in Task 7._
5. **After hydration, `HeaderVertical`'s hamburger (moved out of the Teleport) must still open and close the drawer and update `aria-expanded`.** Stacking above the open drawer can't be checked in jsdom, so check it manually in Storybook (Task 9). _Test in Task 5._

---

### Task 1: SSR test harness and jsdom environment

**Files:**

- Create: `src/components/manguito-theme/lib/__tests__/ssr.ts`
- Create: `src/components/manguito-theme/lib/__tests__/ssr.test.ts`
- Create: `src/components/manguito-theme/lib/__tests__/ssr.server.test.ts`
- Modify: `src/components/manguito-theme/vitest.config.ts` (`environment: 'happy-dom'` → `'jsdom'`)
- Modify: root `package.json` (add devDependency `jsdom@^29.1.1`, currently only transitive)

**Interfaces:**

- Produces (used by Tasks 3 to 8):
  ```ts
  export type RenderFn = () => VNode
  export interface ServerRenderResult {
    html: string
    teleports: Record<string, string>
  }
  export function renderOnServer(render: RenderFn): Promise<ServerRenderResult>
  export interface HydrationResult {
    app: App
    container: HTMLElement
    warnings: string[]
    unmount: () => void
  }
  export function hydrate(render: RenderFn): Promise<HydrationResult>
  ```
- Convention for every later task: `X.server.test.ts` begins with `// @vitest-environment node` and uses only `renderOnServer`. `X.test.ts` runs in jsdom and uses `hydrate` and `@vue/test-utils`.
- Why jsdom: under happy-dom, `@vueuse`'s `useScrollLock(document)` throws `Cannot read properties of undefined (reading 'overflow')` (happy-dom's `Document` fails vueuse's `instanceof Document`). Under jsdom it works, as in browsers. Verified while planning.

- [ ] **Step 1: Create the branch and add jsdom**

Run: `git checkout -b fix/ssr-friendly-manguito-theme && pnpm add -Dw jsdom@^29.1.1`
Expected: `jsdom` listed in root `devDependencies`.

- [ ] **Step 2: Write the failing harness tests**

`ssr.test.ts` (jsdom):

```ts
it('reports no warnings for markup that matches', async () => {
  const r = await hydrate(() => h('div', [h('p', 'same')]))
  expect(r.warnings).toEqual([])
  r.unmount()
})
it('reports a warning when server and client markup differ', async () => {
  let n = 0
  const r = await hydrate(() => h('p', String(n++))) // server "0", client "1"
  expect(r.warnings.length).toBeGreaterThan(0)
  r.unmount()
})
it('places body teleports so a teleported subtree hydrates cleanly', async () => {
  const r = await hydrate(() =>
    h('div', [h(Teleport, { to: 'body' }, [h('p', 'tp')])]),
  )
  expect(r.warnings).toEqual([])
  r.unmount()
})
```

`ssr.server.test.ts` (node):

```ts
it('runs without a DOM', () => {
  expect(typeof document).toBe('undefined')
})
it('returns html and teleport buffers', async () => {
  const { html, teleports } = await renderOnServer(() =>
    h('div', [h(Teleport, { to: 'body' }, [h('p', 'tp')])]),
  )
  expect(html).toContain('<div')
  expect(teleports.body).toContain('tp')
})
```

- [ ] **Step 3: Run the tests to make sure they fail**

Run: `cd src/components/manguito-theme && pnpm vitest run lib/__tests__`
Expected: FAIL, cannot resolve `./ssr`.

- [ ] **Step 4: Implement `ssr.ts`**

- `renderOnServer`: `renderToString(createSSRApp({ render }), ctx)`, returning `ctx.teleports ?? {}`.
- `hydrate`: set `document.body.innerHTML` to `<div id="app">${html}</div>`. Append `teleports.body` to the end of `body`. For any `#id` key, append `<div id="id">…</div>`. Then mount a fresh `createSSRApp({ render })` on `#app` and `await nextTick()`.
- Collect warnings from `app.config.warnHandler` plus a `console.error`/`console.warn` spy, keeping messages that match `/hydrat/i`. Restore the console after mount.
- Let a throw during mount propagate.
- `unmount` unmounts the app and clears `body`.

- [ ] **Step 5: Switch the theme's test environment and run the whole theme suite**

Run: `pnpm vitest run` (in `src/components/manguito-theme`)
Expected: PASS, including the existing `generateClass` and `sharedFn` tests under jsdom.

- [ ] **Step 6: Commit**

First commit the spec and this plan (`git add docs/superpowers && git commit -m "docs(superpowers): add SSR-friendly manguito-theme spec and plan"`), then commit the harness:
`git commit -m "test(manguito-theme): add SSR render and hydration test harness"`

---

### Task 2: Published builds import in Node

**Files:**

- Create: `src/components/manguito-theme/scripts/check-dist-ssr.mjs`
- Modify: `src/components/manguito-theme/package.json` (script `"test:dist": "node scripts/check-dist-ssr.mjs"`)
- Modify: root `package.json` (script `"test:dist": "turbo run build && pnpm --filter @bobbykim/manguito-theme run test:dist"`)
- Modify: `src/components/manguito-theme/vite.config.ts` (`rollupOptions.external`)
- Modify: `vite.config.ts` in all 10 other packages under `src/components/mcl-*`
- Modify: `scripts/templates/_vite.config.md`

**Interfaces:**

- Produces: `pnpm test:dist`, which prints one `PASS <label>` or `FAIL <label>: <message>` line per check and exits 1 on any FAIL. Tasks 3 and 9 re-run it.

- [ ] **Step 1: Write `check-dist-ssr.mjs`**

The script lives in the theme package so that `import 'vue'` resolves to the same ESM `vue` instance that `dist` imports. It checks:

1. Each theme entry (`dist/core.js`, `dist/directives.js`, `dist/util.js`, `dist/composable.js`) imports.
2. Each component exported from `dist/core.js` server-renders via `vue/server-renderer`, with default props. Compound components are rendered nested:
   - `TabContainer` with a `tab-content` slot containing `TabContent { tabNumber: 0, id: 't0' }`
   - `CarouselContainer` with `CarouselContent { slideNumber: 0, id: 's0' }`
   - `DropdownContainer` with `DropdownContent`

   `Modal` and `Sidebar` are rendered both closed and with `visible: true`.

3. For every other `src/components/*/package.json`, the ESM entry (`exports['.'].import` or `module`) imports.

- [ ] **Step 2: Run it to make sure it fails**

Run: `pnpm test:dist` (repo root)
Expected: FAIL on `dist/core.js` and `dist/directives.js` with `Cannot read properties of undefined (reading 'bind')`, and FAIL for all 10 consumer packages.

- [ ] **Step 3: Externalize the theme's dependencies**

In `manguito-theme/vite.config.ts`, `external` = every key of `package.json` `dependencies` plus `tailwindcss`, each as `new RegExp(`^${name}(/.*)?$`)`, so subpaths like `@vueuse/integrations/useFocusTrap` are covered.

- [ ] **Step 4: Externalize theme subpaths in consumers and the template**

In each `mcl-*/vite.config.ts` and `_vite.config.md`, replace `'@bobbykim/manguito-theme'` in `external` with `/^@bobbykim\/manguito-theme(\/.*)?$/`. Keep the other entries (for example `'@vueuse/core'`). Add UMD `globals` for the subpaths:

- `'@bobbykim/manguito-theme/directives': 'ManguitoThemeDirectives'`
- `'@bobbykim/manguito-theme/util': 'ManguitoThemeUtil'`
- `'@bobbykim/manguito-theme/composable': 'ManguitoThemeComposable'`

- [ ] **Step 5: Re-run**

Run: `pnpm test:dist`
Expected:

- every import check PASSes
- every component render PASSes except `Modal` and `Sidebar` (`document is not defined`), which are fixed in Task 3
- `grep -c 'isomorphic-dompurify' src/components/manguito-theme/dist/core.js` ≥ 1, meaning it is an import and not inlined
- `grep -c 'DOMPurify' src/components/mcl-forms/dist/mcl-forms.js` = 0

- [ ] **Step 6: Commit**

`git commit -m "fix(manguito-theme): externalize dependencies so built packages import in Node"`

---

### Task 3: Modal, Sidebar, and `useModalScrollLock`

**Files:**

- Modify: `src/components/manguito-theme/lib/composables/useModalScrollLock.ts`
- Modify (only if hydration tests require it): `lib/modal/Modal.vue`, `lib/sidebar/Sidebar.vue`
- Create: `lib/composables/__tests__/useModalScrollLock.test.ts`, `lib/composables/__tests__/useModalScrollLock.server.test.ts`
- Create: `lib/modal/Modal.test.ts`, `lib/modal/Modal.server.test.ts`, `lib/sidebar/Sidebar.test.ts`, `lib/sidebar/Sidebar.server.test.ts`

**Interfaces:**

- Consumes: `renderOnServer`, `hydrate` (Task 1).
- `useModalScrollLock(isOpen: Ref<boolean>): void`: the signature is unchanged. No `document` access during setup. The lock engages after mount when `isOpen` is true, follows `isOpen` afterwards, and is released when the owning scope is disposed. (Hint: give `useScrollLock` a `shallowRef` target that is set to `document.documentElement` in `onMounted`, so vueuse's own scope cleanup still runs.)

- [ ] **Step 1: Write the failing tests**

Server (node), for each of Modal and Sidebar:

- `renders closed without throwing`
- `renders open with dialog markup`: with `visible: true`, the html contains `role="dialog"`, `aria-modal="true"` and the body slot text
- composable: `useModalScrollLock does not touch document during setup`: a component calling it renders without throwing

Client (jsdom), for each:

- `hydrates closed with no warnings`, and `hydrates open with no warnings`: `expect(r.warnings).toEqual([])`
- `locks scroll after mount when open, unlocks on close`: assert `document.documentElement.style.overflow` is `'hidden'`, then `''`
- `releases the scroll lock when unmounted while open` _(Review Focus 2)_
- `a dialog server-rendered open can be closed after hydration` _(Review Focus 1)_: hydrate with `visible: true` and a template ref. Wait for transitions to settle (`await new Promise(r => setTimeout(r, 50))`). Call the exposed `close()`, settle again, and expect no `[role="dialog"]` in the DOM.
- behavior with `@vue/test-utils` `mount`: exposed `open`/`toggle` show the dialog and emit `open`, with payload `[true]`; `aria-labelledby` equals the `<h3>` id when `title` is set

- [ ] **Step 2: Run the tests to make sure they fail**

Run: `pnpm vitest run lib/modal lib/sidebar lib/composables`
Expected: server tests FAIL with `document is not defined`.

- [ ] **Step 3: Implement the `useModalScrollLock` change**

Then fix whatever the hydration and close-after-hydration tests show in `Modal.vue` and `Sidebar.vue`, without changing their API.

- [ ] **Step 4: Run the tests and the dist check**

Run: `pnpm vitest run lib/modal lib/sidebar lib/composables`, then `pnpm test:dist` from the root
Expected: all PASS, and the dist check is fully PASS.

- [ ] **Step 5: Commit**

`git commit -m "fix(manguito-theme): make Modal, Sidebar and useModalScrollLock SSR safe"`

---

### Task 4: Collapse, AccordionGroup, `useCollapseState`

**Files:**

- Modify: `src/components/manguito-theme/lib/collapse/Collapse.vue` (remove `ClientSideRender`)
- Modify: `src/components/manguito-theme/lib/util/clientSideRender.ts` (JSDoc only: a last-resort escape hatch for consumers' own browser-only content, not used internally)
- Create: `lib/collapse/Collapse.test.ts`, `lib/collapse/Collapse.server.test.ts`, `lib/composables/__tests__/useCollapseState.test.ts`

**Interfaces:**

- Consumes: Task 1 harness.
- `Collapse` contract after the change: the content is always rendered and hidden with `v-show` when closed. The `<Transition>` has no `appear`, so it animates only on toggles after mount.

- [ ] **Step 1: Write the failing tests**

Server (node):

- `open collapse puts its content in server html`: with `visible: true`, the html contains `BODY` and no `display:none`
- `closed collapse puts its content in server html, hidden`: the html contains `BODY` and `display:none`
- `AccordionGroup renders all panel contents`

Client (jsdom):

- `hydrates open and closed with no warnings`
- `a hydrated closed panel opens on toggle`: call the exposed `toggle()`, and expect the content element not to be `display: none`, plus an `open` emit
- `ids match between server and client` _(Review Focus 3)_: with `id: 'panel-1'` and with no id, the hydrated `#id` equals the server html's id, and there are no warnings. The same holds for three panels in one `AccordionGroup`.
- `AccordionGroup opens one panel at a time`

`useCollapseState`:

- standalone: `toggle`, `open` and `close` flip `isOpen`, and a ref `initialOpen` change syncs
- accordion mode (inside a component that called `provideAccordion()`): opening id `b` closes id `a`

- [ ] **Step 2: Run the tests to make sure they fail**

Run: `pnpm vitest run lib/collapse lib/composables/__tests__/useCollapseState.test.ts`
Expected: the server content tests FAIL, because the html is `<!---->`.

- [ ] **Step 3: Remove `ClientSideRender` from `Collapse.vue`**

If hydration now warns, find and fix the root cause. Re-wrapping is not allowed.

- [ ] **Step 4: Run the tests to verify they pass**

Run: the same command
Expected: PASS. `grep -rn ClientSideRender src/components/*/lib --include=*.vue` returns nothing.

- [ ] **Step 5: Commit**

`git commit -m "fix(manguito-theme): render Collapse content on the server"`

---

### Task 5: HeaderVertical

**Files:**

- Modify: `src/components/manguito-theme/lib/header/HeaderVertical.vue`
- Create: `lib/header/HeaderVertical.test.ts`, `lib/header/HeaderVertical.server.test.ts`

**Interfaces:**

- Consumes: Task 1 harness (its teleport placement matters here). A probe during planning showed that `HeaderVertical` still mismatches _with_ the teleports placed correctly, so the mismatch is real.
- Constraint: the `NavDrawer` hamburger button is rendered outside the `<Teleport>` (it is `position: fixed` already), so it is in the server HTML. The drawer overlay stays teleported to `body` and may be gated until mount. Slots, `toggle-drawer` emit and the `headerClose` expose don't change.

- [ ] **Step 1: Write the failing tests**

Server (node):

- `hamburger button is in server html`: with a `mobile-content` slot, the main html (not `teleports.body`) contains `aria-label="Open"` and `aria-expanded="false"`
- `desktop content is in server html`: the `content` slot text is present

Client (jsdom):

- `hydrates with no warnings` (with and without the `mobile-content` slot)
- `hamburger toggles the drawer after hydration` _(Review Focus 5)_: click the button, and expect the drawer `nav` inside `body`, `aria-expanded="true"`, the scroll lock on, and a `toggle-drawer` emit with `open === true`. Then call the `headerClose` exposed through the slot or the ref, and expect the drawer gone and the lock off.

- [ ] **Step 2: Run the tests to make sure they fail**

Run: `pnpm vitest run lib/header/HeaderVertical`
Expected: FAIL. The hydration test has warnings, and the server test doesn't find the button in the main html.

- [ ] **Step 3: Restructure the template per the constraint**

- [ ] **Step 4: Run the tests to verify they pass**

Run: the same command
Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "fix(manguito-theme): hydrate HeaderVertical cleanly and keep its menu button in server HTML"`

---

### Task 6: Tabs

**Files:**

- Modify: `src/components/manguito-theme/lib/tabs/TabContainer.vue`
- Create: `lib/tabs/Tabs.test.ts`, `lib/tabs/Tabs.server.test.ts`

**Interfaces:**

- Consumes: Task 1 harness.
- Constraint: until a real height is measured (`containerHts === 0`), the tab body is not height-clamped. Emit no `--container-hts` (or `none`), and use the CSS `max-height: var(--container-hts, none)`. After measurement, the behavior is the same as today.

- [ ] **Step 1: Write the failing tests**

Fixture: a `TabContainer` with a `tab-button` slot rendering two buttons that call `update(i)`, and a `tab-content` slot with `TabContent { tabNumber: 0, id: 't0' }` "A" and `{ tabNumber: 1, id: 't1' }` "B".

Server (node):

- `active tab content is in server html and not clamped`: the html contains `A` and `role="tablist"`, and not `--container-hts:0px`

Client (jsdom):

- `hydrates with no warnings`
- `switching tabs after hydration shows the other tab`: click button 2 (or call the exposed `update(1)`), and expect `B` visible and `A` hidden

- [ ] **Step 2: Run the tests to make sure they fail**

Run: `pnpm vitest run lib/tabs`
Expected: the server test FAILs on `--container-hts:0px`.

- [ ] **Step 3: Implement the constraint**

- [ ] **Step 4: Run the tests to verify they pass**

Run: the same command
Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "fix(manguito-theme): show the active tab before its height is measured"`

---

### Task 7: The remaining base components and entry points

**Files:**

- Create: server and client test pairs:
  - `lib/alert/Alert.test.ts`, `lib/alert/Alert.server.test.ts`
  - `lib/card/Card.test.ts`, `lib/card/Card.server.test.ts`
  - `lib/carousel/Carousel.test.ts`, `lib/carousel/Carousel.server.test.ts`
  - `lib/dropdown/Dropdown.test.ts`, `lib/dropdown/Dropdown.server.test.ts`
  - `lib/header/HeaderHorizontal.test.ts`, `lib/header/HeaderHorizontal.server.test.ts`
- Create: `lib/__tests__/entries.server.test.ts`
- Modify: any of those components only if a test fails. `HeaderHorizontal` is the likely one.

**Interfaces:**

- Consumes: Task 1 harness.

- [ ] **Step 1: Write the tests**

- `entries.server.test.ts` (node): dynamically importing `../index`, `../directives`, `../composables` and `../util` resolves.
- Each component: renders on the server without throwing, puts its slot content in the html, and hydrates with no warnings. Plus one behavior test each:
  - **Alert:** with `show: true` and `dismissible: true`, clicking close hides it and emits `close`
  - **Card:** title and default slot render
  - **Carousel:** with three `CarouselContent` slides, the `next()` slot prop activates slide 1, and `loop: true` wraps from the last slide to 0
  - **Dropdown:** the trigger toggles `DropdownContent`, and a click outside emits `click-outside` and closes it
  - **HeaderHorizontal:** the `content` slot is in server html, and the drawer button emits `toggle-drawer`
- **HeaderHorizontal mid-scroll** _(Review Focus 4)_: `hydrates with no warnings when the page loads scrolled`. Set `window.scrollY = 500` (via `Object.defineProperty`) before `hydrate`, with `fadeInOnScroll: true` and `scrollDistance: 100`. Expect `warnings` to equal `[]`.

- [ ] **Step 2: Run the tests**

Run: `pnpm vitest run lib/alert lib/card lib/carousel lib/dropdown lib/header/HeaderHorizontal lib/__tests__/entries`
Expected: everything passes except any genuine failures. The mid-scroll test is expected to FAIL today.

- [ ] **Step 3: Fix the failures**

For `HeaderHorizontal`, apply the scroll-derived class only after mount (a `mounted` flag ANDed into the condition).

- [ ] **Step 4: Run the tests to verify they pass**

Run: the same command
Expected: PASS.

- [ ] **Step 5: Commit**

`git commit -m "test(manguito-theme): cover remaining base components under SSR and hydration"`

---

### Task 8: Consumer package tests

**Files:**

- Create: `vitest.config.ts` in `src/components/mcl-collapse`, `mcl-header`, `mcl-tabs` and `mcl-dropdown`, copied from `mcl-forms/vitest.config.ts` (keep its alias-order comment) with:
  - `name` set to the package name
  - `environment: 'jsdom'`
  - an extra alias `'@mcl/ssr-test-utils': resolve(__dirname, '../manguito-theme/lib/__tests__/ssr.ts')`
- Modify: those 4 `package.json`s, adding `"test": "vitest run"` and `"test:watch": "vitest"`
- Modify: root `vitest.config.ts` `projects`, adding the 4 paths
- Create:
  - `mcl-collapse/lib/mcl-collapse-a/MclCollapseA.test.ts` + `.server.test.ts`, and the same for `mcl-collapse-b/MclCollapseB`
  - `mcl-header/lib/mcl-header-a/MclHeaderA.test.ts` + `.server.test.ts`, and the same for `mcl-header-b/MclHeaderB`
  - `mcl-tabs/lib/mcl-tabs-a/MclTabsA.test.ts` + `.server.test.ts`
  - `mcl-dropdown/lib/mcl-dropdown-a/MclDropdownA.test.ts` + `.server.test.ts`

**Interfaces:**

- Consumes: `renderOnServer` and `hydrate` via `'@mcl/ssr-test-utils'`. The fixes from Tasks 3 to 7.

- [ ] **Step 1: Write the tests**

For each component, using the minimal required props from its `defineProps` plus representative slot or array content:

- `renders on the server`: no throw, and the main text content is in the html
- `hydrates with no warnings`
- **MclTabsA:** the first tab's content is in server html, `--container-hts:0px` is absent, and clicking the second tab button after hydration shows its content
- **MclCollapseA and MclCollapseB:** a closed panel's content is in server html, and toggling after hydration opens it
- **MclHeaderB:** the hamburger button is in the main server html

- [ ] **Step 2: Run the tests**

Run: `pnpm test` (repo root)
Expected: all projects PASS. If a consumer fails because of its own code (for example `MclTabsA`'s `onMounted` measurement), fix it in that package without API changes.

- [ ] **Step 3: Commit**

`git commit -m "test(mcl-collapse,mcl-header,mcl-tabs,mcl-dropdown): add SSR and hydration smoke tests"`

---

### Task 9: Docs, changesets, final verification

**Files:**

- Modify: `src/stories/introduction/Installation.mdx`. Under "Nuxt 3", add an `### SSR` note: the components server-render and hydrate without a `<ClientOnly>` wrapper; component styles apply once the JS loads; import `mcl-theme-v4.css` as usual.
- Modify: `src/stories/Base/base-component/{Collapse,Modal,Sidebar,HeaderVertical,Tabs}.mdx`. Add an `## SSR` section before `## API`, with the facts per component:
  - **Collapse:** content is always in server HTML, and closed panels are `display:none`
  - **Modal and Sidebar:** server-render closed (or open with `visible`), and scroll lock and focus trap engage after mount
  - **HeaderVertical:** the menu button is in server HTML, and the drawer mounts on the client
  - **Tabs:** the active tab is visible before measurement
- Modify: `MclCollapseA/B.mdx`, `MclHeaderA/B.mdx`, `MclTabsA.mdx` and `MclDropdownA.mdx`, only if their documented markup or behavior changed.
- Modify: `docs/mcl-82/audit/06-general-architecture.md` section 6. Add a note that `ClientSideRender` is no longer used internally (as of this change).
- Modify: `CLAUDE.md` Testing section:
  - update the stale "currently covers manguito-theme only" note
  - document the `*.server.test.ts` (node) and `*.test.ts` (jsdom) convention, the harness, and the `@mcl/ssr-test-utils` alias
  - add `pnpm test:dist`
- Create: `.changeset/ssr-friendly-manguito-theme.md`:
  - `'@bobbykim/manguito-theme': minor`
  - `'@bobbykim/mcl-forms': patch` and `'@bobbykim/mcl-cards': patch` (they no longer bundle theme subpaths)
  - patch for any consumer whose `lib/` changed in Task 8
  - summary: SSR safe without client-only wrappers, Collapse content in server HTML, built packages import in Node

- [ ] **Step 1: Write the docs and the changeset**

- [ ] **Step 2: Run the full verification**

Run: `pnpm test && pnpm test:dist && pnpm run story:build`
Expected: all PASS, and Storybook builds to `dist/`.

- [ ] **Step 3: Check the stories manually**

Run: `pnpm run story:dev`, then open:

- **Collapse:** toggles animate
- **Modal and Sidebar:** they open and close, and the page scroll locks
- **HeaderVertical:** at mobile width, the hamburger stays clickable above the open drawer _(Review Focus 5)_
- **Tabs and MclTabsA:** switching animates and the height adapts

Expected: the behavior is unchanged from `master`.

- [ ] **Step 4: Commit**

`git commit -m "docs(stories): document SSR behavior and add changeset"`
