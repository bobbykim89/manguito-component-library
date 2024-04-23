<script setup lang="ts">
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { ref, Transition } from 'vue'
import type { ContentType } from './index.types'

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
const emit = defineEmits<{
  (e: 'tab-click', event: Event, title: string): void
}>()
const transitionClass = ref<string>('')

const hadleTabClick = (e: Event, index: number, title: string): void => {
  e.preventDefault()
  transitionClass.value = currentTab.value < index ? 'slide-next' : 'slide-prev'
  currentTab.value = index
  emit('tab-click', e, title)
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
    'hover:bg-white/35',
    'focus:bg-white/35',
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
    <div
      role="tablist"
      class="flex p-3xs space-x-1"
      :class="getTabClass(tabColor, rounded)"
    >
      <button
        v-for="(item, index) in props.content"
        :key="index"
        role="tab"
        :aria-selected="currentTab === index"
        :tabindex="currentTab === index ? -1 : 0"
        @click="hadleTabClick($event, index, item.title)"
        class="text-center w-full py-2.5 focus:outline-none"
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
      <Transition :name="transitionClass" mode="out-in">
        <div
          role="tabpanel"
          tabindex="-1"
          :key="currentTab"
          v-html="content[currentTab].content"
        ></div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// transition animations
.slide-prev-enter-active {
  transition: all 0.5s linear;
}
.slide-prev-leave-active {
  transition: all 0.5s;
}
.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-enter-active {
  transition: all 0.5s linear;
}
.slide-next-leave-active {
  transition: all 0.5s;
}
.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
