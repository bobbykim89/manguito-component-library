# Theme CSS Audit — `mcl-theme-v4.css`

**File:** `src/components/manguito-theme/lib/style/mcl-theme-v4.css`  
**Line count:** 792

---

## 1. Current Structure Overview

The file is the single CSS entry point for `@bobbykim/manguito-theme`. Consumers import it to get the library's design tokens, base element styles, component classes, and Tailwind utility extensions. It is built entirely in Tailwind v4 syntax and is distributed unchanged alongside the compiled JS (via the `mcl-theme-v4.css` export condition in the package's `exports` field).

The file is organized into six distinct sections, in this order:

### 1.1 `@theme {}` block (lines 7–49)
Registers design tokens as CSS custom properties that Tailwind v4 reads to generate utility classes. Contains:
- **14 color tokens** (`--color-primary` through `--color-dark-4`). Each uses a double-variable pattern: `--color-primary: var(--mcl-primary, #ec489a)`. The outer `--color-primary` is what Tailwind uses; the inner `--mcl-primary` is a user-accessible override hook; and `#ec489a` is the fallback default. This deliberately creates two layers of indirection so consumers can override colors at runtime without re-processing Tailwind.
- **9 spacing tokens** (`--spacing-3xs` through `--spacing-3xl`), following the same double-variable pattern.
- **5 font-size tokens** (`--text-xs` through `--text-xl`).
- **5 breakpoint tokens** (`--breakpoint-sm` through `--breakpoint-2xl`), prefaced by `--breakpoint-*: initial` to clear any inherited breakpoint set.

### 1.2 `@property` rules (lines 52–74)
Four typed custom property declarations used to animate or calculate values:
- `--mcl-bg-opacity` (`<percentage>`, default `100%`) — bridges the Tailwind v3 `bg-opacity-*` utility pattern.
- `--mcl-outline-opacity` (`<percentage>`, default `100%`) — same pattern for outlines.
- `--mcl-gm-shadow` (`<number>`, default `10`) — controls glassmorphism shadow glow intensity.
- `--mcl-depth-color` (`<color>`, default `white`) — controls the glassmorphism highlight/depth color.

### 1.3 `@layer base {}` (lines 77–118)
Sets global element defaults:
- `body`: `font-size: 1rem`, `line-height: 1.5`
- `h1`–`h4`: bold, `line-height: 1.2`, with font sizes that increase at the `lg` breakpoint via a `@media` rule inside the layer block.

### 1.4 `@layer components {}` (lines 120–563)
The largest section. Contains all named component and utility classes:
- **`.container`**: responsive `max-width` container with 5 breakpoint steps.
- **Heading size variant classes** (`.h1-sm` through `.h4-xl`): 16 classes in groups of 4 (sm/md/lg/xl) for each heading level, each with mobile-first sizes and a responsive override at the `lg` breakpoint.
- **`.mcl-link`** and hover state.
- **`.mcl-list`**, `.mcl-list-sm`, `.mcl-list-lg` and their `li::before` bullet styles.
- **`.btn`** base class and all variants: `.btn-round`, `.btn-full`, `.btn-sm`, `.btn-lg`, `.btn-no-ring`, `.btn-invert`, `.btn-progress`, `.btn-progress-r`, `.btn-group`, `.btn-group-span`.
- **`.tooltip`** base class and 4 direction variants: `.tooltip-top`, `.tooltip-bottom`, `.tooltip-left`, `.tooltip-right`, each with an `::after` pseudo-element for the caret arrow.
- **`.mcl-glassmorphism`**: a multi-layer `box-shadow` for glass effects using `--mcl-gm-shadow` and `--mcl-depth-color`.

### 1.5 `@utility` rules (lines 566–604)
Nine functional utility generators using Tailwind v4's `@utility` at-rule:
| Utility pattern | Effect |
|---|---|
| `btn-*` | Sets `--mcl-btn-color` from the color scale |
| `mcl-list-*` | Sets `--mcl-list-color` from the color scale |
| `mcl-link-*` | Sets `--mcl-link-color` from the color scale |
| `bg-opacity-*` | Sets `--mcl-bg-opacity` as a percentage |
| `bg-*` | Generates `background-color` with `--mcl-bg-opacity` applied |
| `outline-opacity-*` | Sets `--mcl-outline-opacity` as a percentage |
| `outline-*` | Generates `outline-color` with `--mcl-outline-opacity` applied |
| `mcl-glass-*` | Sets `--mcl-depth-color` for glassmorphism |
| `mcl-depth-*` | Sets `--mcl-gm-shadow` depth level |

### 1.6 `@layer utilities {}` (lines 607–791)
185 lines of hand-written tooltip caret color overrides. 17 color names × 4 directions = 68 rules, each setting `border-color` on the `.tooltip::after` pseudo-element to match the tooltip's background color class.

---

## 2. Problems and Issues

### 2.1 `@utility bg-*` overrides Tailwind v4's built-in background utilities (CRITICAL)

```css
/* lines 584–586 */
@utility bg-* {
  background-color: --alpha(--value(--color-*) / var(--mcl-bg-opacity));
}
```

In Tailwind v4, `@utility` definitions with overlapping patterns override built-in utilities. The pattern `bg-*` matches everything that begins with `bg-`, including:
- `bg-transparent`, `bg-inherit`, `bg-current`, `bg-none` — non-color values with no `--color-*` token
- `bg-gradient-to-r`, `bg-gradient-to-br`, etc. — gradient utilities
- `bg-cover`, `bg-contain`, `bg-auto` — background-size utilities
- `bg-center`, `bg-top`, `bg-left`, etc. — background-position utilities
- `bg-fixed`, `bg-local`, `bg-scroll` — background-attachment utilities
- `bg-clip-*`, `bg-origin-*`, `bg-repeat-*` — further background utilities

All of these will be captured by the library's `@utility bg-*` rule and will attempt to apply `background-color: --alpha(--value(--color-*) / ...)`. For classes where `--value(--color-*)` cannot resolve (e.g., `bg-cover`), the declaration will produce an invalid or empty value, effectively breaking those utility classes for any consumer who imports this CSS alongside a Tailwind v4 setup.

**Impact on consumers:** A consumer using `bg-cover`, `bg-center`, or `bg-gradient-to-r` will find those classes broken if they import `mcl-theme-v4.css` into a Tailwind v4 project. This is a silent breaking change.

### 2.2 `@utility outline-*` overrides Tailwind v4's built-in outline utilities (CRITICAL)

```css
/* lines 593–595 */
@utility outline-* {
  outline-color: --alpha(--value(--color-*) / var(--mcl-outline-opacity));
}
```

Tailwind v4 has `outline-{width}` (e.g., `outline-2`, `outline-4`), `outline-{style}` (e.g., `outline-dashed`, `outline-dotted`), and `outline-offset-*` utilities, all of which begin with `outline-`. The library's blanket `@utility outline-*` intercepts all of them and attempts to set `outline-color`, which will be invalid for width, style, and offset classes.

**Impact on consumers:** `outline-2`, `outline-dashed`, `outline-offset-4` etc. will all break.

### 2.3 `.tooltip-bottom` missing the `.tooltip` class qualifier (line 489)

```css
/* line 489 */
.tooltip-bottom {
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
}
```

Every other direction rule is scoped with `.tooltip.tooltip-{direction}`. This rule lacks the `.tooltip` qualifier:

```css
/* correct pattern used everywhere else */
.tooltip.tooltip-top { ... }
.tooltip.tooltip-left { ... }
.tooltip.tooltip-right { ... }

/* missing qualifier — applies to ANY element with class="tooltip-bottom" */
.tooltip-bottom { ... }
```

Any element that happens to have a class containing `tooltip-bottom` (even unrelated to the tooltip component) will have `position: absolute`, `left: 50%`, `top: 110%`, and a centering transform applied to it.

### 2.4 `.h3-sm` and `.h3-lg` share identical initial font sizes

```css
/* lines 223–237 */
.h3-sm { font-size: 1.125rem; /* 18px */ }
.h3-md { font-size: 1.125rem; /* 18px */ }  ← same as h3-sm
.h3-lg { font-size: 1.125rem; /* 18px */ }  ← same as h3-sm
```

All three sizes share the same mobile font size. Similarly for `.h4-md` and `.h4-lg`:
```css
.h4-md { font-size: 1rem; /* 16px */ }
.h4-lg { font-size: 1rem; /* 16px */ }  ← same as h4-md
```

The responsive override at `lg` breakpoint differentiates `.h3-md` (20px) from `.h3-lg` (24px), so `.h3-sm` and `.h3-lg` are truly the same at mobile widths. Whether this is intentional is unclear — if the intent is for all three to be identical below `lg`, this is working as designed; if `h3-sm` should be visually distinct from `h3-lg` at all screen sizes, this is a bug. Flagged for clarification.

### 2.5 Tooltip `::after` arrow rules placed in `@layer utilities` instead of `@layer components`

The 68 tooltip caret override rules (lines 607–791) are placed in `@layer utilities`. In Tailwind v4's layer cascade:

```
base < components < utilities
```

Placing component-specific rules in the utilities layer means they have higher cascade precedence than they logically should. This is not functionally wrong for the tooltip itself, but it means these rules can inadvertently override rules that consumers place in `@layer components`, and the layering is semantically incorrect — these are component styles, not utility classes.

### 2.6 `.container` in `@layer components` conflicts with Tailwind's built-in container

Tailwind v4 has a native `.container` utility. By defining `.container` inside `@layer components`, the library's container style wins over Tailwind's default container behavior (since components layer overrides base layer, but the native Tailwind container is in utilities layer which is higher). The outcome depends on exact layer ordering but the collision is real. A consumer who expects Tailwind's container behavior will get the library's instead without any error.

### 2.7 `--breakpoint-*: initial` clears consumer-defined breakpoints

```css
/* line 43 */
--breakpoint-*: initial;
```

This syntax resets all `--breakpoint-*` properties to their initial values before the library's own breakpoints are defined. If a consumer has a Tailwind v4 configuration with custom breakpoints (e.g., a `xs` or `3xl` breakpoint), importing this CSS file will silently discard those custom breakpoints for any component that reads the breakpoints from this file. The consumer would need to re-declare their custom breakpoints after importing this file.

### 2.8 `--alpha()` applied to runtime `var()` in `.btn:hover` — build-time vs. runtime ambiguity

```css
/* lines 344–347 */
.btn:hover {
  background-color: --alpha(
    var(--mcl-btn-color, theme(--color-primary)) / 70%
  );
}
```

`--alpha()` is a Tailwind v4 build-time processing function — it resolves opacity-modified colors during CSS generation. When the input is a static token (`theme(--color-primary)`), Tailwind can resolve this at build time. However, when the input is `var(--mcl-btn-color, ...)`, the value of `--mcl-btn-color` is a runtime CSS variable set by `@utility btn-*`. This creates an ambiguity: Tailwind v4 may or may not be able to resolve `--alpha()` against a runtime variable at build time.

In practice, `--alpha()` with `var()` is documented to work in Tailwind v4 through the use of `color-mix()` internally, but this behavior relies on the CSS engine's color-mix support (Chrome 111+, Firefox 113+, Safari 16.2+). Older browsers that predate `color-mix()` will receive a broken `background-color` on hover. This is a potential progressive enhancement concern, not a hard breakage.

### 2.9 `mcl-list-sm` and `mcl-list-lg` share the `mcl-list-*` namespace with color utilities

```css
/* lines 316–320 — component classes in @layer components */
.mcl-list.mcl-list-sm li::before { font-weight: 500; }
.mcl-list.mcl-list-lg li::before { font-weight: 900; }

/* lines 571–573 — @utility rule */
@utility mcl-list-* {
  --mcl-list-color: --value(--color-*);
}
```

The `@utility mcl-list-*` uses `--value(--color-*)`, which only resolves for registered color tokens. `sm` and `lg` are not color tokens, so `mcl-list-sm` and `mcl-list-lg` as utility classes would produce no CSS output from the `@utility` block. However, the component-layer `.mcl-list.mcl-list-sm` rules are separate and do work. The namespace overlap is not currently a breakage but is confusing: both color-setting utilities and size-modifier classes share the `mcl-list-*` prefix. Adding a `--color-sm` token in the future (however unlikely) would conflict.

### 2.10 `btn-progress-r` transition property mismatch

```css
/* lines 406–409 */
.btn.btn-progress.btn-progress-r::before {
  left: 100%;
  transition: all 300ms linear;
}
```

The base `.btn.btn-progress::before` uses `transition: width 300ms linear`. The `.btn-progress-r` variant changes `transition: all 300ms linear`. Using `all` includes color and opacity transitions that are not intended, and can interact poorly with other transition properties. This should be `transition: width 300ms linear, left 300ms linear` to be explicit.

---

## 3. Optimization Opportunities

### 3.1 Tooltip caret color — collapse 68 rules to 4 using a CSS variable

The entire `@layer utilities` section (lines 607–791) is 68 hand-written rules mechanically pairing `bg-{color}` with the corresponding `border-color` for the arrow caret. This can be eliminated using a `--tooltip-bg` CSS variable:

**Current approach:**
```css
/* 68 rules like: */
.tooltip.bg-primary::after {
  border-color: theme(--color-primary) transparent transparent transparent;
}
.tooltip.tooltip-bottom.bg-primary::after {
  border-color: transparent transparent theme(--color-primary) transparent;
}
/* ... × 17 colors × 4 directions = 68 rules */
```

**Optimized approach:**
```css
/* In @layer components */
.tooltip {
  --tooltip-bg: theme(--color-dark-3); /* default matches existing base */
}
.tooltip::after {
  /* Uses four CSS variables, one per border side */
  border-color:
    var(--tooltip-caret-top, transparent)
    var(--tooltip-caret-right, transparent)
    var(--tooltip-caret-bottom, transparent)
    var(--tooltip-caret-left, transparent);
}
.tooltip.tooltip-top    { --tooltip-caret-top: var(--tooltip-bg); }
.tooltip.tooltip-bottom { --tooltip-caret-bottom: var(--tooltip-bg); }
.tooltip.tooltip-left   { --tooltip-caret-left: var(--tooltip-bg); }
.tooltip.tooltip-right  { --tooltip-caret-right: var(--tooltip-bg); }

/* Replace the entire @layer utilities block with this single @utility */
@utility tooltip-* {
  --tooltip-bg: --value(--color-*);
}
```

Consumers would use `bg-primary tooltip-primary` to get a correctly colored tooltip and arrow, or just `tooltip-primary` if the tooltip's background is set separately. The `@layer utilities` section is reduced from 185 lines to zero.

Note: This is a **breaking change** for consumers using the current `.tooltip.bg-{color}` pattern, since the arrow color would no longer auto-follow the background color via `bg-{color}`. The new pattern requires either a new `tooltip-{color}` utility or a CSS variable override.

### 3.2 Heading size classes — extract shared properties

All 16 heading size classes repeat `font-weight: bold; line-height: 1.2`. That is 32 duplicated declarations (64 properties total, counting the responsive overrides).

**Current:**
```css
.h1-sm { font-size: 1.5rem;  font-weight: bold; line-height: 1.2; }
.h1-md { font-size: 1.875rem; font-weight: bold; line-height: 1.2; }
/* ... 14 more with identical font-weight and line-height */
```

**Optimized — option A (attribute selector):**
```css
/* @layer components */
[class*="h1-"], [class*="h2-"], [class*="h3-"], [class*="h4-"] {
  font-weight: bold;
  line-height: 1.2;
}
/* Then each variant only sets font-size */
.h1-sm { font-size: 1.5rem; }
```

**Optimized — option B (`@utility`):**
```css
@utility mcl-heading {
  font-weight: bold;
  line-height: 1.2;
}
/* Components apply both: class="h1-md mcl-heading" */
```

Option A avoids consumer-side changes; option B makes the shared properties explicit. This is not a breaking change for either option.

### 3.3 Button hover opacity — make it configurable

The 70% hover opacity for `.btn` is hardcoded:
```css
.btn:hover {
  background-color: --alpha(var(--mcl-btn-color, ...) / 70%);
}
```

Add `--mcl-btn-hover-opacity` as a configurable property:
```css
@property --mcl-btn-hover-opacity {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 70%;
}
.btn:hover {
  background-color: --alpha(var(--mcl-btn-color, ...) / var(--mcl-btn-hover-opacity));
}
```

Consumers can then set `--mcl-btn-hover-opacity: 50%` on a specific button or globally without overriding the class. This is not a breaking change.

### 3.4 `.mcl-link:hover` — simplify with CSS relative color syntax

```css
/* current */
.mcl-link:hover {
  color: --alpha(var(--mcl-link-color, theme(--color-primary)) / 60%);
}
```

This is already using `--alpha()` which maps to `color-mix()` in v4. This is fine, but `--alpha()` with a `var()` has the same browser support caveat noted in section 2.8. No change needed if browser support is acceptable; just flagging for awareness.

### 3.5 `.container` — consider removing in favor of Tailwind's built-in

If the breakpoint tokens in `@theme` match the values used for Tailwind's responsive prefixes (which they do — `--breakpoint-sm` through `--breakpoint-2xl`), Tailwind v4's native `.container` class already implements the same max-width stepping behavior. The 30 lines of `.container` in `@layer components` could be deleted and replaced with:
```css
@theme {
  --container-center: true; /* or configure via Tailwind config */
}
```
or simply rely on Tailwind's default container behavior. This would also remove the conflict described in section 2.6.

### 3.6 Glassmorphism — `--mcl-gm-shadow` syntax is `<number>` but multiplied by `2px`/`1px`

```css
inset 0 0 calc(var(--mcl-gm-shadow) * 2px) calc(var(--mcl-gm-shadow) * 1px) ...
```

The `@utility mcl-depth-*` sets `--mcl-gm-shadow` to an integer. The multiplication is done inline in the `box-shadow` declaration. Moving the computed values to a CSS variable would make the intent clearer:

```css
.mcl-glassmorphism {
  --_blur: calc(var(--mcl-gm-shadow) * 2px);
  --_spread: calc(var(--mcl-gm-shadow) * 1px);
  box-shadow: ..., inset 0 0 var(--_blur) var(--_spread) ...;
}
```

This is a minor readability improvement, not a breaking change.

---

## 4. Tailwind v4 Alignment

### 4.1 `@theme` double-variable pattern — correctly aligned with v4

The `--color-primary: var(--mcl-primary, #hex)` pattern is a valid and idiomatic Tailwind v4 approach for allowing consumer overrides without reprocessing. The library correctly uses `@theme` (not `@layer base` or `:root`) to define design tokens. This is the right place for these declarations in v4.

### 4.2 `@property` declarations — correctly aligned with v4

Registering `--mcl-bg-opacity`, `--mcl-outline-opacity`, `--mcl-gm-shadow`, and `--mcl-depth-color` as typed properties is necessary for the `@utility` rules that read from them to work reliably. This is correct and well-suited to v4.

### 4.3 `@utility` for color variant generation — correctly aligned with v4

Using `@utility btn-*`, `mcl-list-*`, `mcl-link-*`, `mcl-glass-*`, `mcl-depth-*` to generate variant classes via CSS variable assignment is the idiomatic Tailwind v4 approach. The `--value(--color-*)` and `--value(integer)` syntax is correct.

### 4.4 `bg-opacity-*` polyfill — necessary workaround but implemented dangerously

Tailwind v4 deprecated the v3 `bg-opacity-*` pattern in favor of `bg-{color}/{opacity}` shorthand. The library provides a polyfill via `@utility bg-opacity-*` + `@utility bg-*`. The intent is valid — maintaining backwards compatibility for code that uses `bg-opacity-*` — but the implementation overrides ALL `bg-*` utilities as described in section 2.1. 

The v4-aligned solution would be to stop using the polyfill internally (update `generateClass` to emit `bg-primary/70` instead of `bg-primary bg-opacity-70`) and let consumers who need the polyfill add it themselves if their codebase still uses the v3 pattern.

### 4.5 `theme()` syntax inside `@layer` blocks — correctly aligned with v4

```css
border-top-left-radius: theme(--radius-sm);
font-size: theme(--text-sm);
padding: theme(--spacing-2xs);
```

Using `theme(--property-name)` with CSS custom property names is the correct Tailwind v4 syntax (replacing v3's `theme('spacing.2')` string-based syntax). This is consistently applied throughout the file.

### 4.6 `@media (min-width: theme(--breakpoint-lg))` — correctly aligned with v4

Using `theme()` inside media query values to reference breakpoint tokens is correct v4 syntax and ensures media queries stay in sync with the theme definition.

### 4.7 Heading base styles in `@layer base` — appropriate but affects global elements

The `@layer base` heading rules set `h1`–`h4` tag styles globally. In v4, `@layer base` is the lowest priority layer and will be overridden by any non-layered consumer CSS and by utilities. This means the base heading styles are unlikely to cause hard conflicts, but they do affect all heading elements on any page that imports this CSS — including headings used outside of library components. Whether this is intentional (a design-system-level reset) or overly aggressive depends on the intended audience of the package. Worth documenting explicitly in the package README.

### 4.8 Tooltip `::after` arrows written by hand — misses v4's `@utility` opportunity

The 68-rule `@layer utilities` section is a direct port of a pattern that would have been a Sass `@each` loop or PostCSS plugin in v3. Tailwind v4's `@utility` system is designed to replace exactly this kind of generated class repetition. As described in section 3.1, this section should be migrated to a CSS variable + `@utility` approach. This is the most significant v4 alignment gap in the file.

---

## 5. Recommended Improvements

### P1 — Fix `@utility bg-*` to avoid overriding Tailwind built-ins (BREAKING for consumers)

The current `@utility bg-*` is too broad. The opacity-modifier functionality it provides should be scoped to only the library's color tokens.

**Before:**
```css
@utility bg-* {
  background-color: --alpha(--value(--color-*) / var(--mcl-bg-opacity));
}
```

**After — Option A (scope to MCL colors only via `bg-mcl-*`):**
Rename the custom utility to `bg-mcl-*` and have `generateClass` emit `bg-mcl-primary` instead of `bg-primary`. This is **breaking** for consumers using the library's color classes directly.

**After — Option B (drop the polyfill, use v4 opacity syntax internally):**
Remove `@utility bg-opacity-*` and `@utility bg-*` entirely. Update `generateClass` to emit opacity as part of the color class (e.g., use `bg-primary` without a separate opacity class, and for opacity-modified colors use CSS variable manipulation directly). This is **breaking** for consumers relying on `bg-opacity-*` combined with `bg-{color}`.

**After — Option C (scope via CSS variable — non-breaking):**
Keep the `bg-opacity-*` utility but rename the overriding rule to target only color tokens explicitly. This requires either enumerating colors or using a distinct namespace.

Regardless of option, this must be resolved before wide consumer adoption of the v4 CSS. **Flag as a breaking change in the changelog.**

---

### P2 — Fix `@utility outline-*` to avoid overriding Tailwind built-ins (BREAKING for consumers)

Same problem as `bg-*`. The outline opacity utility should be scoped.

**Before:**
```css
@utility outline-* {
  outline-color: --alpha(--value(--color-*) / var(--mcl-outline-opacity));
}
```

**After — recommended:**
Rename to `outline-mcl-*` and update `generateClass` to emit the renamed class. Or, adopt Tailwind v4's native `outline-{color}/{opacity}` syntax and drop the custom utility entirely.

---

### P3 — Fix `.tooltip-bottom` missing `.tooltip` qualifier (non-breaking fix)

**Before:**
```css
.tooltip-bottom {
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
}
```

**After:**
```css
.tooltip.tooltip-bottom {
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
}
```

This is a bugfix. It is not a behavioral breaking change for correctly structured tooltip usage, but it does remove the leaked styles from non-tooltip elements with a `tooltip-bottom` class.

---

### P4 — Replace 68 tooltip caret rules with CSS variable approach (BREAKING for some consumers)

See section 3.1 for the full before/after. Summary:

**Before:** 185 lines in `@layer utilities`, 68 rules.

**After:** 4 rules in `@layer components` + 1 `@utility tooltip-*` declaration:
```css
/* @layer components */
.tooltip { --tooltip-bg: theme(--color-dark-3); }
.tooltip::after {
  border-color:
    var(--tooltip-caret-top, transparent)
    var(--tooltip-caret-right, transparent)
    var(--tooltip-caret-bottom, transparent)
    var(--tooltip-caret-left, transparent);
}
.tooltip.tooltip-top    { --tooltip-caret-top: var(--tooltip-bg); }
.tooltip.tooltip-bottom { --tooltip-caret-bottom: var(--tooltip-bg); }
.tooltip.tooltip-left   { --tooltip-caret-left: var(--tooltip-bg); }
.tooltip.tooltip-right  { --tooltip-caret-right: var(--tooltip-bg); }

/* @utility (replaces all 68 color-specific rules) */
@utility tooltip-* {
  --tooltip-bg: --value(--color-*);
}
```

**Breaking change flag:** Consumers who color their tooltips via `class="tooltip bg-primary"` will no longer get an auto-colored arrow. They must add `tooltip-primary` to their class list, or set `--tooltip-bg` directly.

---

### P5 — Move tooltip `::after` rules to `@layer components` (non-breaking, interim fix)

If the full refactor in P4 is deferred, at minimum move the 68 tooltip caret rules from `@layer utilities` to `@layer components` so they sit in the correct semantic layer. This is non-breaking and is a pure organizational improvement.

---

### P6 — Extract shared heading properties to reduce repetition (non-breaking)

**Before:**
```css
.h1-sm { font-size: 1.5rem;  font-weight: bold; line-height: 1.2; }
.h1-md { font-size: 1.875rem; font-weight: bold; line-height: 1.2; }
/* ... 14 more identical font-weight and line-height */
```

**After:**
```css
/* In @layer components, before the size variants */
[class*="h1-"], [class*="h2-"], [class*="h3-"], [class*="h4-"] {
  font-weight: bold;
  line-height: 1.2;
}
.h1-sm  { font-size: 1.5rem; }
.h1-md  { font-size: 1.875rem; }
/* ... font-size only from here on */
```

Saves approximately 32 declarations (32 lines). Non-breaking.

---

### P7 — Clarify `.h3-sm` / `.h3-lg` and `.h4-md` / `.h4-lg` size parity (needs clarification)

The following pairs start at the same mobile font size:
- `.h3-sm` and `.h3-lg`: both `1.125rem`
- `.h4-md` and `.h4-lg`: both `1rem`

If this is intentional (the sizes only differ above the `lg` breakpoint), it should be documented with a comment. If it is unintentional, `.h3-sm` should likely be `1rem` (16px) to create a visible distinction from `.h3-md`/`.h3-lg` at mobile sizes.

**Flagged for clarification before any change is made.**

---

### P8 — Fix `btn-progress-r` transition from `all` to explicit properties (non-breaking)

**Before:**
```css
.btn.btn-progress.btn-progress-r::before {
  left: 100%;
  transition: all 300ms linear;
}
```

**After:**
```css
.btn.btn-progress.btn-progress-r::before {
  left: 100%;
  transition: width 300ms linear, left 300ms linear;
}
```

Using `transition: all` is a performance anti-pattern that forces the browser to check every animatable property on every frame. Non-breaking.

---

### P9 — Add `--mcl-btn-hover-opacity` CSS variable for configurable hover opacity (non-breaking enhancement)

**Before:**
```css
.btn:hover {
  background-color: --alpha(var(--mcl-btn-color, theme(--color-primary)) / 70%);
}
```

**After:**
```css
@property --mcl-btn-hover-opacity {
  syntax: '<percentage>';
  inherits: true;
  initial-value: 70%;
}
.btn:hover {
  background-color: --alpha(var(--mcl-btn-color, theme(--color-primary)) / var(--mcl-btn-hover-opacity));
}
```

This allows consumers to customize hover opacity without overriding the class. Non-breaking.

---

### P10 — Document consumer impact of `@layer base` global heading styles

The file sets `h1`–`h4` styles globally in `@layer base`. This is intentional for a design-system CSS file, but consumers who are partially adopting the library (using individual components alongside their own heading styles) will have these base styles applied to all headings on their page. This should be explicitly documented in the package README under a "What this CSS file affects globally" section, not changed.
