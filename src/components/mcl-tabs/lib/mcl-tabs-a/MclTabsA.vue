<script setup lang="ts">
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'
import generateClass, {
  TabContainer,
  TabContent,
} from '@bobbykim/manguito-theme'
import { useElementSize } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
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
    displayShadow?: boolean
    rounded?: boolean
    displayScrollButtons?: boolean
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
    displayScrollButtons: true,
  }
)

const buttonContainerRef = ref<HTMLElement>()
const canScrollLeft = ref<boolean>(false)
const canScrollRight = ref<boolean>(false)
const { width } = useElementSize(buttonContainerRef)

const emit = defineEmits<{
  (e: 'tab-click', event: Event, title: string): void
}>()

const hadleTabClick = (e: Event, title: string): void => {
  e.preventDefault()
  emit('tab-click', e, title)
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
const scrollLeft = () => {
  /**
   * @summary scroll tab container to left by 100px
   */
  if (buttonContainerRef.value) {
    buttonContainerRef.value.scrollBy({ left: -100, behavior: 'smooth' })
  }
}
const scrollRight = () => {
  /**
   * @summary scroll tab container to right by 100px
   */
  if (buttonContainerRef.value) {
    buttonContainerRef.value.scrollBy({ left: 100, behavior: 'smooth' })
  }
}
const borderClass = computed<string>(() => {
  /**
   * @param {ColorPalette} bgColor
   * @param {ColorPalette} borderColor
   * @param {boolean} rounded
   * @param {boolean} displayShadow
   */
  const { bgColor, borderColor, rounded, displayShadow } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BORDER', borderColor),
  ]
  rounded && classArray.push('rounded-xl')
  displayShadow && classArray.push('shadow-xl')
  return classArray.join(' ')
})
const tabClass = computed<string>(() => {
  /**
   * @param {ColorPalette} tabColor
   * @param {boolean} rounded
   */
  const { tabColor, rounded } = props
  const classArray: string[] = [generateClass('BGCOLOR', tabColor)]
  rounded && classArray.push('rounded-xl')
  return classArray.join(' ')
})
const activeBtnClass = computed<string>(() => {
  /**
   * @param {ColorPalette} bgColor
   * @param {ColorPalette} activeTitleColor
   * @param {boolean} displayShadow
   */
  const { bgColor, activeTitleColor, displayShadow } = props
  const classArray: string[] = [
    generateClass('TEXTCOLOR', activeTitleColor),
    generateClass('BGCOLOR', bgColor),
    'ring-4 ring-white ring-opacity-60',
  ]
  displayShadow && classArray.push('drop-shadow')
  return classArray.join(' ')
})
const scrollBtnClass = computed<string>(() => {
  /**
   * @param {ColorPalette} bgColor
   * @param {ColorPalette} activeTitleColor
   */
  const { bgColor, activeTitleColor } = props
  const classArray: string[] = [
    generateClass('TEXTCOLOR', activeTitleColor),
    generateClass('BGCOLOR', bgColor),
    'opacity-60 hover:opacity-40 transition-opacity duration-300 ease-linear',
  ]
  return classArray.join(' ')
})
const inactiveBtnClass = computed<string>(() => {
  const { inactiveTitleColor } = props
  const classArray: string[] = [
    generateClass('TEXTCOLOR', inactiveTitleColor),
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
    <template #tab-button="{ update, activeTab }">
      <button
        v-if="displayScrollButtons && canScrollLeft"
        class="lg:hidden absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-3xs h-full"
        :class="[rounded && 'rounded-l-lg', scrollBtnClass]"
        aria-label="scroll left"
        @click="scrollLeft"
      >
        <svg
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
        :class="['flex flex-nowrap p-3xs space-x-1 overflow-x-auto', tabClass]"
        @scroll="updateScrollButtons"
      >
        <button
          v-for="(item, idx) in content"
          :key="idx"
          role="tab"
          :aria-selected="activeTab === idx"
          :tabindex="activeTab === idx ? -1 : 0"
          :class="[
            activeTab === idx ? activeBtnClass : inactiveBtnClass,
            rounded && 'rounded-lg',
            'min-w-[50%] md:min-w-[33%] lg:min-w-fit text-center w-full py-2.5 focus:outline-none',
          ]"
          :disabled="activeTab === idx"
          @click="hadleTabClick($event, item.title), update(idx)"
        >
          <h3 :class="generateClass('H3', titleSize)">
            {{ item.title }}
          </h3>
        </button>
      </div>
      <button
        v-if="displayScrollButtons && canScrollRight"
        class="lg:hidden absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-3xs h-full"
        :class="[rounded && 'rounded-r-lg', scrollBtnClass]"
        aria-label="scroll right"
        @click="scrollRight"
      >
        <svg
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
