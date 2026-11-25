# Storybook accessibility tests and library-wide accessibility audit

## Intent

Several packages have had nothing but dependency bumps for a long time, and an accessibility problem turned up while the library was in use in another project: `MclCardC` can't be reached or operated with a keyboard. This is a maintenance pass. It finds the accessibility problems in every component across all 11 packages and files them as GitHub issues, one per package, so each package's fixes become their own piece of work.

The MCL-82 audit (`docs/mcl-82/audit/01-accessibility.md`) covered only Modal, Sidebar, Collapse, Tooltip, Dropdown, Tabs and `mcl-forms`, and Phase 4 fixed most of what it found. Cards, heroes, containers, the footer, the headers, the carousel and Alert have never been audited.

The automated part of the audit is set up as a permanent check, not a one-off script. Each story becomes an accessibility test through `@storybook/addon-vitest`, so once a package is fixed it stays fixed.

The work comes in three stages:

1. **Setup PR.** Story-level axe tests run in Vitest browser mode, locally and in CI, without failing on today's violations.
2. **Audit.** The axe results plus a checklist review of each component's source.
3. **Issues.** One issue per package that has findings, filed after the maintainer reviews the drafts.

## Goals

- Every Storybook story runs an axe check headless in Chromium: locally with one command, and in CI on every PR.
- Existing violations are reported without failing CI (`a11y.test: 'todo'`). A package's stories can later be switched to `'error'` so regressions fail the build.
- Content that only appears once something is opened (dialogs, menus, panels, listboxes, tooltips) gets scanned too, not just each story's starting state.
- Every component in every package gets audited against WCAG 2.2 AA, apart from color contrast.
- Findings are grouped by package and filed as GitHub issues that can be acted on: what's wrong, where (`file:line`), which WCAG success criterion, how severe, how it was found, and a suggested direction for the fix.
- Every finding in the issues has been checked against the component's code. Anything from axe that turns out to come from story markup is filed separately (see Decision 11).

## Non-goals

- **Fixing anything.** The issues are the deliverable, and fixes are separate work.
- **Color contrast.** Consumers set colors through props, so WCAG 1.4.3 and 1.4.6 are out, along with the color-dependent parts of 1.4.11. The axe `color-contrast` rule is turned off. The shape and presence of a focus indicator stay in scope, since those aren't a color choice.
- **Testing with real screen readers** (NVDA, JAWS, VoiceOver). That can't be done in this environment. The maintainer may spot-check afterwards.
- **A Nuxt or server-rendered sandbox.** It was considered and dropped. Where it matters, ID stability between the server and client renders is reviewed in the source instead.
- **The deprecated directives `vToggle` and `vCollapse`.** Their stories are still scanned, but their findings aren't filed. The issue notes that they're deprecated and names the replacement.

## Anti-goals

- Merging the setup PR turns CI red, or makes CI noticeably flaky.
- Issues full of unverified axe output or false positives. Every finding in an issue has been checked by reading the component.
- Duplicating existing issues: #64 (Tooltip refactor), #65 (mcl-input refactor), #50 (update old components), #81 and #126 (theme). Overlapping findings link to those issues instead of repeating them.
- Making `pnpm test` require a browser install for everyday unit-test work.

## Constraints

- **Versions.** Storybook 10.5 (`@storybook/vue3-vite`) with `@storybook/addon-a11y` already installed, and Vitest 4.1. In Vitest 4, browser mode uses a separate provider package (`@vitest/browser-playwright`), plus `playwright` itself.
- **Root Vitest config.** `vitest.config.ts` uses the `projects` API, and the Storybook test project is added there. Stories import package source through the `@/` alias and workspace resolution, so the project has to use the existing `.storybook` Vite setup. The `storybookTest` plugin handles that.
- **Storybook background.** `.storybook/preview.ts` sets a dark background by default. With contrast checks off, this doesn't affect axe results.
- **Protected branch.** `master` only accepts pull requests that pass the `ci` check. The CI job name `ci` must not change (see the comment in `ci.yml`). The job's timeout is 30 minutes.
- **No changeset needed.** The setup PR only touches root config, stories, CI and docs, not any published package.
- **Browser and viewport.** Tests run in Chromium. The viewport is whatever size the browser provider uses, so anything that only appears at mobile widths needs an explicit viewport in the test (see "Left to the builder").
- **Outward-facing steps need sign-off.** Creating labels and filing issues happen only after the maintainer has seen the drafts.

## Approaches considered

|       | Approach                                                                                                                    | Trade-off                                                                                                                                                                                                     |
| ----- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | Throwaway Playwright + `@axe-core/playwright` script in a Docker container, run against the static Storybook build          | Nothing changes in the repo. But it's a one-off: once fixed, problems can come back unnoticed.                                                                                                                |
| **B** | **`@storybook/addon-vitest`: every story becomes a Vitest browser test, and the a11y addon's axe check runs as part of it** | **The common practice for component libraries, and what Storybook recommends. It stays in the repo as a regression check. Costs: a Playwright dev dependency, a Chromium install in CI, and longer CI runs.** |
| C     | Click through the a11y panel by hand                                                                                        | No setup. Slow, error-prone, nothing reusable.                                                                                                                                                                |

**Chosen: B (maintainer's pick).** It's the widely used practice, and it gives every package issue a concrete "done": switch that package's stories to `a11y.test: 'error'`. A Nuxt sandbox was also considered and dropped (see Non-goals).

## Decisions

The maintainer decided:

- Use Storybook rather than a Nuxt sandbox.
- Use approach B, the permanent Storybook + Vitest integration.
- Leave color contrast out of scope.
- File one GitHub issue per package.

My calls (open to correction):

1. **Global a11y parameters** in `.storybook/preview.ts`:
   ```ts
   a11y: {
     test: 'todo',
     config: { rules: [{ id: 'color-contrast', enabled: false }] },
   }
   ```
2. **Separate test command.** A new root script, `pnpm test:storybook`, runs only the Storybook project. `pnpm test` keeps its current scope and needs no browser (for example via `--project` filtering or a separate config file; the builder picks the mechanism).
3. **CI.** In the `ci` job, after "Build Storybook": install Chromium (`pnpm exec playwright install --with-deps chromium`, cached if that's easy), then run `pnpm test:storybook`. It passes as long as violations stay at `todo`.
4. **Opened states get their own stories.** Instead of adding `play` functions to existing stories (which would change what the Docs page shows), add stories such as `Opened` whose `play` function opens the component. Then the a11y check scans the opened DOM. Targets:
   - Modal and Sidebar (base)
   - DropdownContainer and MclDropdownA
   - Collapse (base), MclCollapseA and MclCollapseB
   - TabContainer and MclTabsA: activate a non-default tab
   - MclHeaderA and MclHeaderB: open the nav drawer at mobile width, and open a nav dropdown or collapse
   - MclSelect: open the listbox
   - The tooltip directive: show it on focus
5. **Audit checklist.** These go beyond axe, are checked per component, and each maps to a WCAG 2.2 AA success criterion:
   - Correct element choice (every `@click` on a non-interactive element is checked, since axe can't see it): a `<button>` for actions, an `<a href>` for navigation, no clickable `div`s (4.1.2, 2.1.1).
   - Accessible name, role and state on every interactive element, including icon-only controls (4.1.2, 1.1.1).
   - Keyboard: every control is reachable and works with Tab, Enter or Space, and Escape. Composite widgets (tabs, menus, listbox) follow the arrow-key behavior of the matching WAI-ARIA Authoring Practices pattern, or the issue explains why not (2.1.1, 2.1.2).
   - Focus: visible, in a sensible order, trapped in modal dialogs and returned on close, and not lost when content is removed (2.4.3, 2.4.7, 2.4.11).
   - Structure: heading levels can be configured or are sensible rather than hard-coded, landmarks are used correctly and multiple `<nav>`s have labels, lists are marked up as lists (1.3.1, 2.4.6).
   - Images: informative images require alt text, decorative ones can have empty alt, and background images carrying meaning have a text alternative (1.1.1).
   - Links: the purpose is clear, and links that open a new tab say so (2.4.4).
   - Motion and time: the carousel or any auto-advancing content can be paused, and animations respect `prefers-reduced-motion` (2.2.2, 2.3.3 as best practice).
   - Target size of at least 24×24 CSS px, or the spacing exception applies (2.5.8).
   - Status and error messages are announced (4.1.3).
   - IDs used for ARIA references are unique per instance and stable between the server and client renders (4.1.2, the `useId` pattern).
   - Phase 4's known limitation (a stale `aria-expanded` on accordion siblings) is re-checked.
6. **`mcl-cards` gets extra attention, starting with the known `MclCardC` problem.** `MclCardC` is a clickable `<div>`: it has no `tabindex`, no role and no key handler, so keyboard users can't reach it or flip it. Clicking works in two steps: the first click flips the card to show its image and body, and the second emits `card-click`. While the card is unflipped, that content is only at `opacity-0`, so screen readers still announce it. axe can't detect any of this, because it doesn't see click handlers. So the known problem is the test of the source review: the `mcl-cards` issue must contain it as a critical finding (2.1.1, 4.1.2). Its fix direction is a real `<button>` (or disclosure pattern) with `aria-expanded` for the flip, keyboard activation of `card-click`, and hidden content kept out of the accessibility tree until the card flips. The issue's "Done when" also asks for a `play` interaction test that tabs to the card and activates it with Enter and Space. The other three cards get the same review (heading levels, image alt, whole-card links, nested interactive elements, and any other click handlers on non-interactive elements).
7. **Severity** uses axe's impact levels (critical / serious / moderate / minor) for both axe and review findings, so there's one scale.
   - **Critical:** a feature can't be used with a keyboard or screen reader.
   - **Serious:** missing name or role, focus lost or trapped.
   - **Moderate:** wrong semantics or structure.
   - **Minor:** best-practice gaps.
8. **Issue format.**
   - **Title:** `[a11y] <package>: accessibility audit findings`.
   - **Labels:** `accessibility` (a new label, created after sign-off) and `bug`.
   - **Body:** a short summary, then findings grouped by component. Each finding is a checkbox line with severity, WCAG success criterion, `file:line`, source (axe rule id or "review"), what's wrong and a suggested fix direction.
   - **Closing line:** "Done when: all boxes checked and this package's stories set `a11y: { test: 'error' }`."
   - Packages with no findings get no issue and are listed in the hand-off summary.
   - Base-component, directive and utility-class findings go in the `manguito-theme` issue.
9. **Order.** First the setup PR is opened. The audit then runs on that branch without waiting for the merge. Issue drafts are written to the scratchpad and shown to the maintainer. Only then are the label created and the issues filed.
10. **No audit report is committed.** The issues are the record. Raw axe output stays in the scratchpad.
11. **Violations that come from story markup rather than the library.** Many base-component stories fill slots with hand-written markup, such as `<a href="#" @click>` links, images and trigger buttons. Every axe violation is traced to its source:
    - If it comes from **component code**, it's a normal finding.
    - If it comes from **story or example markup**, it goes in a separate "Story fixes" section of that package's issue, marked `source: story`. Stories serve as usage docs that consumers copy, so they're fixed in the same work, and they're part of "Done when".
    - **Non-component stories** (the theme demos under `Base/theme`, the utility-class demos for button, link and list, and the deprecated `vToggle`/`vCollapse` directive stories) are set to `a11y: { test: 'off' }` in the setup PR. They're not filed, and they don't block any package from switching to `'error'`. The button, link and list utility classes still get a source review as part of `manguito-theme`.

## Left to the builder

- The exact package versions and setup: the `storybook add @storybook/addon-vitest` output versus a manual setup, and the Vitest browser provider config.
- How `pnpm test` excludes the Storybook project.
- How to set a mobile viewport for the header `Opened` stories in browser mode. If it isn't possible, those states are covered by the source review and the story notes it.
- How to collect `todo` violations into a readable form (a JSON reporter, or reading the a11y results from the test output).
- CLAUDE.md "Testing" section: document `pnpm test:storybook` and the `a11y.test` levels. Optionally a short note in CONTRIBUTING.md.
