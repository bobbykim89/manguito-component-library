# mcl-forms accessibility fixes (#130)

## Intent

The library-wide audit (#128–#138) filed 14 findings against `@bobbykim/mcl-forms` in #130: 9 in components and 5 in stories. This change fixes all of them, so every form control is correctly named, labelled and announced, and the `mcl-forms` stories can switch to `a11y: { test: 'error' }`. It follows `mcl-cards` (#129), the second package in the agreed order.

The most important finding is that `<mcl-form-group label="Email"><mcl-input-text id="email"/></mcl-form-group>` renders a label whose `for` points at an id that doesn't exist, so the input is unlabelled. Every story works around it with `:field-id="args.id"`.

## Goals

- **A control's own `id` inside a label-mode `MclFormGroup` is labelled by the group's label.** The `<label for>` matches the control's id, and the consumer keeps their id.
- **Attributes passed to a control reach the focusable element.** `aria-label`, `aria-labelledby`, `title` and the rest land on the `<input>`, `<textarea>` or combobox, not the wrapper `<div>`.
- **A required group shows that it's required**, visibly and to assistive technology.
- **A required checkbox or switch set no longer demands that every box be checked.**
- **`MclInputFile` has one keyboard stop and one name per field.**
- **`MclSelect` follows the APG combobox pattern more closely:**
  - the listbox has a name
  - the highlighted option is `aria-selected`
  - "No match." is announced
- **Animations respect `prefers-reduced-motion`.**
- **#130 is closed off.** Every `mcl-forms` story file sets `parameters: { a11y: { test: 'error' } }` and passes `pnpm test:storybook`.

## Non-goals

- The refactor in #65 ("Refactor mcl-input"): code leanness and the public API shape beyond what these fixes need.
- Visual redesign, colour or contrast changes.
- MCL-82 Phase 4 decisions 4c and 4d: the audit confirmed they still hold.
- New props for customising the required marker, until someone needs one.

## Anti-goals

- **Layout shifts for existing consumers.** `class` and `style` on a control keep styling the wrapper they style today.
- **Breaking existing ids.** A consumer's `id` on a control stays the element's id. That rules out "the group's id wins" (approach B below).
- **Hydration mismatches or warnings.** The label's `for` must not differ between the server render and the client's first render.
- **Dangling ARIA references.** Every `aria-labelledby`, `aria-describedby` or `aria-controls` id exists in the DOM whenever the attribute is present.
- **A consumer's own naming overridden.** If the consumer passes `aria-label` or `aria-labelledby` to a control, that wins over anything the group adds.
- **Double announcements that sound wrong.** Some redundancy is acceptable; contradictions are not (for example "required" on boxes that aren't required).

## Constraints

- **Version.** `@bobbykim/mcl-forms` is at `0.13.0`. Behaviour and DOM changes ship as a **minor** bump (`0.14.0`) with a changeset that lists what changes for consumers, in the style of the #129 changeset (`.changeset` history / `CHANGELOG.md`).
- **The field context is the seam.** `lib/common/fieldContext.ts` (`provideFieldContext` / `useFieldContext`) resolves ids, names and states for every control. `FieldContext` is in `lib/common/index.types.ts`. Fixes to id and label wiring go through it, not through each control separately.
- **Group setup-time flags.** `MclFormGroup` decides `hasHelpText`, `ownsFeedback` and `isGroupLabel` once, at setup, from prop and slot presence. The comments there explain why. Don't make those reactive.
- **SSR.** Vue SSR renders the group's `<label>` before the child control's `setup` runs. So a value the child reports back can't appear in the server HTML's `for`; it can only update the label after hydration. Use `@mcl/test-utils/ssr` (`renderOnServer`, `hydrate`) for SSR checks; existing `*.server.test.ts` files show the pattern.
- **Conventions.** Follow CLAUDE.md: prop naming, `generateClass`, the #122 focus ring (`mcl-focus-ring`), and `sr-only` for visually hidden text.
- **Tests.**
  - Unit tests are Vitest + `@vue/test-utils` in jsdom (`lib/**/*.test.ts`); every control already has a test file.
  - Story tests run with `pnpm test:storybook`.
- **Scope of `a11y: 'error'`.** `src/stories/components/mcl-forms/**` only.

## Approaches considered (label/id binding)

|       | Approach                                                                                                                                                                                                       | Trade-off                                                                                                                                                                                                     |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A** | **The label follows the control's id. The control reports its resolved id to the group, and the label's `for` uses it. In label mode the control also gets `aria-labelledby` pointing at the label's own id.** | **Consumers keep their ids. The name is right even in server HTML, through `aria-labelledby`. Costs a little wiring, and before hydration a click on the label doesn't focus a control that has its own id.** |
| B     | The group's id wins. In label mode a control's own `id` is ignored, with a dev warning.                                                                                                                        | Simplest, and correct from the server. Silently breaks consumer CSS, scripts and tests that target the control's id.                                                                                          |
| C     | A dev warning only, plus documentation saying to use `field-id`.                                                                                                                                               | Leaves the broken output in place.                                                                                                                                                                            |

**Chosen: A (maintainer's pick).**

## Decisions

The maintainer decided:

1. **Label/id binding uses approach A.**
   - **The control reports its id.** In label mode (`isGroupLabel` false), the control reports its resolved element id to the group, for example through a register function or a writable ref on the provided context. The label's `for` reads it, falling back to the group's id until a control reports. If more than one control reports in label mode, the first one wins.
   - **The label gets its own id.** In label mode, the group's label element gets an id (for example `${groupId}-label`), but only while the group actually renders a label. The label renders when `label` is non-empty or the `label` slot exists, and that can change reactively, so "has a label" is exposed to the control reactively.
   - **The control uses the label as its name.** While a label exists, the control sets `aria-labelledby` to that id. The consumer's own `aria-label` or `aria-labelledby` (from Decision 2) takes precedence.
   - **Toggles are exempt (my call, from the builder check).** `MclCheckbox`, `MclInputRadio` and `MclInputSwitch` don't get the group's `aria-labelledby`. They render no text of their own, so consumers name them with a wrapping or adjacent `<label>` ("Email me updates"). `aria-labelledby` would replace that name with the group label alone. Their `for` binding still follows their id.
   - **Fieldset mode doesn't change.** Controls generate their own ids and are labelled by the consumer's own markup, as the stories show with wrapping `<label>`s.
   - **No hydration mismatch.** The server render and the client's first render both use the group's id for `for`. The control's report updates it in a later client render.

My calls, open to correction:

2. **Attribute passthrough.**
   - **Where attributes land.** Every control (`MclInputText`, `MclTextArea`, `MclInputFile`, `MclSelect`, `MclCheckbox`, `MclInputRadio`, `MclInputSwitch`) sets `inheritAttrs: false` and splits its `$attrs`:
     - `class` and `style` stay on the root wrapper, as today.
     - Everything else is bound on the focusable element: the native input, the textarea, or the combobox `<input>` for `MclSelect` and the file `<input>` for `MclInputFile`. That includes `aria-*`, `title`, `data-*`, `autofocus` and event listeners.
   - **Changeset note.** This changes where consumer `data-*` attributes and listeners (`@focus`, `@blur`, `@click`) land. Listeners become more useful, since `@focus` and `@blur` never fired on the wrapper. The changeset lists this.
   - **Precedence.** For attributes the component also sets, its own bindings come first in the template, so the consumer's value wins, as Vue's normal attribute merging does. The exceptions are the id and the state attributes the field context owns (`id`, `name`, `required`, `disabled`, `aria-invalid`, `aria-describedby`, `aria-expanded`, `aria-controls`, `aria-activedescendant`, `role`, `type`), where the component's value wins. A consumer who needs those uses the props.
3. **Required indicator.**
   - When a group's `required` resolves to true, its `<label>` or `<legend>` renders a visible ` *` after the label content (after the `label` slot, if one is used), with `aria-hidden="true"`. The asterisk inherits the label text's colour and size.
   - **Label mode:** that's all. The single control's native `required` (or `aria-required` on `MclSelect`) already tells assistive technology.
   - **Fieldset mode:** the legend also gets `<span class="sr-only"> (required)</span>`. Checkboxes and switches no longer carry `required` (Decision 4), so the legend is where the requirement is stated. Radios keep their native `required`, so a radio set announces it twice. That's accepted.
4. **No `required` cascade to checkboxes or switches in fieldset mode.**
   - A group in fieldset mode doesn't pass `required` down to `MclCheckbox` or `MclInputSwitch`. A control-side option on `useFieldContext`, alongside `rendersOwnFeedback`, says "don't inherit required from a fieldset group".
   - A checkbox's own `required` prop still works, for example a single "I agree" box.
   - A label-mode group with one checkbox or switch still cascades. There, the control is the whole field.
   - Radios still inherit, because native radio `required` means "one of the set".
5. **`MclInputFile`'s "Browse File" button.** It gets `tabindex="-1"` and `aria-hidden="true"`; its click handler stays for mouse users. The native file input stays the labelled, focusable control, and its own Enter or Space opens the picker. The clear button keeps its tab stop and name.
6. **`MclSelect` listbox name.** The listbox (and the no-match region that takes its place) gets the same name as the combobox, resolved in the same order as Decision 1:
   - the consumer's `aria-labelledby` or `aria-label` (Decision 2)
   - otherwise `aria-labelledby` set to the group's label id when one exists (Decision 1)
   - otherwise nothing
7. **`MclSelect` `aria-selected`, and opening on the chosen option (the maintainer chose to open on the chosen option).**
   - While the list is open, `aria-selected="true"` is on the option at `activeIndex` (the one `aria-activedescendant` names), and `"false"` on the others.
   - **Opening on the chosen option.** When the list opens and the model has a value that matches an option in the list, `activeIndex` starts at that option. Today it starts at -1. This happens on every open: by focus, by the caret, and by keyboard. So the chosen option shows the hover highlight, is named by `aria-activedescendant`, is `aria-selected`, and is scrolled into view. A native `<select>` behaves the same way.
   - **The arrow keys start from the chosen option.** Enter on it re-commits the same value, which is harmless. With no value, or a value matching no option, the list opens with nothing highlighted, as today.
   - **`useSelectKeyboard` and its tests** change to match.
   - **The `dropdown` slot** gets the same rule through its slot props. Its `activeIndex` already exists. Document that a custom option should set `aria-selected` from `activeIndex`. The `MclSelectCustomSlot.vue` story, which sets it from the committed value today, is updated to match.
8. **`MclSelect` no-match announcement.**
   - A `role="status"` container is always rendered while the select is mounted, with no visual styling of its own.
   - The visible no-match box (and the `no-match` slot) renders inside it when the list is open and nothing matches, so the live region already exists when its content appears.
   - The visible box keeps the listbox id, border, width and floating position it has today.
9. **Reduced motion.** Add `motion-reduce:transition-none` (and `motion-reduce:before:transition-none` where the transition is on `::before`) to:
   - `InputHighlight`'s bar
   - `MclSelect`'s highlight bar and caret rotation
   - `MclInputSwitch`'s slider and knob

   Colour and opacity fades on the checkbox and radio aren't motion and stay.

10. **Stories.**
    - The unlabelled stories listed in #130 get wrapped in `<mcl-form-group label="…">`:
      - text input: 4 stories
      - textarea: 3
      - file input: 2
      - select: 1
    - Where a story used `:field-id="args.id"` only as the workaround, it switches to the control's own `id`, to show Decision 1 working. Elsewhere `field-id` stays as a supported prop.
    - In `formGroup.stories.ts`, the custom label slot uses a `<span>` without button styling, instead of `<p class="btn btn-secondary">`.
    - All `mcl-forms` story files set `parameters: { a11y: { test: 'error' } }`.
11. **Tests.**
    - **Unit tests in the existing per-control test files:**
      - attribute passthrough (the name attributes reach the control; `class` and `style` stay on the wrapper)
      - the label's `for` following a control's own id
      - `aria-labelledby` present only while a label renders, and yielding to the consumer's own
      - the required marker in both modes
      - no `required` cascade to checkboxes and switches in fieldset mode
      - the file button attributes
      - the select listbox name and `aria-selected` following `activeIndex`
      - the status region existing before the no-match content appears
    - **One SSR test.** It hydrates `<mcl-form-group label><mcl-input-text id="own"/></mcl-form-group>`: no hydration warnings, the server HTML's input has `aria-labelledby` resolving to the label, and after hydration the label's `for` is `own`.
    - **A Storybook `play` test.** It clicks the label of a group whose control has its own id, and checks that the control gets focus (Decision 1 in a real browser).
12. **Release.**
    - One changeset, `@bobbykim/mcl-forms: minor`, listing:
      - the label binding
      - the attribute passthrough, including where `data-*` attributes and listeners now land
      - the visible required asterisk
      - the checkbox and switch `required` change
      - the file button no longer being a tab stop
      - the select changes (it opens on the chosen option; the listbox gets a name; no-match is announced)
      - reduced motion
    - The PR body says `Closes #130`.

## Left to the builder

- **How the control reports its id:** a register function or a ref on the provided context, and whether it's added to `FieldContext` or a separate internal provide. Keep it internal, with no new public export.
- **Ordering of attribute bindings.** The exact way to split `$attrs` (a small shared composable is fine) and how the attribute order gets the precedence in Decision 2.
- **The status container.** The exact DOM for Decision 8, as long as the live region exists before the no-match content appears and the visible box looks as it does today.
- **Visual check.** Compare the form stories before and after in Storybook. The only intended visual changes are the required asterisk and the chosen option being highlighted when a select opens.
