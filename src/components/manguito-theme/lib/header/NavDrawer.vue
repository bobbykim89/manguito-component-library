<script setup lang="ts">
import { generateClass } from '../theme'
import type { ColorPalette } from '../theme/static/theme.types'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    showBorder?: boolean
    toggle: boolean
    bgColor: ColorPalette
    /** Accessible name; aria-expanded carries the open/closed state. */
    label?: string
    /** Id of the menu this button opens, rendered as `aria-controls` (#128). */
    controls?: string
  }>(),
  {
    color: 'dark-2',
    showBorder: true,
    label: 'Menu',
  },
)

const emit = defineEmits(['hbg-click'])

const handleButtonToggle = (e: Event): void => {
  emit('hbg-click', e)
}

// The focus indicator is the shared ring (#128), so the header background
// (`bgColor`) no longer feeds a ring offset; the prop stays for compatibility.
const getBorderClass = (bColor: ColorPalette, border: boolean): string => {
  const classArray: string[] = []
  if (border) {
    classArray.push(generateClass.borderColorVariant({ color: bColor }))
    classArray.push('border')
  }
  return classArray.join(' ')
}

const getHamburgerButtonClass = (color: ColorPalette): string => {
  /**
   * @color - color
   */
  const classArray: string[] = [
    generateClass.bgColorVariant({ color }),
    generateClass.beforeBgColorVariant({ color }),
    generateClass.afterBgColorVariant({ color }),
  ]

  return classArray.join(' ')
}
</script>

<template>
  <!--
    #128: a real type="button" with the shared focus ring (#122), which
    forced-colors mode keeps; the icon's open state comes from `toggle`, not
    from a checkbox nested in the button.
  -->
  <button
    type="button"
    class="hamburger__button aspect-square rounded-md p-3xs transition-all duration-300 ease-linear hover:opacity-70 focus:opacity-70 focus-visible:mcl-focus-ring"
    :class="getBorderClass(color, showBorder)"
    @click="handleButtonToggle"
    :aria-label="label"
    :aria-expanded="toggle"
    :aria-controls="controls"
  >
    <div
      class="hamburger__icon relative h-[3px] w-sm transition-all duration-300 ease-linear before:h-[3px] before:w-sm after:h-[3px] after:w-sm"
      :class="[
        getHamburgerButtonClass(color),
        { 'hamburger__icon--open': toggle },
      ]"
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
.hamburger__icon--open {
  background-color: transparent;
}
.hamburger__icon--open::before {
  top: 0;
  transform: rotate(135deg);
}
.hamburger__icon--open::after {
  top: 0;
  transform: rotate(-135deg);
}
</style>
