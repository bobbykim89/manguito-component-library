# Claude Code Skills and Sub-Agents Viability

## Current State of the Project

### Codebase scope

The repository contains:
- **10 publishable npm packages** under `src/components/*`, each following an identical structure: `lib/`, `dist/`, `vite.config.ts`, `tsconfig.json`, `package.json`.
- **~80 Vue SFC components** across all packages, plus ~50 TypeScript utility/composable files.
- **A scaffold script** (`scripts/index.mjs`) that already automates the creation of new packages from templates — demonstrating that the codebase has established patterns worth automating.
- **No `CLAUDE.md` file** anywhere in the repository.
- **No `.claude/` configuration** in the project directory.

### Repeating task patterns

Reading through the codebase, several categories of work repeat across packages and components with high fidelity:

| Category | Repetition pattern |
|---|---|
| **New component creation** | Same file structure, same prop pattern (color, size, boolean display flags), same `generateClass` calls, same barrel export |
| **Prop API updates** | When a prop is renamed (e.g., `textcolor` → `textColor`), the same change propagates to the prop definition, default values, `computed()` body, template bindings, and the Storybook story args |
| **Accessibility fixes** | Each component needing a fix follows the same checklist: add `role`, add `aria-*`, fix close buttons, add focus management |
| **Test file creation** | Each new test file follows the same structure: import component, describe block, mount, assert |
| **Documentation** | All Storybook stories follow the same shape; the `argTypes` block is especially repetitive across similar props (`colorControllers`, `booleanControllers`, `textControllers`) |
| **`generateClass` migration** | If/when `MclClass` is replaced with `cva` (see document [04](./04-class-utility-object.md)), each component's `computed()` blocks need to be rewritten in the same way |

---

## Viability Assessment

### Is the codebase complex enough to justify skills/agents?

**Yes, with qualifications.** The codebase is not large by industry standards, but it has three characteristics that make skills/agents high-value:

1. **High prop and pattern uniformity.** Because every component uses the same `generateClass` system and the same prop conventions (or should), tasks like "add this ARIA attribute to all form components" or "rename `textcolor` to `textColor` across all packages" are highly automatable if the agent has precise context about the pattern.

2. **A known backlog of cross-cutting refactors.** The six documents in this review series each describe changes that must be applied consistently across multiple files/packages. Without automation, these are tedious and error-prone. An agent that understands the target pattern and the affected surface area is well-suited.

3. **A scaffold script that already encodes creation patterns.** The `scripts/index.mjs` tool shows that someone already recognized the value of automating new-package creation. Skills/agents extend this to more complex, context-sensitive tasks.

**The main risk** is that the codebase's current state includes several inconsistencies (noted throughout these documents). An agent that is not given precise, current context could propagate inconsistencies rather than fixing them. Well-scoped CLAUDE.md context and tightly defined skill prompts mitigate this.

---

## Recommended `CLAUDE.md` Structure

A `CLAUDE.md` at the repository root should give Claude essential context that is not immediately derivable from reading the code. Recommended sections:

```markdown
# Manguito Component Library

## Project structure
- Monorepo: 10 packages under `src/components/`. Each package is an independent 
  npm package published under `@bobbykim/`.
- `@bobbykim/manguito-theme` is the shared base. All other packages depend on it.
- Storybook app lives at the repo root and imports from source (not built dist).

## Core abstractions
- `generateClass(type, value)` — resolves a semantic prop value to a Tailwind 
  class string. Lives in `manguito-theme/lib/theme/`. Called by every component.
- `ColorPalette`, `SpacingLevel`, `HeadingSize` etc. — shared TypeScript types 
  from `manguito-theme/lib/theme/static/theme.types.ts`. Always import from 
  `@bobbykim/manguito-theme`.
- Custom directives: `vToggle`, `vCollapse`, `vClickOutside`, `vTooltip` — 
  exported from `@bobbykim/manguito-theme/directives`.
- `observeVisibleAttr` composable — watches the `visible` DOM attribute; used 
  by Modal, Sidebar, Collapse.

## Known issues (from MCL-82 review)
- `textcolor` prop (lowercase) in `MclInputText` and `MclSelect` is a bug; 
  should be `textColor`. Do not copy this pattern.
- `testExport` in `directives/index.ts` is a committed artifact; do not reference 
  or extend it.
- `console.log` in `tooltip.directive.ts` line ~78 is a debug artifact.
- `peer-inavlid` typo in `MclInputText.vue` prevents validation feedback from 
  ever showing.

## Prop naming conventions
- Boolean display flags use `display*` prefix: `displayBorder`, `displayShadow`, 
  `displayHighlight`. (Note: a future refactor will standardize to `show*`.)
- Color props are camelCase: `bgColor`, `textColor`, `borderColor`, `titleColor`.
- Custom CSS class injection uses `className` on manguito-theme base components.
- Slot-based overrides are always preferred over imperative configuration.

## Adding a new package
Run `pnpm package:create`. This scaffolds the directory, `package.json`, 
`tsconfig.json`, `vite.config.ts`, and an empty `lib/index.ts` from templates.
Templates are in `scripts/templates/`.

## Building and publishing
- Build all: `pnpm package:build`
- Version bump: `pnpm package:version`
- Publish: `pnpm package:publish`
- Lerna manages versioning in `independent` mode with conventional commits.

## Tailwind version note
The repo root uses Tailwind v4; individual packages list v3 in their 
devDependencies but the pnpm override forces v4 at runtime. The CSS file 
`manguito-theme/lib/style/mcl-theme-v4.css` uses Tailwind v4 `@theme` syntax.
```

This file should live at `/CLAUDE.md` (repository root). Additional package-level `CLAUDE.md` files are not necessary at this point given the uniform structure.

---

## Specific Skills That Would Be Useful

### Skill: `new-component`

**Purpose:** Scaffold a new Vue component inside an existing package following the library's established patterns.

**What it would do:**
1. Accept a package name (e.g., `mcl-forms`) and component name (e.g., `MclInputRange`).
2. Create the component file inside the correct `lib/` subdirectory.
3. Add the standard `<script setup lang="ts">` structure with `withDefaults(defineProps<{...}>(), {...})`, `generateClass` import, and `defineEmits`.
4. Export it from the package's `lib/index.ts` barrel.
5. Create a Storybook story file.

**Context it needs:** The existing `MclInputText.vue` or another form component as a reference for structure; the `lib/index.ts` barrel file to know what is already exported; the `ColorPalette` and `BodyText` type imports.

**Why a skill and not manual work:** The component structure is highly consistent. Getting the imports, prop conventions, and barrel export right manually requires reading 3–4 files every time.

---

### Skill: `add-tests`

**Purpose:** Write Vitest unit/component tests for a given component or utility function.

**What it would do:**
1. Accept a file path to a component or TypeScript utility.
2. Read the component's props, emits, exposed methods, and key behaviors.
3. Write a corresponding `*.test.ts` file covering: props render correctly, events fire, model binding works, exposed methods work, ARIA attributes are present.
4. Place the test file adjacent to the component (e.g., `lib/mcl-input-text/MclInputText.test.ts`).

**Context it needs:** The Vitest + `@vue/test-utils` setup from document [07](./07-vitest-setup.md) must already be in place; the `vitest.shared.ts` config path.

**Why a skill:** Writing tests for this library follows a predictable structure. An agent given the component source and the testing conventions can produce an 80% complete test file faster than manual authoring.

---

### Skill: `fix-accessibility`

**Purpose:** Apply the standard accessibility fixes documented in [01-accessibility.md](./01-accessibility.md) to a specific component.

**What it would do:**
1. Accept a component name (e.g., `Modal`, `MclCollapseA`).
2. Read the component's current source.
3. Apply the relevant fixes for that component type: overlay components get `role="dialog"` + `aria-modal` + focus trap; collapse triggers get `<button>` + `aria-expanded` + `aria-controls`; form components get `aria-invalid` + error `role="alert"`.
4. Verify that added ARIA attributes reference correct IDs (e.g., `aria-labelledby` points to the title element's `id`).

**Context it needs:** The full accessibility checklist from [01-accessibility.md](./01-accessibility.md); the component's current template and script.

**Why a skill and not a one-off task:** The same set of fixes applies to ~15 components. A skill ensures each fix is applied consistently rather than ad-hoc.

---

### Skill: `migrate-prop`

**Purpose:** Rename a prop across a component file and its corresponding Storybook story.

**What it would do:**
1. Accept: component file path, old prop name, new prop name.
2. Rename the prop in `defineProps`, `withDefaults`, all `computed()` destructuring, all template bindings.
3. Update the corresponding story's `argTypes` key and `args` key.
4. Update any documentation strings that mention the old name.

**Context it needs:** The component file and its story file. No cross-package context needed unless the prop is in `manguito-theme` and is consumed by all packages.

**Why a skill:** The `textcolor` → `textColor` fix alone touches `MclInputText`, `MclTextArea`, `MclSelect`, and their three story files. A skill that knows the rename pattern runs this in one pass.

---

### Skill: `audit-component`

**Purpose:** Produce a concise audit report for a single component covering: accessibility gaps, prop naming issues, TypeScript coverage, and Vue 3 best practices.

**What it would do:**
1. Accept a component file path.
2. Read the component source.
3. Check against the checklists from documents [01](./01-accessibility.md), [03](./03-prop-naming.md), and [06](./06-general-architecture.md).
4. Produce a short markdown report listing findings and referencing the relevant doc for recommended fixes.

**Context it needs:** The six MCL-82 documents as background; the component source.

**Why a skill:** This codifies the review process used to produce this document series. Future contributors adding new components can run the audit skill before opening a PR.

---

## Sub-Agent Workflows That Would Help

### Agent: Accessibility sweep

**Trigger:** After the accessibility fixes from [01-accessibility.md](./01-accessibility.md) are implemented.

**Workflow:**
1. Enumerate all `.vue` files in `src/components/`.
2. For each file, check for the presence of `role`, `aria-*`, and keyboard event handlers where expected.
3. Report any component that is missing required attributes for its type (dialog, listbox, tab, tooltip, etc.).
4. Flag regressions introduced by future changes.

This is a read-only audit agent — it never modifies files, only reports.

---

### Agent: Test coverage gap finder

**Trigger:** After the Vitest setup from [07](./07-vitest-setup.md) is in place.

**Workflow:**
1. Read all `*.vue` and `*.ts` files in `src/components/`.
2. Check whether a corresponding `*.test.ts` exists.
3. For files that have tests, identify untested props, emits, or exposed methods by comparing the component's public API against the test file's `describe`/`it` blocks.
4. Produce a prioritized list of missing test coverage, ordered by component criticality (overlay components and form inputs first).

---

### Agent: Prop naming consistency enforcer

**Trigger:** Before a PR that touches multiple components is merged.

**Workflow:**
1. Read all `defineProps` blocks across the changed files.
2. Cross-reference against the naming conventions in [03-prop-naming.md](./03-prop-naming.md) and the `CLAUDE.md` conventions section.
3. Report any prop that deviates: lowercase color names, `display*` vs `show*` inconsistency, negated boolean props, `className` vs `customClass` mismatch.
4. Does not make changes — reports only, for human review.

---

### Agent: `generateClass` → `cva` migration assistant

**Trigger:** When the `MclClass` → `cva` migration (document [04](./04-class-utility-object.md)) begins.

**Workflow:**
1. Given a single component file as input.
2. Read all `generateClass(...)` calls in the component's `<script setup>` block.
3. Rewrite them as `cva`-based computed values using the appropriate variant definition.
4. Output the migrated component and a note of any calls that could not be automatically migrated (e.g., multi-condition class logic involving `if`/`else` on multiple props simultaneously).

This agent would be run package by package, one component at a time, allowing human review of each migration batch.

---

## Project-Specific Context Agents Need to Be Effective

All agents operating on this codebase need the following context upfront:

1. **The `generateClass` API** — type keys (`'BGCOLOR'`, `'TEXTCOLOR'`, etc.) and their corresponding input types (`ColorPalette`, `SpacingLevel`, etc.). Without this, an agent cannot correctly interpret or generate `computed()` class logic.

2. **The `ColorPalette` union** — the 17 valid color values. An agent fixing accessibility or writing tests needs to know which values are valid for color props.

3. **The `workspace:*` dependency pattern** — imports from `@bobbykim/manguito-theme` in dependent packages resolve to source via the pnpm workspace. An agent writing import statements must use `@bobbykim/manguito-theme`, not a relative path.

4. **The known bugs list from `CLAUDE.md`** — to avoid regenerating the `textcolor` typo, re-adding `testExport`, or copying the `console.log`.

5. **The directive pattern** — `vCollapse`, `vToggle`, and `vClickOutside` are imported from `@bobbykim/manguito-theme/directives` (a separate export entry point). An agent that does not know this will try to import from the wrong path.

---

## Recommended Implementation Order

1. **Write `CLAUDE.md`** first — all other skills/agents depend on it for context. This is a low-effort, high-leverage step.
2. **Implement the `audit-component` skill** — it produces documentation, not code changes, which means it can be validated easily and establishes a quality baseline.
3. **Implement the `add-tests` skill** after the Vitest setup from [07](./07-vitest-setup.md) is complete — pair the infrastructure work with the automation that uses it.
4. **Implement `fix-accessibility` and `migrate-prop` skills** as the corresponding refactor tracks begin.
5. **Add the sub-agents** once the skills are validated and the team has confidence in agent-generated output for this codebase.
