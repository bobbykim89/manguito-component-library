import { PropType, defineComponent, h, ref, computed } from 'vue'
import type { Direction, ColorPalette } from '../../'
import generateClass from '../../'

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
      type: Number,
      required: false,
    },
    customClass: {
      type: String,
      default: '',
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const defaultClassList: string =
      'invisible opacity-0 group-hover:visible group-hover:opacity-100 z-[100] tooltip'
    const bgColor = computed<string>(() => {
      return generateClass('BGCOLOR', props.color)
    })
    const textColor = computed<string>(() => {
      return generateClass('TEXTCOLOR', props.textColor)
    })
    const tooltipStyle = computed(() => {
      switch (props.direction) {
        case 'left':
          return {
            top: '50%',
            right: '110%',
            transform: 'translateY(-50%)',
          }
        case 'top':
          return {
            left: '50%',
            bottom: '110%',
            transform: 'translateX(-50%)',
          }
        case 'bottom':
          return {
            left: '50%',
            top: '110%',
            transform: 'translateX(-50%)',
          }
        default:
          return {
            top: '50%',
            left: '110%',
            transform: 'translateY(-50%)',
          }
      }
    })
    const tooltipDirection = computed<string>(() => {
      if (props.direction === 'left') {
        return 'tooltip-left'
      }
      if (props.direction === 'top') {
        return 'tooltip-top'
      }
      if (props.direction === 'bottom') {
        return 'tooltip-bottom'
      }
      // default return tooltip right
      return 'tooltip-right'
    })
    return () =>
      h('div', {
        class: [
          defaultClassList,
          tooltipDirection.value,
          props.customClass,
          bgColor.value,
          textColor.value,
        ],
        innerHTML: props.text,
        style: tooltipStyle.value,
      })
  },
})
