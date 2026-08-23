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
  default: () => unknown
}>()
</script>

<template>
  <!--
    Conditional rather than CSS-hidden on purpose: role="alert" announces on
    insertion into the DOM, so an always-rendered container never fires.
  -->
  <div v-if="invalid" :id="id" role="alert" class="ml-3xs">
    <slot>
      <span class="text-xs text-danger">{{ text }}</span>
    </slot>
  </div>
</template>
