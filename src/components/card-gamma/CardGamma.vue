<script setup lang="ts">
import { ref, computed } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  CrossOrigin,
  HeadingSize,
  OpacityRange,
} from '@bobbykim/manguito-theme/theme/theme.types'

const props = withDefaults(
  defineProps<{
    imageSource: string
    imageAlt?: string
    title?: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    highlightOpacity?: OpacityRange
    displayTitle?: boolean
    cardColor?: ColorPalette
    crossOrigin?: CrossOrigin
  }>(),
  {
    titleSize: 'md',
    titleColor: 'dark-3',
    displayHighlight: false,
    highlightColor: 'light-3',
    highlightOpacity: 80,
    displayTitle: false,
    cardColor: 'primary',
    crossOrigin: 'anonymous',
  }
)

const cardFlipped = ref<boolean>(false)
const emit = defineEmits(['card-click'])

const cardClass = computed(() => {
  const classArray: string[] = [generateClass('BGCOLOR', props.cardColor)]
  if (cardFlipped.value) {
    classArray.push('flip-card')
  }

  return classArray.join(' ')
})
const titleClass = (
  tSize: HeadingSize,
  tColor: ColorPalette,
  dHl: boolean,
  hlColor: ColorPalette,
  hlOpacity: OpacityRange
): string => {
  /**
   * @tSize - titleSize
   * @tColor - titleColor
   * @dHl - displayHighlight
   * @hlColor - highlightColor
   * @hlOpacity - highlightOpacity
   */
  const classArray: string[] = [
    generateClass('H3', tSize),
    generateClass('TEXTCOLOR', tColor),
  ]
  if (dHl) {
    classArray.push('px-xs py-2xs mb-2xs rounded')
    classArray.push(generateClass('BGCOLOR', hlColor))
    classArray.push(generateClass('BGOPACITY', hlOpacity))
  }
  return classArray.join(' ')
}
const handleCardClick = (e: Event) => {
  e.preventDefault()
  if (cardFlipped.value) {
    emit('card-click', e)
  }
  cardFlipped.value = true
}
</script>

<template>
  <div
    class="relative aspect-square card transition duration-[1600ms] max-h-[400px] overflow-hidden"
    :class="cardClass"
    @click="handleCardClick"
  >
    <img
      :src="imageSource"
      :alt="imageAlt"
      :class="[
        cardFlipped ? 'opacity-100' : 'opacity-0',
        'absolute inset-0 object-cover object-center transition-opacity delay-500 duration-[800ms] grayscale-0 hover:grayscale',
      ]"
      :crossorigin="crossOrigin"
    />
    <div
      :class="[
        cardFlipped ? 'cursor-pointer opacity-100' : 'opacity-0',
        'relative flex flex-col justify-end p-sm h-full transition delay-500 duration-[800ms]',
      ]"
    >
      <h3
        v-if="displayTitle"
        class="relative self-start"
        :class="
          titleClass(
            titleSize,
            titleColor,
            displayHighlight,
            highlightColor,
            highlightOpacity
          )
        "
      >
        <span>
          {{ title }}
        </span>
      </h3>
      <slot name="card-body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.perspective {
  -webkit-perspective: 1800px;
  perspective: 1800px;
}
.card {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform: rotateY(0deg);
  transform: rotateY(0deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card {
  -webkit-transform: rotateY(360deg);
  transform: rotateY(360deg);
}
</style>
