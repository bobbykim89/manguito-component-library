<script setup lang="ts">
import { Transition } from 'vue'
import type {
  ColorPalette,
  HeadingSize,
} from '@bobbykim/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    displayHeader?: boolean
    headerText?: string
    headerSize?: HeadingSize
    headerColor?: ColorPalette
    backdropColor?: ColorPalette
    bgColor?: ColorPalette
    rounded?: boolean
    displayShadow?: boolean
    modelValue?: boolean
  }>(),
  {
    displayHeader: true,
    headerSize: 'md',
    headerColor: 'dark-3',
    backdropColor: 'dark-4',
    bgColor: 'light-1',
    rounded: true,
    displayShadow: true,
    modelValue: false,
  }
)
const emit = defineEmits(['update:modelValue', 'modal-close'])

const closeModal = (e: Event): void => {
  emit('update:modelValue', false)
  emit('modal-close', e)
}

const getModalClass = (
  bgColor: ColorPalette,
  rounded: boolean,
  shadow: boolean
): string => {
  /**
   * @bgColor - bgColor
   * @rounded - rounded
   * @shadow - displayShadow
   */

  const classArray: string[] = [generateClass('BGCOLOR', bgColor)]
  if (rounded) {
    classArray.push('rounded-lg')
  } else {
    classArray.push('rounded-sm')
  }
  if (shadow) {
    classArray.push('shadow-lg')
  }
  return classArray.join(' ')
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
  <Transition name="fade" appear>
    <section
      v-if="modelValue"
      @click="closeModal"
      class="fixed inset-0 z-[150] overflow-y-auto bg-opacity-70 flex justify-center items-start md:items-center px-xs"
      :class="generateClass('BGCOLOR', backdropColor)"
    >
      <Transition name="slide-down" appear>
        <div
          @click.stop
          v-if="modelValue"
          class="inline-block w-full max-w-md mt-[30vh] md:mt-0 overflow-hidden"
          :class="getModalClass(bgColor, rounded, displayShadow)"
        >
          <!-- modal header -->
          <div
            v-if="displayHeader"
            class="flex justify-between items-center px-sm pt-sm pb-[12px]"
          >
            <h3
              :class="getHeaderClass(headerSize, headerColor)"
              v-html="headerText"
            ></h3>
            <button
              @click.prevent="closeModal"
              class="opacity-80 hover:opacity-60 transition-opacity duration-150 ease-linear"
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
          <!-- modal content -->
          <div
            class="px-sm pb-sm"
            :class="[displayHeader ? 'pt-[12px]' : 'pt-sm']"
          >
            <slot></slot>
          </div>
        </div>
      </Transition>
    </section>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-in, opacity 0.4s linear;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
