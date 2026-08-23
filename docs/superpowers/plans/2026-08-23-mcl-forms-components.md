# mcl-forms Component Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all eight `mcl-forms` components onto the shipped composable foundation, split `MclSelect`'s logic into two testable composables, and land the accessibility fixes the spec calls for — with unit tests for each component.

**Architecture:** Every control calls `useFieldContext(props)` to resolve its id, validation and disabled state against an optional surrounding `MclFormGroup`, which becomes a provide/inject coordinator. Text-like controls share class computation via `useInputSurface(props)` and render errors through `FieldFeedback.vue`; the three toggles share `useToggleControl(props)` and switch to an overlay-input pattern that makes the native input the click and focus target. `MclSelect` keeps only DOM-bound work and delegates filtering and keyboard handling to `useSelectFilter` / `useSelectKeyboard`.

**Tech Stack:** Vue 3.5 (`useId`, `defineModel`, `defineSlots`), TypeScript 5.9 strict, class-variance-authority via `generateClass`, `@floating-ui/vue`, `@vueuse/core`, Vitest 4 + happy-dom + @vue/test-utils, pnpm workspaces + Turborepo, Changesets.

**Spec:** `docs/superpowers/specs/2026-08-22-mcl-forms-refactor-design.md`

**Plan 2 of 3.** Plan 1 (`docs/superpowers/plans/2026-08-22-mcl-forms-foundation.md`) shipped and released as `manguito-theme@1.1.0` / `mcl-forms@0.11.0`. Plan 3 covers the Storybook stories and `.mdx` docs, the migration guide, and the README refresh.

## Global Constraints

- Node `>=22.0.0`; pnpm `10.32.1`. Tests: `cd src/components/mcl-forms && pnpm test`, or `pnpm test` from the repo root for both projects. Baseline entering this plan: **129 passing**.
- Conventional Commits, scope = package name (`mcl-forms`).
- `mcl-forms/tsconfig.json` sets `strict`, `noUnusedLocals`, `noUnusedParameters` — no unused imports, locals or parameters.
- Tests colocated as `lib/**/*.test.ts`. Never a separate `tests/` tree.
- **No new dependencies.** `vitest`, `@vue/test-utils` and `happy-dom` are hoisted root devDependencies; `@floating-ui/vue` and `@vueuse/core` are already `mcl-forms` dependencies.
- **`invalid`, `required` and `disabled` MUST be declared with an explicit `default: undefined` in `withDefaults`.** Empirically verified against this repo's Vue: `{ type: Boolean }` omitted resolves to `false`, `{ type: Boolean, default: undefined }` omitted resolves to `undefined`. `undefined` is what means "inherit from the group". Omitting them from the `withDefaults` object makes group inheritance silently never fire.
- **Pass your `props` proxy directly to `useInputSurface` / `useToggleControl`. Pass GETTERS to `provideFieldContext`.** A spread literal (`{ ...props }`) snapshots every value at setup and freezes it. `provideFieldContext` accepts `MaybeRefOrGetter` for `name`/`invalid`/`required`/`disabled` precisely because `MclFormGroup` must build an object literal (its `hasHelpText`/`ownsFeedback` come from slot presence, not props).
- **A group that owns the feedback region must carry `invalid` itself.** Its `FieldFeedback` renders off the group's own `invalid`; the context cannot enforce this. `MclFormGroup` docs and tests must state it.
- Every exported composable carries a JSDoc block (what it does, params, returns) and an explicit return-type annotation.
- Prop naming, per the spec and CLAUDE.md: boolean display flags use `show*`; colours are camelCase; custom class injection uses `className`; slot overrides are preferred over imperative config.
- **Known limitation, informational:** the palette-exhaustiveness guard in `manguito-theme`'s `generateClass.test.ts` fails `vue-tsc`/`build`, not `pnpm test` — Vitest transpiles without type-checking. Do not rely on the test suite to catch a new `ColorPalette` member.
- **Storybook stories are knowingly left broken by this plan.** `src/stories/components/mcl-forms/` imports from source and uses the old prop names, so the prop renames in Tasks 3-10 break them. Plan 3 rewrites them. Do not fix stories here, and do not run `pnpm run story:dev` as a gate. This mirrors how plan 1 knowingly left the `ColorMap` import broken.

## Shipped foundation — exact signatures

Verified against source at the time of writing. Read the files before use; do not guess.

```ts
// @bobbykim/manguito-theme  (generateClass namespace)
generateClass.peerCheckedBgColorVariant({ color })        // 'peer-checked:bg-<color>'
generateClass.peerFocusVisibleRingColorVariant({ color }) // 'peer-focus-visible:ring-<color>'
generateClass.focusVisibleRingColorVariant({ color })     // 'focus-visible:ring-<color>'
// InputType = 'text'|'email'|'password'|'tel'|'url'|'search'|'number'

// mcl-forms/lib/common/index.types.ts
interface FieldOwnProps { id?, name?, invalid?, required?, disabled? }   // all optional
interface FieldContext {
  id: string                                    // resolved once at setup
  name: ComputedRef<string | undefined>         // NO id fallback — see below
  errorId: string
  descriptionId: string | undefined
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  describedBy: ComputedRef<string | undefined>  // omits errorId when no region exists
  feedbackOwnedByGroup: boolean
  isGroupLabel: boolean
}

// mcl-forms/lib/common/fieldContext.ts
interface FieldProviderOptions {
  fieldId?: string
  name?:     MaybeRefOrGetter<string | undefined>
  invalid?:  MaybeRefOrGetter<boolean | undefined>
  required?: MaybeRefOrGetter<boolean | undefined>
  disabled?: MaybeRefOrGetter<boolean | undefined>
  hasHelpText: boolean      // plain: from slot/prop presence at setup
  ownsFeedback: boolean     // plain: same
  isGroupLabel: boolean     // plain: same
}
interface FieldConsumerOptions { rendersOwnFeedback?: boolean }  // default true
provideFieldContext(options: FieldProviderOptions): FieldContext
useFieldContext(own: FieldOwnProps, options?: FieldConsumerOptions): FieldContext

// mcl-forms/lib/common/useInputSurface.ts
interface InputSurfaceOptions {
  bgColor, textColor, borderColor: ColorPalette
  showBorder, showShadow, rounded: boolean
  showHighlight?: boolean    // optional: MclInputFile has no such prop
}
useInputSurface(options: InputSurfaceOptions): ComputedRef<string>

// mcl-forms/lib/common/useToggleControl.ts
interface ToggleControlOptions {
  size: InputSizeType
  bgColor, checkedBgColor, indicatorColor, borderColor: ColorPalette
  showShadow: boolean
  rounded?: boolean          // optional: MclInputRadio has no such prop
}
interface ToggleControl {
  boxClass: ComputedRef<string>    // colours, checked bg, focus ring, shadow, rounding
  sizeClass: ComputedRef<string>   // box + indicator dimensions
  switchVars: ComputedRef<Record<string, string>>   // CSS custom props, MclInputSwitch only
}
useToggleControl(options: ToggleControlOptions): ToggleControl

// mcl-forms/lib/common/FieldFeedback.vue
props: { id: string; invalid?: boolean; text?: string }   // + default slot

// mcl-forms/lib/assets/{CaretDown,XMark}.vue
props: { color?: ColorPalette; className?: string }       // color defaults 'dark-4'
```

**`name` has no id fallback in the context, deliberately.** A generated `name` reaching a native form submission is not something a consumer could opt out of. Grouped controls still inherit one because the provider defaults its own `name` to the field id. `MclInputRadio` — the one control where `name` is load-bearing — supplies its own fallback (Task 4).

## File structure

```
lib/
  common/                         # shipped in plan 1; Task 1 makes two corrections
    FieldFeedback.vue             # MODIFY: revert the content guard
    fieldContext.ts               # MODIFY: one JSDoc correction
  mcl-form-group/MclFormGroup.vue # REWRITE: becomes the provide/inject coordinator
  mcl-checkbox/MclCheckbox.vue    # REWRITE: useToggleControl + overlay input
  mcl-input-radio/MclInputRadio.vue   # REWRITE: gains v-model, name, disabled
  mcl-input-switch/MclInputSwitch.vue # REWRITE: fixes the double-toggle
  mcl-input-text/MclInputText.vue     # REWRITE: useInputSurface + FieldFeedback
  mcl-text-area/MclTextArea.vue       # REWRITE: gains an error region
  mcl-input-file/MclInputFile.vue     # REWRITE: fixes type="button" + double-fire
  mcl-select/
    useSelectFilter.ts            # NEW
    useSelectKeyboard.ts          # NEW
    MclSelect.vue                 # REWRITE: 460 -> ~180 lines
    index.types.ts                # unchanged
  index.ts                        # MODIFY: export the field types
```

Each component keeps one responsibility: its own markup, props and ARIA wiring. Shared logic already lives in `common/`; nothing new is added there beyond Task 1's corrections.

---

### Task 1: Foundation corrections

Two defects carried forward from plan 1's final review. Both are in `common/`, which every later task depends on, so they land first.

**Files:**
- Modify: `src/components/mcl-forms/lib/common/FieldFeedback.vue`
- Modify: `src/components/mcl-forms/lib/common/fieldContext.ts` (JSDoc only)
- Modify: `src/components/mcl-forms/lib/common/FieldFeedback.test.ts`
- Modify: `docs/superpowers/specs/2026-08-22-mcl-forms-refactor-design.md`

**Interfaces:**
- Consumes: nothing.
- Produces: `FieldFeedback` renders whenever `invalid` is true, regardless of content — restoring agreement with `useFieldContext`'s `errorRegionExists`.

**Why revert the content guard.** `FieldFeedback` currently renders under `invalid && (text || $slots.default)`, but `useFieldContext` computes `errorRegionExists = groupOwnsFeedback || rendersOwnFeedback` — a static flag decided at setup that cannot know whether content will be present. So a control that is invalid with no message emits `aria-describedby` naming an element that is never rendered. That dangling IDREF fails ARIA validation. An empty `role="alert"` region, by contrast, is inert: assistive technology has nothing to announce and moves on. The guard traded an inert no-op for a real defect.

- [ ] **Step 1: Update the failing test**

In `src/components/mcl-forms/lib/common/FieldFeedback.test.ts`, replace the case that locks in the empty-region behaviour. Find the test asserting the region is absent when invalid with no text or slot, and replace it with:

```ts
  it('renders the region when invalid even with no text or slot', () => {
    // The region must exist whenever it is an aria-describedby target.
    // useFieldContext decides errorRegionExists from a static flag at setup and
    // cannot know whether content is present, so a content-conditional region
    // produces a dangling IDREF. An empty alert region is inert by comparison.
    const wrapper = mount(FieldFeedback, {
      props: { id: 'email-error', invalid: true },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.text()).toBe('')
  })
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test FieldFeedback`
Expected: FAIL — `expected false to be true` on the new case.

- [ ] **Step 3: Revert the content guard**

In `src/components/mcl-forms/lib/common/FieldFeedback.vue`, change the root element's condition and comment:

```vue
<template>
  <!--
    Conditional rather than CSS-hidden on purpose: role="alert" announces on
    insertion into the DOM, so an always-rendered container never fires.

    The condition is `invalid` alone, deliberately. useFieldContext decides
    whether an error region exists from a static flag at setup, so making this
    depend on content would let aria-describedby name an element that is never
    rendered. An empty alert region is inert; a dangling IDREF is not.
  -->
  <div v-if="invalid" :id="id" role="alert" class="ml-3xs">
    <slot>
      <span class="text-xs text-danger">{{ text }}</span>
    </slot>
  </div>
</template>
```

- [ ] **Step 4: Correct the `useId` JSDoc claim**

In `src/components/mcl-forms/lib/common/fieldContext.ts`, the block comment above `usableId` states that `useId()` returns `undefined` outside a setup context. It returns `''`. Change that sentence to:

```
 * consumer can pass `id=""` and `useId()` returns `''` outside a setup
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd src/components/mcl-forms && pnpm test`
Expected: PASS. `FieldFeedback` has 7 cases; the whole `mcl-forms` project should be at its prior count.

- [ ] **Step 6: Align the spec**

In `docs/superpowers/specs/2026-08-22-mcl-forms-refactor-design.md`, section 6's `FieldFeedback` paragraph says it "Renders under `v-if="invalid"`". That is now accurate again — verify it, and if the sentence was amended to mention content, restore it to describe the `invalid`-only condition and state why (an empty region is inert; a dangling IDREF is not).

- [ ] **Step 7: Commit**

```bash
git add src/components/mcl-forms/lib/common/ docs/superpowers/specs/
git commit -m "fix(mcl-forms): render FieldFeedback whenever it is a describedby target

The content guard disagreed with useFieldContext's errorRegionExists,
which is a static flag decided at setup and cannot know whether
content is present - so an invalid control with no message named an
element that was never rendered. An empty alert region is inert; a
dangling IDREF fails ARIA validation.

Also corrects the useId() JSDoc: it returns '' outside a setup
context, not undefined."
```

---

### Task 2: `MclFormGroup` — the coordinator

The keystone component. Every other task's tests mount their control inside it.

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-form-group/MclFormGroup.vue`
- Test: `src/components/mcl-forms/lib/mcl-form-group/MclFormGroup.test.ts`

**Interfaces:**
- Consumes: `provideFieldContext`, `FieldProviderOptions` from `../common/fieldContext`; `FieldFeedback.vue`; `generateClass` from the theme.
- Produces: the provided `FieldContext` every control in Tasks 3-10 injects. Props: `fieldId?`, `groupLabel?`, `label?`, `helpText?`, `invalid?`, `invalidFeedback?`, `required?`, `disabled?`, `textColor?`, `textSize?`, `textBold?`. Slots: `default`, `label`, `help`, `invalid-feedback`.

**Breaking change:** `labelFor` (required) becomes `fieldId` (optional). It now drives both the label's `for` and the child's `id`, so `labelFor` no longer describes what it does.

**Three things this component must get right:**
1. **It builds an object literal for `provideFieldContext`** — unavoidable, because `hasHelpText` and `ownsFeedback` come from slot presence rather than props. So the four mutable values MUST be passed as getters (`() => props.invalid`), or they snapshot at setup and no control ever sees a change.
2. **It must carry `invalid` itself whenever it owns the feedback region.** Its `FieldFeedback` renders off `props.invalid`. A group with `invalidFeedback` set but `invalid` false, wrapping an invalid control, renders no error anywhere — the control has already skipped its own.
3. **`hasHelpText` / `ownsFeedback` are evaluated once at setup.** Derive them from prop-or-slot *presence*, never from a currently-truthy value, or the flag freezes wrong.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-form-group/MclFormGroup.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { useFieldContext } from '../common/fieldContext'
import type { FieldContext } from '../common/index.types'
import MclFormGroup from './MclFormGroup.vue'

/** A minimal control that reports the context it injected. */
const Probe = defineComponent({
  props: {
    id: { type: String, default: undefined },
    invalid: { type: Boolean, default: undefined },
    required: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  setup(props) {
    const ctx = useFieldContext(props)
    return { ctx }
  },
  render() {
    return h('input', {
      id: (this.ctx as FieldContext).id,
      'aria-describedby': (this.ctx as FieldContext).describedBy.value,
    })
  },
})

const ctxOf = (wrapper: any): FieldContext =>
  wrapper.findComponent(Probe).vm.ctx as FieldContext

describe('MclFormGroup — single-control (label) mode', () => {
  it('renders a label bound to the generated field id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Email')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('uses an explicit fieldId for both the label and the control', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(wrapper.find('label').attributes('for')).toBe('email')
    expect(wrapper.find('input').attributes('id')).toBe('email')
  })

  it('renders no fieldset in label mode', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(wrapper.find('fieldset').exists()).toBe(false)
  })

  it('prefers the label slot over the label prop', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Ignored' },
      slots: { label: '<span>Custom</span>', default: () => h(Probe) },
    })
    expect(wrapper.find('label').text()).toBe('Custom')
  })
})

describe('MclFormGroup — group (fieldset) mode', () => {
  it('renders a fieldset and legend instead of a label', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, label: 'Colour' },
      slots: { default: () => [h(Probe), h(Probe)] },
    })
    expect(wrapper.find('fieldset').exists()).toBe(true)
    expect(wrapper.find('legend').text()).toBe('Colour')
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('gives each control a distinct id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour' },
      slots: { default: () => [h(Probe), h(Probe), h(Probe)] },
    })
    const ids = wrapper.findAll('input').map((i) => i.attributes('id'))
    expect(new Set(ids).size).toBe(3)
    expect(ids).not.toContain('colour')
  })

  it('publishes isGroupLabel on the context', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, label: 'Colour' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).isGroupLabel).toBe(true)
  })
})

describe('MclFormGroup — help text', () => {
  it('renders help text with the description id and points controls at it', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', helpText: 'We never share it.' },
      slots: { default: () => h(Probe) },
    })
    const help = wrapper.find('#email-description')
    expect(help.exists()).toBe(true)
    expect(help.text()).toBe('We never share it.')
    expect(ctxOf(wrapper).descriptionId).toBe('email-description')
  })

  it('renders no description region and no descriptionId without help text', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(wrapper.find('#email-description').exists()).toBe(false)
    expect(ctxOf(wrapper).descriptionId).toBeUndefined()
  })

  it('treats a help slot as help text', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { help: '<em>Slotted</em>', default: () => h(Probe) },
    })
    expect(wrapper.find('#email-description').text()).toBe('Slotted')
  })
})

describe('MclFormGroup — feedback ownership', () => {
  it('owns the region when invalidFeedback is given and renders it when invalid', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        invalid: true,
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(Probe) },
    })
    const alert = wrapper.find('[role="alert"]')
    expect(alert.exists()).toBe(true)
    expect(alert.attributes('id')).toBe('email-error')
    expect(alert.text()).toBe('Required')
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
  })

  it('claims ownership from the slot alone', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalid: true },
      slots: { 'invalid-feedback': '<b>Bad</b>', default: () => h(Probe) },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Bad')
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
  })

  it('does not claim ownership with neither prop nor slot', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalid: true },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(false)
  })

  it('claims ownership even while valid, so the flag never freezes wrong', () => {
    // ownsFeedback is decided from *presence* at setup, never from a current
    // value. Deriving it from "is there an error right now" would freeze it.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalidFeedback: 'Required' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).feedbackOwnedByGroup).toBe(true)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})

describe('MclFormGroup — reactivity through the provider', () => {
  it('propagates a later invalid flip to the control', async () => {
    // The group must pass getters, not values. It builds an object literal
    // (hasHelpText/ownsFeedback come from slot presence), and a literal of
    // plain values would snapshot at setup and never update.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', invalidFeedback: 'Required' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).invalid.value).toBe(false)
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()

    await wrapper.setProps({ invalid: true })
    expect(ctxOf(wrapper).invalid.value).toBe(true)
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('email-error')
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('propagates required and disabled flips', async () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(Probe) },
    })
    expect(ctxOf(wrapper).required.value).toBe(false)
    await wrapper.setProps({ required: true, disabled: true })
    expect(ctxOf(wrapper).required.value).toBe(true)
    expect(ctxOf(wrapper).disabled.value).toBe(true)
  })
})

describe('MclFormGroup — label styling', () => {
  it('applies colour and size classes to the label text', () => {
    const wrapper = mount(MclFormGroup, {
      props: { label: 'Email', textColor: 'primary', textSize: 'lg', textBold: true },
      slots: { default: () => h(Probe) },
    })
    const text = wrapper.find('label p')
    expect(text.classes()).toContain('text-primary')
    expect(text.classes()).toContain('font-bold')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclFormGroup`
Expected: FAIL — the current component has no `fieldId`, no fieldset mode, and provides nothing.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-form-group/MclFormGroup.vue` entirely:

```vue
<script setup lang="ts">
import type { BodyText, ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import FieldFeedback from '../common/FieldFeedback.vue'
import { provideFieldContext } from '../common/fieldContext'

const props = withDefaults(
  defineProps<{
    /** Drives both the label's `for` and the descendant control's id. */
    fieldId?: string
    /** Render `<fieldset>`/`<legend>` instead of `<label>`, for radio and checkbox sets. */
    groupLabel?: boolean
    label?: string
    helpText?: string
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
    textColor?: ColorPalette
    textSize?: BodyText
    textBold?: boolean
  }>(),
  {
    groupLabel: false,
    textColor: 'dark-3',
    textSize: 'md',
    textBold: false,
    // Explicit `undefined` so an omitted prop stays undefined rather than
    // being coerced to false by Vue's boolean casting. Descendant controls
    // read `undefined` as "nothing to inherit".
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const slots = defineSlots<{
  default?: () => unknown
  label?: () => unknown
  help?: () => unknown
  'invalid-feedback'?: () => unknown
}>()

// Both flags are decided once, from *presence* rather than from a current
// value. Deriving them from truthiness would freeze them at their mount-time
// answer: an error appearing on submit would then wire up wrong.
const hasHelpText = Boolean(props.helpText || slots.help)
const ownsFeedback = Boolean(props.invalidFeedback || slots['invalid-feedback'])

// Getters, not values. This is an object literal — it has to be, because the
// three flags above are not props — and a literal of plain values would
// snapshot at setup, so no control would ever see a change.
const field = provideFieldContext({
  fieldId: props.fieldId,
  invalid: () => props.invalid,
  required: () => props.required,
  disabled: () => props.disabled,
  hasHelpText,
  ownsFeedback,
  isGroupLabel: props.groupLabel,
})

const labelTextClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.textColorVariant({ color: props.textColor }),
    generateClass.bodyTextVariant({ size: props.textSize }),
  ]
  if (props.textBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
</script>

<template>
  <!--
    Fieldset mode is the correct structure for a set of controls: the legend
    labels the set and no `for` attribute exists, which is why descendants
    generate their own ids there.
  -->
  <fieldset v-if="groupLabel">
    <legend class="inline-block">
      <slot name="label">
        <p class="mb-2xs" :class="labelTextClass">{{ label }}</p>
      </slot>
    </legend>
    <p v-if="hasHelpText" :id="field.descriptionId" class="mb-2xs text-xs">
      <slot name="help">{{ helpText }}</slot>
    </p>
    <slot />
    <!--
      A group that owns the feedback region must carry `invalid` itself: this
      renders off the group's own prop, and descendants have already skipped
      their own region.
    -->
    <field-feedback
      v-if="ownsFeedback"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </fieldset>

  <div v-else>
    <label :for="field.id" class="inline-block">
      <slot name="label">
        <p class="mb-2xs" :class="labelTextClass">{{ label }}</p>
      </slot>
    </label>
    <p v-if="hasHelpText" :id="field.descriptionId" class="mb-2xs text-xs">
      <slot name="help">{{ helpText }}</slot>
    </p>
    <slot />
    <field-feedback
      v-if="ownsFeedback"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclFormGroup`
Expected: PASS, 17 tests.

- [ ] **Step 5: Verify the reactivity test genuinely catches a frozen provider**

Temporarily change `invalid: () => props.invalid` to `invalid: props.invalid` in the `provideFieldContext` call. Run `pnpm test MclFormGroup`. Expected: the "propagates a later invalid flip" test FAILS. Restore the getter, re-run, confirm PASS. Report both observations — this is the guard against the single defect most likely to be reintroduced.

- [ ] **Step 6: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-form-group/
git commit -m "feat(mcl-forms)!: make MclFormGroup the field context coordinator

Renames labelFor to fieldId and makes it optional, adds groupLabel
for fieldset/legend structure, help text with a description region,
and a single error region the group owns when given invalidFeedback.

Provides the field context so descendant controls stop wiring
aria-describedby individually - which is why MclTextArea and
MclSelect never had error regions at all.

BREAKING CHANGE: labelFor is renamed to fieldId and is now optional."
```

---

### Task 3: `MclCheckbox`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-checkbox/MclCheckbox.vue`
- Test: `src/components/mcl-forms/lib/mcl-checkbox/MclCheckbox.test.ts`

**Interfaces:**
- Consumes: `useToggleControl` and `useFieldContext` from `../common/`; `InputSizeType` from `../common/index.types`.
- Produces: props `size?`, `bgColor?`, `checkedBgColor?`, `indicatorColor?`, `borderColor?`, `showShadow?`, `rounded?`, `value?`, plus `FieldOwnProps` (`id?`, `name?`, `invalid?`, `required?`, `disabled?`). `v-model` is `boolean`. Emits `change(event: Event)`.

**Breaking changes:** `inputSize` → `size`; `checkColor` → `indicatorColor`; the `checked` prop is removed; the `checkbox-click` emit becomes `change(event)`.

**Why `checked` goes.** `:checked="checked"` bound alongside `v-model` is two competing sources of truth — the prop wins on first render, then the model diverges. `v-model` becomes the only channel.

**The overlay input pattern.** The native input is absolutely positioned over the visual box at `opacity-0`, full size, `cursor-pointer`, and carries `peer`. The visual `<span>` follows it as a sibling (Tailwind's `peer-*` compiles to a sibling selector, so input-before-span is required) and is styled entirely through `peer-checked:` / `peer-focus-visible:` / `peer-disabled:`. Click and keyboard both land on the real input, so `checkboxRef` and `handleCheckboxClick` are deleted — no JS click forwarding at all — and a focus ring exists for the first time.

**This deletes the local `peerBgColor` and `beforeColor` maps,** including their `'dark-4': '…bg-dark-1'` typo. The replacement `generateClass` variants map `dark-4` correctly, so anyone using `dark-4` sees a visual change. Plan 3's migration guide notes it.

**`rendersOwnFeedback: false`** — this control renders no error region, so without that flag a group carrying `invalid` with no `invalidFeedback` would give it an `aria-describedby` naming nothing.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-checkbox/MclCheckbox.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclCheckbox from './MclCheckbox.vue'

describe('MclCheckbox — structure', () => {
  it('renders a native checkbox and an aria-hidden visual box', () => {
    const wrapper = mount(MclCheckbox, { props: { id: 'agree' } })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('agree')
    expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
  })

  it('puts the input before the visual box so peer-* selectors apply', () => {
    // Tailwind's peer-* compiles to a sibling selector, so the input must
    // precede the span in DOM order or none of the visual states work.
    const html = mount(MclCheckbox, { props: { id: 'agree' } }).html()
    expect(html.indexOf('<input')).toBeLessThan(html.indexOf('<span'))
  })

  it('overlays the input at opacity-0 rather than hiding it', () => {
    // sr-only or display:none would remove it as a click target; the whole
    // point is that the native input IS the click and focus target.
    const classes = mount(MclCheckbox, { props: { id: 'agree' } })
      .find('input')
      .classes()
    expect(classes).toContain('peer')
    expect(classes).toContain('opacity-0')
    expect(classes).toContain('absolute')
    expect(classes).not.toContain('sr-only')
  })

  it('gives the visual box a focus-visible ring', () => {
    // This is the WCAG 2.4.7 fix: before the refactor there was no focus
    // indicator of any kind on this control.
    const span = mount(MclCheckbox, { props: { id: 'agree' } }).find('span')
    expect(span.classes().join(' ')).toContain('peer-focus-visible:ring')
  })

  it('exposes no click handler on the visual box', () => {
    // The old implementation forwarded clicks with checkboxRef.click().
    const wrapper = mount(MclCheckbox, { props: { id: 'agree' } })
    expect(wrapper.find('span').attributes('onclick')).toBeUndefined()
  })
})

describe('MclCheckbox — v-model and change', () => {
  it('updates the model when toggled', async () => {
    const wrapper = mount(MclCheckbox, {
      props: { id: 'agree', modelValue: false },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('reflects the model in the input checked state', () => {
    const wrapper = mount(MclCheckbox, {
      props: { id: 'agree', modelValue: true },
    })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('emits change with the native event', async () => {
    const wrapper = mount(MclCheckbox, { props: { id: 'agree' } })
    await wrapper.find('input').trigger('change')
    const change = wrapper.emitted('change')
    expect(change).toBeTruthy()
    expect(change![0][0]).toBeInstanceOf(Event)
  })

  it('accepts no `checked` prop', () => {
    // Removed: :checked alongside v-model is two sources of truth.
    expect(Object.keys(MclCheckbox.props ?? {})).not.toContain('checked')
  })
})

describe('MclCheckbox — colours and size', () => {
  it('maps dark-4 correctly, unlike the map it replaces', () => {
    // The deleted local map sent dark-4 to bg-dark-1.
    const span = mount(MclCheckbox, {
      props: { id: 'agree', checkedBgColor: 'dark-4' },
    }).find('span')
    expect(span.classes()).toContain('peer-checked:bg-dark-4')
  })

  it('applies indicatorColor to the checkmark', () => {
    const span = mount(MclCheckbox, {
      props: { id: 'agree', indicatorColor: 'white' },
    }).find('span')
    expect(span.classes()).toContain('before:bg-white')
  })

  it('applies the size classes', () => {
    const span = mount(MclCheckbox, { props: { id: 'agree', size: 'lg' } }).find('span')
    expect(span.classes()).toContain('h-md')
    expect(span.classes()).toContain('w-md')
  })
})

describe('MclCheckbox — field context', () => {
  it('generates an id when none is given', () => {
    const id = mount(MclCheckbox).find('input').attributes('id')
    expect(id).toBeTruthy()
    expect(id).not.toBe('')
  })

  it('inherits disabled and required from the group', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'agree', label: 'Agree', disabled: true, required: true },
      slots: { default: () => h(MclCheckbox) },
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
  })

  it('an explicit disabled=false overrides an inherited true', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'agree', label: 'Agree', disabled: true },
      slots: { default: () => h(MclCheckbox, { disabled: false }) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
  })

  it('does not claim an error region it never renders', () => {
    // rendersOwnFeedback: false. A group carrying invalid with no
    // invalidFeedback renders no region, so describedby must stay empty.
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'agree', label: 'Agree', invalid: true },
      slots: { default: () => h(MclCheckbox) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('points at the group error region when the group owns one', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'agree',
        label: 'Agree',
        invalid: true,
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(MclCheckbox) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('agree-error')
    expect(wrapper.find('#agree-error').exists()).toBe(true)
  })

  it('binds name and value for native form submission', () => {
    const input = mount(MclCheckbox, {
      props: { id: 'agree', name: 'terms', value: 'yes' },
    }).find('input')
    expect(input.attributes('name')).toBe('terms')
    expect(input.attributes('value')).toBe('yes')
  })

  it('emits no name when neither given nor inherited', () => {
    // A generated name would silently enter form submissions.
    expect(mount(MclCheckbox).find('input').attributes('name')).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclCheckbox`
Expected: FAIL — the current component has `inputSize`/`checkColor`/`checked`, no focus ring, and no field context.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-checkbox/MclCheckbox.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { useFieldContext } from '../common/fieldContext'
import type { InputSizeType } from '../common/index.types'
import { useToggleControl } from '../common/useToggleControl'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    size?: InputSizeType
    bgColor?: ColorPalette
    checkedBgColor?: ColorPalette
    indicatorColor?: ColorPalette
    borderColor?: ColorPalette
    showShadow?: boolean
    rounded?: boolean
    /** Submitted value when checked; native form behaviour only. */
    value?: string | number
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'warning',
    indicatorColor: 'dark-3',
    borderColor: 'dark-1',
    showShadow: false,
    rounded: false,
    // Explicit `undefined` so omission stays distinguishable from `false`;
    // `undefined` is what lets the surrounding group's value through.
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<boolean>()

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

// rendersOwnFeedback: false — this control renders no error region, so
// aria-describedby must not name one unless the group provides it.
const field = useFieldContext(props, { rendersOwnFeedback: false })
// props proxy passed directly: a spread literal would snapshot and freeze.
const { boxClass, sizeClass } = useToggleControl(props)

const onChange = (event: Event): void => {
  emit('change', event)
}
</script>

<template>
  <div class="relative inline-flex">
    <!--
      The native input is the click and focus target, overlaid transparently
      on the visual box. No JS click forwarding, and keyboard operation comes
      free. It must precede the span: peer-* compiles to a sibling selector.
    -->
    <input
      :id="field.id"
      v-model="model"
      type="checkbox"
      class="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
      :name="field.name.value"
      :value="value"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
      @change="onChange"
    />
    <span
      aria-hidden="true"
      class="relative inline-block border p-3xs transition-colors duration-200 ease-linear before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:opacity-0 before:transition-opacity before:duration-200 peer-checked:before:opacity-100 peer-disabled:opacity-50"
      :class="[boxClass, sizeClass]"
    ></span>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclCheckbox`
Expected: PASS, 19 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-checkbox/
git commit -m "feat(mcl-forms)!: rewrite MclCheckbox on useToggleControl

Deletes the two hand-written 17-entry colour maps (and their shared
dark-4 typo) in favour of the theme variants, and replaces the JS
click-forwarding with an overlaid native input so click and keyboard
both hit the real control - which also gives it a visible focus
indicator for the first time.

BREAKING CHANGE: inputSize is renamed to size, checkColor to
indicatorColor, the checked prop is removed in favour of v-model, and
the checkbox-click emit becomes change(event). Fixing the dark-4 typo
changes the rendered colour for anyone using dark-4."
```

---

### Task 4: `MclInputRadio`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-input-radio/MclInputRadio.vue`
- Test: `src/components/mcl-forms/lib/mcl-input-radio/MclInputRadio.test.ts`

**Interfaces:**
- Consumes: `useToggleControl`, `useFieldContext`, `InputSizeType`.
- Produces: props `size?`, `bgColor?`, `checkedBgColor?`, `indicatorColor?`, `borderColor?`, `showShadow?`, `value?`, plus `FieldOwnProps`. `v-model` is `string | number | null`. Emits `change(event: Event)`.

**`borderColor` is new on this component and is not optional to omit.** `ToggleControlOptions.borderColor` is a *required* field — it colours both the border and the focus ring — so a component without it cannot pass its props proxy, and reaching for `{ ...props, borderColor: 'dark-1' }` instead would snapshot every value at setup. Declare the prop.

**Breaking changes:** `radioSize` → `size`; `bgColor` keeps its name but is now the unchecked track colour; `checkedColor` → `indicatorColor`; the `checked` prop is removed. **It gains `v-model`, which it never had** — radio groups were not buildable before.

**No `rounded` prop, deliberately.** Shape is how users distinguish a radio from a checkbox, so it stays circular. `useToggleControl.rounded` is optional precisely so this component can pass its props proxy as-is.

**This is the one control that supplies its own `name` fallback.** The context deliberately has no id fallback for `name`, because a generated name reaching a form submission is not opt-out-able for the other seven controls. For a radio, `name` is what groups the set, so falling back to the resolved id is correct here and nowhere else.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-input-radio/MclInputRadio.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputRadio from './MclInputRadio.vue'

describe('MclInputRadio — structure', () => {
  it('renders a native radio and an aria-hidden visual dot', () => {
    const wrapper = mount(MclInputRadio, { props: { id: 'red', value: 'red' } })
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    expect(wrapper.find('span[aria-hidden="true"]').exists()).toBe(true)
  })

  it('puts the input before the visual dot so peer-* selectors apply', () => {
    const html = mount(MclInputRadio, { props: { id: 'red' } }).html()
    expect(html.indexOf('<input')).toBeLessThan(html.indexOf('<span'))
  })

  it('gives the visual dot a focus-visible ring', () => {
    const span = mount(MclInputRadio, { props: { id: 'red' } }).find('span')
    expect(span.classes().join(' ')).toContain('peer-focus-visible:ring')
  })

  it('stays circular and accepts no rounded prop', () => {
    // Shape is how users tell a radio from a checkbox.
    const wrapper = mount(MclInputRadio, { props: { id: 'red' } })
    expect(wrapper.find('span').classes()).toContain('rounded-full')
    expect(Object.keys(MclInputRadio.props ?? {})).not.toContain('rounded')
  })

  it('accepts no `checked` prop', () => {
    expect(Object.keys(MclInputRadio.props ?? {})).not.toContain('checked')
  })
})

describe('MclInputRadio — v-model', () => {
  it('emits its value on selection', async () => {
    const wrapper = mount(MclInputRadio, {
      props: { id: 'red', value: 'red', modelValue: null },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['red'])
  })

  it('is checked when the model matches its value', () => {
    const wrapper = mount(MclInputRadio, {
      props: { id: 'red', value: 'red', modelValue: 'red' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(true)
  })

  it('is unchecked when the model is a different value', () => {
    const wrapper = mount(MclInputRadio, {
      props: { id: 'red', value: 'red', modelValue: 'blue' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).checked).toBe(false)
  })

  it('emits change with the native event', async () => {
    const wrapper = mount(MclInputRadio, { props: { id: 'red', value: 'red' } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('change')![0][0]).toBeInstanceOf(Event)
  })
})

describe('MclInputRadio — grouping by name', () => {
  it('falls back to its own id when no name is given or inherited', () => {
    // This control is the sole exception to the context's no-id-fallback rule,
    // because name is what makes a radio set behave as one.
    const input = mount(MclInputRadio, { props: { id: 'red', value: 'red' } }).find('input')
    expect(input.attributes('name')).toBe('red')
  })

  it('prefers an explicit name', () => {
    const input = mount(MclInputRadio, {
      props: { id: 'red', name: 'colour', value: 'red' },
    }).find('input')
    expect(input.attributes('name')).toBe('colour')
  })

  it('shares one inherited name across a fieldset group, with distinct ids', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour' },
      slots: {
        default: () => [
          h(MclInputRadio, { value: 'red' }),
          h(MclInputRadio, { value: 'green' }),
          h(MclInputRadio, { value: 'blue' }),
        ],
      },
    })
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(3)
    expect(inputs.map((i) => i.attributes('name'))).toEqual([
      'colour',
      'colour',
      'colour',
    ])
    const ids = inputs.map((i) => i.attributes('id'))
    expect(new Set(ids).size).toBe(3)
  })
})

describe('MclInputRadio — colours, size, context', () => {
  it('applies the checked background and the indicator colour', () => {
    const span = mount(MclInputRadio, {
      props: { id: 'red', checkedBgColor: 'success', indicatorColor: 'white' },
    }).find('span')
    expect(span.classes()).toContain('peer-checked:bg-success')
    expect(span.classes()).toContain('before:bg-white')
  })

  it('applies the size classes', () => {
    const span = mount(MclInputRadio, { props: { id: 'red', size: 'sm' } }).find('span')
    expect(span.classes()).toContain('h-xs')
  })

  it('inherits disabled from the group', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour', disabled: true },
      slots: { default: () => h(MclInputRadio, { value: 'red' }) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('does not claim an error region it never renders', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour', invalid: true },
      slots: { default: () => h(MclInputRadio, { value: 'red' }) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('generates its own element id inside a fieldset rather than taking the group id', () => {
    const wrapper = mount(MclFormGroup, {
      props: { groupLabel: true, fieldId: 'colour', label: 'Colour' },
      slots: { default: () => h(MclInputRadio, { value: 'red' }) },
    })
    const id = wrapper.find('input').attributes('id')
    expect(id).toBeTruthy()
    expect(id).not.toBe('colour')
  })

  it('applies the border colour to the focus ring', () => {
    const span = mount(MclInputRadio, {
      props: { id: 'red', borderColor: 'primary' },
    }).find('span')
    expect(span.classes()).toContain('peer-focus-visible:ring-primary')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclInputRadio`
Expected: FAIL — the current component has no `defineModel`, no `name`, and no focus ring.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-input-radio/MclInputRadio.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'
import { useFieldContext } from '../common/fieldContext'
import type { InputSizeType } from '../common/index.types'
import { useToggleControl } from '../common/useToggleControl'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    size?: InputSizeType
    bgColor?: ColorPalette
    checkedBgColor?: ColorPalette
    indicatorColor?: ColorPalette
    /** Also the focus-ring colour, via useToggleControl. */
    borderColor?: ColorPalette
    showShadow?: boolean
    value?: string | number
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'light-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
    value: '',
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string | number | null>({ default: null })

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

const field = useFieldContext(props, { rendersOwnFeedback: false })
// No `rounded` prop here, so useToggleControl's optional `rounded` is what
// lets the props proxy be passed straight through.
const { boxClass, sizeClass } = useToggleControl(props)

/**
 * The context deliberately has no id fallback for `name` — a generated name
 * entering a form submission is not opt-out-able for the other controls. A
 * radio is the exception: `name` is what makes the set behave as one, so
 * falling back to the resolved id is correct here and nowhere else.
 */
const radioName = computed<string>(() => field.name.value ?? field.id)

const onChange = (event: Event): void => {
  emit('change', event)
}
</script>

<template>
  <div class="relative inline-flex">
    <input
      :id="field.id"
      v-model="model"
      type="radio"
      class="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
      :name="radioName"
      :value="value"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
      @change="onChange"
    />
    <span
      aria-hidden="true"
      class="relative inline-block rounded-full border transition-colors duration-200 ease-linear before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:opacity-0 before:transition-opacity before:duration-200 peer-checked:before:opacity-100 peer-disabled:opacity-50"
      :class="[boxClass, sizeClass]"
    ></span>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclInputRadio`
Expected: PASS, 18 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-input-radio/
git commit -m "feat(mcl-forms)!: rewrite MclInputRadio with v-model and grouping

The control had no defineModel and no name prop, so radio groups were
not buildable and native arrow-key grouping did not work. It now
carries both, falls back to its resolved id for name (the one control
where that is correct), and gains a visible focus indicator.

BREAKING CHANGE: radioSize is renamed to size and checkedColor to
indicatorColor; the checked prop is removed in favour of v-model; the
change emit now carries only the native Event."
```

---

### Task 5: `MclInputSwitch`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-input-switch/MclInputSwitch.vue`
- Test: `src/components/mcl-forms/lib/mcl-input-switch/MclInputSwitch.test.ts`

**Interfaces:**
- Consumes: `useToggleControl` (for `switchVars` and `boxClass`), `useFieldContext`, `InputSizeType`.
- Produces: props `size?`, `bgColor?`, `checkedBgColor?`, `indicatorColor?`, `borderColor?`, `showShadow?`, `rounded?`, plus `FieldOwnProps`. `v-model` is `boolean`. Emits `change(event: Event)`.

**Breaking changes (renames only):** `switchSize` → `size`; `offColor` → `bgColor`; `onColor` → `checkedBgColor`; `sliderColor` → `indicatorColor`.

**Two bugs this fixes:**
1. **A double toggle.** The outer `div` carried `@click="onSwitchClick"` which called `inputRef.click()`. A click landing on the contained input bubbled to that handler and toggled again. The overlay pattern removes both the handler and the ref.
2. **`:aria-checked` is dropped.** HTML-AAM already maps a checkbox's native `checked` state to `aria-checked`, so a hand-bound copy is redundant and can only desync. `role="switch"` stays.

**The SCSS stays.** The knob's translate distance is `var(--slider-size)`, which must match the track dimensions, so it cannot be expressed in utilities. `switchVars` from `useToggleControl` supplies the custom properties.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-input-switch/MclInputSwitch.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputSwitch from './MclInputSwitch.vue'

describe('MclInputSwitch — structure and ARIA', () => {
  it('renders a checkbox with role="switch"', () => {
    const input = mount(MclInputSwitch, { props: { id: 'notify' } }).find('input')
    expect(input.attributes('type')).toBe('checkbox')
    expect(input.attributes('role')).toBe('switch')
  })

  it('does not hand-bind aria-checked', () => {
    // HTML-AAM maps a checkbox's native checked state already; a bound copy
    // is redundant and can only desync.
    const wrapper = mount(MclInputSwitch, { props: { id: 'notify', modelValue: true } })
    expect(wrapper.find('input').attributes('aria-checked')).toBeUndefined()
  })

  it('puts the input before the slider so peer-* selectors apply', () => {
    const html = mount(MclInputSwitch, { props: { id: 'notify' } }).html()
    expect(html.indexOf('<input')).toBeLessThan(html.indexOf('<span'))
  })

  it('gives the slider a focus-visible ring', () => {
    const span = mount(MclInputSwitch, { props: { id: 'notify' } }).find('span')
    expect(span.classes().join(' ')).toContain('peer-focus-visible:ring')
  })

  it('has no click handler on the wrapper', () => {
    // The old wrapper handler double-toggled: a click on the contained input
    // bubbled up and called inputRef.click() again.
    const wrapper = mount(MclInputSwitch, { props: { id: 'notify' } })
    expect(wrapper.find('div').attributes('onclick')).toBeUndefined()
  })
})

describe('MclInputSwitch — toggling', () => {
  it('toggles the model exactly once per interaction', async () => {
    const wrapper = mount(MclInputSwitch, {
      props: { id: 'notify', modelValue: false },
    })
    await wrapper.find('input').setValue(true)
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual([true])
  })

  it('emits change with the native event', async () => {
    const wrapper = mount(MclInputSwitch, { props: { id: 'notify' } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('change')![0][0]).toBeInstanceOf(Event)
  })
})

describe('MclInputSwitch — sizing and colours', () => {
  it('sets the CSS custom properties for md', () => {
    const style = mount(MclInputSwitch, { props: { id: 'notify' } })
      .find('div')
      .attributes('style')
    expect(style).toContain('--switch-width: 45px')
    expect(style).toContain('--slider-size: 19.5px')
  })

  it('sets larger custom properties for lg', () => {
    const style = mount(MclInputSwitch, { props: { id: 'notify', size: 'lg' } })
      .find('div')
      .attributes('style')
    expect(style).toContain('--switch-width: 60px')
  })

  it('applies bgColor as the off track and checkedBgColor as the on track', () => {
    const span = mount(MclInputSwitch, {
      props: { id: 'notify', bgColor: 'dark-1', checkedBgColor: 'success' },
    }).find('span')
    expect(span.classes()).toContain('mcl-bg-dark-1')
    expect(span.classes()).toContain('peer-checked:bg-success')
  })

  it('applies indicatorColor to the knob', () => {
    const span = mount(MclInputSwitch, {
      props: { id: 'notify', indicatorColor: 'white' },
    }).find('span')
    expect(span.classes()).toContain('before:bg-white')
  })

  it('maps dark-4 correctly, unlike the map it replaces', () => {
    const span = mount(MclInputSwitch, {
      props: { id: 'notify', checkedBgColor: 'dark-4' },
    }).find('span')
    expect(span.classes()).toContain('peer-checked:bg-dark-4')
  })
})

describe('MclInputSwitch — field context', () => {
  it('inherits disabled from the group', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'notify', label: 'Notify', disabled: true },
      slots: { default: () => h(MclInputSwitch) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('does not claim an error region it never renders', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'notify', label: 'Notify', invalid: true },
      slots: { default: () => h(MclInputSwitch) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeUndefined()
  })

  it('takes the group id in single-control mode', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'notify', label: 'Notify' },
      slots: { default: () => h(MclInputSwitch) },
    })
    expect(wrapper.find('input').attributes('id')).toBe('notify')
    expect(wrapper.find('label').attributes('for')).toBe('notify')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclInputSwitch`
Expected: FAIL — the current component uses `switchSize`/`onColor`/`offColor`/`sliderColor`, binds `aria-checked`, and has a wrapper click handler.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-input-switch/MclInputSwitch.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { useFieldContext } from '../common/fieldContext'
import type { InputSizeType } from '../common/index.types'
import { useToggleControl } from '../common/useToggleControl'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    size?: InputSizeType
    /** The track colour when off. */
    bgColor?: ColorPalette
    /** The track colour when on. */
    checkedBgColor?: ColorPalette
    /** The sliding knob. */
    indicatorColor?: ColorPalette
    borderColor?: ColorPalette
    showShadow?: boolean
    rounded?: boolean
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    bgColor: 'dark-1',
    checkedBgColor: 'success',
    indicatorColor: 'light-1',
    borderColor: 'dark-1',
    showShadow: false,
    rounded: true,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<boolean>()

const emit = defineEmits<{
  (e: 'change', event: Event): void
}>()

const field = useFieldContext(props, { rendersOwnFeedback: false })
const { boxClass, switchVars } = useToggleControl(props)

const onChange = (event: Event): void => {
  emit('change', event)
}
</script>

<template>
  <!--
    No click handler on this wrapper, deliberately. The old one called
    inputRef.click(), so a click that originated on the contained input
    bubbled up and toggled a second time.
  -->
  <div class="switch relative" :style="switchVars">
    <input
      :id="field.id"
      v-model="model"
      type="checkbox"
      role="switch"
      class="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 disabled:cursor-not-allowed"
      :name="field.name.value"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
      @change="onChange"
    />
    <span
      aria-hidden="true"
      class="slider absolute inset-0 transition-all duration-300 before:absolute before:transition-all before:duration-300 peer-disabled:opacity-50"
      :class="boxClass"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
/* The knob's travel distance has to match the track dimensions, so these stay
   in CSS driven by the custom properties useToggleControl supplies. */
.switch {
  width: var(--switch-width);
  height: var(--switch-height);
}

.slider:before {
  content: '';
  height: var(--slider-size);
  width: var(--slider-size);
  left: var(--gutter-size);
  bottom: var(--gutter-size);
}

input:checked + .slider:before {
  transform: translateX(var(--slider-size));
}
</style>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclInputSwitch`
Expected: PASS, 15 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-input-switch/
git commit -m "feat(mcl-forms)!: rewrite MclInputSwitch on useToggleControl

Fixes a double toggle: the wrapper div called inputRef.click(), so a
click originating on the contained input bubbled up and toggled
again. The overlay pattern removes both the handler and the ref, and
adds the focus indicator the control never had.

Drops the hand-bound aria-checked - HTML-AAM already maps a
checkbox's native checked state, so the copy could only desync.

BREAKING CHANGE: switchSize is renamed to size, offColor to bgColor,
onColor to checkedBgColor, and sliderColor to indicatorColor. Fixing
the dark-4 typo changes the rendered colour for anyone using dark-4."
```

---

### Task 6: `MclInputText`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-input-text/MclInputText.vue`
- Test: `src/components/mcl-forms/lib/mcl-input-text/MclInputText.test.ts`

**Interfaces:**
- Consumes: `useInputSurface`, `useFieldContext`, `FieldFeedback.vue`, `InputHighlight.vue`; `InputType` from the theme.
- Produces: props `id?`, `name?`, `type?`, `placeholder?`, `autocomplete?`, `showBorder?`, `borderColor?`, `rounded?`, `showHighlight?`, `highlightColor?`, `textColor?`, `bgColor?`, `showShadow?`, `invalidFeedback?`, `minLength?`, `maxLength?`, `pattern?`, `invalid?`, `required?`, `disabled?`. `v-model` is `string`. Slot: `invalid-feedback`.

**Breaking changes:** `id` becomes optional; `invalid` no longer defaults to `false`; **the native-validity CSS display is removed**.

**Why the CSS validity display goes.** Today error *visibility* comes from `peer-invalid/validation` CSS while `aria-describedby` comes from the `invalid` prop — two sources of truth that can disagree, so the field can display an error screen readers never learn about. The spec's phase-04 decision chose prop-driven validation for framework-agnosticism; this finishes it. Consumers relying on automatic native display must now bind `:invalid`.

**The error region renders only when the group does not own one.** `field.feedbackOwnedByGroup` decides. Rendering both would produce two regions with the same id.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-input-text/MclInputText.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputText from './MclInputText.vue'

describe('MclInputText — basics', () => {
  it('renders a text input with a generated id when none is given', () => {
    const input = mount(MclInputText).find('input')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('id')).toBeTruthy()
  })

  it('accepts the widened input types', () => {
    const input = mount(MclInputText, { props: { type: 'search' } }).find('input')
    expect(input.attributes('type')).toBe('search')
  })

  it('binds name, autocomplete, placeholder and the constraint attributes', () => {
    const input = mount(MclInputText, {
      props: {
        id: 'email',
        name: 'email',
        autocomplete: 'email',
        placeholder: 'you@example.com',
        minLength: 3,
        maxLength: 40,
        pattern: '.+@.+',
      },
    }).find('input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('autocomplete')).toBe('email')
    expect(input.attributes('placeholder')).toBe('you@example.com')
    expect(input.attributes('minlength')).toBe('3')
    expect(input.attributes('maxlength')).toBe('40')
    expect(input.attributes('pattern')).toBe('.+@.+')
  })

  it('updates the model on input', async () => {
    const wrapper = mount(MclInputText, { props: { id: 'email', modelValue: '' } })
    await wrapper.find('input').setValue('hello')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })

  it('applies the surface classes', () => {
    const input = mount(MclInputText, {
      props: { id: 'email', bgColor: 'light-1', textColor: 'black', showShadow: true },
    }).find('input')
    expect(input.classes()).toContain('mcl-bg-light-1')
    expect(input.classes()).toContain('text-black')
    expect(input.classes()).toContain('shadow-md')
  })

  it('carries the peer class so the highlight bar reacts to focus', () => {
    expect(mount(MclInputText, { props: { id: 'email' } }).find('input').classes()).toContain(
      'peer',
    )
  })

  it('renders the highlight bar only when showHighlight is true', () => {
    const withBar = mount(MclInputText, { props: { id: 'email', showHighlight: true } })
    const withoutBar = mount(MclInputText, { props: { id: 'email', showHighlight: false } })
    expect(withBar.findAll('div').length).toBeGreaterThan(withoutBar.findAll('div').length)
  })

  it('uses a focus-visible ring when the highlight bar is off', () => {
    const input = mount(MclInputText, {
      props: { id: 'email', showHighlight: false, borderColor: 'primary' },
    }).find('input')
    expect(input.classes()).toContain('focus-visible:ring-primary')
  })
})

describe('MclInputText — validation', () => {
  it('sets no aria-invalid while valid', () => {
    const input = mount(MclInputText, { props: { id: 'email' } }).find('input')
    expect(input.attributes('aria-invalid')).toBeUndefined()
  })

  it('sets aria-invalid and points describedby at its own error region', () => {
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalid: true, invalidFeedback: 'Required' },
    })
    const input = wrapper.find('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe('email-error')
    const alert = wrapper.find('[role="alert"]')
    expect(alert.attributes('id')).toBe('email-error')
    expect(alert.text()).toBe('Required')
  })

  it('renders no error region while valid', () => {
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalidFeedback: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('inserts the alert on becoming invalid, so role=alert fires', async () => {
    // role="alert" announces on insertion. The old implementation kept the
    // container in the DOM and hid it with CSS, so it never announced.
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalid: false, invalidFeedback: 'Required' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ invalid: true })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('prefers the invalid-feedback slot', () => {
    const wrapper = mount(MclInputText, {
      props: { id: 'email', invalid: true, invalidFeedback: 'Ignored' },
      slots: { 'invalid-feedback': '<b>Custom</b>' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Custom')
  })

  it('uses no peer-invalid CSS to drive visibility', () => {
    // Removed on purpose: CSS-driven visibility disagreed with the
    // prop-driven aria wiring, so an error could show with no announcement.
    expect(mount(MclInputText, { props: { id: 'email' } }).html()).not.toContain(
      'peer-invalid',
    )
  })
})

describe('MclInputText — inside a group', () => {
  it('takes the group id and lets the label bind to it', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email' },
      slots: { default: () => h(MclInputText) },
    })
    expect(wrapper.find('input').attributes('id')).toBe('email')
    expect(wrapper.find('label').attributes('for')).toBe('email')
  })

  it('defers to the group error region and renders none of its own', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        invalid: true,
        invalidFeedback: 'From the group',
      },
      slots: { default: () => h(MclInputText, { invalidFeedback: 'Mine' }) },
    })
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('From the group')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('email-error')
  })

  it('points describedby at description then error, in that order', () => {
    const wrapper = mount(MclFormGroup, {
      props: {
        fieldId: 'email',
        label: 'Email',
        helpText: 'We never share it.',
        invalid: true,
        invalidFeedback: 'Required',
      },
      slots: { default: () => h(MclInputText) },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe(
      'email-description email-error',
    )
  })

  it('inherits disabled and required', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'email', label: 'Email', disabled: true, required: true },
      slots: { default: () => h(MclInputText) },
    })
    const input = wrapper.find('input')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('required')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclInputText`
Expected: FAIL — `id` is currently required, `invalid` defaults to `false`, and the error container is CSS-driven.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-input-text/MclInputText.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette, InputType } from '@bobbykim/manguito-theme'
import FieldFeedback from '../common/FieldFeedback.vue'
import InputHighlight from '../common/InputHighlight.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    type?: InputType
    placeholder?: string
    autocomplete?: string
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    textColor?: ColorPalette
    bgColor?: ColorPalette
    showShadow?: boolean
    invalidFeedback?: string
    minLength?: number
    maxLength?: number
    pattern?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    type: 'text',
    placeholder: '',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    showShadow: true,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string>()

defineSlots<{
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
// props proxy passed directly: a spread literal would snapshot and freeze.
const surfaceClass = useInputSurface(props)
</script>

<template>
  <div>
    <input
      :id="field.id"
      v-model="model"
      class="peer w-full p-2xs outline-none disabled:cursor-not-allowed disabled:opacity-50"
      :class="surfaceClass"
      :type="type"
      :name="field.name.value"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="pattern"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
    />
    <input-highlight
      v-if="showHighlight"
      :color="highlightColor"
      :rounded="rounded"
    ></input-highlight>
    <!--
      Only when the group does not own the region: rendering both would put
      two elements in the DOM under the same id.
    -->
    <field-feedback
      v-if="!field.feedbackOwnedByGroup"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclInputText`
Expected: PASS, 18 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-input-text/
git commit -m "feat(mcl-forms)!: rewrite MclInputText on the field context

Moves class computation to useInputSurface and the error region to
FieldFeedback, so the alert is inserted rather than CSS-hidden and
actually announces. Adds disabled, name and autocomplete, and widens
type.

BREAKING CHANGE: id is now optional; invalid no longer defaults to
false (undefined means inherit from MclFormGroup); the peer-invalid
CSS that showed errors from native validity is removed - bind
:invalid instead."
```

---

### Task 7: `MclTextArea`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-text-area/MclTextArea.vue`
- Test: `src/components/mcl-forms/lib/mcl-text-area/MclTextArea.test.ts`

**Interfaces:**
- Consumes: `useInputSurface`, `useFieldContext`, `FieldFeedback.vue`, `InputHighlight.vue`.
- Produces: the same props as `MclInputText` minus `type`/`autocomplete`/`minLength`/`maxLength`/`pattern`, plus `rows?`. `v-model` is `string`. Slot: `invalid-feedback`.

**This component has no error region at all today** — it accepts `aria-invalid` but has nowhere to point. It gains `invalidFeedback` and `FieldFeedback`.

**Also delete the dead `input__text` class** from the textarea's class list. It appears exactly once in the repo and is defined nowhere — a leftover from before the Tailwind v4 migration.

**The highlight bar takes `:offset="2.5"`** here, matching the existing component; a textarea's baseline sits differently from an input's.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-text-area/MclTextArea.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclTextArea from './MclTextArea.vue'

describe('MclTextArea — basics', () => {
  it('renders a textarea with a generated id and default rows', () => {
    const ta = mount(MclTextArea).find('textarea')
    expect(ta.exists()).toBe(true)
    expect(ta.attributes('id')).toBeTruthy()
    expect(ta.attributes('rows')).toBe('5')
  })

  it('honours an explicit rows value', () => {
    expect(
      mount(MclTextArea, { props: { rows: 12 } }).find('textarea').attributes('rows'),
    ).toBe('12')
  })

  it('updates the model on input', async () => {
    const wrapper = mount(MclTextArea, { props: { id: 'bio', modelValue: '' } })
    await wrapper.find('textarea').setValue('hello')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['hello'])
  })

  it('applies the surface classes and the peer class', () => {
    const ta = mount(MclTextArea, {
      props: { id: 'bio', bgColor: 'light-1', showShadow: true },
    }).find('textarea')
    expect(ta.classes()).toContain('mcl-bg-light-1')
    expect(ta.classes()).toContain('shadow-md')
    expect(ta.classes()).toContain('peer')
  })

  it('carries no dead input__text class', () => {
    // Defined nowhere in the repo; a leftover from before Tailwind v4.
    expect(mount(MclTextArea, { props: { id: 'bio' } }).html()).not.toContain('input__text')
  })

  it('binds name, placeholder, required and disabled', () => {
    const ta = mount(MclTextArea, {
      props: { id: 'bio', name: 'bio', placeholder: 'About you', required: true, disabled: true },
    }).find('textarea')
    expect(ta.attributes('name')).toBe('bio')
    expect(ta.attributes('placeholder')).toBe('About you')
    expect(ta.attributes('required')).toBeDefined()
    expect(ta.attributes('disabled')).toBeDefined()
  })
})

describe('MclTextArea — validation (new in this release)', () => {
  it('renders an error region and points at it', () => {
    // The component previously accepted aria-invalid with nowhere to point.
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalid: true, invalidFeedback: 'Too short' },
    })
    const ta = wrapper.find('textarea')
    expect(ta.attributes('aria-invalid')).toBe('true')
    expect(ta.attributes('aria-describedby')).toBe('bio-error')
    const alert = wrapper.find('[role="alert"]')
    expect(alert.attributes('id')).toBe('bio-error')
    expect(alert.text()).toBe('Too short')
  })

  it('renders no error region while valid', () => {
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalidFeedback: 'Too short' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    expect(wrapper.find('textarea').attributes('aria-invalid')).toBeUndefined()
  })

  it('inserts the alert on becoming invalid', async () => {
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalid: false, invalidFeedback: 'Too short' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.setProps({ invalid: true })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('prefers the invalid-feedback slot', () => {
    const wrapper = mount(MclTextArea, {
      props: { id: 'bio', invalid: true, invalidFeedback: 'Ignored' },
      slots: { 'invalid-feedback': '<b>Custom</b>' },
    })
    expect(wrapper.find('[role="alert"]').text()).toBe('Custom')
  })
})

describe('MclTextArea — inside a group', () => {
  it('takes the group id and defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'bio', label: 'Bio', invalid: true, invalidFeedback: 'Group' },
      slots: { default: () => h(MclTextArea, { invalidFeedback: 'Mine' }) },
    })
    expect(wrapper.find('textarea').attributes('id')).toBe('bio')
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('Group')
  })

  it('inherits disabled', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'bio', label: 'Bio', disabled: true },
      slots: { default: () => h(MclTextArea) },
    })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('includes the description id in describedby', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'bio', label: 'Bio', helpText: 'Keep it short.' },
      slots: { default: () => h(MclTextArea) },
    })
    expect(wrapper.find('textarea').attributes('aria-describedby')).toBe('bio-description')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclTextArea`
Expected: FAIL — no error region exists, `id` is required, and `input__text` is still present.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-text-area/MclTextArea.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import FieldFeedback from '../common/FieldFeedback.vue'
import InputHighlight from '../common/InputHighlight.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    placeholder?: string
    rows?: number
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    textColor?: ColorPalette
    bgColor?: ColorPalette
    showShadow?: boolean
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    placeholder: '',
    rows: 5,
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    showShadow: true,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string>()

defineSlots<{
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
const surfaceClass = useInputSurface(props)
</script>

<template>
  <div>
    <textarea
      :id="field.id"
      v-model="model"
      class="peer w-full p-2xs outline-none disabled:cursor-not-allowed disabled:opacity-50"
      :class="surfaceClass"
      :name="field.name.value"
      :rows="rows"
      :placeholder="placeholder"
      :required="field.required.value"
      :disabled="field.disabled.value"
      :aria-invalid="field.invalid.value || undefined"
      :aria-describedby="field.describedBy.value"
    />
    <input-highlight
      v-if="showHighlight"
      :color="highlightColor"
      :rounded="rounded"
      :offset="2.5"
    ></input-highlight>
    <field-feedback
      v-if="!field.feedbackOwnedByGroup"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclTextArea`
Expected: PASS, 13 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-text-area/
git commit -m "feat(mcl-forms)!: give MclTextArea an error region

The component accepted aria-invalid with nowhere to point - it had no
error region at all. It now carries invalidFeedback and FieldFeedback
like MclInputText, plus disabled and name, and drops the dead
input__text class that was defined nowhere.

BREAKING CHANGE: id is now optional and invalid no longer defaults to
false (undefined means inherit from MclFormGroup)."
```

---

### Task 8: `MclInputFile`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-input-file/MclInputFile.vue`
- Test: `src/components/mcl-forms/lib/mcl-input-file/MclInputFile.test.ts`

**Interfaces:**
- Consumes: `useInputSurface`, `useFieldContext`, `FieldFeedback.vue`, `XMark.vue` from `../assets/`.
- Produces: props `id?`, `name?`, `accept?`, `buttonText?`, `buttonTextColor?`, `buttonColor?`, `showBorder?`, `borderColor?`, `rounded?`, `bgColor?`, `textColor?`, `showShadow?`, `showClear?`, `invalidFeedback?`, `invalid?`, `required?`, `disabled?`. `v-model` is `File | null`.

**Two live bugs this fixes:**
1. **The clear button has no `type="button"`.** Inside a `<form>` it submits the form.
2. **The clear handler is bound twice** — on the wrapping `div` and implicitly through the button inside it — so a click fires it twice.

**It has no `showHighlight` prop**, which is exactly why `useInputSurface`'s `showHighlight` is optional. Pass the props proxy directly; do not spread a literal to add the field.

**`fileInputKey` stays.** Bumping the key remounts the input, which is the only reliable way to clear a file input's value across browsers.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-input-file/MclInputFile.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclInputFile from './MclInputFile.vue'

describe('MclInputFile — structure', () => {
  it('renders a file input and a browse button', () => {
    const wrapper = mount(MclInputFile, { props: { id: 'avatar' } })
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('avatar')
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.attributes('type')).toBe('button')
    expect(button.attributes('aria-controls')).toBe('avatar')
  })

  it('shows the button text', () => {
    expect(
      mount(MclInputFile, { props: { id: 'avatar', buttonText: 'Pick one' } })
        .find('button')
        .text(),
    ).toBe('Pick one')
  })

  it('binds accept, name, required and disabled', () => {
    const input = mount(MclInputFile, {
      props: {
        id: 'avatar',
        name: 'avatar',
        accept: 'image/png',
        required: true,
        disabled: true,
      },
    }).find('input[type="file"]')
    expect(input.attributes('accept')).toBe('image/png')
    expect(input.attributes('name')).toBe('avatar')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('renders no clear button unless showClear is set', () => {
    const without = mount(MclInputFile, { props: { id: 'avatar' } })
    expect(without.findAll('button')).toHaveLength(1)
    const with_ = mount(MclInputFile, { props: { id: 'avatar', showClear: true } })
    expect(with_.findAll('button')).toHaveLength(2)
  })
})

describe('MclInputFile — the clear button', () => {
  const clearButton = (wrapper: any) => wrapper.findAll('button')[1]

  it('is type="button" so it cannot submit a surrounding form', () => {
    // Live bug before this rewrite: no type attribute meant type="submit".
    const wrapper = mount(MclInputFile, { props: { id: 'avatar', showClear: true } })
    expect(clearButton(wrapper).attributes('type')).toBe('button')
  })

  it('has an accessible name', () => {
    const wrapper = mount(MclInputFile, { props: { id: 'avatar', showClear: true } })
    expect(clearButton(wrapper).attributes('aria-label')).toBeTruthy()
  })

  it('clears the model exactly once per click', async () => {
    // The handler used to sit on both the wrapping div and the button, so one
    // click fired it twice.
    const file = new File(['x'], 'x.png', { type: 'image/png' })
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true, modelValue: file },
    })
    await clearButton(wrapper).trigger('click')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toHaveLength(1)
    expect(emitted![0]).toEqual([null])
  })

  it('remounts the input so the browser clears its value', async () => {
    const file = new File(['x'], 'x.png', { type: 'image/png' })
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', showClear: true, modelValue: file },
    })
    const before = wrapper.find('input[type="file"]').element
    await clearButton(wrapper).trigger('click')
    expect(wrapper.find('input[type="file"]').element).not.toBe(before)
  })
})

describe('MclInputFile — validation', () => {
  it('renders an error region and points at it', () => {
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', invalid: true, invalidFeedback: 'Pick a file' },
    })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe('avatar-error')
    expect(wrapper.find('[role="alert"]').text()).toBe('Pick a file')
  })

  it('renders no error region while valid', () => {
    const wrapper = mount(MclInputFile, {
      props: { id: 'avatar', invalidFeedback: 'Pick a file' },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })
})

describe('MclInputFile — inside a group', () => {
  it('takes the group id and inherits disabled', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'avatar', label: 'Avatar', disabled: true },
      slots: { default: () => h(MclInputFile) },
    })
    const input = wrapper.find('input[type="file"]')
    expect(input.attributes('id')).toBe('avatar')
    expect(input.attributes('disabled')).toBeDefined()
  })

  it('defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'avatar', label: 'Avatar', invalid: true, invalidFeedback: 'Group' },
      slots: { default: () => h(MclInputFile, { invalidFeedback: 'Mine' }) },
    })
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('Group')
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclInputFile`
Expected: FAIL — the clear button has no `type`, `id` is required, and there is no error region.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-input-file/MclInputFile.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import XMark from '../assets/XMark.vue'
import FieldFeedback from '../common/FieldFeedback.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'

const props = withDefaults(
  defineProps<{
    id?: string
    name?: string
    accept?: string
    buttonText?: string
    buttonTextColor?: ColorPalette
    buttonColor?: ColorPalette
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    bgColor?: ColorPalette
    textColor?: ColorPalette
    showShadow?: boolean
    showClear?: boolean
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    accept: 'image/jpg,image/jpeg,image/png',
    buttonText: 'Browse File',
    buttonTextColor: 'dark-3',
    buttonColor: 'light-4',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    bgColor: 'light-1',
    textColor: 'black',
    showShadow: true,
    showClear: false,
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<File | null>()

defineSlots<{
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
// This component has no showHighlight prop, which is why the option is
// optional on InputSurfaceOptions. Pass the proxy, never a spread literal.
const surfaceClass = useInputSurface(props)

const inputRef = ref<HTMLInputElement>()
// Bumping the key remounts the input, which is the only reliable way to clear
// a file input's value across browsers.
const fileInputKey = ref<number>(0)

const onBrowseClick = (): void => {
  inputRef.value?.click()
}

const onChangeFile = (event: Event): void => {
  const files = (event.target as HTMLInputElement).files
  model.value = files && files.length > 0 ? files[0] : null
}

const onClearFile = (): void => {
  model.value = null
  fileInputKey.value++
}

const buttonClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.buttonColor }),
    generateClass.textColorVariant({ color: props.buttonTextColor }),
  ]
  if (props.rounded) {
    classArray.push('rounded-l-md')
  }
  return classArray.join(' ')
})

const clearButtonClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.buttonColor }),
  ]
  if (props.rounded) {
    classArray.push('rounded-r-md')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div>
    <div class="flex items-center overflow-hidden" :class="surfaceClass">
      <div class="my-3xs mr-xs ml-3xs shrink-0">
        <button
          type="button"
          :aria-controls="field.id"
          :disabled="field.disabled.value"
          class="max-w-full px-xs py-2xs transition-all duration-200 ease-linear hover:bg-opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          :class="buttonClass"
          @click="onBrowseClick"
        >
          {{ buttonText }}
        </button>
      </div>
      <input
        :id="field.id"
        ref="inputRef"
        :key="fileInputKey"
        type="file"
        class="w-full bg-transparent file:hidden"
        :name="field.name.value"
        :accept="accept"
        :required="field.required.value"
        :disabled="field.disabled.value"
        :aria-invalid="field.invalid.value || undefined"
        :aria-describedby="field.describedBy.value"
        @change="onChangeFile"
      />
      <!--
        The handler lives on the button alone. It used to sit on this wrapper
        too, so one click fired it twice. And without type="button" the button
        submitted any surrounding form.
      -->
      <div v-if="showClear" class="my-3xs mr-3xs self-stretch">
        <button
          type="button"
          aria-label="Clear selected file"
          :disabled="field.disabled.value"
          class="flex h-full items-center px-xs py-2xs transition-all duration-200 ease-linear hover:bg-opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
          :class="clearButtonClass"
          @click="onClearFile"
        >
          <x-mark :color="buttonTextColor" class-name="h-xs"></x-mark>
        </button>
      </div>
    </div>
    <field-feedback
      v-if="!field.feedbackOwnedByGroup"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclInputFile`
Expected: PASS, 12 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-input-file/
git commit -m "fix(mcl-forms)!: stop MclInputFile's clear button submitting forms

The clear button had no type attribute, so inside a form it defaulted
to type=submit, and its handler was bound on both the wrapping div
and the button so one click fired it twice. Both fixed, and it gains
an accessible name.

Also adds an error region, disabled and name, and replaces the
inlined X path with the shared XMark component.

BREAKING CHANGE: id is now optional and invalid no longer defaults to
false (undefined means inherit from MclFormGroup)."
```

---

### Task 9: `useSelectFilter` and `useSelectKeyboard`

Both are pure logic with no DOM access, so they are testable without mounting anything. They come out of `MclSelect` before it is rewritten.

**Files:**
- Create: `src/components/mcl-forms/lib/mcl-select/useSelectFilter.ts`
- Create: `src/components/mcl-forms/lib/mcl-select/useSelectKeyboard.ts`
- Test: `src/components/mcl-forms/lib/mcl-select/useSelectFilter.test.ts`
- Test: `src/components/mcl-forms/lib/mcl-select/useSelectKeyboard.test.ts`

**Interfaces:**
- Consumes: `SelectOptionType`, `SelectOptions` from `./index.types`.
- Produces:
  ```ts
  // useSelectFilter.ts
  export const escapeRegExp: (value: string) => string
  export const optionLabel: (option: string | SelectOptionType) => string
  export const optionValue: (option: string | SelectOptionType) => string | number
  export const useSelectFilter: (
    options: MaybeRefOrGetter<SelectOptions>,
    query: MaybeRefOrGetter<string>,
  ) => ComputedRef<(string | SelectOptionType)[]>

  // useSelectKeyboard.ts
  export interface SelectKeyboardOptions {
    isOpen: Ref<boolean>
    activeIndex: Ref<number>
    optionCount: MaybeRefOrGetter<number>
    idPrefix: MaybeRefOrGetter<string>
    onSelect: (index: number) => void
    onClear: () => void
    onActiveChange?: (index: number) => void
  }
  export interface SelectKeyboard {
    onKeydown: (event: KeyboardEvent) => void
    activeDescendantId: ComputedRef<string | undefined>
  }
  export const useSelectKeyboard: (options: SelectKeyboardOptions) => SelectKeyboard
  ```

**`optionLabel` / `optionValue` exist to kill a repeated ternary.** `typeof option === 'string' ? option : option.text` is currently written inline in five places in `MclSelect`.

**`escapeRegExp` fixes a real crash:** the current filter does `new RegExp(selectedValue, 'gi')`, so typing `(` throws.

**`activeIndex` starts at `-1`, not `0`.** Opening the listbox should not imply a pre-highlighted option, and `aria-activedescendant` must be absent until the user actually moves.

- [ ] **Step 1: Write the failing filter test**

Create `src/components/mcl-forms/lib/mcl-select/useSelectFilter.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import type { SelectOptionType } from './index.types'
import {
  escapeRegExp,
  optionLabel,
  optionValue,
  useSelectFilter,
} from './useSelectFilter'

describe('escapeRegExp', () => {
  it('escapes regex metacharacters', () => {
    expect(escapeRegExp('a(b)c')).toBe('a\\(b\\)c')
    expect(escapeRegExp('1+1')).toBe('1\\+1')
    expect(escapeRegExp('a.b')).toBe('a\\.b')
  })
  it('leaves plain text alone', () => {
    expect(escapeRegExp('hello')).toBe('hello')
  })
})

describe('optionLabel / optionValue', () => {
  it('reads a string option as both label and value', () => {
    expect(optionLabel('red')).toBe('red')
    expect(optionValue('red')).toBe('red')
  })
  it('reads an object option', () => {
    const option: SelectOptionType = { text: 'Red', value: 1 }
    expect(optionLabel(option)).toBe('Red')
    expect(optionValue(option)).toBe(1)
  })
})

describe('useSelectFilter', () => {
  const strings = ['Red', 'Green', 'Blue']
  const objects: SelectOptionType[] = [
    { text: 'Red', value: 1 },
    { text: 'Green', value: 2 },
    { text: 'Blue', value: 3 },
  ]

  it('returns every option for an empty query', () => {
    const filtered = useSelectFilter(strings, '')
    expect(filtered.value).toHaveLength(3)
  })

  it('filters string options case-insensitively', () => {
    expect(useSelectFilter(strings, 're').value).toEqual(['Red', 'Green'])
    expect(useSelectFilter(strings, 'RED').value).toEqual(['Red'])
  })

  it('filters object options on their text', () => {
    expect(useSelectFilter(objects, 'blu').value).toEqual([{ text: 'Blue', value: 3 }])
  })

  it('returns an empty array when nothing matches', () => {
    expect(useSelectFilter(strings, 'zzz').value).toEqual([])
  })

  it('does not throw on regex metacharacters', () => {
    // The old implementation did `new RegExp(query, 'gi')`, so this threw.
    expect(() => useSelectFilter(strings, '(').value).not.toThrow()
    expect(useSelectFilter(strings, '(').value).toEqual([])
  })

  it('matches a literal parenthesis when one is present', () => {
    const withParens = ['Red (dark)', 'Green']
    expect(useSelectFilter(withParens, '(dark)').value).toEqual(['Red (dark)'])
  })

  it('recomputes when the query ref changes', () => {
    const query = ref('')
    const filtered = useSelectFilter(strings, query)
    expect(filtered.value).toHaveLength(3)
    query.value = 'blue'
    expect(filtered.value).toEqual(['Blue'])
  })

  it('recomputes when the options ref changes', () => {
    const options = ref<string[]>(['Red'])
    const filtered = useSelectFilter(options, '')
    expect(filtered.value).toEqual(['Red'])
    options.value = ['Red', 'Green']
    expect(filtered.value).toEqual(['Red', 'Green'])
  })
})
```

- [ ] **Step 2: Write the failing keyboard test**

Create `src/components/mcl-forms/lib/mcl-select/useSelectKeyboard.test.ts`:

```ts
import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useSelectKeyboard } from './useSelectKeyboard'

const setup = (overrides: Record<string, unknown> = {}) => {
  const isOpen = ref(false)
  const activeIndex = ref(-1)
  const onSelect = vi.fn()
  const onClear = vi.fn()
  const onActiveChange = vi.fn()
  const kb = useSelectKeyboard({
    isOpen,
    activeIndex,
    optionCount: 3,
    idPrefix: 'colour',
    onSelect,
    onClear,
    onActiveChange,
    ...overrides,
  })
  return { isOpen, activeIndex, onSelect, onClear, onActiveChange, kb }
}

const key = (k: string, init: KeyboardEventInit = {}) =>
  new KeyboardEvent('keydown', { key: k, cancelable: true, ...init })

describe('useSelectKeyboard — opening', () => {
  it('ArrowDown opens a closed listbox without selecting', () => {
    const { isOpen, activeIndex, onSelect, kb } = setup()
    kb.onKeydown(key('ArrowDown'))
    expect(isOpen.value).toBe(true)
    expect(activeIndex.value).toBe(-1)
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Alt+ArrowDown opens without selecting', () => {
    const { isOpen, activeIndex, kb } = setup()
    kb.onKeydown(key('ArrowDown', { altKey: true }))
    expect(isOpen.value).toBe(true)
    expect(activeIndex.value).toBe(-1)
  })

  it('prevents default on ArrowDown so the page does not scroll', () => {
    const { kb } = setup()
    const event = key('ArrowDown')
    kb.onKeydown(event)
    expect(event.defaultPrevented).toBe(true)
  })
})

describe('useSelectKeyboard — moving', () => {
  it('ArrowDown moves from -1 to 0 then onward, clamping at the end', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(0)
    kb.onKeydown(key('ArrowDown'))
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(2)
    kb.onKeydown(key('ArrowDown'))
    expect(activeIndex.value).toBe(2)
  })

  it('ArrowUp moves back and clamps at 0', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    activeIndex.value = 2
    kb.onKeydown(key('ArrowUp'))
    expect(activeIndex.value).toBe(1)
    kb.onKeydown(key('ArrowUp'))
    kb.onKeydown(key('ArrowUp'))
    expect(activeIndex.value).toBe(0)
  })

  it('Home and End jump to the ends', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('End'))
    expect(activeIndex.value).toBe(2)
    kb.onKeydown(key('Home'))
    expect(activeIndex.value).toBe(0)
  })

  it('prevents default on Home and End', () => {
    const { isOpen, kb } = setup()
    isOpen.value = true
    const home = key('Home')
    const end = key('End')
    kb.onKeydown(home)
    kb.onKeydown(end)
    expect(home.defaultPrevented).toBe(true)
    expect(end.defaultPrevented).toBe(true)
  })

  it('notifies onActiveChange so the caller can scroll it into view', () => {
    const { isOpen, onActiveChange, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('ArrowDown'))
    expect(onActiveChange).toHaveBeenCalledWith(0)
  })

  it('ignores movement keys while closed except the opening ones', () => {
    const { activeIndex, kb } = setup()
    kb.onKeydown(key('Home'))
    expect(activeIndex.value).toBe(-1)
  })
})

describe('useSelectKeyboard — committing and dismissing', () => {
  it('Enter selects the active option', () => {
    const { isOpen, activeIndex, onSelect, kb } = setup()
    isOpen.value = true
    activeIndex.value = 1
    kb.onKeydown(key('Enter'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('Enter does nothing with no active option', () => {
    const { isOpen, onSelect, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('Enter'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Enter does nothing while closed', () => {
    const { activeIndex, onSelect, kb } = setup()
    activeIndex.value = 1
    kb.onKeydown(key('Enter'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('Escape closes and keeps the value', () => {
    // The old handler wiped the model on every Escape, which contradicts the
    // ARIA combobox pattern.
    const { isOpen, onClear, kb } = setup()
    isOpen.value = true
    kb.onKeydown(key('Escape'))
    expect(isOpen.value).toBe(false)
    expect(onClear).not.toHaveBeenCalled()
  })

  it('a second Escape while closed clears', () => {
    const { isOpen, onClear, kb } = setup()
    kb.onKeydown(key('Escape'))
    expect(onClear).toHaveBeenCalledTimes(1)
    expect(isOpen.value).toBe(false)
  })

  it('Tab closes without committing and does not prevent default', () => {
    const { isOpen, onSelect, kb } = setup()
    isOpen.value = true
    const event = key('Tab')
    kb.onKeydown(event)
    expect(isOpen.value).toBe(false)
    expect(onSelect).not.toHaveBeenCalled()
    expect(event.defaultPrevented).toBe(false)
  })
})

describe('useSelectKeyboard — activeDescendantId', () => {
  it('is undefined while closed', () => {
    const { kb } = setup()
    expect(kb.activeDescendantId.value).toBeUndefined()
  })

  it('is undefined when open with nothing active', () => {
    const { isOpen, kb } = setup()
    isOpen.value = true
    expect(kb.activeDescendantId.value).toBeUndefined()
  })

  it('names the active option when one is active', () => {
    const { isOpen, activeIndex, kb } = setup()
    isOpen.value = true
    activeIndex.value = 1
    expect(kb.activeDescendantId.value).toBe('colour-option-1')
  })
})
```

- [ ] **Step 3: Run both tests to verify they fail**

Run: `cd src/components/mcl-forms && pnpm test useSelect`
Expected: FAIL — neither module exists.

- [ ] **Step 4: Implement `useSelectFilter`**

Create `src/components/mcl-forms/lib/mcl-select/useSelectFilter.ts`:

```ts
import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'
import type { SelectOptionType, SelectOptions } from './index.types'

/**
 * Escapes regex metacharacters so a user's query is matched literally.
 *
 * @param value - raw query text.
 * @returns the query with metacharacters escaped.
 */
export const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Reads an option's display text, normalising the string/object union.
 *
 * @param option - a plain string option or a `{ text, value }` option.
 * @returns the text to render.
 */
export const optionLabel = (option: string | SelectOptionType): string =>
  typeof option === 'string' ? option : option.text

/**
 * Reads an option's model value, normalising the string/object union.
 *
 * @param option - a plain string option or a `{ text, value }` option.
 * @returns the value to emit.
 */
export const optionValue = (option: string | SelectOptionType): string | number =>
  typeof option === 'string' ? option : option.value

/**
 * Filters options by a query, matching case-insensitively on the option's
 * display text.
 *
 * @param options - the full option list; ref, getter or plain value.
 * @param query - the current query text; ref, getter or plain value.
 * @returns the matching options, or all of them when the query is empty.
 */
export const useSelectFilter = (
  options: MaybeRefOrGetter<SelectOptions>,
  query: MaybeRefOrGetter<string>,
): ComputedRef<(string | SelectOptionType)[]> =>
  computed<(string | SelectOptionType)[]>(() => {
    const all = toValue(options) as (string | SelectOptionType)[]
    const term = toValue(query)
    if (term === '') {
      return all
    }
    // Escaped, because an unescaped query throws on `(` and friends.
    const pattern = new RegExp(escapeRegExp(term), 'i')
    return all.filter((option) => pattern.test(optionLabel(option)))
  })
```

- [ ] **Step 5: Implement `useSelectKeyboard`**

Create `src/components/mcl-forms/lib/mcl-select/useSelectKeyboard.ts`:

```ts
import {
  computed,
  toValue,
  type ComputedRef,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'

export interface SelectKeyboardOptions {
  isOpen: Ref<boolean>
  /** The highlighted option index. `-1` means nothing is highlighted. */
  activeIndex: Ref<number>
  optionCount: MaybeRefOrGetter<number>
  /** Used to build option ids as `${idPrefix}-option-${index}`. */
  idPrefix: MaybeRefOrGetter<string>
  onSelect: (index: number) => void
  onClear: () => void
  /** Called after the active index moves, so the caller can scroll it into view. */
  onActiveChange?: (index: number) => void
}

export interface SelectKeyboard {
  onKeydown: (event: KeyboardEvent) => void
  activeDescendantId: ComputedRef<string | undefined>
}

/**
 * Keyboard behaviour for the ARIA combobox-with-listbox pattern.
 *
 * Handlers are bound to `keydown` rather than `keyup` so arrow keys can be
 * prevented from scrolling the page.
 *
 * @param options - reactive open/active state, counts, and the callbacks for
 *   committing and clearing.
 * @returns the `keydown` handler and the `aria-activedescendant` value.
 */
export const useSelectKeyboard = (
  options: SelectKeyboardOptions,
): SelectKeyboard => {
  const { isOpen, activeIndex, onSelect, onClear, onActiveChange } = options

  const move = (next: number): void => {
    const count = toValue(options.optionCount)
    const clamped = Math.max(0, Math.min(next, count - 1))
    activeIndex.value = clamped
    onActiveChange?.(clamped)
  }

  const close = (): void => {
    isOpen.value = false
    activeIndex.value = -1
  }

  const onKeydown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        // Alt+ArrowDown opens without moving, per the APG.
        if (!isOpen.value) {
          isOpen.value = true
          return
        }
        if (event.altKey) return
        move(activeIndex.value + 1)
        return

      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen.value) {
          isOpen.value = true
          return
        }
        move(activeIndex.value - 1)
        return

      case 'Home':
        if (!isOpen.value) return
        event.preventDefault()
        move(0)
        return

      case 'End':
        if (!isOpen.value) return
        event.preventDefault()
        move(toValue(options.optionCount) - 1)
        return

      case 'Enter':
        if (!isOpen.value || activeIndex.value < 0) return
        event.preventDefault()
        onSelect(activeIndex.value)
        return

      case 'Escape':
        // First Escape dismisses and keeps the value; a second, with nothing
        // open, clears it. The old handler wiped the model every time.
        if (isOpen.value) {
          close()
          return
        }
        onClear()
        return

      case 'Tab':
        // Dismiss without committing, and let focus move on.
        if (isOpen.value) {
          close()
        }
        return

      default:
        return
    }
  }

  const activeDescendantId = computed<string | undefined>(() =>
    isOpen.value && activeIndex.value >= 0
      ? `${toValue(options.idPrefix)}-option-${activeIndex.value}`
      : undefined,
  )

  return { onKeydown, activeDescendantId }
}
```

- [ ] **Step 6: Run both tests to verify they pass**

Run: `cd src/components/mcl-forms && pnpm test useSelect`
Expected: PASS — 12 filter tests, 18 keyboard tests.

- [ ] **Step 7: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-select/useSelectFilter.ts \
        src/components/mcl-forms/lib/mcl-select/useSelectFilter.test.ts \
        src/components/mcl-forms/lib/mcl-select/useSelectKeyboard.ts \
        src/components/mcl-forms/lib/mcl-select/useSelectKeyboard.test.ts
git commit -m "feat(mcl-forms): extract MclSelect filtering and keyboard logic

Two DOM-free composables, testable without mounting. The filter now
escapes its query - the previous new RegExp(query) threw on '(' - and
exposes optionLabel/optionValue helpers that replace a string/object
ternary written inline in five places.

The keyboard composable implements the ARIA combobox pattern on
keydown rather than keyup, so arrows no longer scroll the page, and
adds Home/End/Tab/Alt+ArrowDown. Escape now dismisses and keeps the
value; only a second Escape clears."
```

---

### Task 10: `MclSelect`

**Files:**
- Rewrite: `src/components/mcl-forms/lib/mcl-select/MclSelect.vue`
- Test: `src/components/mcl-forms/lib/mcl-select/MclSelect.test.ts`

**Interfaces:**
- Consumes: `useSelectFilter`, `useSelectKeyboard`, `optionLabel`, `optionValue` from Task 9; `useInputSurface`, `useFieldContext`, `FieldFeedback.vue`; `CaretDown.vue`, `XMark.vue`; `vClickOutside` from `@bobbykim/manguito-theme/directives`; `useFloating`/`autoUpdate`/`flip`/`offset`/`shift` from `@floating-ui/vue`; `useResizeObserver` from `@vueuse/core`.
- Produces: props as listed below. `v-model` is `string | number | null`. Emits `open`, `close`, `clear`, `changed`, `select`. Slots: `dropdown`, `no-match`, `invalid-feedback`.

**Breaking changes:** `id` optional; `invalid` no longer defaults to `false`; **Escape no longer wipes the value**.

**Five fixes:**
1. **`required` is finally bound.** It is currently accepted and never used — a dead prop. It becomes `aria-required`.
2. **The clear and caret controls become real `<button type="button">`.** They are `<div @click>` today: not focusable, no accessible name. Clear is focusable with a label; the caret takes `tabindex="-1"` because the input already owns `aria-expanded`, so a second tab stop for the same action is noise.
3. **"No match" moves out of the listbox** into a `role="status"` region. An `<li aria-live>` inside `role="listbox"` is announced as a selectable option.
4. **The transition's `pointerEvents` handlers are deleted** in favour of one CSS line — they imperatively set `style.pointerEvents` on enter/leave hooks.
5. **`max-h-50` becomes `max-h-[12.5rem]`.** Same rendered value, but no longer a numeric-scale class masquerading as one of the library's named spacing tokens.

- [ ] **Step 1: Write the failing test**

Create `src/components/mcl-forms/lib/mcl-select/MclSelect.test.ts`:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick } from 'vue'
import MclFormGroup from '../mcl-form-group/MclFormGroup.vue'
import MclSelect from './MclSelect.vue'

const OPTIONS = ['Red', 'Green', 'Blue']

const open = async (wrapper: any) => {
  await wrapper.find('input').trigger('focus')
  await nextTick()
}

describe('MclSelect — combobox wiring', () => {
  it('renders a combobox input with the listbox wiring', () => {
    const input = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS },
    }).find('input')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-autocomplete')).toBe('list')
    expect(input.attributes('aria-expanded')).toBe('false')
    expect(input.attributes('aria-controls')).toBe('colour-listbox')
  })

  it('binds required as aria-required', () => {
    // The prop was accepted and never used before this rewrite.
    const input = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, required: true },
    }).find('input')
    expect(input.attributes('aria-required')).toBe('true')
  })

  it('opens on focus and reports expanded', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    expect(wrapper.find('input').attributes('aria-expanded')).toBe('true')
    const listbox = wrapper.find('[role="listbox"]')
    expect(listbox.exists()).toBe(true)
    expect(listbox.attributes('id')).toBe('colour-listbox')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3)
  })

  it('gives each option a stable id and an aria-selected state', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Green' },
    })
    await open(wrapper)
    const options = wrapper.findAll('[role="option"]')
    expect(options[0].attributes('id')).toBe('colour-option-0')
    expect(options[1].attributes('aria-selected')).toBe('true')
    expect(options[0].attributes('aria-selected')).toBe('false')
  })

  it('sets no aria-activedescendant until the user moves', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    expect(wrapper.find('input').attributes('aria-activedescendant')).toBeUndefined()
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('input').attributes('aria-activedescendant')).toBe(
      'colour-option-0',
    )
  })

  it('emits open and close', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    expect(wrapper.emitted('open')).toBeTruthy()
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

describe('MclSelect — controls are buttons', () => {
  it('renders the caret as a button outside the tab order', async () => {
    // Previously a <div @click>: not focusable, no accessible name. It stays
    // out of the tab order because the input already owns aria-expanded.
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    const caret = wrapper.find('button[data-mcl="caret"]')
    expect(caret.exists()).toBe(true)
    expect(caret.attributes('type')).toBe('button')
    expect(caret.attributes('tabindex')).toBe('-1')
    expect(caret.attributes('aria-label')).toBeTruthy()
  })

  it('toggles the listbox from the caret', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await wrapper.find('button[data-mcl="caret"]').trigger('click')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
  })

  it('renders a focusable, labelled clear button once there is a value', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    const clear = wrapper.find('button[data-mcl="clear"]')
    expect(clear.exists()).toBe(true)
    expect(clear.attributes('type')).toBe('button')
    expect(clear.attributes('tabindex')).toBeUndefined()
    expect(clear.attributes('aria-label')).toBeTruthy()
  })

  it('clears the model and emits clear', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await wrapper.find('button[data-mcl="clear"]').trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual([null])
  })
})

describe('MclSelect — selection', () => {
  it('selects on click and emits select and changed', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    expect(wrapper.emitted('select')![0]).toEqual(['Green'])
    expect(wrapper.emitted('update:modelValue')!.at(-1)).toEqual(['Green'])
  })

  it('selects object options by their value', async () => {
    const wrapper = mount(MclSelect, {
      props: {
        id: 'colour',
        options: [
          { text: 'Red', value: 1 },
          { text: 'Green', value: 2 },
        ],
      },
    })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    expect(wrapper.emitted('select')![0]).toEqual([2])
  })

  it('selects the active option on Enter', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')![0]).toEqual(['Red'])
  })

  it('closes the listbox after selecting', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    await nextTick()
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
  })
})

describe('MclSelect — Escape semantics', () => {
  it('the first Escape closes and keeps the value', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false)
    expect(wrapper.emitted('clear')).toBeFalsy()
  })

  it('a second Escape while closed clears', async () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, modelValue: 'Red' },
    })
    await open(wrapper)
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('clear')).toBeTruthy()
  })
})

describe('MclSelect — filtering and no-match', () => {
  it('filters as the query is typed', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await wrapper.find('input').setValue('re')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(2)
  })

  it('does not throw on a regex metacharacter', async () => {
    const wrapper = mount(MclSelect, { props: { id: 'colour', options: OPTIONS } })
    await open(wrapper)
    await expect(wrapper.find('input').setValue('(')).resolves.not.toThrow()
  })

  it('announces no-match through role=status, not as an option', async () => {
    // An <li aria-live> inside role="listbox" is announced as selectable.
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, noMatchText: 'Nothing found.' },
    })
    await open(wrapper)
    await wrapper.find('input').setValue('zzz')
    const status = wrapper.find('[role="status"]')
    expect(status.exists()).toBe(true)
    expect(status.text()).toBe('Nothing found.')
    expect(wrapper.findAll('[role="option"]')).toHaveLength(0)
  })
})

describe('MclSelect — field context and validation', () => {
  it('generates an id when none is given', () => {
    expect(mount(MclSelect, { props: { options: OPTIONS } }).find('input').attributes('id'))
      .toBeTruthy()
  })

  it('renders its own error region and points at it', () => {
    const wrapper = mount(MclSelect, {
      props: { id: 'colour', options: OPTIONS, invalid: true, invalidFeedback: 'Pick one' },
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('colour-error')
    expect(wrapper.find('[role="alert"]').text()).toBe('Pick one')
  })

  it('defers to the group error region', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'colour', label: 'Colour', invalid: true, invalidFeedback: 'Group' },
      slots: { default: () => h(MclSelect, { options: OPTIONS, invalidFeedback: 'Mine' }) },
    })
    const alerts = wrapper.findAll('[role="alert"]')
    expect(alerts).toHaveLength(1)
    expect(alerts[0].text()).toBe('Group')
  })

  it('inherits disabled and disables the input and controls', () => {
    const wrapper = mount(MclFormGroup, {
      props: { fieldId: 'colour', label: 'Colour', disabled: true },
      slots: { default: () => h(MclSelect, { options: OPTIONS }) },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button[data-mcl="caret"]').attributes('disabled')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd src/components/mcl-forms && pnpm test MclSelect`
Expected: FAIL — `required` is unbound, the controls are `div`s, Escape wipes the model, and there is no error region.

- [ ] **Step 3: Rewrite the component**

Replace `src/components/mcl-forms/lib/mcl-select/MclSelect.vue` entirely:

```vue
<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { vClickOutside } from '@bobbykim/manguito-theme/directives'
import { autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, ref, watch, type ComponentPublicInstance } from 'vue'
import CaretDown from '../assets/CaretDown.vue'
import XMark from '../assets/XMark.vue'
import FieldFeedback from '../common/FieldFeedback.vue'
import { useFieldContext } from '../common/fieldContext'
import { useInputSurface } from '../common/useInputSurface'
import type { SelectOptionType, SelectOptions } from './index.types'
import { optionLabel, optionValue, useSelectFilter } from './useSelectFilter'
import { useSelectKeyboard } from './useSelectKeyboard'

const props = withDefaults(
  defineProps<{
    options: SelectOptions
    id?: string
    name?: string
    placeholder?: string
    showBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    textColor?: ColorPalette
    bgColor?: ColorPalette
    iconColor?: ColorPalette
    optionHoverColor?: ColorPalette
    showShadow?: boolean
    noMatchText?: string
    invalidFeedback?: string
    invalid?: boolean
    required?: boolean
    disabled?: boolean
  }>(),
  {
    placeholder: '',
    showBorder: false,
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'primary',
    textColor: 'black',
    bgColor: 'light-1',
    iconColor: 'dark-4',
    optionHoverColor: 'primary',
    showShadow: true,
    noMatchText: 'No match.',
    invalid: undefined,
    required: undefined,
    disabled: undefined,
  },
)

const model = defineModel<string | number | null>({ default: null })

const emit = defineEmits<{
  (e: 'open'): void
  (e: 'close'): void
  (e: 'clear'): void
  (e: 'changed', value: string | number): void
  (e: 'select', value: string | number): void
}>()

defineSlots<{
  dropdown?(props: {
    options: (string | SelectOptionType)[]
    activeIndex: number
    optionClick: (option: string | SelectOptionType) => void
    setRef: (el: Element | ComponentPublicInstance | null, index: number) => void
    hover: (index: number) => void
  }): unknown
  'no-match'?: () => unknown
  'invalid-feedback'?: () => unknown
}>()

const field = useFieldContext(props)
const surfaceClass = useInputSurface(props)

const rootRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const dropdownRef = ref<HTMLElement>()
const itemRefs = ref<Array<Element | ComponentPublicInstance | null>>([])
const dropdownWidth = ref<number>()

const isOpen = ref<boolean>(false)
const activeIndex = ref<number>(-1)

/** The label to show for a model value, so the box is not blank on mount. */
const labelForValue = (value: string | number | null): string => {
  if (value === null || value === '') return ''
  const match = (props.options as (string | SelectOptionType)[]).find(
    (option) => optionValue(option) === value,
  )
  return match ? optionLabel(match) : String(value)
}

// Seeded from the model: a select mounted with a value must render it, and the
// clear button only appears once there is text to clear.
const query = ref<string>(labelForValue(model.value))

const filteredOptions = useSelectFilter(
  () => props.options,
  () => query.value,
)

const setItemRef = (
  el: Element | ComponentPublicInstance | null,
  index: number,
): void => {
  itemRefs.value[index] = el
}

const scrollActiveIntoView = (index: number): void => {
  const el = itemRefs.value[index] as HTMLElement | undefined
  el?.scrollIntoView?.({ block: 'nearest' })
}

const commit = (option: string | SelectOptionType): void => {
  query.value = optionLabel(option)
  const value = optionValue(option)
  model.value = value
  isOpen.value = false
  activeIndex.value = -1
  emit('select', value)
}

const clear = (): void => {
  query.value = ''
  activeIndex.value = -1
  model.value = null
  emit('clear')
}

const { onKeydown, activeDescendantId } = useSelectKeyboard({
  isOpen,
  activeIndex,
  optionCount: () => filteredOptions.value.length,
  idPrefix: () => field.id,
  onSelect: (index) => commit(filteredOptions.value[index]),
  onClear: clear,
  onActiveChange: scrollActiveIntoView,
})

const toggle = (): void => {
  isOpen.value = !isOpen.value
  activeIndex.value = -1
  if (isOpen.value) inputRef.value?.focus()
}

const highlightClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.beforeBgColorVariant({ color: props.highlightColor }),
  ]
  if (props.rounded) classArray.push('rounded-b-md')
  return classArray.join(' ')
})

const listboxClass = computed<string>(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.bgColor }),
    generateClass.borderColorVariant({ color: props.borderColor }),
  ]
  if (!props.showHighlight) classArray.push('mt-2xs')
  if (props.rounded) classArray.push('rounded-md')
  return classArray.join(' ')
})

const isSelected = (option: string | SelectOptionType): boolean =>
  model.value !== null && model.value !== '' && optionValue(option) === model.value

const { floatingStyles } = useFloating(rootRef, dropdownRef, {
  whileElementsMounted: autoUpdate,
  strategy: 'absolute',
  open: isOpen,
  transform: false,
  placement: 'bottom',
  middleware: [flip(), offset(-2.2), shift()],
})

useResizeObserver(rootRef, () => {
  if (rootRef.value) dropdownWidth.value = rootRef.value.clientWidth
})

watch(isOpen, (open) => {
  emit(open ? 'open' : 'close')
})

// Keeps the box in sync with the model when it is set from outside. `commit`
// has already written the same label, so this is a no-op in that path.
watch(model, (value) => {
  query.value = labelForValue(value)
  if (value !== null) emit('changed', value)
})
</script>

<template>
  <div
    ref="rootRef"
    v-click-outside="
      () => {
        isOpen = false
        activeIndex = -1
      }
    "
    class="relative"
  >
    <div
      class="relative flex gap-3xs p-2xs"
      :class="[
        surfaceClass,
        !showHighlight &&
          isOpen &&
          generateClass.ringColorVariant({ color: borderColor }) + ' ring-4',
      ]"
    >
      <input
        :id="field.id"
        ref="inputRef"
        v-model="query"
        type="text"
        role="combobox"
        autocomplete="off"
        class="w-full bg-transparent outline-none disabled:cursor-not-allowed"
        :name="field.name.value"
        :placeholder="placeholder"
        :disabled="field.disabled.value"
        aria-autocomplete="list"
        :aria-expanded="isOpen"
        :aria-controls="`${field.id}-listbox`"
        :aria-activedescendant="activeDescendantId"
        :aria-required="field.required.value || undefined"
        :aria-invalid="field.invalid.value || undefined"
        :aria-describedby="field.describedBy.value"
        @focus="isOpen = true"
        @keydown="onKeydown"
      />
      <!-- A real button now: the old <div @click> was neither focusable nor named. -->
      <button
        v-if="query !== ''"
        data-mcl="clear"
        type="button"
        aria-label="Clear selection"
        class="flex items-center px-3xs"
        :disabled="field.disabled.value"
        @click="clear"
      >
        <x-mark :color="iconColor" class-name="h-xs opacity-70"></x-mark>
      </button>
      <!--
        tabindex="-1" on purpose: the input already carries aria-expanded, so a
        second tab stop for the same action is noise for keyboard users.
      -->
      <button
        data-mcl="caret"
        type="button"
        tabindex="-1"
        aria-label="Toggle options"
        class="flex items-center px-3xs"
        :disabled="field.disabled.value"
        @click="toggle"
      >
        <caret-down
          :color="iconColor"
          :class-name="`h-xs transition-transform duration-300 ease-in ${isOpen ? 'rotate-180' : 'rotate-0'}`"
        ></caret-down>
      </button>
    </div>

    <div
      v-if="showHighlight"
      class="relative -top-1 h-3xs overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-full before:transition-[width] before:duration-300 before:ease-linear"
      :class="[isOpen ? 'before:w-full' : 'before:w-0', highlightClass]"
    ></div>

    <transition name="options">
      <ul
        v-if="isOpen && filteredOptions.length > 0"
        :id="`${field.id}-listbox`"
        ref="dropdownRef"
        role="listbox"
        class="max-h-[12.5rem] overflow-y-auto border-2"
        :class="listboxClass"
        :style="{ width: `${dropdownWidth}px`, ...floatingStyles }"
      >
        <slot
          name="dropdown"
          :options="filteredOptions"
          :active-index="activeIndex"
          :option-click="commit"
          :set-ref="setItemRef"
          :hover="(index: number) => (activeIndex = index)"
        >
          <li
            v-for="(option, index) in filteredOptions"
            :id="`${field.id}-option-${index}`"
            :key="index"
            :ref="(el) => setItemRef(el, index)"
            role="option"
            class="cursor-pointer p-2xs"
            :aria-selected="isSelected(option)"
            :class="[
              activeIndex === index &&
                generateClass.bgColorVariant({ color: optionHoverColor }),
            ]"
            @click="commit(option)"
            @mouseenter="activeIndex = index"
          >
            {{ optionLabel(option) }}
          </li>
        </slot>
      </ul>
    </transition>

    <!--
      Outside the listbox, deliberately. An <li aria-live> inside
      role="listbox" is announced to screen readers as a selectable option.
    -->
    <div
      v-if="isOpen && filteredOptions.length === 0"
      role="status"
      class="p-2xs"
      :class="listboxClass"
    >
      <slot name="no-match">
        <span>{{ noMatchText }}</span>
      </slot>
    </div>

    <field-feedback
      v-if="!field.feedbackOwnedByGroup"
      :id="field.errorId"
      :invalid="field.invalid.value"
      :text="invalidFeedback"
    >
      <slot v-if="$slots['invalid-feedback']" name="invalid-feedback" />
    </field-feedback>
  </div>
</template>

<style lang="scss" scoped>
.options-enter-active,
.options-leave-active {
  opacity: 1;
  transition:
    opacity 0.3s linear,
    transform 0.3s linear;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
/* Replaces the two transition hooks that set style.pointerEvents by hand. */
.options-leave-active {
  pointer-events: none;
}
</style>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd src/components/mcl-forms && pnpm test MclSelect`
Expected: PASS, 23 tests.

- [ ] **Step 5: Confirm the line reduction**

Run: `wc -l src/components/mcl-forms/lib/mcl-select/MclSelect.vue`
Expected: substantially under the original 460. Report the number; if it is still over ~280, say so rather than forcing it down — the spec's ~180 estimate excluded the error region and the disabled wiring that were added since.

- [ ] **Step 6: Commit**

```bash
git add src/components/mcl-forms/lib/mcl-select/MclSelect.vue \
        src/components/mcl-forms/lib/mcl-select/MclSelect.test.ts
git commit -m "feat(mcl-forms)!: rewrite MclSelect on the ARIA combobox pattern

Binds the required prop, which was accepted and never used. Turns the
clear and caret controls into real buttons - they were <div @click>,
so neither was focusable nor had an accessible name. Moves the
no-match message out of the listbox into a role=status region, where
it is no longer announced as a selectable option.

Delegates filtering and keyboard handling to the two new composables,
uses the shared icon components, and replaces the imperative
pointerEvents transition hooks with one CSS rule.

BREAKING CHANGE: Escape now closes the listbox and keeps the value; a
second Escape clears it. id is optional and invalid no longer
defaults to false."
```

---

### Task 11: Public exports, verification and changeset

**Files:**
- Modify: `src/components/mcl-forms/lib/index.ts`
- Create: `.changeset/mcl-forms-component-rewrite.md`

**Interfaces:**
- Consumes: every component from Tasks 2-10.
- Produces: the package's public surface. Adds the `FieldContext` and `FieldOwnProps` types to the existing exports.

- [ ] **Step 1: Export the field types**

In `src/components/mcl-forms/lib/index.ts`, extend the type re-export line so consumers writing their own controls against the context can name its shape:

```ts
export type {
  FieldContext,
  FieldOwnProps,
  InputSizeType,
} from './common/index.types'
```

Leave the component imports and the `export *` of the select types as they are.

- [ ] **Step 2: Run the whole suite**

Run: `pnpm test` from the repo root.
Expected: PASS, both projects. Report the total.

- [ ] **Step 3: Type-check and build**

Run: `cd src/components/mcl-forms && npx vue-tsc --noEmit -p tsconfig.json`
Expected: exit 0 with no diagnostics. The `ColorMap` errors from before this plan must be gone — the two components that imported it have been rewritten.

Run: `pnpm run package:build` from the repo root.
Expected: all tasks successful, no TS diagnostics.

If `vue-tsc` reports anything, fix it before continuing — this is the first task in the plan where a clean type-check is achievable, and it is the gate that proves the rewrite is complete.

- [ ] **Step 4: Confirm the stories are broken, and leave them**

Run: `grep -rln "labelFor\|inputSize\|radioSize\|switchSize\|checkColor\|checkedColor\|sliderColor\|onColor\|offColor" src/stories/components/mcl-forms/`

Expected: several files listed. **This is the expected state.** Plan 3 rewrites them. Do not fix them here, and do not add them to any commit. Record the list in your report so plan 3 has it.

- [ ] **Step 5: Write the changeset**

Create `.changeset/mcl-forms-component-rewrite.md`:

```
---
'@bobbykim/mcl-forms': minor
---

Rewrite all eight components onto the shared composable foundation.

Accessibility: the three toggle controls gain a visible focus indicator (they had none); MclTextArea, MclSelect and MclInputFile gain error regions; error regions are now inserted rather than CSS-hidden, so `role="alert"` actually announces; MclSelect follows the ARIA combobox pattern with keydown handling, Home/End/Tab/Alt+ArrowDown, real buttons for its clear and caret controls, and a `role="status"` no-match region; every control gains `disabled`.

Fixes: MclInputFile's clear button no longer submits a surrounding form and no longer fires twice per click; MclInputSwitch no longer double-toggles; MclSelect's option filter no longer throws on a regex metacharacter; MclSelect's `required` prop is bound for the first time; the `dark-4` colour typo in the checkbox and switch maps is gone.

BREAKING CHANGES:
- `MclFormGroup`: `labelFor` renamed to `fieldId` and now optional.
- Toggles: `inputSize`/`radioSize`/`switchSize` renamed to `size`; `checkColor`/`checkedColor`/`sliderColor` renamed to `indicatorColor`; `onColor` to `checkedBgColor`; `offColor` to `bgColor`.
- `MclCheckbox`/`MclInputRadio`: the `checked` prop is removed in favour of `v-model`; `checkbox-click` becomes `change(event)` and `change` now carries only the native Event.
- All controls: `id` is optional, and `invalid`/`required`/`disabled` no longer default to `false` — `undefined` means "inherit from `MclFormGroup`".
- `MclInputText`: the `peer-invalid` CSS that displayed errors from native validity is removed; bind `:invalid` instead.
- `MclSelect`: Escape closes the listbox and keeps the value; a second Escape clears it.
- Fixing the `dark-4` typo changes the rendered colour for anyone passing `dark-4`.
```

- [ ] **Step 6: Commit**

```bash
git add src/components/mcl-forms/lib/index.ts .changeset/mcl-forms-component-rewrite.md
git commit -m "feat(mcl-forms): export the field context types

Consumers writing their own controls against the field context can
now name its shape. Adds the changeset covering the component
rewrite."
```

---

## Definition of done

- [ ] `pnpm test` passes from the repo root, both projects reported.
- [ ] `npx vue-tsc --noEmit` in `mcl-forms` exits 0 with **no** diagnostics — in particular the two `ColorMap` `TS2305` errors are gone.
- [ ] `pnpm run package:build` succeeds with no TS diagnostics.
- [ ] All eight components accept `id?`, and `invalid`/`required`/`disabled` are declared with `default: undefined`.
- [ ] The three toggles emit a `peer-focus-visible` ring and pass `rendersOwnFeedback: false`.
- [ ] `MclCheckbox` and `MclInputSwitch` contain no local colour map.
- [ ] `MclSelect.vue` is well under its original 460 lines.
- [ ] One changeset exists for `@bobbykim/mcl-forms` (minor).
- [ ] `src/stories/` is untouched.

**Deliberately still broken at the end of this plan:** the Storybook stories in `src/stories/components/mcl-forms/`, which use the old prop names. `pnpm run story:dev` and `pnpm run story:build` will fail. Plan 3 rewrites them. Do not add a compatibility shim, and do not rename props back.

## Hand-off to plan 3

Plan 3 owns the stories, the `.mdx` docs, the migration guide and the README. It needs:

| Item | Detail |
|---|---|
| Prop rename table | Every rename in the Task 11 changeset, per component |
| The three behaviour breaks | Native-validity display removed from `MclInputText`; `MclSelect` Escape semantics; `checked` removed from checkbox and radio |
| The `dark-4` visual change | Fixing the typo changes the rendered colour for anyone passing `dark-4` — it belongs in the migration guide, not just the changelog |
| `MclFormGroup` usage | The coordination pattern: one `fieldId` (or none), `groupLabel` for radio/checkbox sets, help text, and a single group-owned error region |
| The group-carries-invalid rule | A group with `invalidFeedback` must also carry `invalid`, or no error renders anywhere. Worth stating in the docs, not only in the JSDoc |
| Broken story files | The list captured in Task 11 Step 4 |
| Known limitation | The palette-exhaustiveness guard in `manguito-theme` fails `vue-tsc`/`build`, not `pnpm test` |
