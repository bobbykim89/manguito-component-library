import type {
  CrossOrigin,
  CtaTarget,
  DirectionX,
  InputType,
} from '@/components/manguito-theme/lib'
import type {
  BodyTextClass,
  ColorClass,
  FontWeightClass,
  HeaderSizeClass,
  Spacing,
} from '@/components/manguito-theme/lib/theme/theme'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type ColWidth = '25' | '50' | '75' | '100'
type SwitChSize = 'sm' | 'md' | 'lg'
type DirectionXClass = {
  [key in DirectionX]: string
}
type HeadingLevelClass = {
  [key in HeadingLevel]: string
}
type CtaTargetClass = {
  [key in CtaTarget]: string
}
type ColWidthClass = {
  [key in ColWidth]: number
}
type CorsClass = {
  [key in CrossOrigin]: string
}
type InputTypeClass = {
  [key in InputType]: string
}
type SwitchSizeClass = {
  [key in SwitChSize]: string
}

export const colors: ColorClass = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  'light-1': 'light-1',
  'light-2': 'light-2',
  'light-3': 'light-3',
  'light-4': 'light-4',
  'dark-1': 'dark-1',
  'dark-2': 'dark-2',
  'dark-3': 'dark-3',
  'dark-4': 'dark-4',
  black: 'black',
  white: 'white',
  transparent: 'transparent',
}

export const spacingOptions: Spacing = {
  '0': '0',
  '3xs': '3xs',
  '2xs': '2xs',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
}

export const bodyTextSize: BodyTextClass = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}
export const headingTextSize: HeaderSizeClass = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
}
export const buttonSize: string[] = ['small', 'medium', 'large']

export const directionsX: DirectionXClass = {
  left: 'left',
  right: 'right',
}
export const headingTextLevel: HeadingLevelClass = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
}
export const targetOption: CtaTargetClass = {
  _self: '_self',
  _blank: '_blank',
}
export const columnWidth: ColWidthClass = {
  '25': 25,
  '50': 50,
  '75': 75,
  '100': 100,
}

export const corsOptions: CorsClass = {
  'use-credentials': 'use-credentials',
  anonymous: 'anonymous',
}
export const inputOptions: InputTypeClass = {
  text: 'text',
  email: 'email',
  password: 'password',
}
export const switchSizeOptions: SwitchSizeClass = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}
export const fontWeightOptions: FontWeightClass = {
  light: 'light',
  normal: 'normal',
  bold: 'bold',
}
