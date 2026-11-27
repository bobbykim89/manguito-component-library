<script setup lang="ts">
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'
import {
  generateClass,
  TabContainer,
  TabContent,
} from '@bobbykim/manguito-theme'
import { useElementSize } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { ContentType } from './index.types'

const props = withDefaults(
  defineProps<{
    tabName: string
    content: ContentType[]
    borderColor?: ColorPalette
    bgColor?: ColorPalette
    tabColor?: ColorPalette
    titleSize?: HeadingSize
    activeTitleColor?: ColorPalette
    inactiveTitleColor?: ColorPalette
    showShadow?: boolean
    rounded?: boolean
    showScrollButtons?: boolean
  }>(),
  {
    borderColor: 'light-3',
    bgColor: 'light-1',
    tabColor: 'primary',
    titleSize: 'md',
    activeTitleColor: 'dark-3',
    inactiveTitleColor: 'light-1',
    showShadow: true,
    rounded: true,
    showScrollButtons: true,
  },
)

const buttonContainerRef = ref<HTMLElement>()
const canScrollLeft = ref<boolean>(false)
const canScrollRight = ref<boolean>(false)
const { width } = useElementSize(buttonContainerRef)

const emit = defineEmits<{
  (e: 'tab-click', event: Event, title: string): void
}>()

const onTabClick = (e: MouseEvent, idx: number, activeTab: number): void => {
  /**
   * @summary emit tab-click for a click (or Enter/Space) that changes the selection.
   * `activeTab` is the slot value from this render, so it is still the previous selection.
   */
  if (idx === activeTab) return
  emit('tab-click', e, props.content[idx].title)
}
const onTabKeydown = async (e: KeyboardEvent): Promise<void> => {
  /**
   * @summary emit tab-click when the base tab keys (arrows, Home, End) change the selection.
   * The base handler prevents the keys it handles and focuses the new tab in a nextTick;
   * read where focus landed instead of repeating its key logic.
   */
  if (!e.defaultPrevented || !buttonContainerRef.value) return
  const tabEls = Array.from(
    buttonContainerRef.value.querySelectorAll<HTMLElement>('[role="tab"]'),
  )
  const from = tabEls.indexOf(e.currentTarget as HTMLElement)
  await nextTick()
  await nextTick()
  const to = tabEls.indexOf(document.activeElement as HTMLElement)
  if (to === -1 || to === from) return
  emit('tab-click', e, props.content[to].title)
}
const updateScrollButtons = (): void => {
  /**
   * @summary determine whether to display scroll right/left button. triggered by component onMounted hook and through event listeners.
   */
  if (buttonContainerRef.value) {
    canScrollLeft.value = buttonContainerRef.value.scrollLeft > 0
    canScrollRight.value =
      buttonContainerRef.value.scrollWidth >
      buttonContainerRef.value.clientWidth + buttonContainerRef.value.scrollLeft
  }
}
const scrollBehavior = (): ScrollBehavior =>
  /**
   * @summary 'auto' (instant) when the user prefers reduced motion. Read at click time so server rendering never touches window.
   */
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
const scrollLeft = () => {
  /**
   * @summary scroll tab container to left by 100px
   */
  if (buttonContainerRef.value) {
    buttonContainerRef.value.scrollBy({
      left: -100,
      behavior: scrollBehavior(),
    })
  }
}
const scrollRight = () => {
  /**
   * @summary scroll tab container to right by 100px
   */
  if (buttonContainerRef.value) {
    buttonContainerRef.value.scrollBy({ left: 100, behavior: scrollBehavior() })
  }
}
const borderClass = computed<string>(() => {
  /**
   * @param {ColorPalette} bgColor
   * @param {ColorPalette} borderColor
   * @param {boolean} rounded
   * @param {boolean} showShadow
   */
  const { bgColor, borderColor, rounded, showShadow } = props
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: bgColor }),
    generateClass.borderColorVariant({ color: borderColor }),
  ]
  if (rounded) classArray.push('rounded-xl')
  if (showShadow) classArray.push('shadow-xl')
  return classArray.join(' ')
})
const tabClass = computed<string>(() => {
  /**
   * @param {ColorPalette} tabColor
   * @param {boolean} rounded
   */
  const { tabColor, rounded } = props
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: tabColor }),
  ]
  if (rounded) classArray.push('rounded-xl')
  return classArray.join(' ')
})
const activeBtnClass = computed<string>(() => {
  /**
   * @param {ColorPalette} bgColor
   * @param {ColorPalette} activeTitleColor
   * @param {boolean} showShadow
   */
  const { bgColor, activeTitleColor, showShadow } = props
  const classArray: string[] = [
    generateClass.textColorVariant({ color: activeTitleColor }),
    generateClass.bgColorVariant({ color: bgColor }),
    // 'ring-4 ring-white ring-opacity-60',
    'outline-4 outline-white outline-opacity-60',
  ]
  if (showShadow) classArray.push('drop-shadow')
  return classArray.join(' ')
})
const scrollBtnClass = computed<string>(() => {
  /**
   * @param {ColorPalette} bgColor
   * @param {ColorPalette} activeTitleColor
   */
  const { bgColor, activeTitleColor } = props
  const classArray: string[] = [
    generateClass.textColorVariant({ color: activeTitleColor }),
    generateClass.bgColorVariant({ color: bgColor }),
    'opacity-60 hover:opacity-40 transition-opacity duration-300 ease-linear',
  ]
  return classArray.join(' ')
})
const inactiveBtnClass = computed<string>(() => {
  const { inactiveTitleColor } = props
  const classArray: string[] = [
    generateClass.textColorVariant({ color: inactiveTitleColor }),
    'hover:bg-white/35 focus:bg-white/35 transition-colors ease-in duration-300',
  ]
  return classArray.join(' ')
})
const generateTabId = (idx: number) => {
  const { tabName } = props

  return `${tabName}-tab-${idx}`
}

onMounted(() => {
  updateScrollButtons()
})

watch(width, updateScrollButtons)
</script>

<template>
  <TabContainer
    :body-class="['w-full p-2xs border overflow-hidden', borderClass]"
    :btn-container-class="['relative']"
    :content-container-class="[
      'mt-2xs relative p-xs lg:px-sm whitespace-pre-line',
    ]"
  >
    <template #tab-button="{ activeTab, tabAttrs }">
      <button
        v-if="showScrollButtons && canScrollLeft"
        type="button"
        aria-hidden="true"
        tabindex="-1"
        class="absolute top-1/2 left-0 z-10 h-full min-w-[24px] -translate-y-1/2 transform px-3xs lg:hidden"
        :class="[rounded && 'rounded-l-lg', scrollBtnClass]"
        @mousedown.prevent
        @click="scrollLeft"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          fill="currentColor"
          class="h-xs"
        >
          <!-- !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
      </button>
      <div
        ref="buttonContainerRef"
        :class="[
          'flex scroll-px-6 flex-nowrap space-x-1 overflow-x-auto p-3xs lg:scroll-px-0',
          tabClass,
        ]"
        @scroll="updateScrollButtons"
      >
        <button
          v-for="(item, idx) in content"
          :key="idx"
          type="button"
          v-bind="tabAttrs(idx)"
          :aria-controls="generateTabId(idx)"
          :class="[
            activeTab === idx ? activeBtnClass : inactiveBtnClass,
            rounded && 'rounded-lg',
            'w-full min-w-[50%] py-2.5 text-center focus-visible:mcl-focus-ring md:min-w-[33%] lg:min-w-fit',
          ]"
          @click="onTabClick($event, idx, activeTab)"
          @keydown="onTabKeydown"
        >
          <span
            class="block"
            :class="generateClass.h3Variant({ size: titleSize })"
          >
            {{ item.title }}
          </span>
        </button>
      </div>
      <button
        v-if="showScrollButtons && canScrollRight"
        type="button"
        aria-hidden="true"
        tabindex="-1"
        class="absolute top-1/2 right-0 z-10 h-full min-w-[24px] -translate-y-1/2 transform px-3xs lg:hidden"
        :class="[rounded && 'rounded-r-lg', scrollBtnClass]"
        @mousedown.prevent
        @click="scrollRight"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          fill="currentColor"
          class="h-xs"
        >
          <!-- !Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>
      </button>
    </template>
    <template #tab-content>
      <TabContent
        v-for="(item, idx) in content"
        :key="idx"
        :tab-number="idx"
        :id="generateTabId(idx)"
      >
        <div v-html="item.content"></div>
      </TabContent>
    </template>
  </TabContainer>
</template>
