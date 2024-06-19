<script setup lang="ts">
import type { ColorPalette } from '@bobbykim/manguito-theme'
import generateClass from '@bobbykim/manguito-theme'
import { computed, ref } from 'vue'
import type { ColorMap } from '../common/index.types'
import type { InputSizeType } from '../common/index.types'

const props = withDefaults(
  defineProps<{
    id: string
    sliderColor?: ColorPalette
    onColor?: ColorPalette
    offColor?: ColorPalette
    switchSize?: InputSizeType
    rounded?: boolean
    modelValue?: boolean
  }>(),
  {
    sliderColor: 'light-1',
    onColor: 'success',
    offColor: 'dark-1',
    switchSize: 'md',
    rounded: true,
  }
)

const emit = defineEmits(['update:modelValue'])
const inputRef = ref<HTMLInputElement>()

const peerBgColor: ColorMap = {
  primary: 'peer-checked/input:bg-primary',
  secondary: 'peer-checked/input:bg-secondary',
  success: 'peer-checked/input:bg-success',
  info: 'peer-checked/input:bg-info',
  warning: 'peer-checked/input:bg-warning',
  danger: 'peer-checked/input:bg-danger',
  'light-1': 'peer-checked/input:bg-light-1',
  'light-2': 'peer-checked/input:bg-light-2',
  'light-3': 'peer-checked/input:bg-light-3',
  'light-4': 'peer-checked/input:bg-light-4',
  'dark-1': 'peer-checked/input:bg-dark-1',
  'dark-2': 'peer-checked/input:bg-dark-2',
  'dark-3': 'peer-checked/input:bg-dark-3',
  'dark-4': 'peer-checked/input:bg-dark-1',
  transparent: 'peer-checked/input:bg-transparent',
  black: 'peer-checked/input:bg-black',
  white: 'peer-checked/input:bg-white',
}

const onSwitchClick = (): void => {
  inputRef.value?.click()
}
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const switchSize = computed(() => {
  /**
   * @summary - handle value of variables determining the size of the switch
   * @param {InputSizeType} switchSize - size of switch sm|md|lg
   */
  if (props.switchSize === 'sm') {
    return {
      '--switch-width': '30px',
      '--switch-height': '17px',
      '--slider-size': '13px',
      '--gutter-size': '2px',
    }
  }
  if (props.switchSize === 'lg') {
    return {
      '--switch-width': '60px',
      '--switch-height': '34px',
      '--slider-size': '26px',
      '--gutter-size': '4px',
    }
  }
  return {
    '--switch-width': '45px',
    '--switch-height': '25.5px',
    '--slider-size': '19.5px',
    '--gutter-size': '3px',
  }
})
const switchClass = computed<string>(() => {
  /**
   * @summary - handle style classes based on input prop values
   * @param {ColorPalette} sliderColor - color of slider button
   * @param {ColorPalette} onColor - color of switch when model value returns true
   * @param {ColorPalette} offColor - color of switch when model value returns false
   * @param {Boolean} rounded - whether this component will have round corners or not
   */
  const { sliderColor, onColor, offColor, rounded } = props
  const classArray: string[] = [
    generateClass('BGCOLOR', offColor),
    generateClass('BEFOREBG', sliderColor),
    peerBgColor[onColor],
  ]
  if (rounded) {
    classArray.push('rounded-full before:rounded-full')
  }
  return classArray.join(' ')
})
</script>

<template>
  <div class="switch relative" :style="switchSize" @click="onSwitchClick">
    <input
      :id="id"
      class="hidden peer/input"
      v-model="inputValue"
      ref="inputRef"
      type="checkbox"
    />
    <span
      class="slider absolute inset-0 cursor-pointer transition-all duration-300 before:absolute before:transition-all before:duration-300"
      :class="switchClass"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
/* The switch - the box around the slider */
.switch {
  width: var(--switch-width);
  height: var(--switch-height);
}

.slider:before {
  content: '';
  height: var(--slider-size);
  width: var(--slider-size);
  left: var(--gutter-size);
  bottom: var(--gutter-size);
}

input:checked + .slider:before {
  -webkit-transform: translateX(var(--slider-size));
  -ms-transform: translateX(var(--slider-size));
  transform: translateX(var(--slider-size));
}
</style>
