# Class Utility Object (`MclClass`) Audit

## Overview

The library uses a custom class-resolution system (`MclClass`) in `@bobbykim/manguito-theme` to map semantic props (color names, spacing tokens, heading sizes, etc.) to Tailwind CSS class strings. This document describes the current structure, where it is used, how large it has grown, and evaluates whether `cva` (class-variance-authority) or a CSS variable approach would be a cleaner replacement.

---

## Current Structure

### Entry point

```
src/components/manguito-theme/lib/theme/
├── index.ts                  # exports generateClass()
├── mcl-theme/
│   └── index.ts              # MclClass, typeGroup, ClassType, InputType
├── static/
│   ├── colors.ts             # MclColor (17 properties × 17 color values)
│   ├── borders.ts            # MclBorderWidthClass (7 properties × 12 widths)
│   ├── body-text.ts          # MclText
│   ├── heading-size.ts       # MclHeadingSize
│   ├── opacity.ts            # MclOpacityClass
│   ├── spacing.ts            # MclSpacingClass
│   ├── theme.types.ts        # all shared TypeScript types
│   └── index.ts              # re-exports all static classes
└── validator/
    └── index.ts              # ValidateMclClass
```

### The `generateClass` function

```ts
// theme/index.ts
export const generateClass = <T extends ClassType>(
  type: T,
  value: InputType<T>
): string => {
  const mclGenerate = new MclClass(type, value)
  return mclGenerate.generateClass()
}
```

Every call to `generateClass` instantiates a new `MclClass`, which in its constructor also instantiates `MclColor`, `MclHeadingSize`, `MclBorderWidthClass`, `MclOpacityClass`, `MclSpacingClass`, and `MclText`. This means every single class lookup creates **7 new objects**. For computed properties in Vue components that are called on every render, this overhead compounds.

### `MclClass.generateClass()` — a large switch

`MclClass.generateClass()` dispatches over 50+ cases in a `switch` statement, each delegating to a private method that validates and then does a dictionary lookup:

```ts
case 'BGCOLOR':     return this.getBgColorClass()
case 'HVBGCOLOR':   return this.getHoverBgColorClass()
case 'FCBGCOLOR':   return this.getFocusBgColorClass()
// ... 47+ more cases
```

Every private method is identical in structure:
```ts
private getBgColorClass(): string {
  if (this.validator.validateColorType(this.classValue)) {
    return this.colorClass.bgColor[this.classValue]
  }
  return ' '
}
```

### Size of the class objects

**`MclColor`** (`colors.ts`): 17 property groups (bgColor, hoverBgColor, focusBgColor, beforeBgColor, afterBgColor, bgActiveColor, textColor, hoverTextColor, focusTextColor, disabledTextColor, svgFillColor, ringColor, ringFocusColor, ringActiveColor, ringOffsetColor, outlineColor, focusOutlineColor, activeOutlineColor, btnColor, listColor, borderColor, borderXColor, borderYColor, borderTopColor, borderBottomColor, borderLeftColor, borderRightColor) — that's **27 properties**, each containing a map of **17 color values** = **459 class string lookups** in one class.

**`MclBorderWidthClass`** (`borders.ts`): 7 properties × 12 widths = **84 entries**.

**`MclSpacingClass`** (inferred): margin, marginX, marginY, marginT, marginB, marginL, marginR, padding, paddingX, paddingY, paddingT, paddingB, paddingL, paddingR, gap = **15 properties** × **10 spacing levels** = **150 entries**.

Total approximate entries across all static classes: **~750+ hardcoded Tailwind class strings**.

---

## Where `generateClass` is Used

`generateClass` (or the re-exported `MclClass`) is called in virtually every component across the codebase:

- **`manguito-theme`**: Alert, Modal, Sidebar, HeaderHorizontal, HeaderVertical, NavDrawer, DropdownContainer, DropdownContent, TabContainer, all tooltip-related code, and all collapse components.
- **`mcl-collapse`**: `MclCollapseA`, `MclCollapseB`, `NavCollapse`.
- **`mcl-header`**: `MclHeaderA`, `MclHeaderB`, `NavCollapse`, `NavLink`, `NavDropdown`.
- **`mcl-forms`**: `MclInputText`, `MclTextArea`, `MclSelect`, `MclCheckbox`, `MclInputFile`, `MclInputRadio`, `MclInputSwitch`, `MclFormGroup`, `InputHighlight`.
- **`mcl-cards`**, **`mcl-carousel`**, **`mcl-container`**, **`mcl-footer`**, **`mcl-hero`**, **`mcl-tabs`**: all consume `generateClass`.

In total, `generateClass` is called from dozens of `computed()` functions across the library. It is the single most-used internal API.

---

## Problems with the Current Approach

### 1. Object instantiation on every call

Each `generateClass('BGCOLOR', 'primary')` call allocates 7 objects. In a component with 5–10 color props each mapped in a `computed()`, this is 35–70 short-lived object allocations per render. JavaScript's garbage collector handles this, but it is unnecessary work.

### 2. Huge lookup tables maintained by hand

The ~750 hardcoded class strings must be manually updated whenever a new color token, spacing level, or Tailwind variant is added. Adding a new pseudo-state (e.g., `group-hover`) requires:
- Adding a new property to `MclColor`.
- Adding a new case to `typeGroup.colorType`.
- Adding a new case to `MclClass.generateClass()`.
- Adding a new private method.

This is four places across four files for one new capability.

### 3. No tree-shaking

Because `MclClass` instantiates all sub-objects in its constructor regardless of which type is being looked up, a component that only needs `BGCOLOR` still pulls in the full `MclHeadingSize`, `MclBorderWidthClass`, etc. into the bundle.

### 4. Validator is regex-based and fragile

The `ValidateMclClass` validators use regular expressions that can produce false positives. For example, `validateHeadingTextSizeType` uses `/(sm|md|lg|xl)/` which would also match a spacing value like `'sm'`. The method relies on also checking `typeGroup.headingSizeType.includes(this.classType)` to discriminate, but the regex itself is misleading.

### 5. Duplicate lookup maps in form components

Several form components define their own color maps that duplicate what `MclColor` already provides:

```ts
// MclCheckbox.vue — local duplicate of before:bg- classes
const beforeColor: ColorMap = {
  primary: 'before:bg-primary',
  secondary: 'before:bg-secondary',
  // ...
}
```

This exists because `generateClass('BEFOREBG', color)` does the same job, but the component author may not have known about it, or may have needed a `peer-checked/input:bg-*` variant that doesn't exist in `MclClass`. Either way, the same mapping is maintained in multiple places.

---

## Evaluation: `cva` (class-variance-authority)

`cva` is a utility for defining component variants with TypeScript-safe class resolution. Example of what the color lookup would look like:

```ts
import { cva } from 'class-variance-authority'

const bgColorVariant = cva('', {
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      'light-1': 'bg-light-1',
      // ...
    },
  },
})

const hoverBgColorVariant = cva('', {
  variants: {
    color: {
      primary: 'hover:bg-primary',
      // ...
    },
  },
})
```

**Strengths:**
- No runtime object allocation — `cva` returns a plain function that does a map lookup.
- TypeScript-safe: variant keys are typed automatically.
- Designed specifically for this use case (class resolution from props).
- Well-maintained, widely used in the Vue/React ecosystem.
- Composable: compound variants allow multi-prop class combinations.

**Weaknesses:**
- Replaces the existing `typeGroup` enum-style dispatch with individual `cva()` instances. The current single-function API (`generateClass(type, value)`) would need to become multiple exported functions or a map of functions.
- Does not reduce the total number of class string entries — there are still ~750 strings, just organized differently.
- Migration would be a significant refactor touching every component.

**Verdict:** `cva` is a cleaner, more idiomatic replacement. The object-allocation overhead is eliminated, TypeScript inference improves, and compound variants enable expressing multi-prop class combinations that are currently handled by multi-step `computed()` logic in components.

---

## Evaluation: CSS Variable Approach

Instead of mapping color names to Tailwind class strings, define CSS custom properties for each token and let Tailwind utility classes reference them:

```css
/* mcl-theme-v4.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  /* ... */
}
```

Then components use Tailwind's arbitrary-value syntax:
```html
<div class="bg-[var(--color-primary)]">...</div>
```

Or define Tailwind theme tokens that map to the CSS variables, making `bg-primary` work natively.

**Strengths:**
- Eliminates all runtime class resolution — classes are static.
- Enables true runtime theming (change `--color-primary` to change the entire UI).
- Reduces bundle size (no `MclClass`, `MclColor`, etc.).
- The existing `mcl-theme-v4.css` file already defines CSS custom properties — this approach would expand what is already there.

**Weaknesses:**
- Tailwind's JIT scanner must see the class strings statically to include them in the output. `bg-[var(--color-primary)]` is an arbitrary value and may or may not be tree-shaken properly depending on Tailwind version.
- Tailwind v4 (which the root storybook app uses) has better CSS variable support, but `manguito-theme` itself still lists Tailwind v3 as a devDependency. This is a version mismatch that needs resolution first.
- Reduces the "type-safe color selection" feature — prop validation would need to shift to TypeScript types alone rather than the current runtime validation.

**Verdict:** The CSS variable approach is the best long-term architecture for a design system, but it requires resolving the Tailwind v3/v4 mismatch first and would be the most breaking change. Consider it as a future-facing goal rather than an immediate migration.

---

## Recommended Approach

**Short term:** Replace `MclClass` with `cva`-based functions. Each logical group of class types (colors, spacing, typography) becomes a separate `cva` instance exported from `manguito-theme`. This can be done incrementally — replace one group at a time, since the existing `generateClass` API can coexist during migration.

**Long term:** Align with Tailwind v4 throughout all packages and adopt CSS variables for the color and spacing tokens, removing the runtime lookup tables entirely.
