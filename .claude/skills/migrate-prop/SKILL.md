---
name: migrate-prop
description: Rename a prop across a component file and its corresponding Storybook story in this library. Use when a prop needs to be renamed, a naming convention violation needs to be fixed, or the user says "rename prop". Expects "path/to/Component.vue oldPropName newPropName" as arguments.
---

# Migrate Prop

Rename a prop. Arguments: `$ARGUMENTS` (format: `<component-file-path> <oldPropName> <newPropName>`).

## Process

1. Parse arguments: component file path, old prop name, new prop name.
2. Read the component file.
3. Derive the story file path: replace `src/components/<package>/lib/` with `src/stories/<package>/` and change the extension to `.stories.ts`.
4. Read the story file.
5. Apply all renames (see checklist below).
6. Report a summary of every location changed.

## Component file changes

Check and update every occurrence of the old prop name in:

- [ ] `interface Props { ... }` — rename the property key
- [ ] `withDefaults(defineProps<Props>(), { ... })` — rename the default key
- [ ] `const { oldPropName } = toRefs(props)` or destructuring — rename
- [ ] `computed(() => props.oldPropName)` — rename
- [ ] `generateClass.*({ key: props.oldPropName })` — rename
- [ ] Template attribute bindings `:old-prop-name` or `v-bind` — rename (camelCase in script becomes kebab-case in template)
- [ ] Template text / comments referencing the old name — update

## Story file changes

- [ ] `argTypes: { oldPropName: ... }` — rename the key
- [ ] `args: { oldPropName: ... }` in every story variant — rename
- [ ] Any string references to the old prop name in `description` or `name` fields — update

## Rules

- Do not change the prop's type, default value, or behaviour — only the name.
- If the old name is used as a kebab-case HTML attribute in the template (e.g. `old-prop-name`), rename it to the kebab-case equivalent of the new name.
- If the component is re-exported or passed through from another component (e.g. a wrapper that spreads `$props`), note this in the summary but do not chase it — flag it for the user to handle.

## Output

End with a brief change summary:
```
Renamed: oldPropName → newPropName
- Component: <N> locations updated
- Story: <N> locations updated
- Manual follow-up needed: <any flagged items, or "none">
```
