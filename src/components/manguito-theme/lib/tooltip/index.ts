import { defineComponent, h, computed } from 'vue'
import type { PropType } from 'vue'
import type { Direction, ColorPalette } from '../../index.js'
import generateClass from '../../index.js'

export default defineComponent({
  props: {
    direction: {
      type: String as PropType<Direction>,
      default: 'right',
    },
    color: {
      type: String as PropType<ColorPalette>,
      default: 'dark-3',
    },
    textColor: {
      type: String as PropType<ColorPalette>,
      default: 'white',
    },
    width: {
      type: [Number, String],
      default: 80,
    },
    customClass: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const defaultClassList: string =
      'invisible opacity-0 group-hover:visible group-hover:opacity-100 z-[100] tooltip'
    const colorClass = computed<string>(() => {
      /**
       * @param {ColorPalette} color - props
       * @param {ColorPalette} textolor - props
       */
      const { color, textColor } = props
      const classArray: string[] = [
        generateClass('BGCOLOR', color),
        generateClass('TEXTCOLOR', textColor),
      ]
      return classArray.join(' ')
    })
    const tooltipWidth = computed(() => {
      return { width: `${props.width}px` }
    })
    const tooltipDirection = computed<string>(() => {
      switch (props.direction) {
        case 'left':
          return 'tooltip-left'
        case 'top':
          return 'tooltip-top'
        case 'bottom':
          return 'tooltip-bottom'
        default:
          return 'tooltip-right'
      }
    })
    return () =>
      h('div', {
        class: [
          defaultClassList,
          props.customClass,
          tooltipDirection.value,
          colorClass.value,
        ],
        role: 'tooltip',
        innerHTML: props.title,
        style: [tooltipWidth.value],
      })
  },
})
