<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import type {
  ColorPalette,
  HeadingSize,
} from '@mcl/manguito-theme/theme/theme.types'
import generateClass from '@mcl/manguito-theme'

const props = withDefaults(
  defineProps<{
    displayHeader?: boolean
    headerText?: string
    headerSize?: HeadingSize
    headerColor?: ColorPalette
    backdropColor?: ColorPalette
    bgColor?: ColorPalette
    rounded?: boolean
    modelValue?: boolean
  }>(),
  {
    displayHeader: true,
    headerSize: 'md',
    headerColor: 'dark-3',
    backdropColor: 'dark-4',
    bgColor: 'light-1',
    rounded: true,
    modelValue: false,
  }
)
const emit = defineEmits(['update:modelValue'])

const openModal = (e: Event): void => {
  emit('update:modelValue', true)
}
const closeModal = (e: Event): void => {
  emit('update:modelValue', false)
}

const getHeaderClass = (size: HeadingSize, color: ColorPalette): string => {
  /**
   * @size - headerSize
   * @color - headerColor
   */
  const classArray: string[] = [
    generateClass('H3', size),
    generateClass('TEXTCOLOR', color),
  ]
  return classArray.join(' ')
}
</script>

<template>
  <section
    v-if="modelValue"
    @click="closeModal"
    class="fixed inset-0 z-10 overflow-y-auto bg-opacity-70"
    :class="generateClass('BGCOLOR', backdropColor)"
  >
    <div class="min-h-screen px-4 text-center">
      <span
        class="inline-block h-[50vh] lg:h-screen align-middle"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        @click.stop
        class="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
      >
        <!-- modal header -->
        <div class="flex justify-between items-center px-xs py-2xs">
          <h3
            class="leading-6"
            :class="getHeaderClass(headerSize, headerColor)"
          >
            Modal header
          </h3>
          <button
            @click.prevent="closeModal"
            class="opacity-60"
            :class="generateClass('TEXTCOLOR', headerColor)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
              class="h-xs w-xs"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
              />
            </svg>
          </button>
        </div>
        <div class="px-xs pb-xs pt-2xs">modal content</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
