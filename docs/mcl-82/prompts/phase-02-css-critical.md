You are working in the manguito-component-library monorepo on branch `feature/mcl-82`. Read the following files before making any changes:

- `docs/mcl-82/decisions/mcl-82-implementation-plan.md`
- `docs/mcl-82/decisions/phase-01-quick-fixes.md` — use as the format template for the decision document
- `docs/mcl-82/audit/09-theme-css-audit.md`
- `src/components/manguito-theme/lib/style/mcl-theme-v4.css`
- `src/components/manguito-theme/lib/theme/static/colors.ts`
- `src/components/manguito-theme/lib/theme/static/opacity.ts`
- `src/components/mcl-header/lib/mcl-header-b/NavCollapseVertical.vue`

---

## Task A — Document decisions

Create `docs/mcl-82/decisions/phase-02-css-critical.md` using `phase-01-quick-fixes.md` as the format template. Cover all seven fixes below. For each include: what changed, why, breaking change status with changelog note if applicable, and verification steps. Source all information from the files listed above.

---

## Task B — Apply all seven fixes

All changes are in `src/components/manguito-theme/lib/style/mcl-theme-v4.css` unless otherwise noted.

### Fix 1 — Rename `@utility bg-*` → `@utility mcl-bg-*` (breaking)

In `mcl-theme-v4.css`: rename `@utility bg-*` to `@utility mcl-bg-*`. Do NOT rename `@utility bg-opacity-*` — it has no Tailwind v4 collision and must stay to support hardcoded `bg-opacity-*` usages across templates.

In `src/components/manguito-theme/lib/theme/static/colors.ts`: update only the `bgColor` map — change every value from `bg-{color}` to `mcl-bg-{color}` (17 entries). All other maps (`hoverBgColor`, `focusBgColor`, `beforeBgColor`, `afterBgColor`, `bgActiveColor`) are not paired with `BGOPACITY` in practice and can stay as `hover:bg-*`, `before:bg-*` etc., which will fall through to Tailwind's native utilities.

In `src/components/mcl-header/lib/mcl-header-b/NavCollapseVertical.vue`: on the line containing `before:bg-primary before:bg-opacity-70`, change `before:bg-primary` to `before:mcl-bg-primary`. This is the only hardcoded template location where a `before:bg-{color}` class is explicitly paired with `before:bg-opacity-*` on the same element and therefore requires the MCL opacity-aware utility.

### Fix 2 — Rename `@utility outline-*` → `@utility mcl-outline-*` (breaking)

In `mcl-theme-v4.css`: rename `@utility outline-*` to `@utility mcl-outline-*`. Do NOT rename `@utility outline-opacity-*`.

In `src/components/manguito-theme/lib/theme/static/colors.ts`: update `outlineColor`, `focusOutlineColor`, and `activeOutlineColor` maps — change every value from `outline-{color}` / `focus:outline-{color}` / `active:outline-{color}` to `mcl-outline-{color}` / `focus:mcl-outline-{color}` / `active:mcl-outline-{color}` (17 entries each). Ring color maps are not `outline-*` prefixed — leave them unchanged.

### Fix 3 — Add missing `.tooltip` qualifier to `.tooltip-bottom`

Find the rule `.tooltip-bottom {` (the one containing `left: 50%; top: 110%;`) and change it to `.tooltip.tooltip-bottom {`. Every other direction variant already has the `.tooltip` qualifier; this one is missing it.

### Fix 4 — Remove redundant breakpoint reset and redefinitions

In the `@theme {}` block, remove the `/* Container breakpoints */` comment, the `--breakpoint-*: initial;` line, and all five `--breakpoint-sm/md/lg/xl/2xl` lines that follow. Tailwind v4's default breakpoints are identical to these values; the reset and redefinitions were a v3 migration shim that now silently discards consumer custom breakpoints.

### Fix 5 — Replace manual `.container` with v4-native approach

Remove the entire `.container` block from `@layer components` (the base rule plus the five `@media` breakpoint overrides — approximately 30 lines). Tailwind v4's built-in `container` utility already handles `width: 100%` and responsive `max-width` from the breakpoint scale. To preserve the auto-centering behaviour the manual block provided, add the following after the existing `@utility` block:

```css
@utility container {
  margin-inline: auto;
}
```

### Fix 6 — Move tooltip caret rules to `@layer components`

The entire `@layer utilities { … }` block at the end of the file (68 tooltip `::after` color rules) contains component-level styles placed in the wrong semantic layer. Change `@layer utilities` to `@layer components` for that block only.

### Fix 7 — Fix `btn-progress-r` `transition: all`

In the `.btn.btn-progress.btn-progress-r::before` rule, change:

```css
transition: all 300ms linear;
```

to:

```css
transition: width 300ms linear, left 300ms linear;
```

---

## Constraints

- Modify only the files explicitly listed above
- Do not make formatting or style changes beyond the specific fixes
- Do not add or remove any other logic, exports, or props

---

## Verification

Run these after all fixes and confirm the expected output:

```bash
# Fix 1 — no bare @utility bg-* remains; bgColor map updated
grep -n "@utility bg-\*" src/components/manguito-theme/lib/style/mcl-theme-v4.css
# expected: only @utility mcl-bg-* and @utility bg-opacity-*

grep -n "'bg-primary'" src/components/manguito-theme/lib/theme/static/colors.ts
# expected: no output

grep -n "before:bg-primary" src/components/mcl-header/lib/mcl-header-b/NavCollapseVertical.vue
# expected: no output

# Fix 2 — no bare @utility outline-* remains
grep -n "@utility outline-\*" src/components/manguito-theme/lib/style/mcl-theme-v4.css
# expected: only @utility mcl-outline-* and @utility outline-opacity-*

# Fix 3
grep -n "\.tooltip-bottom" src/components/manguito-theme/lib/style/mcl-theme-v4.css
# expected: .tooltip.tooltip-bottom only

# Fix 4
grep -n "breakpoint-\*" src/components/manguito-theme/lib/style/mcl-theme-v4.css
# expected: no output

# Fix 5
grep -n "max-width: theme(--breakpoint" src/components/manguito-theme/lib/style/mcl-theme-v4.css
# expected: no output

# Fix 7
grep -n "transition: all" src/components/manguito-theme/lib/style/mcl-theme-v4.css
# expected: no output
```
