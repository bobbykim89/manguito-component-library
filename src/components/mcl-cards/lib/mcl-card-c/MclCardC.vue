<script setup lang="ts">
import type {
  ColorPalette,
  HeadingLevel,
  HeadingSize,
  OpacityRange,
} from '@bobbykim/manguito-theme'
import { generateClass } from '@bobbykim/manguito-theme'
import { computed, ref, useId } from 'vue'
import {
  cardFocusRingClass,
  slotPassThroughClass,
  stretchedTargetClass,
} from '../common/a11y'

const props = withDefaults(
  defineProps<{
    imageSource: string
    /** Pass alt text for meaningful images; leave empty only for decorative ones. */
    imageAlt?: string
    title?: string
    titleLevel?: HeadingLevel
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    showHighlight?: boolean
    highlightColor?: ColorPalette
    highlightOpacity?: OpacityRange
    showTitle?: boolean
    cardColor?: ColorPalette
  }>(),
  {
    imageAlt: '',
    title: '',
    titleLevel: 'h3',
    titleSize: 'md',
    titleColor: 'dark-3',
    showHighlight: false,
    highlightColor: 'light-3',
    highlightOpacity: 80,
    showTitle: false,
    cardColor: 'primary',
  },
)

defineSlots<{
  'card-body': any
}>()
const cardFlipped = ref<boolean>(false)
const emit = defineEmits<{
  (e: 'card-click', event: Event): void
}>()

const cardClass = computed(() => {
  const classArray: string[] = [
    generateClass.bgColorVariant({ color: props.cardColor }),
  ]
  if (cardFlipped.value) {
    classArray.push('flip-card')
  }

  return classArray.join(' ')
})
const titleClass = computed<string>(() => {
  /**
   * @param {HeadingSize} titleSize
   * @param {ColorPalette} titleColor
   * @param {boolean} showHighlight
   * @param {ColorPalette} highlightColor
   * @param {OpacityRange} highlightOpacity
   */
  const {
    titleSize,
    titleColor,
    showHighlight,
    highlightColor,
    highlightOpacity,
  } = props
  const classArray: string[] = [
    generateClass.h3Variant({ size: titleSize }),
    generateClass.textColorVariant({ color: titleColor }),
  ]
  if (showHighlight) {
    classArray.push('px-xs py-2xs mb-2xs rounded')
    classArray.push(generateClass.bgColorVariant({ color: highlightColor }))
    classArray.push(
      generateClass.bgOpacityVariant({ opacity: highlightOpacity }),
    )
  }
  return classArray.join(' ')
})
const contentId = useId()
const titleId = useId()
// The visible title names the button when there is one; otherwise the title
// text, the image's alt text, or a generic word, so it is never unnamed.
const labelledBy = computed<string | undefined>(() =>
  props.showTitle && props.title ? titleId : undefined,
)
const ariaLabel = computed<string | undefined>(() =>
  labelledBy.value ? undefined : props.title || props.imageAlt || 'Card',
)
// `undefined`, not `false`, once flipped: where `inert` isn't a DOM property
// (jsdom, older engines) Vue would otherwise write inert="false", which still
// makes the content inert.
const contentInert = computed<true | undefined>(() =>
  cardFlipped.value ? undefined : true,
)
// First activation flips the card; every one after that emits card-click.
const handleCardClick = (e: Event) => {
  if (cardFlipped.value) {
    emit('card-click', e)
    return
  }
  cardFlipped.value = true
}
</script>

<template>
  <div
    class="card relative aspect-square max-h-100 overflow-hidden transition duration-1600 motion-reduce:transition-none"
    :class="[cardClass, cardFocusRingClass]"
  >
    <button
      type="button"
      data-mcl-card-target
      class="absolute inset-0"
      :class="stretchedTargetClass"
      :aria-expanded="cardFlipped"
      :aria-controls="contentId"
      :aria-labelledby="labelledBy"
      :aria-label="ariaLabel"
      @click="handleCardClick"
    ></button>
    <div
      :id="contentId"
      :inert="contentInert"
      class="h-full"
      :class="slotPassThroughClass"
    >
      <img
        :src="imageSource"
        :alt="imageAlt"
        :class="[
          cardFlipped ? 'opacity-100' : 'opacity-0',
          'absolute aspect-square h-full w-full object-cover object-center transition-opacity delay-500 duration-800 motion-reduce:transition-none',
        ]"
      />
      <div
        :class="[
          cardFlipped ? 'opacity-100' : 'opacity-0',
          'relative flex h-full flex-col justify-end p-sm transition delay-500 duration-800 motion-reduce:transition-none',
        ]"
      >
        <component
          :is="titleLevel"
          v-if="showTitle"
          :id="titleId"
          class="relative self-start"
          :class="titleClass"
        >
          <span>
            {{ title }}
          </span>
        </component>
        <slot name="card-body" />
      </div>
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
@media (prefers-reduced-motion: reduce) {
  .flip-card {
    -webkit-transform: none;
    transform: none;
  }
}
</style>
