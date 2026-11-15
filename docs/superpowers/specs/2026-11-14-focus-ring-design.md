# Two-tone keyboard focus ring (#122)

## Intent

Keyboard users need to see which control has focus. Today a focused `.btn` draws its ring in the button's own colour, 2px outside the button, so light buttons on light backgrounds and dark buttons on dark backgrounds have rings that fail WCAG 1.4.11 (3:1). Measured on a `light-2` card: `btn-warning` 1.75:1, `btn-light-4` 1.37:1; `btn-dark-3` on a `dark-3` card 1.00:1. Carousel arrows (`light-4` ring) are 1.37:1, and text fields rely on a coloured highlight bar that fails with light highlight colours (warning: 1.75:1). `.btn` also turns off the browser's own focus outline, so these rings are the only focus indicator there is.

The ring started as a decorative effect, with `btn-no-ring` to mute it. This change makes it a dependable keyboard focus indicator instead: one look across the library, readable on any background without setup, and themeable.

Found in Mango Planner (light mode, buttons in a `.btn-group` on a `light-2` card).

## Goals

- One focus ring, shared by `.btn`, the `mcl-forms` controls and the `MclCarouselA` arrows, with at least 3:1 against any background and no configuration.
- Keyboard-driven: no ring after a mouse click or tap on buttons, toggles or arrows.
- Apps can recolour it with two CSS variables, for example per theme (Mango Planner's dark mode sets amber).
- Fix the textarea highlight bar so it sits flush with the bottom of the textarea at any font size.

## Non-goals

- Footer links (`MclFooterA`, `SocialIcons`), the header hamburger (`NavDrawer`), tabs and other components with their own focus styles. They keep today's behaviour; a follow-up issue can move them onto the shared ring.
- `MclInputFile` keeps the browser's native focus outlines (they already contrast).
- No library-level dark mode. The library still has none; apps set the variables in their own dark theme.
- No JavaScript input-modality tracking.

## Anti-goals

- A ring that only works on light pages, or only after an app sets a variable.
- Removing or renaming public API in this change. The `generateClass` ring helpers (`ringColorVariant`, `focusVisibleRingColorVariant`, `peerFocusVisibleRingColorVariant`) stay exported even if no component uses them any more.
- Hiding focus from keyboard users anywhere, including through `btn-no-ring`.

## Constraints

- Apps compile the components' Tailwind classes themselves: they `@import '@bobbykim/manguito-theme/mcl-theme-v4.css'` and `@source` the `@bobbykim` packages (README). A new `@utility` in the theme is therefore available to every component class string, the same way `mcl-bg-*` already is.
- Windows high-contrast (forced colors) mode drops `box-shadow` but keeps `outline`. The part of the ring that carries contrast must be an outline.
- Text inputs and textareas already use `shadow-md` (a `box-shadow`). The ring's halo must not wipe that shadow out while focused.
- jsdom has no layout or CSS cascade for these classes, so tests can assert class strings; the visual result needs a real browser check.
- **Version skew.** `mcl-forms` and `mcl-carousel` pin `manguito-theme` exactly (`workspace:*`), but an app compiles their classes against whichever `mcl-theme-v4.css` its own `@import` resolves to. An app that upgrades `mcl-forms` or `mcl-carousel` while keeping an older theme CSS would compile no `mcl-focus-ring` at all, and its text fields, toggles and carousel arrows would lose their focus indicator. Apps therefore have to upgrade the theme CSS together with these packages (see Release).

## Decisions (made with the maintainer)

1. **Two-tone ring.** A dark outline with a light halo between it and the control: 3px outline in `--mcl-focus-color`, 2px out from the control, with the 2px gap filled by a halo in `--mcl-focus-halo`. One tone always contrasts with the background (13:1 or more on light-2, white and dark-3 in the mock-up). The brand-coloured ring goes away.
2. **Variables.** `--mcl-focus-color` (outline) and `--mcl-focus-halo` (halo), defaulting to the theme's `dark-3` and `light-1` colours, so an app that re-themes those tokens gets a matching ring. They cascade, so an app can set them on `:root`, in a dark-theme selector, on a section or on one control.
3. **`:focus-visible`.** The ring follows `:focus-visible`. In practice: buttons, checkboxes, radios, switches and carousel arrows show it for keyboard focus only; text inputs, textareas and the select's text input show it on any focus, because browsers treat a text field as focus-visible after a click too (accepted; no JS modality tracking).
4. **`btn-no-ring` deprecated.** It no longer removes the keyboard ring; with no ring on click there is nothing left for it to mute. Docs mark it deprecated; Storybook examples stop using it. Apps that used it will now see the ring when their button is reached with Tab.
5. **Form controls: option 1.** Every focused form control gets the ring. Text fields keep their highlight bar as decoration inside it (previously the ring only appeared when `showHighlight` was false).
6. **Scope.** `.btn` (and so everything built on it), text input, textarea, select, checkbox, radio, switch, carousel arrows; plus the textarea highlight fix.

## Approaches considered

**Default look.** (a) one focus colour, dark by default: close to today's look, but dark-background sites that don't set the variable get a worse ring than today. (b) **two-tone ring (chosen):** correct with no setup on any background, at the cost of the brand-coloured ring.

**Form controls.** (1) **ring on every focused control, highlight bar kept (chosen):** consistent and contrast-safe whatever highlight colour an app picks; fields look heavier when focused. (2) keep the highlight bar as the indicator and ring only where there is no bar: keeps today's form look, but light highlight colours keep failing.

**How it is built.** (A) **one `@utility mcl-focus-ring` in `mcl-theme-v4.css` (chosen):** defined once, composes with Tailwind variants (`focus-visible:`, `peer-focus-visible:`, `has-[…]:`), follows the theme's existing `mcl-*` utility pattern, and apps can reuse it on their own controls. (B) a `generateClass.focusRing()` helper returning long arbitrary-value class strings: no new CSS, but separate strings per variant, `.btn` would still need its own CSS (two definitions), and harder for apps to reuse.

## Design

### Theme (`manguito-theme/lib/style/mcl-theme-v4.css`)

- Add `@utility mcl-focus-ring`:
  - `outline: 3px solid var(--mcl-focus-color, <dark-3>); outline-offset: 2px;`
  - a 2px halo `box-shadow` (spread 2px, so it exactly fills the 2px offset gap) in `var(--mcl-focus-halo, <light-1>)`, composed with whatever shadow the element already has (Tailwind v4's `--tw-*-shadow` variables) so `shadow-md` survives.
- `.btn`: on `:focus-visible`, apply the same ring (the same declarations or `@apply mcl-focus-ring`). Remove the button-colour outline colour from the focus state. Hover keeps its background change and must not touch the focus ring's colour.
- Move the other `.btn` focus rules to `:focus-visible`: `.btn.btn-progress` fill and colour, `.btn-progress-r`, and the `.btn-group .btn` lift from #110 (`position: relative; z-index: 1`).
- `.btn.btn-no-ring`: stop removing the focus-visible ring (no-op or remove the rule; builder's call). Keep the class name working so nothing breaks.

### `mcl-forms`

- `useInputSurface`: always emit `focus-visible:mcl-focus-ring` (not only when `showHighlight` is false), and drop the `focus-visible:ring-4 ring-offset-2 …` + border-colour ring classes. Callers that put the surface class on a wrapper (`MclInputFile`, `MclSelect`) keep their current reasoning: on a wrapper the `focus-visible:` variant is inert; `MclInputFile` keeps native outlines.
- `MclSelect`: the ring goes on the visible box (the `relative flex …` wrapper that carries the surface classes), triggered by its text input: `has-[input:focus-visible]:mcl-focus-ring` or equivalent. The clear button (a separate tab stop) gets its own `focus-visible:mcl-focus-ring` rather than ringing the whole box. The caret button is `tabindex="-1"` and needs nothing.
- `MclSelect` open-state ring: remove the `!showHighlight && isOpen && ringColorVariant({ color: borderColor }) + ' ring-4'` class on the visible box. It is a brand-coloured ring (decision 1 retires those), and it would collide with the halo's box-shadow. Opening the list always focuses the text input (on focus, or through the caret's `toggle()`), so the focus ring already shows while it is open. _(Designer's call, after the builder check.)_
- `useToggleControl` (checkbox, radio, switch): replace `peer-focus-visible:ring-2 ring-offset-2` + border-colour ring with `peer-focus-visible:mcl-focus-ring` on the visible span. Keep the shape (radio stays round; the outline follows `border-radius`).
- Text fields keep `outline-none` in their base class only if it does not defeat the ring on `:focus-visible`; the variant must win (check specificity/order).

### Textarea highlight fix

- `MclTextArea`: make the textarea `block` and use the same highlight offset as text inputs (`-top-1`).
- `InputHighlight`: remove the `offset` prop and the `-top-2.5` option (internal component, not exported).
- Measured on the built Storybook: today the space under the bar is 0px at the default font, 2.5px at 14px/1.25 text, 1px at 12px, and the bar overshoots by 1–4px at larger sizes or line heights. With the fix: 0px in all of those cases.

### `mcl-carousel`

- `MclCarouselA` arrow buttons: replace `ring-offset-2 ring-offset-inherit … focus:ring-4 focus:outline-none` and the `ringColorVariant({ color: btnBgColor })` class with `focus-visible:mcl-focus-ring`. Update the comment on `navBtnClass`.

### Docs and examples

- Button MDX: a "Focus" section (keyboard-only ring, the two variables with an example dark-theme override); mark `btn-no-ring` deprecated.
- Forms and carousel MDX: one line each on the focus ring and the variables.
- `manguito-theme` README theming section: list `--mcl-focus-color` and `--mcl-focus-halo` and the `mcl-focus-ring` utility.
- Remove `btn-no-ring` from the six Storybook examples that use it (`Button.vue`, `TabExample.vue`, `TabExample2.vue`, `Collapse.vue`, `CollapseRef.vue`, `CollapseAccordion.vue`).

### Release

- Changesets: `@bobbykim/manguito-theme` minor (new utility and variables, visible focus change, `btn-no-ring` deprecation); `@bobbykim/mcl-forms` and `@bobbykim/mcl-carousel` **minor** (0.x), because apps must upgrade the theme CSS alongside them (see Constraints: version skew), which the release rules count as a change consumers have to adapt to. Their summaries open with that requirement: "Requires `@bobbykim/manguito-theme` 1.6.0 or later CSS (`mcl-theme-v4.css`); with an older theme CSS, focus rings on these components do not compile." All summaries also call out the visible changes: neutral ring instead of brand colour, no ring after clicks, `btn-no-ring` no longer hides keyboard focus, text fields now show a ring when focused, `MclSelect` no longer shows a border-coloured ring while open. _(Minor rather than patch is the designer's call, after the builder check; no runtime fallback or peer-dependency guard.)_

## Verification

- Unit tests (jsdom), written first: the class strings from `useInputSurface` (ring present with and without `showHighlight`), `useToggleControl`, `MclSelect` (wrapper and clear button), `MclCarouselA` arrows, `MclTextArea` (block, no `-top-2.5`), and `InputHighlight` without `offset`. Update the existing tests that assert the old ring classes.
- Browser checks (headless Chrome against the built Storybook, as used for #110/#111), before and after:
  - keyboard focus vs mouse click on a `.btn`, a checkbox and a carousel arrow: ring only on keyboard; a text input shows it on both;
  - computed outline colour/width/offset and halo, contrast against `light-2`, white and `dark-3` backgrounds, and with `--mcl-focus-color` overridden;
  - `shadow-md` still present on a focused text input;
  - `btn-no-ring` button shows the ring on keyboard focus;
  - forced colors (`--force-high-contrast` or emulated `forced-colors: active`): outline still visible;
  - textarea space under the bar is 0px at 12px, 14px/1.25, 16px, 18px and 16px/2 text.
- Full suite, lint, format, typecheck, `test:dist`, `story:build`.

## Left to the builder

- Exact CSS for composing the halo with existing shadows (verify in a browser, including elements with no shadow).
- Whether `.btn:focus-visible` repeats the declarations or uses `@apply mcl-focus-ring`.
- Whether `btn-no-ring` becomes an empty rule or is removed from the CSS (the class must stay harmless either way).
- Test file layout and whether a source-scanning guard (like the #111 ones) is worth adding for "no `focus:ring` / `focus:outline-none` without a focus-visible replacement".
