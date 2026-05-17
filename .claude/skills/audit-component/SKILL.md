---
name: audit-component
description: Audit a single Vue component in this library against accessibility, prop naming, TypeScript, and Vue 3 best-practice checklists. Use when the user wants to review a component, check quality, or run a pre-PR audit. Accepts a component file path as argument.
---

# Audit Component

Produce a concise audit report for the component at `$ARGUMENTS`.

## Process

1. Read the component source file.
2. Check each category below and list findings as **pass**, **warn**, or **fail**.
3. Output a short markdown report — one section per category, findings only (skip silent passes).

## Checklist

### Accessibility
- Interactive elements (toggle, close, expand) use `<button>`, not `<div>` or `<a>`
- Overlay components (`Modal`, `Sidebar`) have `role="dialog"` and `aria-modal="true"`
- Collapse triggers have `aria-expanded` bound to open state and `aria-controls` pointing to the content element's `id`
- Tooltip trigger has `aria-describedby` pointing to the tooltip element's `id`
- Form inputs have a linked `<label>` (via `for`/`id`) or `aria-label`
- Form inputs use `aria-invalid` bound to validation state
- Error messages use `role="alert"`
- Icon-only buttons have `aria-label`

### Prop naming
- Boolean display flags use `show*` prefix (`showBorder`, `showShadow`, `showHighlight`) — not `display*`, `has*`, or bare names
- Color props are camelCase: `bgColor`, `textColor`, `borderColor`, `titleColor`, `optionHoverColor`
- No props with negated names (`noShadow`, `hideTitle`)
- Custom class injection uses `className` (on `manguito-theme` base components)

### TypeScript
- All props typed via `defineProps<{...}>()` with `withDefaults`
- No `any` types
- Emits typed via `defineEmits<{...}>()`
- Exposed methods typed (if `defineExpose` is used)
- Types imported from `@bobbykim/manguito-theme` not re-declared locally

### Vue 3 best practices
- Uses `<script setup lang="ts">` (not Options API)
- `generateClass` used as named import namespace — `generateClass.bgColor({ color: ... })` — not the legacy default export
- `vToggle` / `vCollapse` directives not used — collapse state handled via `useCollapseState` composable
- Modal/Sidebar open state driven by template ref + `openModal()` / `closeModal()`, not `v-toggle`
- No `console.log` left in production code

## Output format

```markdown
## Audit: <ComponentName>

### Accessibility
- [fail] <finding>
- [warn] <finding>

### Prop naming
- [pass] All conventions followed

### TypeScript
- [warn] <finding>

### Vue 3 best practices
- [fail] <finding>
```

End with a one-line summary: how many fails and warns, and the highest-priority fix.
