# Two-Tone Keyboard Focus Ring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the button-coloured focus rings on `.btn`, the `mcl-forms` controls and the `MclCarouselA` arrows with one two-tone, keyboard-driven focus ring that apps can recolour, and make the textarea highlight bar sit flush at any font size.

**Architecture:** One Tailwind `@utility mcl-focus-ring` in `mcl-theme-v4.css` (3px outline + 2px halo box-shadow, both from CSS variables). `.btn` applies the same ring on `:focus-visible`; components add the utility through Tailwind variants (`focus-visible:`, `peer-focus-visible:`, `has-[input:focus-visible]:`). Theme CSS is tested by compiling it with Tailwind's `compile()` in Node; components by class-string tests in jsdom; the visual result in headless Chrome against the built Storybook.

**Tech Stack:** Vue 3 SFCs, Tailwind CSS 4.1 (`tailwindcss` `compile` API), Vitest (projects), @vue/test-utils, headless Chrome.

**Spec:** `docs/superpowers/specs/2026-11-14-focus-ring-design.md`

## Global Constraints

- Utility name `mcl-focus-ring`; variables `--mcl-focus-color` (outline) and `--mcl-focus-halo` (halo), defaulting to the theme's `dark-3` (`#1f2937`) and `light-1` (`#fafafa`) colours.
- Ring geometry: `outline: 3px solid`, `outline-offset: 2px`, halo `0 0 0 2px` box-shadow (fills exactly the 2px offset gap). The contrast-carrying part is the outline (survives forced colors).
- Ring follows `:focus-visible` everywhere. No JavaScript input-modality tracking.
- `btn-no-ring` stays a valid class but must not hide the keyboard ring.
- Public API stays: `generateClass.ringColorVariant`, `focusVisibleRingColorVariant`, `peerFocusVisibleRingColorVariant` remain exported.
- Out of scope: `MclFooterA`/`SocialIcons`, `NavDrawer`, tabs, `MclInputFile` (keeps native outlines).
- Changesets: `@bobbykim/manguito-theme` minor; `@bobbykim/mcl-forms` minor; `@bobbykim/mcl-carousel` minor. The forms and carousel summaries open with: "Requires `@bobbykim/manguito-theme` 1.6.0 or later CSS (`mcl-theme-v4.css`); with an older theme CSS, focus rings on these components do not compile."
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Work on branch `feat/122-focus-ring`; never push to `master`.

## Review Focus

1. **Hovering a focused button** (`.btn`, `.btn-invert`, `.btn-progress`): the ring must keep `--mcl-focus-color`. Today `.btn:hover`, `.btn.btn-invert:hover` and `.btn.btn-progress:hover` set `outline-color`, and `.btn.btn-invert:hover` outranks `.btn:focus-visible`. Task 1 test: no `.btn` rule other than the focus-visible one sets `outline-color`.
2. **Element with no shadow utility** (a `.btn`, a toggle's span): the halo must still render when Tailwind's `--tw-*-shadow` variables are undefined in the app's CSS. Task 1 test: the box-shadow composition uses fallbacks (`var(--tw-shadow, 0 0 #0000)` etc.); Task 7 browser check on a `.btn`.
3. **Text input with `outline-none` in its base classes:** `focus-visible:mcl-focus-ring` must win. Task 1 test: in the compiled CSS the `focus-visible:mcl-focus-ring` rule comes after `.outline-none`.
4. **Focused text input with `shadow-md`:** its drop shadow must survive alongside the halo. Task 7 browser check: computed `box-shadow` of a focused default `MclInputText` contains both the halo and the `shadow-md` layers.
5. **`btn-no-ring` reached by keyboard:** shows the ring. Task 1 test (no `outline: none` on `.btn.btn-no-ring`), Task 7 browser check.

---

### Task 1: Theme focus ring (`mcl-theme-v4.css`)

**Files:**

- Modify: `src/components/manguito-theme/lib/style/mcl-theme-v4.css` (`.btn` block ~lines 284–420; utilities after `@utility mcl-outline-*` ~line 562)
- Create: `src/components/manguito-theme/lib/style/__tests__/compileTheme.ts`
- Test: `src/components/manguito-theme/lib/style/__tests__/focusRing.test.ts`

**Interfaces:**

- Produces: utility class `mcl-focus-ring`, usable with any Tailwind variant; CSS variables `--mcl-focus-color`, `--mcl-focus-halo`; `.btn:focus-visible` ring.
- Produces (test helper): `buildThemeCss(candidates: string[]): Promise<string>` in `compileTheme.ts` — compiles `@import 'tailwindcss';` + the theme file with `require('tailwindcss').compile(css, { base, loadStylesheet })` (load `tailwindcss/index.css` for the import) and returns `build(candidates)`. Proven to work in Node with tailwindcss 4.1.18.

- [ ] **Step 1: Write the failing tests** (`// @vitest-environment node`)

```ts
it('mcl-focus-ring: 3px outline at 2px offset in --mcl-focus-color, 2px halo in --mcl-focus-halo', async () => {
  const css = await buildThemeCss(['focus-visible:mcl-focus-ring'])
  const rule = ruleFor(css, '.focus-visible\\:mcl-focus-ring:focus-visible')
  expect(rule).toMatch(/outline:\s*3px solid var\(--mcl-focus-color,/)
  expect(rule).toMatch(/outline-offset:\s*2px/)
  expect(rule).toMatch(/0 0 0 2px var\(--mcl-focus-halo,/)
  // Review Focus 2: composes with existing shadows, with fallbacks when none is set
  expect(rule).toMatch(/var\(--tw-shadow,\s*0 0 #0000\)/)
})
it('defaults resolve to the theme dark-3 and light-1 tokens', async () => {
  const css = await buildThemeCss(['focus-visible:mcl-focus-ring'])
  expect(css).toMatch(/--mcl-focus-color,\s*var\(--color-dark-3\)/)
  expect(css).toMatch(/--mcl-focus-halo,\s*var\(--color-light-1\)/)
  expect(css).toMatch(/--color-dark-3:/) // the token is emitted
})
it('works through the variants the components use', async () => {
  const css = await buildThemeCss([
    'peer-focus-visible:mcl-focus-ring',
    'has-[input:focus-visible]:mcl-focus-ring',
  ])
  expect(css).toContain(':has(input:focus-visible)')
  expect(css).toMatch(/\.peer:focus-visible ~/)
})
it('Review Focus 3: focus-visible ring is emitted after outline-none', async () => {
  const css = await buildThemeCss([
    'outline-none',
    'focus-visible:mcl-focus-ring',
  ])
  expect(css.indexOf('.focus-visible\\:mcl-focus-ring')).toBeGreaterThan(
    css.indexOf('.outline-none'),
  )
})
it('.btn rings on :focus-visible, not :focus', async () => {
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
it('Review Focus 1: only the focus-visible rule sets a .btn outline colour', async () => {
  const css = await buildThemeCss([
    'btn',
    'btn-invert',
    'btn-progress',
    'btn-warning',
  ])
  const offenders = rulesMatching(css, /^\.btn/).filter(
    (r) =>
      /outline-color/.test(r.body) && !r.selector.includes(':focus-visible'),
  )
  expect(offenders).toEqual([])
})
it('Review Focus 5: btn-no-ring does not remove the keyboard ring', async () => {
  const css = await buildThemeCss(['btn', 'btn-no-ring'])
  expect(css).not.toMatch(/\.btn\.btn-no-ring\s*\{[^}]*outline:\s*none/)
})
```

`ruleFor(css, selector)` and `rulesMatching(css, re)` are small helpers in the test file that return a rule's declaration block / `{selector, body}` pairs (regex over the compiled CSS is fine).

- [ ] **Step 2: Run to verify they fail**

Run: `pnpm exec vitest run --project manguito-theme focusRing`
Expected: FAIL — no `mcl-focus-ring` rule; `.btn:focus` present; `.btn.btn-no-ring { outline: none }` present.

- [ ] **Step 3: Implement in `mcl-theme-v4.css`**
  - `@utility mcl-focus-ring`: `outline: 3px solid var(--mcl-focus-color, var(--color-dark-3)); outline-offset: 2px; --tw-ring-offset-shadow: 0 0 0 2px var(--mcl-focus-halo, var(--color-light-1)); box-shadow:` Tailwind's composite order (`--tw-inset-shadow`, `--tw-inset-ring-shadow`, `--tw-ring-offset-shadow`, `--tw-ring-shadow`, `--tw-shadow`), each with a `0 0 #0000` fallback.
  - `.btn`: drop `outline-color: var(--mcl-btn-color…)` from `.btn`, `.btn:hover`, `.btn.btn-invert:hover`, `.btn.btn-progress:hover/:focus`; replace `.btn:focus` with `.btn:focus-visible` carrying the ring (`@apply mcl-focus-ring` or the same declarations; builder's call); drop `outline-*` from `.btn`'s `transition-property`.
  - Move `.btn.btn-progress:focus`, `…:focus::before`, `.btn-progress-r:focus::before` and `.btn-group .btn:focus` to `:focus-visible`.
  - `.btn.btn-no-ring`: leave the rule empty with a `/* deprecated (#122): no longer hides keyboard focus */` comment, or remove it.

- [ ] **Step 4: Run to verify they pass**

Run: `pnpm exec vitest run --project manguito-theme focusRing` → PASS. Then `pnpm exec vitest run --project manguito-theme` → all pass.

- [ ] **Step 5: Commit** — `feat(manguito-theme): two-tone keyboard focus ring for .btn and mcl-focus-ring utility`

---

### Task 2: Form surfaces and toggles (`mcl-forms`)

**Files:**

- Modify: `src/components/mcl-forms/lib/common/useInputSurface.ts`, `src/components/mcl-forms/lib/common/useToggleControl.ts`
- Test: `common/useInputSurface.test.ts`, `common/useToggleControl.test.ts`, `mcl-input-text/MclInputText.test.ts` (~line 83), `mcl-checkbox/MclCheckbox.test.ts` (~line 35)

**Interfaces:**

- Consumes: `mcl-focus-ring` (Task 1).
- Produces: `useInputSurface(...)` class string now always contains `focus-visible:mcl-focus-ring` in the slot where the ring classes were (after border, before shadow); `useToggleControl(...).boxClass` contains `peer-focus-visible:mcl-focus-ring` in place of `peer-focus-visible:ring-2 ring-offset-2 peer-focus-visible:ring-<borderColor>`. Function signatures unchanged.

- [ ] **Step 1: Update the tests to the new contract**
  - `useInputSurface`: all-flags-off → `'mcl-bg-light-1 text-black focus-visible:mcl-focus-ring'`; showBorder → `'mcl-bg-light-1 text-black border-2 border-light-4 focus-visible:mcl-focus-ring'`; replace "adds the focus-visible ring only when showHighlight is false" with "always adds the focus ring, with or without the highlight bar" (both contain `focus-visible:mcl-focus-ring`, neither contains `ring-4`, `ring-offset-2` or `focus-visible:ring-light-4`).
  - `useToggleControl`: exact string `'mcl-bg-light-1 border-dark-1 before:bg-dark-3 peer-checked:bg-warning peer-focus-visible:mcl-focus-ring'`; the WCAG test asserts `peer-focus-visible:mcl-focus-ring` and no `ring-dark-1`.
  - `MclInputText`: "uses the focus ring with and without the highlight bar" — input classes contain `focus-visible:mcl-focus-ring` for `showHighlight: true` and `false`; no `focus-visible:ring-primary`.
  - `MclCheckbox`: span classes contain `peer-focus-visible:mcl-focus-ring`.
  - Add the same `peer-focus-visible:mcl-focus-ring` assertion to `MclInputRadio.test.ts` and `MclInputSwitch.test.ts` if they assert a ring today.

- [ ] **Step 2: Run to verify they fail** — `pnpm exec vitest run --project mcl-forms` → the updated tests FAIL on the old ring classes.

- [ ] **Step 3: Implement** — in `useInputSurface` drop the `if (!showHighlight)` ring branch and `focusVisibleRingColorVariant`, always push `'focus-visible:mcl-focus-ring'` (drop the `ring-offset-2 transition-all duration-300 ease-linear` that came with the old ring); update the `showHighlight` doc comment (the bar no longer decides the ring). In `useToggleControl` replace the two ring entries with `'peer-focus-visible:mcl-focus-ring'` and keep its comment about the transparent native input.

- [ ] **Step 4: Run to verify they pass** — `pnpm exec vitest run --project mcl-forms` → PASS.

- [ ] **Step 5: Commit** — `feat(mcl-forms): use the shared focus ring on inputs and toggles`

---

### Task 3: `MclSelect` ring placement

**Files:**

- Modify: `src/components/mcl-forms/lib/mcl-select/MclSelect.vue` (visible box `:class` ~lines 287–295; clear button ~line 319)
- Test: `src/components/mcl-forms/lib/mcl-select/MclSelect.test.ts`

**Interfaces:**

- Consumes: `useInputSurface` (Task 2), `mcl-focus-ring` (Task 1).

- [ ] **Step 1: Write the failing tests**

```ts
it('rings the visible box when its text input has keyboard focus', () => {
  const box = mount(MclSelect, {
    props: { id: 'colour', options: OPTIONS },
  }).find('[role="combobox"]').element.parentElement!
  expect(box.className).toContain('has-[input:focus-visible]:mcl-focus-ring')
})
it('gives the clear button its own focus ring', async () => {
  const w = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
  await w.find('[role="combobox"]').setValue('re')
  expect(w.find('[data-mcl="clear"]').classes()).toContain(
    'focus-visible:mcl-focus-ring',
  )
})
it('no longer adds a border-coloured ring while open without the highlight bar', async () => {
  const w = mount(MclSelect, {
    props: { id: 'colour', options: OPTIONS, showHighlight: false },
  })
  await w.find('[role="combobox"]').trigger('focus')
  const box = w.find('[role="combobox"]').element.parentElement!
  expect(box.className).not.toMatch(/\bring-4\b|ring-light-4/)
})
```

- [ ] **Step 2: Run to verify they fail** — `pnpm exec vitest run --project mcl-forms MclSelect` → FAIL.
- [ ] **Step 3: Implement** — add `has-[input:focus-visible]:mcl-focus-ring` to the visible box's static classes; delete the `!showHighlight && isOpen && …ringColorVariant… + ' ring-4'` entry; add `focus-visible:mcl-focus-ring` to the clear button's classes. Leave the caret button (`tabindex="-1"`).
- [ ] **Step 4: Run to verify they pass** — `pnpm exec vitest run --project mcl-forms` → PASS.
- [ ] **Step 5: Commit** — `feat(mcl-forms): ring MclSelect's box and clear button, drop its open-state ring`

---

### Task 4: Textarea highlight alignment

**Files:**

- Modify: `src/components/mcl-forms/lib/mcl-text-area/MclTextArea.vue`, `src/components/mcl-forms/lib/common/InputHighlight.vue`
- Test: `src/components/mcl-forms/lib/mcl-text-area/MclTextArea.test.ts`

**Interfaces:**

- Produces: `InputHighlight` props become `{ color?: ColorPalette; rounded?: boolean }` (the `offset` prop and `OffsetType` are removed; the bar always uses `-top-1`). `InputHighlight` is internal (not exported from `lib/index.ts`).

- [ ] **Step 1: Write the failing tests**

```ts
it('renders the textarea as a block so no baseline gap sits under it', () => {
  expect(mount(MclTextArea).find('textarea').classes()).toContain('block')
})
it('pulls the highlight bar up by the same 4px as text inputs', () => {
  const bar = mount(MclTextArea).find('textarea').element.nextElementSibling!
  expect(bar.className).toContain('-top-1')
  expect(bar.className).not.toContain('-top-2.5')
})
```

- [ ] **Step 2: Run to verify they fail** — `pnpm exec vitest run --project mcl-forms MclTextArea` → FAIL.
- [ ] **Step 3: Implement** — add `block` to the textarea's static classes; remove `:offset="2.5"`; in `InputHighlight` remove `offset`, `OffsetType` and `offsetOptions`, and always push `-top-1`.
- [ ] **Step 4: Run to verify they pass** — `pnpm exec vitest run --project mcl-forms` → PASS; `pnpm typecheck` → clean.
- [ ] **Step 5: Commit** — `fix(mcl-forms): align the textarea highlight bar at any font size`

---

### Task 5: Carousel arrows (`mcl-carousel`)

**Files:**

- Create: `src/components/mcl-carousel/vitest.config.ts` (mirror `src/components/mcl-header/vitest.config.ts`: `name: 'mcl-carousel'`, jsdom, `lib/**/*.test.ts`, alias `@bobbykim/manguito-theme` → `../manguito-theme/lib/index.ts`)
- Modify: `src/components/mcl-carousel/package.json` (scripts `"test": "vitest run"`, `"test:watch": "vitest"`), root `vitest.config.ts` (add `'./src/components/mcl-carousel'` to `projects`), `CLAUDE.md` (add `mcl-carousel` to the `pnpm test` project list), `src/components/mcl-carousel/lib/mcl-carousel-a/MclCarouselA.vue` (`navBtnClass` ~line 108; button classes ~lines 148 and 169)
- Test: `src/components/mcl-carousel/lib/mcl-carousel-a/MclCarouselA.test.ts`

**Interfaces:**

- Consumes: `mcl-focus-ring` (Task 1).

- [ ] **Step 1: Write the failing test**

```ts
it('gives both navigation buttons the shared keyboard focus ring', () => {
  const w = mount(MclCarouselA, {
    props: { title: 'Fruit', content: [1, 2, 3] },
  })
  for (const label of ['previous', 'next']) {
    const cls = w.find(`button[aria-label="${label}"]`).classes()
    expect(cls).toContain('focus-visible:mcl-focus-ring')
    expect(cls.join(' ')).not.toMatch(
      /focus:ring-4|focus:outline-none|ring-offset|ring-light-4/,
    )
  }
})
```

(Provide whatever slot or `content` shape `MclCarouselA` needs to render its arrows; check its stories.)

- [ ] **Step 2: Run to verify it fails** — `pnpm exec vitest run --project mcl-carousel` → FAIL (old ring classes present).
- [ ] **Step 3: Implement** — remove `ringColorVariant` from `navBtnClass` (update its comment: the focus ring is the shared one, not the button colour); in both buttons replace `ring-offset-2 ring-offset-inherit` and `focus:ring-4 focus:outline-none` with `focus-visible:mcl-focus-ring`.
- [ ] **Step 4: Run to verify it passes** — `pnpm exec vitest run --project mcl-carousel` → PASS; `pnpm test` → all projects pass.
- [ ] **Step 5: Commit** — `feat(mcl-carousel): use the shared focus ring on the arrows`

---

### Task 6: Docs, examples and changesets

**Files:**

- Modify: `src/stories/Base/utility-class/Button.mdx` (new "Focus" section; "Button with no ring on focus" section becomes a deprecation note), `src/components/manguito-theme/README.md` (theming section: `--mcl-focus-color`, `--mcl-focus-halo`, `mcl-focus-ring`), forms and carousel MDX under `src/stories` (one line each on the ring and variables), and remove `btn-no-ring` from `src/stories/Base/utility-class/button-class/Button.vue`, `src/stories/Base/base-component/tabs/TabExample.vue`, `tabs/TabExample2.vue`, `collapse/Collapse.vue`, `collapse/CollapseRef.vue`, `collapse/CollapseAccordion.vue`
- Create: `.changeset/focus-ring-theme.md` (`@bobbykim/manguito-theme`: minor), `.changeset/focus-ring-forms.md` (`@bobbykim/mcl-forms`: minor), `.changeset/focus-ring-carousel.md` (`@bobbykim/mcl-carousel`: minor)

Content the docs must carry:

- The ring shows for keyboard focus (and on any focus in text fields); clicks on buttons, toggles and arrows show none.
- Override example: `.dark { --mcl-focus-color: #f1ac18; }`; variables cascade to a section or a single control; `mcl-focus-ring` can go on an app's own controls (`focus-visible:mcl-focus-ring`).
- `btn-no-ring`: deprecated; no longer hides keyboard focus.

Changeset summaries: the theme one lists the new utility and variables, the neutral two-tone ring replacing the button-coloured one, no ring after clicks, `btn-no-ring` deprecated and no longer hiding keyboard focus. The forms one opens with the "Requires … 1.6.0" sentence (Global Constraints), then: every focused field and toggle shows the ring (text fields also on click), the highlight bar is decoration, `MclSelect` no longer shows a border-coloured ring while open, the textarea highlight bar now sits flush. The carousel one opens with the same "Requires" sentence, then: the arrows use the shared keyboard focus ring instead of a ring in the button colour.

- [ ] **Step 1: Make the doc and story edits; write the three changesets.**
- [ ] **Step 2: Verify** — `pnpm format:check`, `pnpm lint`, `pnpm run story:build` → clean; `grep -rn "btn-no-ring" src/stories --include=*.vue` → no output.
- [ ] **Step 3: Commit** — `docs: document the focus ring and deprecate btn-no-ring`

---

### Task 7: Full verification in a real browser

**Files:** none committed (scripts in the session scratchpad).

- [ ] **Step 1: Repo checks** — `pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm test:dist && pnpm run story:build` → all exit 0.
- [ ] **Step 2: Browser checks** (headless Chrome over CDP against `dist/` served on localhost, keyboard focus via `Input.dispatchKeyEvent` Tab and mouse via `Input.dispatchMouseEvent`). Expected:
  - `.btn` (button story), checkbox and carousel next arrow: after Tab, computed `outline` is `3px solid rgb(31, 41, 55)`, offset `2px`, `box-shadow` contains `rgb(250, 250, 250) 0px 0px 0px 2px`; after a mouse click, `outline-width` is `0px`.
  - Default `MclInputText`: ring present after Tab and after click; `box-shadow` also contains the `shadow-md` layers (Review Focus 4).
  - A `.btn.btn-no-ring` (inject one into the button story) shows the ring after Tab (Review Focus 5).
  - With `document.documentElement.style.setProperty('--mcl-focus-color', '#f1ac18')`, the focused `.btn` outline is `rgb(241, 172, 24)`.
  - Hovering a focused `.btn-invert` keeps the outline `rgb(31, 41, 55)` (Review Focus 1).
  - `MclTextArea`: space under the highlight bar is `0px` with the wrapper at `font-size:12px`, `14px; line-height:1.25`, `16px`, `18px`, `16px; line-height:2`.
  - Forced colors (`--force-high-contrast` or CDP `Emulation.setEmulatedMedia` with `forced-colors: active`): the focused `.btn` still has a non-zero outline width.
- [ ] **Step 3:** Record the before/after numbers for the PR description.
