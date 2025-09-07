import { generateClass } from '../theme/index'
import type {
  BodyText,
  ColorPalette,
  OpacityRange,
} from '../theme/static/theme.types'

const blurClass: Record<BodyText, string> = {
  xs: 'backdrop-blur-xs',
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
}

const glassColorClass: Record<ColorPalette, string> = {
  primary: 'mcl-glass-primary',
  secondary: 'mcl-glass-secondary',
  success: 'mcl-glass-success',
  info: 'mcl-glass-info',
  danger: 'mcl-glass-danger',
  warning: 'mcl-glass-warning',
  'light-1': 'mcl-glass-light-1',
  'light-2': 'mcl-glass-light-2',
  'light-3': 'mcl-glass-light-3',
  'light-4': 'mcl-glass-light-4',
  'dark-1': 'mcl-glass-dark-1',
  'dark-2': 'mcl-glass-dark-2',
  'dark-3': 'mcl-glass-dark-3',
  'dark-4': 'mcl-glass-dark-4',
  black: 'mcl-glass-black',
  white: 'mcl-glass-white',
  transparent: 'mcl-glass-transparent',
}

const glassDepthClass: Record<OpacityRange, string> = {
  10: 'mcl-depth-10',
  20: 'mcl-depth-20',
  30: 'mcl-depth-30',
  40: 'mcl-depth-40',
  50: 'mcl-depth-50',
  60: 'mcl-depth-60',
  70: 'mcl-depth-70',
  80: 'mcl-depth-80',
  90: 'mcl-depth-90',
  100: 'mcl-depth-100',
}

export const getGlassmorphismClass = (
  color: ColorPalette,
  blur: BodyText,
  opacity: OpacityRange,
  depth: OpacityRange = 10,
): string => {
  return [
    'mcl-glassmorphism',
    glassColorClass[color],
    blurClass[blur],
    generateClass('BGOPACITY', opacity),
    glassDepthClass[depth],
  ]
    .filter(Boolean)
    .join(' ')
}
