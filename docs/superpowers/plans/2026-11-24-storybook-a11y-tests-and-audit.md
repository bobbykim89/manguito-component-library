# Storybook Accessibility Tests and Library-wide Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every Storybook story runs an axe check in headless Chromium locally and in CI without failing on today's violations. The axe results, together with a checklist source review, become one GitHub issue per package.

**Architecture:** `@storybook/addon-vitest` turns each story into a Vitest browser-mode test. The existing `@storybook/addon-a11y` runs axe after each story renders, at `a11y.test: 'todo'`. The setup lives in its own Vitest config so `pnpm test` stays browser-free. New `*Opened` stories use `play` functions so axe also scans opened dialogs, menus and panels. The audit has two inputs (axe results and source review) and runs on the setup branch. Findings are drafted into scratchpad files and reviewed by the maintainer before any label or issue is created.

**Tech Stack:** Storybook 10.5 (`@storybook/vue3-vite`, `@storybook/addon-a11y`, `@storybook/addon-vitest`), Vitest 4.1 browser mode, `@vitest/browser-playwright`, Playwright Chromium, GitHub Actions, `gh` CLI.

**Spec:** `docs/superpowers/specs/2026-11-24-storybook-a11y-tests-and-audit-design.md`

## Global Constraints

- Branch: `feat/a11y-storybook-tests` (already exists and holds the spec commit). Never push to `master`.
- The CI job and check name stays `ci`, and the job `timeout-minutes` stays 30.
- No changeset: no published package under `src/components/*` changes in this plan.
- `pnpm test` keeps its current scope and needs no browser.
- Global a11y parameters, verbatim: `a11y: { test: 'todo', config: { rules: [{ id: 'color-contrast', enabled: false }] } }`.
- Out of scope: WCAG 1.4.3, 1.4.6, and the color-dependent parts of 1.4.11.
- Do not fix component accessibility problems in this plan. Findings go into issues.
- Commit messages follow the repo's conventional style (`feat:`, `ci:`, `test:`, `docs:`) and end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Use `git commit -m` (`pnpm commit` is interactive).
- Run `pnpm format` before each commit. CI runs `pnpm format:check`.
- Outward-facing steps need the maintainer's explicit go-ahead at that moment: pushing, opening the PR, creating the label, filing issues.
- `$AUDIT` means `<your session scratchpad>/a11y-audit`. Raw axe output, findings and drafts live there and are never committed.

## Review Focus

1. **Teleported content.** `HeaderVertical` (used by `MclHeaderB`) teleports its mobile drawer to `<body>`. If axe only scans `#storybook-root`, the drawer is never checked. Task 1 Step 2 probes this and sets the axe `context` if needed.
2. **Scanning too early.** An `Opened` story whose `play` function returns before the transition or `v-if` finishes gets scanned in its closed state. Every `play` function ends by awaiting a `findBy*` or `toBeVisible()` on the opened content (Tasks 3–5).
3. **`pnpm test` changes.** The storybook config must not be picked up by the root run. Task 1 Step 7 compares the root test count before and after.
4. **CI time and flakiness.** Chromium install plus about 60 browser stories must fit in the 30-minute job. Task 2 records local runtime, and the step runs once in CI before the PR is marked ready.
5. **Viewport-only states.** The header drawers only appear below `lg`. If the viewport global isn't applied in browser mode, the `Opened` header stories silently test the desktop layout. Task 5 asserts that the hamburger button is visible before clicking it.

---

### Task 1: Story-level axe tests through `@storybook/addon-vitest`

**Files:**

- Modify: `package.json` (devDependencies and scripts)
- Modify: `.storybook/main.ts` (addons)
- Modify: `.storybook/preview.ts` (`parameters.a11y`)
- Create: `vitest.storybook.config.ts`
- Create: `.storybook/vitest.setup.ts` (only if Storybook 10 still needs explicit `setProjectAnnotations`; check the addon-vitest docs for 10.5)
- Temporary, never committed: `src/stories/a11y-probe.stories.ts`
- Modify: `CLAUDE.md` (Testing section)

**Interfaces:**

- Produces: the root script `pnpm test:storybook`, which runs `vitest run --config vitest.storybook.config.ts`. The Vitest project is named `storybook`. Later tasks rely on story-level `parameters.a11y.test` overrides (`'off' | 'todo' | 'error'`) deep-merging over the global parameters.

- [ ] **Step 1: Install the dependencies and wire the config**

Add the devDependencies `@storybook/addon-vitest` (same minor version as `storybook`), `@vitest/browser-playwright` (^4.1, matching `vitest`), and `playwright` pinned to an exact version. Add `'@storybook/addon-vitest'` to `addons` in `.storybook/main.ts`.

`vitest.storybook.config.ts` uses `storybookTest({ configDir: '.storybook' })` from `@storybook/addon-vitest/vitest-plugin`, with `test.name: 'storybook'` and `test.browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: 'chromium' }] }`. Do not add it to `vitest.config.ts` `projects`.

Add the global a11y parameters (Global Constraints) to `preview.parameters`. Add the script `"test:storybook": "vitest run --config vitest.storybook.config.ts"`.

Install Chromium with `pnpm exec playwright install chromium`. If launching fails on missing system libraries, run the test commands in `mcr.microsoft.com/playwright:v<pinned playwright version>-noble` with the repo mounted at `/work` instead.

- [ ] **Step 2: Write the probe story (the failing test)**

Create `src/stories/a11y-probe.stories.ts` with `title: 'Probe/A11y'` and three stories, each with `parameters: { a11y: { test: 'error' } }`:

- `MissingAlt`: renders `<img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">` with no `alt`. **Expected: FAIL** (`image-alt`).
- `LowContrast`: renders `<p style="color:#777;background:#888">low contrast</p>`. **Expected: PASS** (contrast is off).
- `TeleportedMissingAlt`: renders `<Teleport to="body"><img src="data:…"></Teleport>`. **Expected: FAIL.** If it passes, axe isn't scanning teleported content.

- [ ] **Step 3: Run the probe**

Run: `pnpm test:storybook src/stories/a11y-probe.stories.ts`
Expected: `MissingAlt` fails with `image-alt`, `LowContrast` passes, and `TeleportedMissingAlt` fails.

- [ ] **Step 4: Fix the scan context if `TeleportedMissingAlt` passed**

Set `context: 'body'` in the global `a11y` parameters. Rerun Step 3 until all three behave as expected. Then run one ordinary story, such as `MclCardAExample`, under `'error'` and check that no violation targets Storybook's own markup (`#storybook-docs`, `.sb-*`). If one does, use `context: { include: ['body'], exclude: ['.sb-wrapper', '#storybook-docs'] }` (selectors as observed) instead.

- [ ] **Step 5: Delete the probe**

Run: `rm src/stories/a11y-probe.stories.ts`

- [ ] **Step 6: Run the full story suite**

Run: `pnpm test:storybook`
Expected: every story is collected (about 60), the run ends with 0 failures, and the a11y violations show up as todo/warnings. Record the wall-clock time for Task 2.

- [ ] **Step 7: Check that `pnpm test` is unchanged**

Run `pnpm test` before Step 1 (via `git stash`, or note the count from a clean checkout) and after.
Expected: the same number of test files and tests, and no Chromium launched.

- [ ] **Step 8: Document it**

In `CLAUDE.md` under Testing, add `pnpm test:storybook` with a one-line description: every story runs in headless Chromium with an axe check, and needs `pnpm exec playwright install chromium` once. Add one line on the levels: `parameters.a11y.test` is `'todo'` globally, set to `'error'` per story file once a package is fixed, and `'off'` for demo stories. Also update the line listing what the root `pnpm test` config covers, if it lists configs.

- [ ] **Step 9: Format, lint, typecheck, commit**

Run: `pnpm format && pnpm lint && pnpm typecheck`. Expected: all pass.

```bash
git add package.json pnpm-lock.yaml .storybook vitest.storybook.config.ts CLAUDE.md
git commit -m "test: run every story as a Vitest browser test with an axe check"
```

---

### Task 2: Run the story tests in CI

**Files:**

- Modify: `.github/workflows/ci.yml` (after the `Build Storybook` step)

**Interfaces:**

- Consumes: `pnpm test:storybook` (Task 1).

- [ ] **Step 1: Add two steps after `Build Storybook`**

`Install Chromium`: `pnpm exec playwright install --with-deps chromium`.
`Test stories`: `pnpm test:storybook`.
Add a one-line comment saying violations are reported, not failed, until a package is switched to `a11y.test: 'error'`. Leave the job name and timeout unchanged.

- [ ] **Step 2: Validate**

Run: `pnpm format:check`
Expected: pass. Check that the YAML indentation matches the neighbouring steps.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: run the Storybook story tests with axe checks"
```

---

### Task 3: Silence the non-component stories, and add `Opened` stories for overlays

**Files:**

- Modify: `src/stories/Base/theme/theme.stories.ts` (default export)
- Modify: `src/stories/Base/utility-class/button-class/button.stories.ts`, `.../link-class/link.stories.ts`, `.../list-class/list.stories.ts` (`meta`)
- Modify: `src/stories/Base/base-component/directives/toggle.stories.ts`, `.../directives/collapse.stories.ts` (`meta`)
- Modify: `src/stories/Base/base-component/modal/modal.stories.ts`, `src/stories/Base/base-component/sidebar/sidebar.stories.ts`

**Interfaces:**

- Produces: the story-file pattern every later `Opened` story follows:

  ```ts
  export const ModalOpened: Story = {
    ...modalExample,
    name: 'Modal Opened',
    play: async ({ canvas, userEvent }) => {
      /* open, then await the opened content */
    },
  }
  ```

  `expect` and `screen` come from `storybook/test`. Use `screen` for content rendered outside the story root. Opened stories don't need tags, because no MDX page uses `<Stories />`.

- [ ] **Step 1: Turn the a11y check off for demo and deprecated stories**

Add `parameters: { a11y: { test: 'off' } }` to the default export or `meta` of the six files listed under Files (theme, the three utility-class files, and the two deprecated directive files). Leave click-outside and tooltip unchanged.

- [ ] **Step 2: Add `ModalOpened`**

In `modal.stories.ts`, spread `modalExample`. The `play` function clicks the story's open button, then `await expect(await screen.findByRole('dialog')).toBeVisible()`.

- [ ] **Step 3: Add `SidebarOpened`**

Same pattern in `sidebar.stories.ts`, spreading `sidebarExample`, with the same `dialog` assertion.

- [ ] **Step 4: Run them**

Run: `pnpm test:storybook src/stories/Base`
Expected: `ModalOpened` and `SidebarOpened` pass with their a11y results reported, and the six silenced files report no a11y results. If a `play` function can't find the dialog by role, that's a finding. Query by visible text instead and add a `// a11y: no dialog role` comment.

- [ ] **Step 5: Format and commit**

```bash
pnpm format
git add src/stories/Base
git commit -m "test: scan opened modal and sidebar, skip axe on demo and deprecated stories"
```

---

### Task 4: `Opened` stories for disclosure widgets

**Files:**

- Modify: `src/stories/Base/base-component/dropdown/dropdown.stories.ts` (`DropdownOpened` from `dropdownExample`)
- Modify: `src/stories/Base/base-component/collapse/collapse.stories.ts` (`CollapseOpened` from `collapseExample`)
- Modify: `src/stories/Base/base-component/tabs/tabs.stories.ts` (`TabSecondActive` from `tabExample`)
- Modify: `src/stories/Base/base-component/directives/tooltip.stories.ts` (`TooltipShown` from `tooltipExample`)
- Modify: `src/stories/components/mcl-dropdown/mcl-dropdown-a/dropdownA.stories.ts` (`MclDropdownAOpened`)
- Modify: `src/stories/components/mcl-collapse/collapse-a/collapseA.stories.ts` (`MclCollapseAOpened`)
- Modify: `src/stories/components/mcl-collapse/collapse-b/collapseB.stories.ts` (`MclCollapseBOpened`)
- Modify: `src/stories/components/mcl-tabs/mcl-tabs-a/tabsA.stories.ts` (`MclTabsASecondActive`)

**Interfaces:**

- Consumes: the `Opened` story pattern from Task 3.

- [ ] **Step 1: Add the eight stories**

For each story, the `play` function opens the component and then awaits its opened content:

- **Dropdowns:** click the trigger, then the first menu item is visible.
- **Collapses:** click the trigger, then the trigger has `aria-expanded="true"` and the panel content is visible.
- **Tabs:** click the second tab, then its panel text is visible and the first panel's text isn't.
- **Tooltip:** `userEvent.tab()` to the trigger, then `await screen.findByRole('tooltip')` is visible. If focus doesn't show it, use hover and add a `// a11y: tooltip not shown on focus` comment.

If a selector by role fails because of a missing role or attribute, use a text query and add an `// a11y:` comment naming what was missing. Those comments feed Task 7.

- [ ] **Step 2: Run them**

Run: `pnpm test:storybook src/stories/Base/base-component src/stories/components/mcl-dropdown src/stories/components/mcl-collapse src/stories/components/mcl-tabs`
Expected: the eight new stories pass, and each reports its a11y results.

- [ ] **Step 3: Format and commit**

```bash
pnpm format
git add src/stories
git commit -m "test: scan opened dropdowns, collapses, tabs and tooltip"
```

---

### Task 5: `Opened` stories for MclSelect and the header drawers

**Files:**

- Modify: `src/stories/components/mcl-forms/mcl-select/select.stories.ts` (`MclSelectOpened` from `MclSelectExample`)
- Modify: `src/stories/sections/mcl-header/mcl-header-a/headerA.stories.ts` (`MclHeaderAMobileOpened` from `MclHeaderAExample`)
- Modify: `src/stories/sections/mcl-header/mcl-header-b/headerB.stories.ts` (`MclHeaderBMobileOpened` from `MclHeaderBExample`)

**Interfaces:**

- Consumes: the `Opened` story pattern from Task 3.

- [ ] **Step 1: Add `MclSelectOpened`**

The `play` function clicks the combobox, then `await screen.findByRole('listbox')` is visible.

- [ ] **Step 2: Add the two mobile header stories**

Set `globals: { viewport: { value: 'mobile', isRotated: false } }`. The `play` function first asserts that the nav drawer button is visible (Review Focus 5), clicks it, and awaits the first nav link inside the drawer. For `MclHeaderA`, it also opens the first nav item that has children and awaits a child link.

If the button isn't visible because the viewport global isn't applied in browser mode, drop the `play` function. In that case, set the story's `parameters.docs.description.story` to "Mobile drawer not reachable in the test viewport; covered by source review", and note it for Task 7.

- [ ] **Step 3: Run them**

Run: `pnpm test:storybook src/stories/components/mcl-forms src/stories/sections/mcl-header`
Expected: the new stories pass and report a11y results. The `MclHeaderB` drawer is teleported, so this confirms the Task 1 context setting covers it: violations inside the drawer, if any, are listed.

- [ ] **Step 4: Run the whole suite and commit**

Run: `pnpm test:storybook && pnpm test`
Expected: 0 failures in both.

```bash
pnpm format
git add src/stories
git commit -m "test: scan opened MclSelect listbox and mobile header drawers"
```

---

### Task 6: Open the setup PR

- [ ] **Step 1: Ask the maintainer to approve pushing and opening the PR.** Wait for a yes.

- [ ] **Step 2: Push the branch and open the PR**

Push `feat/a11y-storybook-tests` and open a PR against `master`:

- **Title:** `test: Storybook accessibility tests (addon-vitest + axe)`.
- **Body:** what runs, the global `'todo'` level, contrast off, how to promote a package to `'error'`, and a link to the spec. End with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

- [ ] **Step 3: Watch CI**

Run: `gh pr checks --watch`
Expected: `ci` passes. Compare the "Test stories" step's time with Task 1 Step 6. If the job is close to 30 minutes, report back before changing anything.

---

### Task 7: Collect and triage the axe results

**Files:**

- Create (scratchpad): `$AUDIT/axe.json` and `$AUDIT/axe-triage.md`

**Interfaces:**

- Produces: `$AUDIT/axe-triage.md`, with one row per violation node: `package | component | story | rule id | impact | target selector | source (component | story) | file:line`. Task 8 merges these rows into its findings.

- [ ] **Step 1: Export the results**

Run: `pnpm test:storybook --reporter=json --outputFile=$AUDIT/axe.json`

If the `todo` violations aren't in the JSON, temporarily change the global `a11y.test` to `'error'` (don't commit), rerun, and take the violations from the failure messages. Then run `git checkout .storybook/preview.ts`.

- [ ] **Step 2: Trace each violation to where it comes from**

For each violation node, open the story's render and the component. Mark it `component` if the offending markup comes from `src/components/**`, or `story` if it comes from `src/stories/**` example markup. Map stories to packages by their `title` prefix and import path. Base components, directives and utility classes belong to `manguito-theme`.

Collapse duplicates: the same rule on the same component element across several stories becomes one row, listing all the stories. Also add every `// a11y:` comment left in Tasks 3–5 as a row with source `review`.

---

### Task 8: Source review of every component

**Files:**

- Create (scratchpad): `$AUDIT/findings/<package>.md`, one file for each of the 11 packages

**Interfaces:**

- Consumes: `$AUDIT/axe-triage.md` (Task 7).
- Produces: each findings file in issue-body form:
  - **Heading:** `## Summary` with 2–3 lines.
  - **Component sections:** `## <Component>`, each containing `- [ ] **<impact>** · WCAG <sc> · \`<file>:<line>\` · <axe rule id | review> — <what's wrong>. Fix: <direction>`.
  - **Story fixes:** an optional `## Story fixes` section with the same line format and `source: story`.
  - **Closing line:** `Done when: all boxes are checked and this package's stories set \`a11y: { test: 'error' }\`.`

  The four impact levels:
  - **critical:** a feature can't be used with a keyboard or screen reader.
  - **serious:** a missing name or role, or focus that's lost or trapped.
  - **moderate:** wrong semantics or structure.
  - **minor:** best-practice gaps.

- [ ] **Step 1: Review each package against the checklist**

Read every `.vue` file under `src/components/<package>/lib/` (skip `__tests__` and `assets/` icon components unless they render focusable markup). For `manguito-theme`, also review the directives `vTooltip` and `vClickOutside` in `lib/directives/`, and the `.btn`, link and list utility classes in `mcl-theme-v4.css`. Leave out the deprecated `vToggle`/`vCollapse` and only mention them in the summary as deprecated, naming `useCollapseState`/`AccordionGroup` and the template-ref `openModal()`/`closeModal()` as the replacements.. Check them against spec Decision 5, covering all of these:

- element choice: every `@click` on a non-interactive element
- name, role and state
- keyboard (APG patterns for tabs, menu and listbox)
- focus (visible, order, trap and return)
- structure (headings, landmarks, labelled `<nav>`s, lists)
- images and alt text
- link purpose, and links that open a new tab
- motion and reduced motion
- 2.5.8 target size
- status messages
- unique IDs that stay stable between server and client renders
- the Phase 4 stale `aria-expanded` limitation

Merge in the Task 7 rows for that package. Drop axe rows that turn out to be false positives on reading the code, and note why in `$AUDIT/axe-triage.md`.

- [ ] **Step 2: Cross-reference open issues**

Run: `gh issue view 50; gh issue view 64; gh issue view 65; gh issue view 81; gh issue view 126`
For each finding those issues already cover, replace the finding with `- [ ] See #<n> (<one line>)`.

- [ ] **Step 3: Check the findings against the known bug**

Run: `grep -n "MclCardC" $AUDIT/findings/mcl-cards.md`
Expected: a **critical** finding covering:

- WCAG 2.1.1 / 4.1.2, at `src/components/mcl-cards/lib/mcl-card-c/MclCardC.vue`, on the clickable root `<div>`: no keyboard access, and no role or state for the flip.
- the `opacity-0` content still being announced before the flip.
- a fix direction of a `<button>` or disclosure with `aria-expanded`, keyboard activation of `card-click`, and content hidden until the card flips.

The `mcl-cards` "Done when" line also requires a `play` test that tabs to Card C and activates it with Enter and Space. If the finding is missing, the review failed. Redo `mcl-cards` before continuing.

---

### Task 9: Draft review, then file the issues

- [ ] **Step 1: Show the drafts**

Give the maintainer:

- the path to `$AUDIT/findings/`
- a table of packages with finding counts by impact
- a list of the packages with no findings (they get no issue)
- any findings you're unsure of

Ask for approval to create the `accessibility` label and file the issues. Wait for a yes, and apply any edits.

- [ ] **Step 2: Create the label**

Run: `gh label create accessibility --color 1D76DB --description "Accessibility (WCAG) problems and improvements"`
Expected: the label is created. If it already exists, skip this step.

- [ ] **Step 3: File one issue per package with findings**

For each package with findings, run:
`gh issue create --title "[a11y] <package>: accessibility audit findings" --label accessibility --label bug --body-file $AUDIT/findings/<package>.md`
Expected: an issue URL for each. Collect them.

- [ ] **Step 4: Report back**

Give the maintainer the list of issue URLs with finding counts, and the packages with no findings. Add a reminder that the setup PR (Task 6) still needs their merge.
