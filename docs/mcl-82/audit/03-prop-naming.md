# Prop Naming Inconsistencies

## Overview

This document identifies inconsistent, unclear, or poorly named props across all packages in the component library. Findings are grouped by package. A recommended naming convention is proposed at the end.

---

## `@bobbykim/manguito-theme`

### `Modal.vue`

| Current prop | Issue |
|---|---|
| `className` | Conflicts with the reserved React prop name and is inconsistent with Vue convention. All other components that accept extra CSS classes use `className` too, but the more idiomatic Vue name is `customClass` or simply `class` via `inheritAttrs`. |
| `noBackdrop` | Negated boolean props make ternary logic harder to read. Prefer `showBackdrop` (default `true`). |
| `noHeader` | Same issue. Prefer `showHeader` (default `true`). |
| `modalWidth` | Redundant prefix — the prop is already on a component called "Modal". `width` or `size` would be clearer. This also shadows `Sidebar.vue`'s `width` prop (which accepts raw px numbers), so the two overlapping concepts use different prop names. |
| `placement` | On Modal, `placement` is a `VerticalAlignment` (`'top' | 'center' | 'bottom'`). On Sidebar, `placement` is a `DirectionX` (`'left' | 'right'`). Same prop name, different type families — confusing when reading across components. |

### `Sidebar.vue`

| Current prop | Issue |
|---|---|
| `className` | Same as Modal — non-standard. |
| `noBackdrop` / `noHeader` | Negated booleans (same concern as Modal). |
| `width` | Accepts `string | number` but the internal logic unconditionally appends `px`: `'--sidebar-width': '${props.width}px'`. Passing a string `'50%'` would produce `'50%px'`, which is broken. The type should be `number` only, or the implementation should handle the `string` case. |

### `Collapse.vue`

| Current prop | Issue |
|---|---|
| `className` | Same as above. |
| `accordion` | Reasonable name, but note it is set as a raw HTML attribute (`<div :accordion="accordion">`) which is non-standard. The intent is fine, but it looks confusing when reading the DOM. |

### `HeaderHorizontal.vue`

| Current prop | Issue |
|---|---|
| `sticky` | Values are `'none' | 'tablet' | 'pc' | 'all'`. The value `'pc'` is informal — `'desktop'` or `'lg'` would be more consistent with Tailwind breakpoint naming. |
| `scrollDistance` | Only used when `fadeInOnScroll` is `true`, but there is no documented relationship between the two props. A nested options object or a compound prop would make this dependency explicit. |

### `Tooltip` (render function component)

| Current prop | Issue |
|---|---|
| `customClass` | Inconsistent with `className` used everywhere else in manguito-theme. One package uses `className`, the tooltip uses `customClass`. |
| `title` | Used as the tooltip text content. Overloads the native HTML `title` attribute name — the directive also reads from `el.getAttribute('title')` — creating a confusing dual-source situation. A clearer name would be `content` or `text`. |

### `NavDrawer.vue`

| Current prop | Issue |
|---|---|
| `displayBorder` | Inconsistent with `drawerBtnBorder` used when passing this value down from `HeaderHorizontal`. The internal prop name differs from the external-facing one. |
| `navColor` | This is actually the background color of the nav (used for ring offset), not the color of the nav items. `bgColor` would be clearer and consistent with the rest of the library. |

---

## `@bobbykim/mcl-collapse`

### `MclCollapseA.vue`

| Current prop | Issue |
|---|---|
| `collapseId` | This id is passed through to the `<Collapse>` component's `id` and used as the DOM element `id`. The `id` suffix is redundant given the prop is always an identifier. `collapseId` → `collapseId` is acceptable, but contrast with `MclCollapseB` which also has `collapseId` — at least they are consistent with each other. |
| `displayHighlight` | Used in both collapse components and in mcl-forms components. Consistent, but verbose. `showHighlight` would match `show*` boolean convention. |
| `slotBgColor` | Unclear which slot this refers to. Would be clearer as `contentBgColor`. |

### `MclCollapseB.vue`

| Current prop | Issue |
|---|---|
| `btnColor` | This is the background color of the collapse trigger button, not a "button color" in the semantic color token sense. `triggerBgColor` or `headerBgColor` would be more precise. |
| `displayShadow` | Consistent across the library (alert, card, forms), which is good. |

---

## `@bobbykim/mcl-forms`

### `MclInputText.vue` / `MclTextArea.vue`

| Current prop | Issue |
|---|---|
| `textcolor` | Lowercase `color` — all other color props use camelCase (`borderColor`, `bgColor`, `highlightColor`). Should be `textColor`. |
| `displayHighlight` | Consistent with other packages but conflicts with the non-`display*` naming in `showBackdrop` (not present — that was a recommendation above). The library mixes `display*` and `show*` prefixes. |
| `displayBorder` | Same concern. |
| `displayShadow` | Same concern. |
| `invalidFeedback` | `MclInputText` has an `invalidFeedback` prop (with corresponding slot), but `MclTextArea` does not have this prop at all, even though it has the same validation concerns. |

### `MclInputFile.vue`

| Current prop | Issue |
|---|---|
| `buttonText` | Fine for consumer use, but note the related color props are `buttonTextColor` and `buttonColor`. Three props starting with "button" — a namespace prefix like `btn*` (used in the theme's `btnColor`) vs. `button*` (used in forms) is inconsistent. |
| `displayClear` | Would be more natural as `clearable`, following library conventions like `dismissible` in Alert. |
| `isRequired` | All other required-field props in the library use `required` (MclInputText, MclTextArea, MclSelect, MclCheckbox uses none). The `is` prefix is redundant. |

### `MclCheckbox.vue`

| Current prop | Issue |
|---|---|
| `bgColor` | Background color of the unchecked state. |
| `checkedBgColor` | Background color of the checked state. |
| `checkColor` | Color of the checkmark indicator (maps to `beforeBgColor` internally). |
| `borderColor` | Border color. |

These four color props cover the checkbox states, but the naming obscures their relationship. `checkedBgColor` and `bgColor` imply a before/after pair, while `checkColor` and `borderColor` describe visual sub-elements. A more structured approach would be `color` (base state), `checkedColor`, `markColor`, `borderColor`.

### `MclInputSwitch.vue`

| Current prop | Issue |
|---|---|
| `sliderColor` | The slider is the knob inside the switch. Reasonable. |
| `onColor` | Color when switch is `true`. |
| `offColor` | Color when switch is `false`. |
| `switchSize` | Duplicates the component context (`MclInputSwitch` → `switchSize`). `size` would suffice. |

### `MclSelect.vue`

| Current prop | Issue |
|---|---|
| `textcolor` | Lowercase, same issue as `MclInputText`. Should be `textColor`. |
| `selectColor` | Used as the hover/highlight color for selected options. `highlightColor` would be consistent with `MclInputText`'s `highlightColor`. |
| `invalidFeedback` | Here it is the text shown when no options match the filter (not a validation error). This is a different concept from `MclInputText`'s `invalidFeedback` which is about HTML5 constraint validation. The same prop name means different things across components. In `MclSelect`, `noMatchText` or `emptyText` would be clearer. |

---

## `@bobbykim/mcl-header`

### `MclHeaderA.vue` / `MclHeaderB.vue`

| Current prop | Issue |
|---|---|
| `titleBlockAsLink` | Describes whether the title block (`logo + title`) is rendered as a link. Verbose — `titleAsLink` would work. |
| `titleBlockLinkTarget` | `titleBlockLinkTarget` vs. `titleBlockLink` — inconsistent suffix pattern (`Link` vs. `LinkTarget`). |
| `menuItemAsLink` | Consistent with `titleBlockAsLink`. |
| `drawerBtnBorder` | This is a boolean for whether to display a border on the hamburger button. `showDrawerBorder` or `drawerBtnShowBorder` would be clearer. |
| `fadeInOnScroll` | Clear intent. The companion `scrollDistance` has no clear unit in its name (it is a pixel value). `scrollDistancePx` would remove ambiguity. |
| `mobileMenuBgColor` | Fine, though `menuBgColor` (without `mobile`) could suffice since the desktop nav inherits `bgColor`. |

---

## Cross-package Patterns and Inconsistencies

### `display*` vs. `show*` boolean naming

The library mixes two boolean prefix conventions with no rule:
- `displayHighlight`, `displayBorder`, `displayShadow`, `displayClear` — use `display` prefix.
- `dismissible` — no prefix.
- `visible` — used as a state prop (not a display toggle).

Recommended: adopt a single convention. `show*` is idiomatic in Vue (e.g., `v-show`, `showModal`). Migrate `display*` props to `show*`.

### `className` vs. `customClass`

`manguito-theme` components use `className` throughout. The `Tooltip` component uses `customClass`. Pick one and apply it consistently. `customClass` is preferred since `className` is a React convention and may confuse contributors.

### Color prop naming

Color props lack a consistent pattern for pseudo-state colors:
- `bgColor` / `hoverBgColor` (theme's internal class objects)
- `bgColor` / `checkedBgColor` (checkbox)
- `onColor` / `offColor` (switch)

Recommended convention: use `color` as the base and suffix with the state: `color`, `colorHover`, `colorChecked`, `colorActive` — or use nested objects if Vue's props allow it.

### `id` requirement

Most form components require an `id` prop to link the label. This is correct but undocumented. The pattern is consistent across `MclInputText`, `MclTextArea`, `MclSelect`, `MclCheckbox`, `MclInputRadio`, `MclInputFile`, `MclInputSwitch`.
