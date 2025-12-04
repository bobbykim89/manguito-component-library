import type { PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { generateClass } from '../theme'
import type { ColorPalette, Direction } from '../theme/static/theme.types'

const DIRECTION_CLASS_MAP: Record<Direction, string> = {
  left: 'tooltip-left',
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  right: 'tooltip-right',
}

export default defineComponent({
  name: 'Tooltip',
  props: {
    direction: {
      type: String as PropType<Direction>,
      default: 'right' as Direction,
    },
    color: {
      type: String as PropType<ColorPalette>,
      default: 'dark-3' as ColorPalette,
    },
    textColor: {
      type: String as PropType<ColorPalette>,
      default: 'white' as ColorPalette,
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
      return [
        generateClass('BGCOLOR', props.color),
        generateClass('TEXTCOLOR', props.textColor),
      ].join(' ')
    })
    const tooltipWidth = computed(() => {
      return { width: `${props.width}px` }
    })

    const tooltipDirection = computed<string>(() => {
      return DIRECTION_CLASS_MAP[props.direction] || DIRECTION_CLASS_MAP.right
    })

    const classList = computed<string[]>(() => [
      defaultClassList,
      tooltipDirection.value,
      colorClass.value,
      props.customClass,
    ])
    return () =>
      h('div', {
        class: classList.value,
        role: 'tooltip',
        innerHTML: props.title,
        style: [tooltipWidth.value],
      })
  },
})
