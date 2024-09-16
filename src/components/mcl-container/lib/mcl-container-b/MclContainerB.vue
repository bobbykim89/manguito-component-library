<script setup lang="ts">
import type {
  ColorPalette,
  HeadingLevel,
  HeadingSize,
} from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    sectionBgColor?: ColorPalette
    containerBgColor?: ColorPalette
    imageSource: string
    imageAlt: string
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
  }>(),
  {
    sectionBgColor: 'transparent',
    containerBgColor: 'light-2',
    titleLevel: 'h2',
    titleSize: 'md',
    titleColor: 'dark-3',
  }
)

const slots = defineSlots<{
  content: any
}>()
const mainContentElem = ref<HTMLDivElement>()
const { height } = useElementSize(mainContentElem)

const titleClass = computed<string>(() => {
  const { titleLevel, titleSize, titleColor } = props

  const headingOptions: Record<HeadingLevel, string> = {
    h1: generateClass('H1', titleSize),
    h2: generateClass('H2', titleSize),
    h3: generateClass('H3', titleSize),
    h4: generateClass('H4', titleSize),
  }
  const classArray: string[] = [
    generateClass('TEXTCOLOR', titleColor),
    headingOptions[titleLevel],
  ]
  return classArray.join(' ')
})

const parallaxImage = computed(() => {
  return {
    '--bg-image': `url('${props.imageSource}')`,
    '--space-height': `${height.value / 2}px`,
  }
})
</script>

<template>
  <section class="relative" :style="parallaxImage">
    <div :class="[generateClass('BGCOLOR', sectionBgColor), 'space-hts']"></div>
    <div class="relative">
      <div
        class="absolute bg-fixed bg-cover bg-top inset-0 bg-no-repeat bg-image"
        role="img"
        :aria-label="imageAlt"
      ></div>
      <div
        class="container relative z-[10] -translate-y-1/2 px-xs max-w-[1140px]"
        ref="mainContentElem"
      >
        <div
          :class="generateClass('BGCOLOR', containerBgColor)"
          class="py-md md:py-lg px-xs md:px-md lg:p-xl"
        >
          <div class="w-full">
            <component :is="titleLevel">
              <span :class="titleClass">{{ title }}</span>
            </component>
            <div class="mt-sm">
              <slot name="content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.space-hts {
  height: calc(var(--space-height) + 36px);

  @media screen and (min-width: 768px) {
    height: calc(var(--space-height) + 48px);
  }
  @media screen and (min-width: 1024px) {
    height: calc(var(--space-height) + 64px);
  }
}
.bg-image {
  background-image: var(--bg-image);
}
</style>
