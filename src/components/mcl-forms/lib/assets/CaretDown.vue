<script setup lang="ts">
import { generateClass, type ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    className?: string
  }>(),
  {
    color: 'dark-4',
    className: '',
  },
)

// There is no default size: Tailwind utilities of the same property resolve by
// stylesheet order, not class-attribute order, so appending className could not
// override a built-in `h-md w-md`. Dropping that default is what makes the icon
// reusable — callers must supply sizing (and any transform) via className, or
// the SVG renders at its intrinsic width.
const iconClass = computed<string>(() =>
  [generateClass.svgFillColorVariant({ color: props.color }), props.className]
    .filter(Boolean)
    .join(' '),
)
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    aria-hidden="true"
    focusable="false"
    :class="iconClass"
  >
    <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
    <path
      d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
    />
  </svg>
</template>
