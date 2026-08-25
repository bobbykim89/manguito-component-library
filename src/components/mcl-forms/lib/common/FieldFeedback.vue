<script setup lang="ts">
withDefaults(
  defineProps<{
    /** The id aria-describedby points at — normally `${fieldId}-error`. */
    id: string
    invalid?: boolean
    text?: string
  }>(),
  {
    invalid: false,
    text: '',
  },
)

defineSlots<{
  default?: () => unknown
}>()
</script>

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
