---
name: add-tests
description: Write Vitest + @vue/test-utils unit tests for a Vue component or TypeScript utility in this library. Use when a component or utility needs tests, coverage is missing, or user says "write tests". Accepts a source file path as argument.
---

# Add Tests

Write tests for the file at `$ARGUMENTS`.

## Process

1. Read the source file.
2. Identify what needs testing: props, emits, exposed methods, slots, computed classes, ARIA attributes.
3. Check whether a test file already exists at `<same-dir>/<filename>.test.ts`. If it does, read it and only add missing coverage.
4. Write the test file.

## Test file location

Place the test file adjacent to the source:
- Source: `src/components/mcl-forms/lib/mcl-input-text/MclInputText.vue`
- Test:   `src/components/mcl-forms/lib/mcl-input-text/MclInputText.test.ts`

## Test file structure

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from './ComponentName.vue'

describe('ComponentName', () => {
  describe('props', () => {
    it('renders with default props', () => { ... })
    it('applies bgColor class', () => { ... })
    // one test per meaningful prop
  })

  describe('emits', () => {
    it('emits <event-name> on <action>', async () => { ... })
  })

  describe('exposed methods', () => {
    it('openModal sets visible state', async () => { ... })
  })

  describe('accessibility', () => {
    it('has role="dialog" on overlay', () => { ... })
    it('close button has aria-label', () => { ... })
  })
})
```

## Coverage priorities (in order)

1. **Default render** — mounts without errors, renders expected root element
2. **Color/class props** — `bgColor`, `textColor`, etc. produce the correct Tailwind class string via `generateClass`
3. **Boolean display props** — `showBorder`, `showShadow` toggle the expected class
4. **Emits** — user interactions trigger the correct events with correct payloads
5. **v-model** — if the component uses `modelValue`, test two-way binding
6. **Exposed methods** — `openModal()`, `closeModal()`, etc. change internal state correctly
7. **Slots** — default and named slots render provided content
8. **ARIA attributes** — role, aria-expanded, aria-modal, etc. are present with correct values

## Rules

- Use `happy-dom` environment (already configured in vitest — no annotation needed unless the package's vitest config differs).
- Use `mount` not `shallowMount` — this library's components are not deeply nested enough to warrant shallow mounting.
- Assert on rendered HTML attributes and classes, not on internal state where possible.
- For `generateClass` class assertions: import `generateClass` in the test file and call the same function to get the expected class string — do not hardcode Tailwind classes.
- Do not mock child components from `@bobbykim/manguito-theme` — use the real implementations.
- If the component needs a router or store, note it as a manual follow-up rather than adding a dependency.

## After writing

Check that the package's `vitest.config.ts` (or the root `vitest.config.ts` projects array) includes this package. If not, note it as a follow-up.
