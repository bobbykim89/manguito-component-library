<script setup lang="ts">
import { withDefaults, ref, Transition } from 'vue'
import generateClass from '@mcl/manguito-theme'
import type {
  ColorPalette,
  HeadingSize,
} from '@mcl/manguito-theme/theme/theme.types'

export interface ContentType {
  title: string
  content: any
}

const props = withDefaults(
  defineProps<{
    content: ContentType[]
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    tabColor?: ColorPalette
    titleSize?: HeadingSize
    activeTitleColor?: ColorPalette
    inactiveTitleColor?: ColorPalette
    displayShadow?: boolean
    rounded?: boolean
  }>(),
  {
    borderColor: 'light-3',
    bgColor: 'light-1',
    tabColor: 'primary',
    titleSize: 'md',
    activeTitleColor: 'dark-3',
    inactiveTitleColor: 'light-1',
    displayShadow: true,
    rounded: true,
  }
)

const currentTab = ref(0)
const emit = defineEmits(['tab-click'])

const hadleTabClick = (e: Event, index: number, title: string): void => {
  e.preventDefault()
  currentTab.value = index
  emit('tab-click', { event: e, title: title })
}

const getBorderClass = (
  bgColor: ColorPalette,
  border: ColorPalette,
  rounded: boolean,
  shadow: boolean
): string => {
  /**
   * @bgColor - bgColor
   * @border - borderColor
   * @rounded - rounded
   * @shadow - displayShadow
   */

  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BORDER', border),
  ]

  if (rounded) {
    classArray.push('rounded-xl')
  }
  if (shadow) {
    classArray.push('shadow-xl')
  }
  return classArray.join(' ')
}

const getActiveBtnClass = (
  tColor: ColorPalette,
  fColor: ColorPalette,
  shadow: boolean
): string => {
  /**
   * @tColor - bgColor
   * @fColor - activeTitleColor
   * @shadow - displayShadow
   */
  const classArray: string[] = [
    generateClass('TEXTCOLOR', fColor),
    generateClass('BGCOLOR', tColor),
    'ring-4',
    'ring-white',
    'ring-opacity-60',
  ]

  if (shadow) {
    classArray.push('drop-shadow')
  }
  return classArray.join(' ')
}

const getTabClass = (tColor: ColorPalette, rounded: boolean): string => {
  /**
   * @tColor - tabColor
   * @rounded - rounded
   */
  const classArray: string[] = [generateClass('BGCOLOR', tColor)]
  if (rounded) {
    classArray.push('rounded-xl')
  }
  return classArray.join(' ')
}

const getInactiveBtnClass = (fColor: ColorPalette): string => {
  /**
   * @fColor - inactiveTitleColor
   */
  const classArray: string[] = [
    generateClass('TEXTCOLOR', fColor),
    'hover:bg-white/25',
    'transition',
    'ease-in',
    'duration-300',
  ]
  return classArray.join(' ')
}
</script>

<template>
  <div
    class="w-full p-2xs border overflow-hidden"
    :class="getBorderClass(bgColor, borderColor, rounded, displayShadow)"
  >
    <div class="flex p-3xs space-x-1" :class="getTabClass(tabColor, rounded)">
      <button
        v-for="(item, index) in props.content"
        :key="index"
        @click="hadleTabClick($event, index, item.title)"
        class="text-center focus:outline-none w-full py-2.5"
        :class="[
          currentTab === index
            ? getActiveBtnClass(bgColor, activeTitleColor, displayShadow)
            : getInactiveBtnClass(inactiveTitleColor),
          rounded && 'rounded-lg',
        ]"
        :disabled="currentTab === index"
      >
        <h3 :class="generateClass('H3', titleSize)">
          {{ item.title }}
        </h3>
      </button>
    </div>
    <div class="mt-2xs relative p-xs lg:px-sm whitespace-pre-line">
      <Transition name="slide" mode="out-in">
        <div :key="currentTab" v-html="content[currentTab].content"></div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// page transition animations
.slide-enter-active {
  transition: all 0.5s ease-in-out;
}
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translateX(-20px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
