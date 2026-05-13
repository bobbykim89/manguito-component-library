# Phase 3 — Testing Infrastructure Decision Record

These decisions were locked before any Phase 3 code was written. They cover the four open questions identified during planning and constrain the implementation.

---

## Decision 1 — Root test orchestration: `vitest.workspace.ts`, not Lerna

**Decision:** Use Vitest's native workspace mode (`vitest.workspace.ts` at root) as the single entry point for running all package tests.

**Options considered:**

| Option | Notes |
|---|---|
| `lerna run test` | Works today, but Lerna is being removed in Phase 6. Adds a dependency on Lerna staying healthy through the test phases. |
| `vitest.workspace.ts` (chosen) | Vitest-native, zero Lerna involvement, aligns with the Turborepo migration path in Phase 6. `pnpm test` at root runs everything. |

**What this means for setup:**

- Create `vitest.workspace.ts` at root using `defineWorkspace`, pointing to each package's `vitest.config.ts`.
- Create `vitest.shared.ts` at root as the shared base config (environment, alias, coverage settings).
- Root `package.json` test script: `"test": "vitest run"` (uses the workspace file automatically).
- Per-package `package.json` test scripts (`"test": "vitest run"`, `"test:watch": "vitest"`) still work independently for local iteration.
- No `package:test` Lerna script is added.

---

## Decision 2 — Intentionally deferred test: `test.skip()`, not `test.todo()`

**Context:** The `MclInputText.textcolor` prop is a known pre-existing bug that will not be fixed until Phase 6 renames `textcolor` → `textColor`. Writing a test now that asserts the correct behavior would permanently fail in CI until Phase 6.

**Decision:** Write the full test body and mark it `test.skip()`, not `test.todo()`.

**Rationale:**

- `test.todo()` takes no callback. The expected behavior is not captured anywhere, and future-you has to reconstruct it from scratch during Phase 6.
- `test.skip()` accepts a full callback. The assertion is written now — what the prop should be called, what it should do — and the test shows up as pending in the report without failing CI.
- Removing `.skip` in Phase 6 immediately surfaces whether the rename fixed the behavior or not.

**Convention for this skip:**

```ts
test.skip('textColor prop applies correct text color class', () => {
  // Unblock in Phase 6: textcolor → textColor prop rename (mcl-82/phase-06-dx)
  const wrapper = mount(MclInputText, { props: { textColor: 'primary' } })
  expect(wrapper.classes()).toContain('text-primary')
})
```

---

## Decision 3 — Test scope: Priority 1 only; defer component tests for unstable components

**Decision:** Phase 3 writes tests only for pure TypeScript logic in `manguito-theme`. Component-level tests for Modal, Sidebar, Collapse, MclInputText, and MclSelect are deferred to their respective fix phases.

**Rationale:**

The following components have structural changes scheduled in later phases that would require rewriting any tests written now:

| Component | Upcoming change | Phase |
|---|---|---|
| `Modal`, `Sidebar` | `useModalScrollLock` composable extraction; `noBackdrop`/`noHeader` prop renames | 5, 6 |
| `MclCollapseA/B` | Entire `vCollapse` directive replaced with `useAccordion` composable | 5 |
| `MclInputText` | `peer-invalid` fix already committed; ARIA additions; `textcolor`/`display*` prop renames | 4, 6 |
| `MclSelect` | ARIA combobox additions; `textcolor`/`invalidFeedback` prop renames | 4, 6 |

Writing component tests against current behavior and then rewriting them in Phases 4–6 adds churn without adding safety (the components themselves are changing anyway).

**What Phase 3 tests instead (stable, pure TypeScript, no Vue mounting required):**

| Target | What to assert |
|---|---|
| `generateClass` | Valid inputs return the correct Tailwind class string; invalid inputs return `' '` |
| `ValidateMclClass` | All `validate*` methods for valid and invalid inputs across all color types |
| `directives/shared.fn.ts` | `getTargetId`, `getTargetElem`, `toggleVisibility`, `hasVisibleAttr` |

**Which packages get `vitest.config.ts` in Phase 3:**

Only `manguito-theme`, since it is the only package with tests written in this phase. Configs for other packages are added when their respective phases begin writing tests — not speculatively upfront.

---

## Decision 4 — `@testing-library/vue`: defer to Phase 4

**Decision:** Do not install `@testing-library/vue` in Phase 3.

**Rationale:** Its primary value is accessibility-focused queries (`getByRole`, `getByLabelText`, `getByText`). These are not needed for the pure TypeScript unit tests written in Phase 3. Phase 4 is where ARIA attributes and keyboard behavior are added to components — install it then alongside that work. Adding it now is a dependency with no usage.

**Install command when Phase 4 begins:**

```bash
pnpm add -D -w @testing-library/vue
```

---

## Summary

| # | Decision | Chosen approach |
|---|---|---|
| 1 | Root orchestration | `vitest.workspace.ts` (Vitest-native, no Lerna) |
| 2 | Deferred failing test | `test.skip()` with full body + Phase 6 comment |
| 3 | Test scope | Priority 1 pure TS only; component tests deferred to fix phases |
| 4 | `@testing-library/vue` | Defer to Phase 4 |
