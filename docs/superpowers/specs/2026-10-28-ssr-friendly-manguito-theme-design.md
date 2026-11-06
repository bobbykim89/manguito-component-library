# SSR-Friendly manguito-theme Design

**Date:** 2026-10-28
**Status:** Approved design, pending implementation plan
**Scope:** `@bobbykim/manguito-theme` base components, composables, util, and its
published build; the packages that consume its components (`mcl-collapse`,
`mcl-header`, `mcl-tabs`, `mcl-dropdown`); related Storybook docs.

---

## 1. Intent

Consumers render this library in **Nuxt with SSR** and see hydration mismatch
warnings. The current workaround, the `ClientSideRender` wrapper inside
`Collapse`, silences the warning by rendering nothing on the server. That hides
the problem instead of fixing it: collapse content is missing from server HTML,
open-by-default panels pop in after load, and crawlers may never see it.

The goal is for `manguito-theme` to be **actually** SSR friendly: every base
component renders on the server without crashing, hydrates without warnings, and
puts its real content in the server HTML. The proof is a test harness that does
what Nuxt does (server render, then hydrate) and fails on any hydration warning.

The owner chose this over extending the client-only wrapper to `Modal` and
`Sidebar`.

## 2. What exists today (confirmed by a throwaway probe)

A probe rendered each exported base component with `vue/server-renderer`
(Node environment, no DOM) and then hydrated it with `createSSRApp` in a DOM
environment, recording errors and warnings.

| Component                                                                     | Server render                                      | Hydration         | Cause                                                                                                                               |
| ----------------------------------------------------------------------------- | -------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Modal`                                                                       | **Crashes**: `document is not defined`             | n/a               | `useModalScrollLock` calls `useScrollLock(document)` during setup                                                                   |
| `Sidebar`                                                                     | **Crashes**: same                                  | n/a               | same                                                                                                                                |
| `Collapse` (incl. `visible: true`)                                            | Renders an **empty** `<div id="v-0"><!----></div>` | clean             | `ClientSideRender` wraps the content                                                                                                |
| `AccordionGroup`                                                              | Same as `Collapse`                                 | clean             | same                                                                                                                                |
| `HeaderVertical`                                                              | OK                                                 | **Node mismatch** | `<Teleport to="body">` holds both the mobile drawer and the hamburger button. _May be partly a harness artifact; see section 5._    |
| `TabContainer`                                                                | OK, but emits `--container-hts:0px`                | clean             | Tab body has `max-height: var(--container-hts)`, so on the server it is collapsed to 0 until JS measures it, causing a visible jump |
| `Alert`, `Card`, `CarouselContainer`, `DropdownContainer`, `HeaderHorizontal` | OK                                                 | clean             | —                                                                                                                                   |

Other observations:

- **The published build crashes when imported in Node.** `dist/core.js` and
  `dist/directives.js` throw `TypeError: Cannot read properties of undefined
(reading 'bind')` on import. The Vite library build bundles the _browser_ build
  of `isomorphic-dompurify` (used by `lib/tooltip/index.ts`), which has no
  `sanitize` in Node. `@vueuse/integrations` and `focus-trap` are also bundled
  rather than external. `dist/util.js` and `dist/composable.js` import fine. Tests
  that import `lib/` source through Vitest aliases pick up the Node build and do
  not see this, so source-level tests alone cannot prove SSR safety.
- **Every consumer package's `dist` fails to import in Node too.** Ten out of ten fail
  with the same error, because they load the theme's `core`. In addition, consumer
  builds mark only the bare name `'@bobbykim/manguito-theme'` as external, so
  **subpath** imports get bundled. `mcl-forms` bundles its own copy of the
  theme's `directives` (DOMPurify included), and `mcl-cards` bundles `util`.
  `mcl-forms` would therefore still crash after the theme is fixed. The
  scaffolding template `scripts/templates/_vite.config.md` has the same external list.
  _(Found while planning, after the owner approved the design. Added as part of the build fix.)_
- `ClientSideRender` is used in exactly one place (`Collapse.vue`). No other
  package or story imports it.
- `HeaderVertical` already moves its scroll lock into `onMounted`, which is the
  pattern `Modal` and `Sidebar` should follow.
- A search of all other packages for `window`, `document`, `localStorage`,
  `matchMedia`, `Math.random` and `Date.now` found nothing outside
  `manguito-theme`. Their only SSR exposure is through theme components.
- Consumers of theme **components** (as opposed to `generateClass`):
  - `mcl-collapse`: `MclCollapseA`, `MclCollapseB` use `Collapse`
  - `mcl-header`: `NavCollapse`, `NavCollapseVertical` use `Collapse`;
    `MclHeaderA` and `NavDropdown` use the Dropdown components; `MclHeaderB` uses
    `HeaderVertical`
  - `mcl-tabs`: `MclTabsA` uses `TabContainer` and `TabContent` (and has its own
    `useElementSize`/`onMounted` logic), so the `TabContainer` height change below
    directly affects it
  - `mcl-dropdown`: `MclDropdownA` uses `DropdownContainer` and `DropdownContent`
  - `mcl-cards`: `MclCardA` uses `getGlassmorphismClass` (pure, unaffected)
  - `vClickOutside` is used in one other package
- Test coverage in `manguito-theme` is limited to `generateClass` and directive
  helpers. There are no component tests and no SSR tests. `mcl-collapse`,
  `mcl-header`, `mcl-tabs` and `mcl-dropdown` have no tests or vitest config.

## 3. Goals, non-goals, anti-goals

**Goals**

1. Every exported base component in `manguito-theme` server-renders in a Node
   environment (no `document` or `window`) without throwing.
2. Every exported base component hydrates with **zero** hydration warnings, in
   both its default state and its "open" or initially visible state where one exists.
3. Real content is present in the server HTML. Closed collapse panels are in
   the HTML and hidden (`display:none` via `v-show`). Open ones are in the HTML
   and not hidden. This promises that the content is _present_. It does not
   promise fully styled first paint (see the non-goals).
4. Component tests exist for every base component, covering behavior (open,
   close, toggle, emits, exposed methods, key ARIA attributes) as well as
   SSR and hydration.
5. The consumer packages (`mcl-collapse`, `mcl-header`, `mcl-tabs`,
   `mcl-dropdown`) keep working: builds pass, and they gain SSR and hydration
   smoke tests.
6. Every built entry point of `manguito-theme` (`core`, `directives`, `util`,
   `composable`) can be imported and server-rendered in plain Node, so the
   proof covers what Nuxt actually loads from `node_modules`, not just the source.
7. Storybook docs reflect the SSR behavior.

**Non-goals**

- **First-paint styling** (_owner's decision: leave it as is for now_). Every
  package injects its scoped component styles through JavaScript
  (`vite-plugin-css-injected-by-js`). Only `mcl-theme-v4.css` ships as a file.
  On a server-rendered page, scoped styles (for example `.header-desktop`,
  `.sidebar-body` width, `.container-hts`, transitions) apply only once the JS
  loads. This project keeps that build setup and the consumer import pattern
  unchanged. Shipping component CSS as a file is a candidate follow-up project.
- Adding a Nuxt app to the repo. The Vue-level harness is the proof (_my call_).
  A manual check in the owner's Nuxt app is recommended before release but is
  not part of this work.
- SSR-auditing packages that only use `generateClass` and have no browser APIs.
- Removing deprecated directives (`vToggle`, `vCollapse`) or `observeVisibleAttr`.
- Fixing `mcl-forms`'s module-level fallback ID counter (it is only a last resort
  behind `useId()`, and it lives outside this package).

**Anti-goals (failure even if warnings disappear)**

- Making components client-only, through `ClientSideRender`, `<ClientOnly>`, or
  an equivalent "render nothing until mounted", for anything that is **visible
  content on first paint**. Wrapping things that are closed and invisible on
  first paint (such as a closed overlay's teleported panel) is acceptable.
- Breaking the public API: props, slots, emits, exposed methods, and the
  `@bobbykim/manguito-theme/*` export paths stay the same.
- Tests that pass because happy-dom defines `document` during the "server" render.
  Server-render tests must run where `document` is undefined.

## 4. Decisions

### Decided by the owner

- Fix the root causes instead of extending the client-only wrapper to `Modal` and `Sidebar`.
- Collapse content must appear in server HTML, not just render without warnings.
- First-paint styling (CSS delivered through JS) stays as is. Out of scope.
- Add component testing for the theme's base components.
- Check the consuming packages for compatibility and update the stories.

### Build fix (_my call_)

- Stop bundling the browser-only dependency builds into `dist`: make
  `isomorphic-dompurify` external (and `@vueuse/integrations` and `focus-trap` if
  they cause the same problem), declared as dependencies so consumers get the
  right build for each environment. The builder confirms the final external list
  against the dist-import test (section 5).
- In every consumer package's `vite.config.ts` and in the scaffolding template,
  mark `@bobbykim/manguito-theme` **and its subpaths** as external, so no consumer
  bundles a copy of theme code. Every package's built entry must import in plain Node.

### Component fixes (_my calls_ on approach; exact code is the builder's)

- **`useModalScrollLock`**: must not touch `document` during setup. Create or
  apply the lock only after mount (the same pattern `HeaderVertical` uses), and
  release it on unmount. It is a public composable, so its signature stays the same.
- **`Modal` / `Sidebar`**: no wrapper. With `visible: false` (the default), the
  server emits the same closed shell the client hydrates. With `visible: true`,
  the server renders the open markup, and scroll lock and focus trap engage after
  mount. Any `appear` transition must not cause a mismatch.
- **`Collapse`**: remove `ClientSideRender`. Content is always rendered and
  hidden with `v-show` when closed (so the server emits `display:none`).
  Animations run only on toggles after mount, not on the initial render. If
  removing the wrapper brings back the original mismatch, the builder finds and
  fixes the real cause. Re-wrapping is not an option.
- **`HeaderVertical`**: the hamburger button is visible on first paint (on mobile),
  so it must be in the server HTML. Move it out of the `<Teleport>` (it is
  `position: fixed` already). The drawer overlay stays teleported, and because
  it is closed on first paint it may be gated until mount if that is what it
  takes to hydrate cleanly. The public slots and `headerClose` expose don't change.
- **`TabContainer`**: before the first measurement, the tab body must not be
  height-clamped (for example, no `max-height` until a real height is known), so
  the active tab is visible in server HTML.
- **`ClientSideRender`**: keep exporting it from `/util` (removing it would be
  breaking), stop using it internally, and document it as a last-resort escape
  hatch for consumers' own browser-only content.
- **Remaining components and entry points**: `Dropdown` (`useWindowSize`),
  `HeaderHorizontal` (`useWindowScroll`), `Carousel`, `Alert`, `Card`, and the
  `directives`, `composable` and `util` entry points must be importable and
  server-renderable under Node. Fix anything the harness catches.
  - _Known edge case, accepted_: `HeaderHorizontal`'s sticky styling depends on
    scroll position, which can differ if a page is reloaded mid-scroll. This is
    acceptable only if it does not produce a hydration warning in the default
    case. Otherwise the scroll-derived class is applied after mount.

## 5. Testing

### SSR and hydration harness (_my call_ on shape)

A small test-only helper inside `manguito-theme` (not exported from any
published entry point), usable by other packages' tests:

- **Server render**: runs in a Node environment (`// @vitest-environment node`),
  renders with `renderToString(createSSRApp(...))`, and asserts it does not throw.
  Returns the HTML so tests can assert that the content is present.
- **Hydrate**: in a DOM environment, server-renders, places the HTML in a
  container, places teleported content where Nuxt would (from `ssrContext.teleports`
  into its target), mounts with `createSSRApp`, and **fails the test on any
  hydration warning or error**. It should support switching to an "open" state
  after mount, to check that interaction still works on hydrated markup.

The harness must emulate teleport placement. Otherwise `HeaderVertical` results
are meaningless, and the probe's mismatch for it may partly be that artifact.

Environment caveat found in the probe: under happy-dom, `@vueuse`'s
`useScrollLock(document)` throws `Cannot read properties of undefined
(reading 'overflow')`, because happy-dom's `Document` fails vueuse's
`instanceof Document` check. Real browsers don't have this problem. The builder
picks a DOM environment (or workaround) where this behaves like a browser, and
records the choice.

### Component tests

For each exported base component (`AccordionGroup`, `Alert`, `Card`,
`CarouselContainer`/`CarouselContent`, `Collapse`, `DropdownContainer`/
`DropdownContent`, `HeaderHorizontal`, `HeaderVertical`, `Modal`, `Sidebar`,
`TabContainer`/`TabContent`):

- server render without throwing, with content-presence assertions where relevant
- hydration with no warnings, in the default state and the open/visible state
- behavior: open, close, and toggle via props and exposed methods; emitted events;
  key ARIA attributes (`role="dialog"`, `aria-modal`, `aria-labelledby`,
  `role="tablist"`)

Plus unit tests for `useModalScrollLock` (no `document` access during setup;
lock and unlock after mount) and `useCollapseState` (standalone and accordion modes).

Tests live alongside the source as `lib/**/*.test.ts`, matching the repo
convention, with `@vue/test-utils` where it helps, following the existing
`mcl-forms` tests' style.

### Built-output test

A test that runs **after** `package:build` and, in plain Node (no Vitest
aliases), imports every built entry point of `manguito-theme` and server-renders
each exported component from `dist`. This catches build-level problems like the
bundled DOMPurify that source tests can't see. Where it runs (a separate script,
or part of the test suite gated on a build) is the builder's call. It must be
documented in `CLAUDE.md`'s Testing section.

### Consumer packages

- Add a `vitest.config.ts` to `mcl-collapse`, `mcl-header`, `mcl-tabs` and
  `mcl-dropdown`, mirroring `mcl-forms` (including the alias-order note), and
  register them in the root `vitest.config.ts` `projects`.
- SSR and hydration smoke tests for `MclCollapseA`, `MclCollapseB`, `MclHeaderA`,
  `MclHeaderB`, `MclTabsA` and `MclDropdownA`, using the shared harness.
  `MclTabsA` must also be checked for layout changes caused by the `TabContainer`
  height fix.

## 6. Compatibility and release

- No public API changes (section 3, anti-goals).
- Must pass: `pnpm test` (root), `pnpm run package:build`, `pnpm run story:build`.
- Changesets (_my call_): `manguito-theme` **minor**, since `Collapse` now
  emits its content in server HTML and `HeaderVertical`'s DOM structure shifts
  slightly, both observable changes. `mcl-collapse`, `mcl-header`, `mcl-tabs` and
  `mcl-dropdown` get a **patch** if their source changes, and otherwise follow
  Changesets' internal dependency bumping.

## 7. Stories and docs

- `src/stories/introduction/Installation.mdx` (the Nuxt 3 section): state that
  the components are SSR safe and need no `<ClientOnly>` wrapper.
- `Collapse.mdx`, `Modal.mdx`, `Sidebar.mdx`, `HeaderVertical.mdx`, `Tabs.mdx`:
  a short note on SSR behavior (what appears in server HTML, what engages after mount).
- `MclCollapseA/B.mdx`, `MclHeaderA/B.mdx`, `MclTabsA.mdx`, `MclDropdownA.mdx`: update only if the visible behavior or
  documented markup changed.
- Every existing story must still render and behave as before.
- `docs/mcl-82/audit/06-general-architecture.md` section 6 (`ClientSideRender`):
  add a note that it is no longer used internally.

## 8. Left to the builder

- Exact implementation of each fix within the constraints above.
- The harness API shape and file location (test-only, not published).
- The choice of DOM test environment (see the caveat in section 5).
- How the work is broken into commits and PRs.

## 9. Done means

- Every exported base component passes server-render (Node, no DOM) and
  hydration (zero warnings) tests in its default and open states.
- `ClientSideRender` is not used anywhere inside the library.
- Collapse content (open and closed) and the active tab content appear in server HTML.
- Every built `manguito-theme` entry point imports and server-renders in plain Node,
  and every other package's built entry imports in plain Node.
- The `mcl-collapse`, `mcl-header`, `mcl-tabs` and `mcl-dropdown` smoke tests
  pass, and all builds pass.
- The Storybook docs are updated as in section 7.
