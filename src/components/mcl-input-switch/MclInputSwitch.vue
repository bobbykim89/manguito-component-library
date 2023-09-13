<script setup lang="ts">
import { computed } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type { ColorPalette } from '@bobbykim/manguito-theme/theme/theme.types'

export type SwitchSizeType = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    displayBorder?: boolean
    switchBtnColor?: ColorPalette
    onColor?: ColorPalette
    offColor?: ColorPalette
    switchSize?: SwitchSizeType
    modelValue?: boolean
  }>(),
  {
    displayBorder: false,
    switchBtnColor: 'light-1',
    onColor: 'success',
    offColor: 'dark-1',
    switchSize: 'md',
  }
)

const emit = defineEmits(['update:modelValue'])
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const switchSize = computed(() => {
  if (props.switchSize === 'sm') {
    return {
      '--switch-width': '30px',
      '--switch-height': '17px',
      '--slider-size': '14px',
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
</script>

<template>
  <label class="switch relative inline-block" :style="switchSize">
    <input class="hidden" v-model="inputValue" type="checkbox" />
    <span
      class="slider absolute inset-0 cursor-pointer transition duration-400 rounded-full before:rounded-full"
    ></span>
  </label>
</template>

<style lang="scss" scoped>
/* The switch - the box around the slider */
.switch {
  width: var(--switch-width);
  height: var(--switch-height);
}

/* Hide default HTML checkbox */
// .switch input {
//   opacity: 0;
//   width: 0;
//   height: 0;
// }

/* The slider */
.slider {
  // position: absolute;
  // cursor: pointer;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: var(--slider-size);
  width: var(--slider-size);
  left: var(--gutter-size);
  bottom: var(--gutter-size);
  background-color: white; // before:bg-{color}
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(var(--slider-size));
  -ms-transform: translateX(var(--slider-size));
  transform: translateX(var(--slider-size));
}

/* Rounded sliders */
// .slider.round {
//   border-radius: 34px;
// }

.slider.round:before {
  border-radius: 50%;
}
</style>
