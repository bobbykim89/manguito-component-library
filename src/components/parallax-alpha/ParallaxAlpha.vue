<script setup lang="ts">
import { withDefaults, computed } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  HeadingLevel,
  HeadingSize,
  BodyText,
} from '@bobbykim/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    sectionBgColor?: ColorPalette
    containerBgColor?: ColorPalette
    bgImage: string
    imgHeightSm?: number
    imgHeightLg?: number
    title: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
  }>(),
  {
    sectionBgColor: 'transparent',
    containerBgColor: 'light-2',
    imgHeightSm: 256,
    imgHeightLg: 384,
    titleLevel: 'h2',
    titleSize: 'md',
    titleColor: 'dark-3',
  }
)

const getTitleClass = (
  level: HeadingLevel,
  size: HeadingSize,
  color: ColorPalette
): string => {
  /**
   * @level - titleLevel
   * @size - titleSize
   * @Color - titleColor
   */
  let heading: string
  // let textColor: string = textColorClass[Color]
  if (level === 'h1') {
    // heading = h1Class[size]
    heading = generateClass('H1', size)
  } else if (level === 'h2') {
    // heading = h2Class[size]
    heading = generateClass('H2', size)
  } else {
    // heading = h3Class[size]
    heading = generateClass('H3', size)
  }
  return `${heading} ${generateClass('TEXTCOLOR', color)}`
}

const parallaxImage = computed(() => {
  return {
    '--bg-image': `url('${props.bgImage}')`,
    '--container-height-mobile': `${props.imgHeightSm}px`,
    '--container-height-desktop': `${props.imgHeightLg}px`,
  }
})
</script>

<template>
  <section
    class="relative pt-xl md:pt-3xl"
    :class="generateClass('BGCOLOR', sectionBgColor)"
  >
    <div class="relative parallax-container" :style="parallaxImage">
      <div
        class="absolute parallax-image bg-fixed bg-cover w-full top-0 left-0 bg-no-repeat"
      ></div>
      <div
        class="container relative z-[10] px-xs top-[-48px] md:top-[-96px] max-w-[1140px]"
      >
        <div
          :class="generateClass('BGCOLOR', containerBgColor)"
          class="py-md md:py-lg px-xs md:px-md lg:p-xl"
        >
          <div class="w-full">
            <compoenent :is="titleLevel">
              <span
                :class="getTitleClass(titleLevel, titleSize, titleColor)"
                v-html="title"
              ></span>
            </compoenent>
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
.parallax-container {
  height: var(--container-height-mobile, 256px);
}
.parallax-image {
  height: var(--container-height-mobile, 256px);
  background-image: var(--bg-image);
  background-position: center top;
}
@media screen and (min-width: 768px) {
  .parallax-container {
    height: var(--container-height-desktop, 384px);
  }
  .parallax-image {
    height: var(--container-height-desktop, 384px);
  }
}
</style>
