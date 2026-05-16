---
name: new-component
description: Scaffold a new Vue component inside an existing package in this library, following all established patterns. Use when the user wants to add a component, create a new Vue SFC, or extend a package. Expects "PackageName ComponentName" as arguments (e.g. "mcl-forms MclInputRange").
---

# New Component

Scaffold a new component. Arguments: `$ARGUMENTS` (format: `<package-name> <ComponentName>`).

## Process

1. Parse arguments: package name (e.g. `mcl-forms`) and PascalCase component name (e.g. `MclInputRange`).
2. Read the package's `lib/index.ts` to see existing exports and directory structure.
3. Read one similar existing component in the same package as a structural reference.
4. Create the component file.
5. Add the export to the barrel.
6. Create the Storybook story.

## Component file

Create at `src/components/<package-name>/lib/<kebab-component-name>/<ComponentName>.vue`.

Template:

```vue
<script setup lang="ts">
import { generateClass } from '@bobbykim/manguito-theme'
import type { ColorPalette } from '@bobbykim/manguito-theme'

interface Props {
  bgColor?: ColorPalette
  // add props relevant to this component
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: 'primary',
})
</script>

<template>
  <div :class="generateClass.bgColor({ color: props.bgColor })">
    <slot />
  </div>
</template>
```

Rules:
- Always `<script setup lang="ts">`
- Always `withDefaults(defineProps<{...}>(), {...})`
- Boolean display flags use `show*` prefix
- Color props are camelCase (`bgColor`, `textColor`, etc.)
- Use `generateClass.<variant>({ key: value })` — never the legacy default export
- Import types from `@bobbykim/manguito-theme`, never re-declare locally

## Barrel export

Add to `src/components/<package-name>/lib/index.ts`:

```ts
export { default as ComponentName } from './<kebab-component-name>/<ComponentName>.vue'
```

## Storybook story

Create at `src/stories/<package-name>/<ComponentName>.stories.ts`.

Use the existing story file in the same package as a structural reference. Key conventions:
- `meta.title` follows the pattern already used in that package
- `argTypes` uses `control: 'select'` for `ColorPalette` props with `options` array
- Boolean props use `control: 'boolean'`
- Each story exports at least a `Default` variant with representative args

## Verification

After creating the files, confirm:
- Component file exists at the correct path
- Export is present in `lib/index.ts`
- Story file exists in `src/stories/`
- No TypeScript errors in the new files (run `vue-tsc --noEmit` if needed)
