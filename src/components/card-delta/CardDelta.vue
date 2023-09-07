<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  HeadingSize,
  CtaTarget,
  Range,
  CrossOrigin,
} from '@bobbykim/manguito-theme/theme/theme.types'

export type ColorMap = {
  [key in ColorPalette]?: string
}

const defaultColors: ColorMap = {
  primary: '#ec489a',
  secondary: '#00feda',
  success: '#78be20',
  info: '#00a3e0',
  warning: '#f1ac18',
  danger: '#cc2f2f',
  'light-1': '#fafafa',
  'light-2': '#f1f1f1',
  'light-3': '#e8e8e8',
  'light-4': '#d0d0d0',
  'dark-1': '#747474',
  'dark-2': '#484848',
  'dark-3': '#1f2937',
  'dark-4': '#191919',
  black: '#000',
  white: 'fff',
  transparent: 'transparent',
}

const colors = ref<ColorMap>({})

const props = withDefaults(
  defineProps<{
    displayImage?: boolean
    imageSource?: string
    imageAlt?: string
    crossOrigin?: CrossOrigin
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    backgroundColor?: ColorPalette
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    ctaText?: string
    ctaLink: string
    ctaLinkTarget?: CtaTarget
    ctaAsLink?: boolean
    ctaButton?: boolean
    ctaButtonColor?: ColorPalette
    ctaButtonBlock?: boolean
    borderWidth?: Range<1, 10>
    borderColor?: ColorPalette
    gradient1?: ColorPalette
    gradient2?: ColorPalette
    customColor?: ColorMap
  }>(),
  {
    displayImage: true,
    imageAlt: '',
    crossOrigin: 'anonymous',
    titleSize: 'md',
    titleColor: 'dark-4',
    backgroundColor: 'light-1',
    displayHighlight: true,
    highlightColor: 'primary',
    ctaText: 'Read more',
    ctaLinkTarget: '_self',
    ctaAsLink: true,
    ctaButton: false,
    ctaButtonColor: 'warning',
    ctaButtonBlock: false,
    borderWidth: 3,
    borderColor: 'light-3',
    gradient1: 'primary',
    gradient2: 'secondary',
  }
)

const emit = defineEmits(['card-click'])

const titleClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @size - titleSize
   * @color - titleColor
   */

  const classArray: string[] = [
    generateClass('H2', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}
const buttonClass = (
  dBtn: boolean,
  color: ColorPalette,
  block: boolean
): string => {
  /**
   * @dBtn - ctaButton
   * @color - ctaButtonColor
   * @block - ctaButtonBlock
   */
  const classArray: string[] = []
  const lightColor: string[] = ['light-1', 'light-2', 'light-3', 'light-4']
  if (!dBtn) {
    classArray.push('mcl-link')
  }
  if (dBtn) {
    classArray.push('btn')
    classArray.push(generateClass('BTNCOLOR', color))
  }
  if (dBtn && block) {
    classArray.push('btn-full')
  }
  if (dBtn && !lightColor.includes(color)) {
    classArray.push('text-white')
  }
  return classArray.join(' ')
}

const borderColor = computed(() => {
  return {
    '--border-color': colors.value[props.borderColor],
    '--gradient-1': colors.value[props.gradient1],
    '--gradient-2': colors.value[props.gradient2],
    '--border-width': `${props.borderWidth}px`,
  }
})

const configColorMap = () => {
  Object.keys(colors.value).forEach((key: string) => {
    if (props.customColor && props.customColor[key as keyof ColorMap]) {
      colors.value[key as keyof ColorMap] =
        props.customColor[key as keyof ColorMap]
    }
    if (
      !props.customColor!.hasOwnProperty(key as keyof ColorMap) ||
      props.customColor![key as keyof ColorMap] === undefined
    ) {
      colors.value[key as keyof ColorMap] = defaultColors[key as keyof ColorMap]
    }
  })
}

const handleCardClick = (e: Event, link: boolean) => {
  const { title, ctaLink, ctaLinkTarget } = props
  if (!link) {
    e.preventDefault()
  }
  emit('card-click', { event: e, title, url: ctaLink, target: ctaLinkTarget })
}

onMounted(() => {
  colors.value = Object.assign({}, defaultColors)
  configColorMap()
})
watch(
  () => props.customColor,
  () => {
    configColorMap()
  }
)
</script>

<template>
  <div
    class="card overflow-hidden rounded-md max-w-[450px] sm:max-w-[350px] w-full xs:w-auto flex-grow flex-shrink-0 border"
    :class="generateClass('BORDER', borderColor)"
    :style="borderColor"
  >
    <div class="flex flex-col rounded-md overflow-hidden">
      <img
        v-if="displayImage"
        :src="imageSource"
        :crossorigin="crossOrigin"
        class="object-cover object-top max-h-[200px]"
        :alt="imageAlt"
      />
      <div class="p-xs" :class="generateClass('BGCOLOR', backgroundColor)">
        <h3 class="mb-xs" :class="titleClass(titleSize, titleColor)">
          {{ title }}
        </h3>
        <div
          v-if="displayHighlight"
          class="mb-xs h-3xs w-md"
          :class="generateClass('BGCOLOR', highlightColor)"
        ></div>
        <div>
          <slot></slot>
        </div>
        <div class="mt-xs" :class="{ 'mb-2xs': !ctaButton }">
          <a
            :href="ctaLink"
            :target="ctaLinkTarget"
            :class="buttonClass(ctaButton, ctaButtonColor, ctaButtonBlock)"
            @click="handleCardClick($event, ctaAsLink)"
            >{{ ctaText }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  --border-angle: 0turn;
  background-image: conic-gradient(
    from var(--border-angle),
    var(--border-color) 20%,
    var(--gradient-1),
    var(--gradient-2)
  );
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: var(--border-width);

  animation: bg-spin 3s linear infinite;
  @keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }

  &:hover {
    animation-play-state: paused;
  }
}

@property --border-angle {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0turn;
}
</style>
