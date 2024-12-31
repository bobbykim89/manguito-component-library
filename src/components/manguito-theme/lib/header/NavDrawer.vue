<script setup lang="ts">
import { computed } from 'vue'
import type { ColorPalette } from '..'
import generateClass from '..'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    displayBorder?: boolean
    toggle: boolean
    navColor: ColorPalette
  }>(),
  {
    color: 'dark-2',
    displayBorder: true,
  }
)

const emit = defineEmits(['hbg-click'])

const handleButtonToggle = (e: Event): void => {
  emit('hbg-click', e)
}

const hamburgetButtonState = computed({
  get() {
    return props.toggle
  },
  set(value) {
    return value
  },
})

const getBorderClass = (
  bColor: ColorPalette,
  border: boolean,
  nColor: ColorPalette
): string => {
  /**
   * @bColor - color
   * @border - displayBorder
   * @nColor - navColor
   */

  const classArray: string[] = [
    generateClass('RINGCOLOR', bColor),
    generateClass('OFFSETRING', nColor),
  ]

  if (border) {
    classArray.push(generateClass('BORDER', bColor))
    classArray.push('border')
  }
  return classArray.join(' ')
}

const getHamburgerButtonClass = (color: ColorPalette): string => {
  /**
   * @color - color
   */
  const classArray: string[] = [
    generateClass('BGCOLOR', color),
    generateClass('BEFOREBG', color),
    generateClass('AFTERBG', color),
  ]

  return classArray.join(' ')
}
</script>

<template>
  <button
    class="p-3xs rounded-md aspect-square outline-none focus:ring-4 ring-offset-2 transition-all duration-300 ease-linear hover:opacity-70 focus:opacity-70 hamburger__button"
    :class="getBorderClass(color, displayBorder, navColor)"
    @click="handleButtonToggle"
    :aria-label="toggle ? 'Close' : 'Open'"
    :aria-expanded="toggle"
  >
    <input
      type="checkbox"
      v-model="hamburgetButtonState"
      class="hidden hamburger__checkbox"
    />
    <div
      class="relative h-[3px] w-sm hamburger__icon before:w-sm after:w-sm before:h-[3px] after:h-[3px] transition-all duration-300 ease-linear"
      :class="getHamburgerButtonClass(color)"
    ></div>
  </button>
</template>

<style lang="scss" scoped>
.hamburger__icon {
  &::before,
  &::after {
    position: absolute;
    left: 0;
    transition: all 0.3s linear;
  }
  &::before {
    top: -0.5rem;
  }
  &::after {
    top: 0.5rem;
  }
}
.hamburger__button {
  &:focus .hamburger__icon,
  &:hover .hamburger__icon {
    scale: 1.05;
  }
}
.hamburger__checkbox:checked + .hamburger__icon {
  background-color: transparent;
}
.hamburger__checkbox:checked + .hamburger__icon::before {
  top: 0;
  transform: rotate(135deg);
}
.hamburger__checkbox:checked + .hamburger__icon::after {
  top: 0;
  transform: rotate(-135deg);
}
</style>
