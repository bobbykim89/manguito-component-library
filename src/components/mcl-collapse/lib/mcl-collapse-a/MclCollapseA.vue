<script setup lang="ts">
import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
import { generateClass, Collapse } from '@bobbykim/manguito-theme';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    collapseId: string
    borderColor?: ColorPalette
    rounded?: boolean
    showHighlight?: boolean
    highlightColor?: ColorPalette
    title: string
    titleSize?: HeadingSize
    titleColor?: ColorPalette
    visible?: boolean
    iconColor?: ColorPalette
    bgColor?: ColorPalette
    contentBgColor?: ColorPalette
  }>(),
  {
    borderColor: 'light-4',
    rounded: false,
    showHighlight: true,
    highlightColor: 'secondary',
    titleSize: 'sm',
    titleColor: 'dark-3',
    visible: false,
    iconColor: 'dark-3',
    bgColor: 'white',
    contentBgColor: 'light-2',
  },
)

const slots = defineSlots<{
  content: any
  tab: any
}>()
const emit = defineEmits<{
  (e: 'collapse-open', visible: boolean, title: string): void
  (e: 'collapse-close', visible: boolean, title: string): void
}>()

const collapseRef = ref<InstanceType<typeof Collapse>>()
const isOpen = ref(props.visible)

const handleOpen = (): void => {
  isOpen.value = true
  emit('collapse-open', true, props.title)
}
const handleClose = (): void => {
  isOpen.value = false
  emit('collapse-close', false, props.title)
}

const getBorderClass = (
  bColor: ColorPalette,
  dHl: boolean,
  hlColor: ColorPalette,
): string => {
  const classArray: string[] = ['border', generateClass.borderColorVariant({ color: bColor })]

  if (dHl) {
    const borderArray: string[] = [generateClass.borderLeftColorVariant({ color: hlColor })]
    borderArray.forEach((item) => {
      ;(classArray.push(item), classArray.push('border-l-8'))
    })
  }

  return classArray.join(' ')
}

const getTitleClass = (size: HeadingSize, color: ColorPalette): string => {
  const classArray: string[] = [
    generateClass.h3Variant({ size: size }),
    generateClass.textColorVariant({ color: color }),
  ]
  return classArray.join(' ')
}
</script>

<template>
  <div
    class="w-full overflow-hidden"
    :class="[
      rounded ? 'rounded-lg' : 'rounded-sm',
      getBorderClass(borderColor, showHighlight, highlightColor),
    ]"
  >
    <div
      class=" px-sm transition-[border] duration-500"
      :class="[
        isOpen
          ? `border-b ${generateClass.borderBottomColorVariant({ color: borderColor })} ease-in`
          : 'ease-out',
        generateClass.bgColorVariant({ color: bgColor }),
      ]"
    >
      <div class="flex items-center justify-between">
        <button
          type="button"
          :id="`${collapseId}-trigger`"
          :aria-expanded="isOpen"
          :aria-controls="collapseId"
          @click="collapseRef?.toggle()"
          class="flex flex-1 cursor-pointer items-center bg-transparent text-left py-xs"
        >
          <h3 :class="getTitleClass(titleSize, titleColor)">{{ title }}</h3>
        </button>
        <div @click.stop class="cursor-default" v-if="slots['tab']">
          <slot name="tab"></slot>
        </div>
      </div>
    </div>
    <div class="overflow-hidden" :class="generateClass.bgColorVariant({ color: contentBgColor })">
      <Collapse
        ref="collapseRef"
        :id="collapseId"
        :visible="visible"
        custom-class="py-sm px-xs"
        role="region"
        :aria-labelledby="`${collapseId}-trigger`"
        @open="handleOpen"
        @close="handleClose"
      >
        <slot name="content"></slot>
      </Collapse>
    </div>
    <div
      aria-hidden="true"
      class="px-sm flex cursor-pointer items-center justify-center border-t py-1.5 transition-all duration-500"
      :class="[
        generateClass.bgColorVariant({ color: bgColor }),
        generateClass.borderTopColorVariant({ color: borderColor }),
      ]"
      @click="collapseRef?.toggle()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="h-xs"
        :class="[
          !isOpen ? 'rotate-0' : 'rotate-180',
          'transition-transform duration-300 ease-in',
          generateClass.svgFillColorVariant({ color: iconColor }),
        ]"
      >
        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"
        />
      </svg>
    </div>
  </div>
</template>
