<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import type { RadioEventType, RadioSizeType } from './index.types'

const props = withDefaults(
  defineProps<{
    id: string
    radioSize?: RadioSizeType
    bgColor?: ColorPalette
    checkedColor?: ColorPalette
    displayShadow?: boolean
    value?: string | number
    checked?: boolean
  }>(),
  {
    radioSize: 'md',
    bgColor: 'success',
    checkedColor: 'light-1',
    displayShadow: false,
    value: '',
    checked: false,
  }
)

const radioRef = ref<HTMLInputElement>()
const emit = defineEmits(['change'])

const radioClick = () => {
  radioRef.value?.click()
}

const getRadioSize = computed(() => {
  const { radioSize } = props
  if (radioSize === 'sm') {
    return 'h-xs w-xs'
  }
  if (radioSize === 'lg') {
    return 'h-md w-md'
  }
  return 'h-sm w-sm'
})
const checkedRadioSize = computed<string>(() => {
  const { radioSize } = props
  if (radioSize === 'sm') {
    return 'peer-checked:before:h-2xs peer-checked:before:w-2xs'
  }
  if (radioSize === 'lg') {
    return 'peer-checked:before:h-xs peer-checked:before:w-xs'
  }
  return 'peer-checked:before:h-[12px] peer-checked:before:w-[12px]'
})
const getColorClass = computed(() => {
  const { bgColor, checkedColor, displayShadow } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BEFOREBG', checkedColor),
  ]
  if (displayShadow) {
    classArray.push('drop-shadow-md')
  }
  return classArray.join(' ')
})

const handleChange = (e: Event) => {
  const customEvent: RadioEventType = {
    event: e,
    value: (e.target as HTMLInputElement).value,
  }
  emit('change', customEvent)
}
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      type="radio"
      class="appearance-none peer"
      ref="radioRef"
      :value="value"
      :checked="checked"
      @change="handleChange"
    />
    <span
      class="rounded-full inline-block relative before:absolute before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2"
      :class="[getRadioSize, checkedRadioSize, getColorClass]"
      @click="radioClick"
    ></span>
  </div>
</template>
