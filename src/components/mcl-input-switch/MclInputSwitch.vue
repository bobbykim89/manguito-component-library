<script setup lang="ts">
import { computed, ref } from 'vue'
import generateClass from '@bobbykim/manguito-theme'
import type {
  ColorPalette,
  SpacingLevel,
  BodyText,
} from '@bobbykim/manguito-theme/theme/theme.types'

export type SwitchSizeType = 'sm' | 'md' | 'lg'
export type ColorMap = {
  [key in ColorPalette]: string
}

const props = withDefaults(
  defineProps<{
    identifier: string
    horizontal?: boolean
    displayLabel?: boolean
    labelText?: string
    labelSize?: BodyText
    labelColor?: ColorPalette
    labelBold?: boolean
    sliderColor?: ColorPalette
    onColor?: ColorPalette
    offColor?: ColorPalette
    switchSize?: SwitchSizeType
    rounded?: boolean
    spacing?: SpacingLevel
    modelValue?: boolean
  }>(),
  {
    horizontal: true,
    displayLabel: true,
    labelSize: 'md',
    labelColor: 'dark-3',
    labelBold: true,
    sliderColor: 'light-1',
    onColor: 'success',
    offColor: 'dark-1',
    switchSize: 'md',
    rounded: true,
    spacing: 'sm',
  }
)

const emit = defineEmits(['update:modelValue'])
const inputRef = ref()

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

const onLabelClick = (): void => {
  inputRef.value.click()
}
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const alignmentClass = computed<string>(() => {
  /**
   * @summary - handle alignment of the component whether to aign label and switch vertically or horizontally, and spacing below the component
   * @param {Boolean} displayLabel - whether or not to display label
   * @param {Boolean} horizontal - whether label and switch is aligned horizontally
   * @param {SpacingLevel} spacing - margin bottom under the componnet
   */
  const { displayLabel, horizontal, spacing } = props
  const classArray: string[] = [generateClass('MARGINB', spacing)]
  if (displayLabel && horizontal) {
    classArray.push('flex items-center gap-2xs')
  }
  if (displayLabel && !horizontal) {
    classArray.push('flex flex-col gap-2xs')
  }
  return classArray.join(' ')
})
const labelClass = computed<string>(() => {
  /**
   * @summary - handle styling classes for label
   * @param {BodyText} labelSize - font size of the label
   * @param {ColorPalette} labelColor - text color of the label
   * @param {Boolean} labelBold - font weight of the label
   */
  const { labelSize, labelColor, labelBold } = props
  const classArray: string[] = [
    generateClass('BODYTEXT', labelSize),
    generateClass('TEXTCOLOR', labelColor),
  ]
  if (labelBold) {
    classArray.push('font-bold')
  }
  return classArray.join(' ')
})
const switchSize = computed(() => {
  /**
   * @summary - handle value of variables determining the size of the switch
   * @param {SwitchSizeType} switchSize - size of switch sm|md|lg
   */
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
  <div :class="alignmentClass">
    <p
      v-if="displayLabel"
      class="inline-block cursor-default"
      :class="labelClass"
      @click="onLabelClick"
      v-html="labelText"
    ></p>
    <label
      :for="identifier"
      class="switch relative inline-block"
      :style="switchSize"
    >
      <input
        :id="identifier"
        class="hidden peer/input"
        v-model="inputValue"
        ref="inputRef"
        type="checkbox"
      />
      <span
        class="slider absolute inset-0 cursor-pointer transition-all duration-300 before:absolute before:transition-all before:duration-300"
        :class="switchClass"
      ></span>
    </label>
  </div>
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
// .slider {
//   background-color: #ccc;
// }

.slider:before {
  // position: absolute;
  content: '';
  height: var(--slider-size);
  width: var(--slider-size);
  left: var(--gutter-size);
  bottom: var(--gutter-size);
  // background-color: white; // before:bg-{color}
  // -webkit-transition: 0.4s;
  // transition: 0.4s;
}

// input:checked + .slider {
//   background-color: #2196f3;
// }

// input:focus + .slider {
//   box-shadow: 0 0 1px #2196f3;
// }

input:checked + .slider:before {
  -webkit-transform: translateX(var(--slider-size));
  -ms-transform: translateX(var(--slider-size));
  transform: translateX(var(--slider-size));
}

/* Rounded sliders */
// .slider.round {
//   border-radius: 34px;
// }

// .slider.round:before {
//   border-radius: 50%;
// }
</style>
