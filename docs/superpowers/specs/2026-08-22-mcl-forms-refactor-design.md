# mcl-forms Refactor & Accessibility Design

**Date:** 2026-08-22
**Status:** Approved design, pending implementation plan
**Scope:** `@bobbykim/mcl-forms` (all 8 components) + 3 additive variants in `@bobbykim/manguito-theme`

---

## 1. Motivation

`mcl-forms` is the least-refactored package in the library. The MCL-82 phase-04
accessibility work landed a baseline (`aria-invalid`, `role="alert"`,
combobox wiring) but stopped short of the structural problems, and several of
its stated intentions were never completed.

### Accessibility gaps still open

| # | Issue | Components |
|---|---|---|
| 1 | Native input is `appearance-none` in normal flow with an `aria-hidden` visual `<span>` carrying the click handler. **No focus indicator of any kind** — WCAG 2.4.7 failure. | checkbox, radio, switch |
| 2 | `role="alert"` is on a container that is always in the DOM and only CSS-hidden. Alerts fire on **insertion**, so it never announces. | input-text |
| 3 | No error region at all, despite having `aria-invalid` | text-area, select |
| 4 | `required` prop is accepted but **never bound to anything** | select |
| 5 | Clear and caret controls are `<div @click>` — not focusable, no accessible name | select |
| 6 | `<li aria-live="polite">` inside `role="listbox"` is announced as a selectable option | select |
| 7 | No `defineModel` and no `name` prop, so radio groups cannot be built and native arrow-key grouping is broken | radio |
| 8 | Outer `div` `@click` re-fires for clicks originating on the contained input — double toggle | switch |
| 9 | Clear button has no `type="button"`; inside a `<form>` it submits | input-file |
| 10 | No `disabled` support anywhere in the package | all |

### Maintainability problems

- A 17-entry `peerBgColor` map is hand-copied verbatim into `MclCheckbox` and
  `MclInputSwitch`, both carrying the same `'dark-4' -> bg-dark-1` typo.
- `MclCheckbox`'s `beforeColor` map is byte-identical to the theme's existing
  `beforeBgColorVariant` — pure redundancy.
- The border/shadow/rounded/highlight class computation is near-duplicated four times.
- Three names for one concept: `inputSize`, `radioSize`, `switchSize` — all typed `InputSizeType`.
- `MclSelect.vue` is 460 lines doing eight jobs.
- `new RegExp(selectedValue)` in the option filter is unescaped: typing `(` throws.
- `checked` prop bound alongside `v-model` — two competing sources of truth.
- Zero tests; `mcl-forms` is absent from the root `vitest.config.ts` `projects` array.
- Dead class `input__text` in `MclTextArea` (one usage, no definition anywhere).
- `max-h-50` in `MclSelect` mixes Tailwind's numeric scale into a codebase that
  uses the named `--spacing-*` token scale everywhere else.

---

## 2. Decisions taken

| Decision | Choice | Rationale |
|---|---|---|
| Public API freedom | **Breaking changes allowed, one clean bump** | Package is `0.10.x`; repo already has the migration-doc habit (`docs/mcl-82/migration-guide-v1.md`). One disruption instead of a long deprecation tail. |
| Shared code location | **Split: cva variants to `manguito-theme`, form composables stay in `mcl-forms`** | Colour variants belong with every other colour variant and gain coverage from the existing `generateClass.test.ts`; form-specific logic does not belong in the base package. |
| Label/error wiring | **`MclFormGroup` coordinates via provide/inject** | Mirrors the existing `useCollapseState` + `AccordionGroup` pattern. Writes the ARIA wiring once instead of eight times — the duplication is exactly why text-area and select never got error regions. |
| Component internals | **Shared composables + one internal component (`FieldFeedback.vue`)** | Composables keep each SFC readable on its own and are testable unmounted. `FieldFeedback` is a component because the `aria-describedby` contract needs byte-identical markup, and a composable cannot enforce that — markup drift is the observed failure mode. |

Rejected: internal base components (`InputSurface.vue` / `ToggleControl.vue`)
for maximum dedup — leads to leaky base components accumulating props to serve
every caller, and reading a public component would no longer show its markup.
Rejected: a headless rewrite exporting logic composables publicly — far beyond
the ask (YAGNI).

---

## 3. Module structure

### `manguito-theme` — three additive cva variants

Added to `lib/theme/index.ts` and to the `generateClass` object:

| Variant | Emits | Replaces |
|---|---|---|
| `peerCheckedBgColorVariant` | `peer-checked:bg-*` | the duplicated `peerBgColor` maps |
| `peerFocusVisibleRingColorVariant` | `peer-focus-visible:ring-*` | nothing — the missing focus indicator for the three toggles |
| `focusVisibleRingColorVariant` | `focus-visible:ring-*` | `focusRingColorVariant` (`focus:ring-*`) on text/textarea/select |

The third variant is required by section 6's move from `focus:` to
`focus-visible:`. The theme has no `focus-visible` variant of any kind today, and
the peer form does not serve text inputs, where the focused element *is* the
styled element rather than a peer. `focusRingColorVariant` is left in place —
other packages use it and it stays part of the public surface.

Both follow the existing raw-utility convention used by `beforeBgColorVariant`
(not the `mcl-` prefixed form used by `bgColorVariant`). They emit the
**unnamed** peer form; the components drop their `peer/input` group name, since
each has only one peer and the group name is one more thing to keep in sync.

`InputType` is widened with `'tel' | 'url' | 'search' | 'number'` (additive).

`MclCheckbox`'s local `beforeColor` map is deleted in favour of the existing
`beforeBgColorVariant`, which also fixes its `dark-4` typo.

### `mcl-forms/lib/` after the refactor

```
common/
  index.types.ts        # InputSizeType (kept, public), FieldContext; ColorMap deleted
  fieldContext.ts       # inject key + provideFieldContext() / useFieldContext()
  useInputSurface.ts    # border/shadow/rounded/highlight/bg/text classes
  useToggleControl.ts   # size tokens + checked/focus/disabled classes
  InputHighlight.vue    # unchanged
  FieldFeedback.vue     # NEW - the one error region, shared by text/textarea/select
assets/
  CaretDown.vue         # now actually used by MclSelect (currently inlined)
  XMark.vue             # NEW - clear icon, currently copy-pasted in select + file
mcl-select/
  MclSelect.vue         # ~180 lines (from 460)
  useSelectFilter.ts
  useSelectKeyboard.ts
  index.types.ts        # unchanged
```

### Comment convention

- JSDoc block on every exported composable: what it does, its params, what it returns.
- Short single-line `//` comments above non-obvious template blocks and handlers.
- The current `@param` blocks sitting **inside** computed bodies are removed —
  they document props from within a function scope and drift silently.

---

## 4. The `MclFormGroup` context contract

```ts
// common/index.types.ts
export interface FieldContext {
  id: string                              // resolved element id
  name: ComputedRef<string | undefined>   // radio group name; undefined when neither the control nor a group supplies one
  errorId: string                         // id of the error region this control points at
  descriptionId: string | undefined       // id of the help-text region, when one exists
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  describedBy: ComputedRef<string | undefined>  // description + error ids, in reading order
  feedbackOwnedByGroup: boolean
  isGroupLabel: boolean
}
```

**Provider.** `MclFormGroup` calls `provideFieldContext(options)` (named to match
`provideAccordion` in `manguito-theme`'s `useCollapseState.ts`). Its `labelFor`
prop is renamed **`fieldId`** — it now drives both the label's `for` and the
child's `id`, so `labelFor` no longer describes what it does — and becomes
**optional**, falling back to Vue 3.5's `useId()`.

`name`, `invalid`, `required` and `disabled` are declared `MaybeRefOrGetter` and
read through `toValue()`. This is load-bearing, not stylistic: `hasHelpText` and
`ownsFeedback` derive from *slot presence*, not from props, so the group cannot
hand its `props` proxy straight through — it must build an object literal, and a
literal snapshots plain values at setup. Passing plain values was measured to
leave the group's `invalid` permanently stuck at its mount-time value, so no
control in the group ever received `aria-describedby`. `fieldId`, `hasHelpText`,
`ownsFeedback` and `isGroupLabel` stay plain, being fixed at setup by
construction.

**Consumer.** Each input calls `useFieldContext(props)`, resolving each value as
*explicit prop -> injected context -> default*. With no provider it falls back
to local props plus `useId()`, so every component still works standalone.
Controls pass their reactive `props` proxy directly — unlike the group, they
have no structural reason to build a literal, and a spread literal would
snapshot every value at setup.

A second, optional parameter carries what is not a prop:
`useFieldContext(props, { rendersOwnFeedback })`, defaulting to `true`. The
three toggle controls render no `FieldFeedback` at all and pass `false`; the
error id is then omitted from `describedBy` unless the group owns the region,
because a group carrying `invalid` with no `invalidFeedback` would otherwise
give every radio in it an `aria-describedby` naming an element nobody renders.

The `name` resolution is *own prop -> group name*, with no id fallback on the
control side. An id fallback would apply to all eight controls, making
text/textarea/select/file emit a generated `name` into native form submissions
where they previously emitted none — and being never falsy, it could not be
opted out of. Grouped controls still inherit a usable name because the provider
defaults its own `name` to the field id; `MclInputRadio`, the one control where
a missing `name` actually breaks behaviour, supplies its own fallback.

**Consequence:** `invalid`, `required` and `disabled` lose their `withDefaults`
defaults and become `boolean | undefined`. With a default of `false` there is no
way to distinguish "not passed" from "explicitly false", and inheritance would
silently never fire. `undefined` means inherit.

**Region ids follow whoever renders the region** — not whoever owns the element
id. A control points at the group's `errorId` when the group renders the error
region (`ownsFeedback`), and derives `${id}-error` from its own id otherwise; it
points at the group's `descriptionId` whenever the group has one. `hasHelpText`
and `ownsFeedback` govern independent regions, so a group may render help text
while leaving the error region to the control. This principle is what keeps
`aria-describedby` from ever naming an element nobody renders — the earlier
design, which tied region ids to id ownership, was measured producing exactly
that dangling reference.

**Grouped controls.** A `groupLabel` prop switches the wrapper from `<label>` to
`<fieldset><legend>`, the correct structure for radio and checkbox sets, and is
published on the context as `isGroupLabel`. The group also provides `name`,
defaulting to the field id — this is what makes native radio grouping and
arrow-key navigation work.

**Element ids in group mode.** In fieldset mode every control generates its own
unique element id, because no `label[for]` exists to match and duplicate ids are
invalid HTML; in single-label mode the control takes the group's id so `for` and
`id` agree. This is independent of the region-id rule above: a fieldset control
gets a unique element id *and* still points at the group's shared error and
description regions, which is correct ARIA for a radio group. The earlier design
gave every sibling the group's id verbatim — measured as three radios all
rendering `id="colour"`, with `label[for]` binding only the first.

`feedbackOwnedByGroup` is a plain boolean rather than a `ComputedRef` because it
is decided at setup from the *presence* of the group's error prop or slot, not
from its value — presence does not change over the component's life.

**A group that owns the feedback region must carry the `invalid` state itself.**
The group's `FieldFeedback` renders under the group's own `invalid`, and its
children have already skipped their own regions because the group claims
ownership. A group with `ownsFeedback` and `invalid: false` wrapping a control
that is itself invalid therefore renders no error region anywhere while the
control still names the group's `errorId`. `MclFormGroup` sets `invalid`
whenever any control in it is invalid; this is a contract on the group, not
something the context can enforce.

**Single error region.** If `MclFormGroup` has an error prop or slot it renders
the one `FieldFeedback` and sets `feedbackOwnedByGroup: true`; children then skip
their own. A standalone input, or one in a group with no error content, renders
its own. One region either way, and ownership is explicit rather than incidental.

---

## 5. Public API changes

### Unified toggle vocabulary (checkbox, radio, switch)

| Concept | Now | After |
|---|---|---|
| size | `inputSize` / `radioSize` / `switchSize` | `size` |
| off / track colour | `bgColor` / `bgColor` / `offColor` | `bgColor` |
| on / checked colour | `checkedBgColor` / — / `onColor` | `checkedBgColor` |
| the mark, dot, knob | `checkColor` / `checkedColor` / `sliderColor` | `indicatorColor` |

### Per component

| Component | Breaking | Added |
|---|---|---|
| `MclFormGroup` | `labelFor` -> `fieldId`, now optional | `groupLabel`, `helpText` + `help` slot, `invalid`, `invalidFeedback` + slot, `required`, `disabled` |
| `MclInputText` | `id` optional; `invalid` no longer defaults to `false`; native-validity CSS display removed | `disabled`, `name`, `autocomplete`, wider `type` |
| `MclTextArea` | `id` optional; `invalid` default | `disabled`, `name`, `invalidFeedback` + slot (no error region exists today) |
| `MclSelect` | Esc no longer wipes the value; `id` optional; `invalid` default | `disabled`, `name`, `invalidFeedback` + slot; `required` finally bound |
| `MclCheckbox` | `checked` removed; `checkbox-click` emit -> `change(event)` | `disabled`, `name` |
| `MclInputRadio` | `checked` removed; `change` signature -> `change(event)` | **`v-model`**, `disabled`, `name` |
| `MclInputSwitch` | prop renames only | `disabled`, `name` |
| `MclInputFile` | clear-button double-fire fixed | `disabled`, `name`, `invalid`, `invalidFeedback` |

### Three deliberate breaks

1. **`checked` removed from checkbox and radio.** `:checked="checked"` alongside
   `v-model` is two competing sources of truth — the prop wins on first render,
   then the model diverges. `v-model` becomes the only channel and `change`
   emits just the native `Event`.
2. **Native-validity CSS display removed from `MclInputText`.** Today error
   *visibility* comes from `peer-invalid` CSS while `aria-describedby` comes from
   the `invalid` prop, so an input can display an error screen readers never
   learn about. Phase-04 chose prop-driven validation for framework-agnosticism;
   this finishes that choice. Consumers relying on automatic native display must
   now bind `:invalid`.
3. **`MclSelect` Esc semantics.** Esc closes the listbox and keeps the value; a
   second Esc while closed clears it. The current behaviour wipes the model and
   blurs on every Esc, which contradicts the ARIA APG combobox pattern.

`MclInputRadio` deliberately does **not** gain a `rounded` prop even though
checkbox and switch have one: shape is how users distinguish a radio from a
checkbox, so it stays circular.

---

## 6. Accessibility & interaction fixes

### Toggle pattern rewrite (checkbox, radio, switch)

The native input is absolutely positioned over the visual box at `opacity-0`,
full size, `cursor-pointer`, `peer`. The visual span stays `aria-hidden` and is
styled purely by `peer-checked:`, `peer-focus-visible:` and `peer-disabled:`.

Click and keyboard both land on the real input, so `checkboxRef` / `radioRef` /
`inputRef` and all three `.click()` forwarding handlers are deleted outright.
The focus ring comes from the new `peerFocusVisibleRingColorVariant`.

The switch also drops `:aria-checked` — HTML-AAM already maps a checkbox's
native checked state, and a hand-bound copy can only desync. `role="switch"` stays.

### `FieldFeedback`

Renders under `v-if="invalid"`. Insertion is what makes `role="alert"` announce;
the current always-rendered, CSS-hidden container never fires.

### `MclSelect` — ARIA APG combobox with listbox popup

- Handlers move from `keyup` to `keydown` with `.prevent` on Up/Down/Home/End,
  so arrows stop scrolling the page.
- Esc closes and keeps the value; a second Esc while closed clears it.
- Home/End jump to first/last option; Tab closes without committing;
  Alt+Down opens without selecting.
- `activeItemIdx` starts at `-1`, so opening no longer implies a pre-highlighted option.
- Clear and caret become real `<button type="button">`. Clear is focusable with
  `aria-label="Clear selection"`; the caret takes `tabindex="-1"` since the input
  already owns `aria-expanded`.
- `required` is bound as `aria-required`.
- The filter escapes its input: `new RegExp(escapeRegExp(term), 'i')`.
- "No match" moves out of the listbox into a `role="status"` region.

### Focus visibility

The ring path on text/textarea/select moves from `focus:` to `focus-visible:` so
mouse users do not get rings. The animated highlight bar keeps plain
`peer-focus` deliberately — it should show on programmatic focus too.

### Disabled

Native `disabled` attribute plus `peer-disabled:` visual treatment. No
`aria-disabled`; native disabling already removes the control from the tab order.

---

## 7. `MclSelect` internal split

Two pure-logic concerns come out; DOM-bound ones stay.

**`useSelectFilter.ts` (~45 lines).** Takes the options and query refs; returns
`filteredOptions` plus `optionLabel(option)` / `optionValue(option)` helpers
normalising `string | SelectOptionType` — a ternary currently written inline in
five places. Owns the regex escaping. No DOM.

**`useSelectKeyboard.ts` (~85 lines).** Takes `{ isOpen, filteredOptions,
activeIndex }`; returns one `onKeydown` handler plus `activeDescendantId`. Owns
the `-1` sentinel and the Esc/Home/End/Tab/Alt+Down rules. DOM-free: it accepts
an `onActiveChange(index)` callback that the component wires to its own
scroll-into-view, keeping the composable testable without a layout engine.

**Staying in the SFC:** floating-ui setup, the resize observer, the
`listItemsRef` registry and scroll-into-view. All thin and genuinely DOM-bound;
splitting them buys indirection, not clarity.

**Deletion:** `handleDropdownHide` / `handleDropdownShown` imperatively set
`style.pointerEvents` on transition hooks. That is a `pointer-events: none` line
in the existing `.options-leave-active` rule, so both handlers and both hook
bindings go.

---

## 8. Test strategy

### Setup

- New `src/components/mcl-forms/vitest.config.ts` mirroring `manguito-theme`'s:
  happy-dom, `include: ['lib/**/*.test.ts']`, alias to theme source.
- `'./src/components/mcl-forms'` added to the root `vitest.config.ts` `projects` array.
- No new dependencies: `vitest`, `@vue/test-utils` and `happy-dom` are already
  root devDependencies and hoisted. `mcl-forms` only gains `test` / `test:watch`
  scripts, matching `manguito-theme`.
- Tests colocated as `lib/**/*.test.ts` per CLAUDE.md.

### Coverage, in priority order

1. **Composables, unmounted** — `useSelectFilter` (the `(` regex case, string vs
   object options, empty query), `useToggleControl` size tokens,
   `useInputSurface` class composition per flag combination.
2. **The field-context contract** — highest value, as it is the new interface
   everything leans on. Mount `MclFormGroup` around each input and assert: the
   child's `id` comes from context, `aria-describedby` resolves to the
   actually-rendered error id, `required` / `disabled` inherit, an explicit prop
   beats the context, and a standalone mount still gets a `useId` fallback.
3. **Per-component ARIA wiring** — `aria-invalid` present only when invalid,
   `FieldFeedback` rendered only under `v-if`, `<label>` vs
   `<fieldset>/<legend>` on `groupLabel`, one shared `name` across a radio group.
4. **`v-model`** — all three toggles update and emit; a radio group holds
   exactly one selection.
5. **`MclSelect` keyboard** — Down/Up/Home/End move `aria-activedescendant`; Esc
   closes and keeps the value; a second Esc clears; Tab closes.

Plus cases in the theme's existing `generateClass.test.ts` for the three new variants.

Estimated 55-70 cases across 12 files.

### Testing ceiling

floating-ui positioning and `scrollIntoView` are not testable under happy-dom,
which cannot measure layout. Those tests assert the wiring is present, not that
the geometry is correct. Visual verification stays with Storybook.

---

## 9. Deliverables

1. Three additive cva variants + widened `InputType` in `manguito-theme`, with test cases.
2. Refactored `mcl-forms`: 8 components, 4 composables, 2 internal components, 2 icon assets.
3. Unit tests for all 8 components and all 4 composables; `mcl-forms` wired into the root vitest projects.
4. Updated Storybook stories and `.mdx` docs for all 8 components — non-optional,
   since stories import from source and break the moment props are renamed.
   Includes documenting the `MclFormGroup` coordination pattern and the
   `disabled` / group states.
5. Migration guide in the style of `docs/mcl-82/migration-guide-v1.md`: old -> new
   prop tables, before/after snippets per component, and the three deliberate
   behaviour breaks.
6. Refreshed `src/components/mcl-forms/README.md`: new prop tables, the
   `MclFormGroup` coordination pattern, accessibility notes.
7. Changesets: a minor bump for `mcl-forms` (breaking, per `0.x` convention) and a
   patch or minor for `manguito-theme` (additive).

## 10. Out of scope

- `multiple` file selection on `MclInputFile` — changes the model type from
  `File | null` to an array and deserves its own change.
- Any component outside `mcl-forms`, beyond the three additive theme variants.
- The broader named-vs-numeric Tailwind scale inconsistency across other
  packages; only `MclSelect`'s `max-h-50` is corrected here.

## 11. Verification

- `pnpm test` passes with `mcl-forms` in the projects array.
- `pnpm run package:build` succeeds (Turborepo, theme before forms).
- `pnpm run story:dev` — manual keyboard pass per component: tab to every
  control, confirm a visible focus indicator, operate with keyboard only,
  confirm error announcement on becoming invalid.
- `MclSelect` checked against the ARIA APG combobox pattern key-by-key.
