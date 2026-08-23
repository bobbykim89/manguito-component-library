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
    Content is part of the condition: an empty alert region is an
    aria-describedby target with nothing to read out.
  -->
  <div
    v-if="invalid && (text || $slots.default)"
    :id="id"
    role="alert"
    class="ml-3xs"
  >
    <slot>
      <span class="text-xs text-danger">{{ text }}</span>
    </slot>
  </div>
</template>
