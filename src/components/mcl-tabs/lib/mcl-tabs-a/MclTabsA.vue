<script setup lang="ts">
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme'
import generateClass, {
  TabContainer,
  TabContent,
} from '@bobbykim/manguito-theme'
import { computed } from 'vue'
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

const emit = defineEmits<{
  (e: 'tab-click', event: Event, title: string): void
}>()

const hadleTabClick = (e: Event, title: string): void => {
  e.preventDefault()
  emit('tab-click', e, title)
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
</script>

<template>
  <TabContainer
    :body-class="['w-full p-2xs border overflow-hidden', borderClass]"
    :btn-container-class="[
      'flex flex-nowrap p-3xs space-x-1 overflow-x-auto',
      tabClass,
    ]"
    :content-container-class="[
      'mt-2xs relative p-xs lg:px-sm whitespace-pre-line',
    ]"
  >
    <template #tab-button="{ update, activeTab }">
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
