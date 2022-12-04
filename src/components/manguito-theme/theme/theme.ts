/**
 * @TailwindCSS - Good practice is to let all of used classes to be in full instead of generated dynamically using methods such as string literal.
 * @Interface - Classes for color, header text, body text, border color, border width(top, left).
 * @Export RDSTheme - an abstract class
 */

export interface ColorClass {
  primary: string
  secondary: string
  success: string
  info: string
  warning: string
  danger: string
  'light-1': string
  'light-2': string
  'light-3': string
  'light-4': string
  'dark-1': string
  'dark-2': string
  'dark-3': string
  'dark-4': string
  black: string
  white: string
}

export interface HeaderSizeClass {
  sm: string
  md: string
  lg: string
  xl: string
}

export interface BodyTextClass {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

export interface FontWeightClass {
  light: string
  normal: string
  bold: string
}

export interface BorderWidth {
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  11: string
  12: string
}

export interface Opacity {
  10: string
  20: string
  30: string
  40: string
  50: string
  60: string
  70: string
  80: string
  90: string
  100: string
}

export interface Spacing {
  '0': string
  '3xs': string
  '2xs': string
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
}

abstract class MCLTheme {
  // bg color class
  protected static bgColor: ColorClass = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    danger: 'bg-danger',
    info: 'bg-info',
    warning: 'bg-warning',
    'light-1': 'bg-light-1',
    'light-2': 'bg-light-2',
    'light-3': 'bg-light-3',
    'light-4': 'bg-light-4',
    'dark-1': 'bg-dark-1',
    'dark-2': 'bg-dark-2',
    'dark-3': 'bg-dark-3',
    'dark-4': 'bg-dark-4',
    black: 'bg-black',
    white: 'bg-white',
  }
  // hover bg color class
  protected static hoverBgColor: ColorClass = {
    primary: 'hover:bg-primary',
    secondary: 'hover:bg-secondary',
    success: 'hover:bg-success',
    danger: 'hover:bg-danger',
    info: 'hover:bg-info',
    warning: 'hover:bg-warning',
    'light-1': 'hover:bg-light-1',
    'light-2': 'hover:bg-light-2',
    'light-3': 'hover:bg-light-3',
    'light-4': 'hover:bg-light-4',
    'dark-1': 'hover:bg-dark-1',
    'dark-2': 'hover:bg-dark-2',
    'dark-3': 'hover:bg-dark-3',
    'dark-4': 'hover:bg-dark-4',
    black: 'hover:bg-black',
    white: 'hover:bg-white',
  }
  // ::before bg color class
  protected static beforeBgColor: ColorClass = {
    primary: 'before:bg-primary',
    secondary: 'before:bg-secondary',
    success: 'before:bg-success',
    danger: 'before:bg-danger',
    info: 'before:bg-info',
    warning: 'before:bg-warning',
    'light-1': 'before:bg-light-1',
    'light-2': 'before:bg-light-2',
    'light-3': 'before:bg-light-3',
    'light-4': 'before:bg-light-4',
    'dark-1': 'before:bg-dark-1',
    'dark-2': 'before:bg-dark-2',
    'dark-3': 'before:bg-dark-3',
    'dark-4': 'before:bg-dark-4',
    black: 'before:bg-black',
    white: 'before:bg-white',
  }
  // text color class
  protected static textColor: ColorClass = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    danger: 'text-danger',
    info: 'text-info',
    warning: 'text-warning',
    'light-1': 'text-light-1',
    'light-2': 'text-light-2',
    'light-3': 'text-light-3',
    'light-4': 'text-light-4',
    'dark-1': 'text-dark-1',
    'dark-2': 'text-dark-2',
    'dark-3': 'text-dark-3',
    'dark-4': 'text-dark-4',
    black: 'text-black',
    white: 'text-white',
  }
  // hover text color class
  protected static hoverTextColor: ColorClass = {
    primary: 'hover:text-primary',
    secondary: 'hover:text-secondary',
    success: 'hover:text-success',
    danger: 'hover:text-danger',
    info: 'hover:text-info',
    warning: 'hover:text-warning',
    'light-1': 'hover:text-light-1',
    'light-2': 'hover:text-light-2',
    'light-3': 'hover:text-light-3',
    'light-4': 'hover:text-light-4',
    'dark-1': 'hover:text-dark-1',
    'dark-2': 'hover:text-dark-2',
    'dark-3': 'hover:text-dark-3',
    'dark-4': 'hover:text-dark-4',
    black: 'hover:text-black',
    white: 'hover:text-white',
  }
  // disabled text color class
  protected static disabledTextColor: ColorClass = {
    primary: 'disabled:text-primary',
    secondary: 'disabled:text-secondary',
    success: 'disabled:text-success',
    danger: 'disabled:text-danger',
    info: 'disabled:text-info',
    warning: 'disabled:text-warning',
    'light-1': 'disabled:text-light-1',
    'light-2': 'disabled:text-light-2',
    'light-3': 'disabled:text-light-3',
    'light-4': 'disabled:text-light-4',
    'dark-1': 'disabled:text-dark-1',
    'dark-2': 'disabled:text-dark-2',
    'dark-3': 'disabled:text-dark-3',
    'dark-4': 'disabled:text-dark-4',
    black: 'disabled:text-black',
    white: 'disabled:text-white',
  }
  // SVG fill color class
  protected static svgFillColor: ColorClass = {
    primary: 'fill-primary',
    secondary: 'fill-secondary',
    success: 'fill-success',
    danger: 'fill-danger',
    info: 'fill-info',
    warning: 'fill-warning',
    'light-1': 'fill-light-1',
    'light-2': 'fill-light-2',
    'light-3': 'fill-light-3',
    'light-4': 'fill-light-4',
    'dark-1': 'fill-dark-1',
    'dark-2': 'fill-dark-2',
    'dark-3': 'fill-dark-3',
    'dark-4': 'fill-dark-4',
    black: 'fill-black',
    white: 'fill-white',
  }
  // ring color class
  protected static ringColor: ColorClass = {
    primary: 'ring-primary',
    secondary: 'ring-secondary',
    success: 'ring-success',
    danger: 'ring-danger',
    info: 'ring-info',
    warning: 'ring-warning',
    'light-1': 'ring-light-1',
    'light-2': 'ring-light-2',
    'light-3': 'ring-light-3',
    'light-4': 'ring-light-4',
    'dark-1': 'ring-dark-1',
    'dark-2': 'ring-dark-2',
    'dark-3': 'ring-dark-3',
    'dark-4': 'ring-dark-4',
    black: 'ring-black',
    white: 'ring-white',
  }
  // focus:ring color class
  protected static ringFocusColor: ColorClass = {
    primary: 'focus:ring-primary',
    secondary: 'focus:ring-secondary',
    success: 'focus:ring-success',
    danger: 'focus:ring-danger',
    info: 'focus:ring-info',
    warning: 'focus:ring-warning',
    'light-1': 'focus:ring-light-1',
    'light-2': 'focus:ring-light-2',
    'light-3': 'focus:ring-light-3',
    'light-4': 'focus:ring-light-4',
    'dark-1': 'focus:ring-dark-1',
    'dark-2': 'focus:ring-dark-2',
    'dark-3': 'focus:ring-dark-3',
    'dark-4': 'focus:ring-dark-4',
    black: 'focus:ring-black',
    white: 'focus:ring-white',
  }
  // active:ring color class
  protected static ringActiveColor: ColorClass = {
    primary: 'active:ring-primary',
    secondary: 'active:ring-secondary',
    success: 'active:ring-success',
    danger: 'active:ring-danger',
    info: 'active:ring-info',
    warning: 'active:ring-warning',
    'light-1': 'active:ring-light-1',
    'light-2': 'active:ring-light-2',
    'light-3': 'active:ring-light-3',
    'light-4': 'active:ring-light-4',
    'dark-1': 'active:ring-dark-1',
    'dark-2': 'active:ring-dark-2',
    'dark-3': 'active:ring-dark-3',
    'dark-4': 'active:ring-dark-4',
    black: 'active:ring-black',
    white: 'active:ring-white',
  }
  // active:bg color class
  protected static bgActiveColor: ColorClass = {
    primary: 'active:bg-primary',
    secondary: 'active:bg-secondary',
    success: 'active:bg-success',
    danger: 'active:bg-danger',
    info: 'active:bg-info',
    warning: 'active:bg-warning',
    'light-1': 'active:bg-light-1',
    'light-2': 'active:bg-light-2',
    'light-3': 'active:bg-light-3',
    'light-4': 'active:bg-light-4',
    'dark-1': 'active:bg-dark-1',
    'dark-2': 'active:bg-dark-2',
    'dark-3': 'active:bg-dark-3',
    'dark-4': 'active:bg-dark-4',
    black: 'active:bg-black',
    white: 'active:bg-white',
  }
  // h1 class
  protected static heading1: HeaderSizeClass = {
    sm: 'h1-sm',
    md: 'h1-md',
    lg: 'h1-lg',
    xl: 'h1-xl',
  }
  // h2 class
  protected static heading2: HeaderSizeClass = {
    sm: 'h2-sm',
    md: 'h2-md',
    lg: 'h2-lg',
    xl: 'h2-xl',
  }
  // h3 class
  protected static heading3: HeaderSizeClass = {
    sm: 'h3-sm',
    md: 'h3-md',
    lg: 'h3-lg',
    xl: 'h3-xl',
  }
  // h4 class
  protected static heading4: HeaderSizeClass = {
    sm: 'h4-sm',
    md: 'h4-md',
    lg: 'h4-lg',
    xl: 'h4-xl',
  }
  // body text class
  protected static bodyText: BodyTextClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  // font weight class
  protected static fontweight: FontWeightClass = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  }
  // border color classes
  protected static borderColor: ColorClass = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    success: 'border-success',
    danger: 'border-danger',
    info: 'border-info',
    warning: 'border-warning',
    'light-1': 'border-light-1',
    'light-2': 'border-light-2',
    'light-3': 'border-light-3',
    'light-4': 'border-light-4',
    'dark-1': 'border-dark-1',
    'dark-2': 'border-dark-2',
    'dark-3': 'border-dark-3',
    'dark-4': 'border-dark-4',
    black: 'border-black',
    white: 'border-white',
  }
  protected static borderXColor: ColorClass = {
    primary: 'border-x-primary',
    secondary: 'border-x-secondary',
    success: 'border-x-success',
    danger: 'border-x-danger',
    info: 'border-x-info',
    warning: 'border-x-warning',
    'light-1': 'border-x-light-1',
    'light-2': 'border-x-light-2',
    'light-3': 'border-x-light-3',
    'light-4': 'border-x-light-4',
    'dark-1': 'border-x-dark-1',
    'dark-2': 'border-x-dark-2',
    'dark-3': 'border-x-dark-3',
    'dark-4': 'border-x-dark-4',
    black: 'border-x-black',
    white: 'border-x-white',
  }
  protected static borderYColor: ColorClass = {
    primary: 'border-y-primary',
    secondary: 'border-y-secondary',
    success: 'border-y-success',
    danger: 'border-y-danger',
    info: 'border-y-info',
    warning: 'border-y-warning',
    'light-1': 'border-y-light-1',
    'light-2': 'border-y-light-2',
    'light-3': 'border-y-light-3',
    'light-4': 'border-y-light-4',
    'dark-1': 'border-y-dark-1',
    'dark-2': 'border-y-dark-2',
    'dark-3': 'border-y-dark-3',
    'dark-4': 'border-y-dark-4',
    black: 'border-y-black',
    white: 'border-y-white',
  }
  protected static borderTopColor: ColorClass = {
    primary: 'border-t-primary',
    secondary: 'border-t-secondary',
    success: 'border-t-success',
    danger: 'border-t-danger',
    info: 'border-t-info',
    warning: 'border-t-warning',
    'light-1': 'border-t-light-1',
    'light-2': 'border-t-light-2',
    'light-3': 'border-t-light-3',
    'light-4': 'border-t-light-4',
    'dark-1': 'border-t-dark-1',
    'dark-2': 'border-t-dark-2',
    'dark-3': 'border-t-dark-3',
    'dark-4': 'border-t-dark-4',
    black: 'border-t-black',
    white: 'border-t-white',
  }
  protected static borderLeftColor: ColorClass = {
    primary: 'border-l-primary',
    secondary: 'border-l-secondary',
    success: 'border-l-success',
    danger: 'border-l-danger',
    info: 'border-l-info',
    warning: 'border-l-warning',
    'light-1': 'border-l-light-1',
    'light-2': 'border-l-light-2',
    'light-3': 'border-l-light-3',
    'light-4': 'border-l-light-4',
    'dark-1': 'border-l-dark-1',
    'dark-2': 'border-l-dark-2',
    'dark-3': 'border-l-dark-3',
    'dark-4': 'border-l-dark-4',
    black: 'border-l-black',
    white: 'border-l-white',
  }
  protected static borderBottomColor: ColorClass = {
    primary: 'border-b-primary',
    secondary: 'border-b-secondary',
    success: 'border-b-success',
    danger: 'border-b-danger',
    info: 'border-b-info',
    warning: 'border-b-warning',
    'light-1': 'border-b-light-1',
    'light-2': 'border-b-light-2',
    'light-3': 'border-b-light-3',
    'light-4': 'border-b-light-4',
    'dark-1': 'border-b-dark-1',
    'dark-2': 'border-b-dark-2',
    'dark-3': 'border-b-dark-3',
    'dark-4': 'border-b-dark-4',
    black: 'border-b-black',
    white: 'border-b-white',
  }
  // Border width class for top/left
  protected static borderTopWidth: BorderWidth = {
    1: 'border-t-[1px]',
    2: 'border-t-[2px]',
    3: 'border-t-[3px]',
    4: 'border-t-[4px]',
    5: 'border-t-[5px]',
    6: 'border-t-[6px]',
    7: 'border-t-[7px]',
    8: 'border-t-[8px]',
    9: 'border-t-[9px]',
    10: 'border-t-[10px]',
    11: 'border-t-[11px]',
    12: 'border-t-[12px]',
  }
  protected static borderLeftWidth: BorderWidth = {
    1: 'border-l-[1px]',
    2: 'border-l-[2px]',
    3: 'border-l-[3px]',
    4: 'border-l-[4px]',
    5: 'border-l-[5px]',
    6: 'border-l-[6px]',
    7: 'border-l-[7px]',
    8: 'border-l-[8px]',
    9: 'border-l-[9px]',
    10: 'border-l-[10px]',
    11: 'border-l-[11px]',
    12: 'border-l-[12px]',
  }
  protected static backgroundOpacity: Opacity = {
    10: 'bg-opacity-10',
    20: 'bg-opacity-20',
    30: 'bg-opacity-30',
    40: 'bg-opacity-40',
    50: 'bg-opacity-50',
    60: 'bg-opacity-60',
    70: 'bg-opacity-70',
    80: 'bg-opacity-80',
    90: 'bg-opacity-90',
    100: 'bg-opacity-100',
  }
  protected static opacity: Opacity = {
    10: 'opacity-10',
    20: 'opacity-20',
    30: 'opacity-30',
    40: 'opacity-40',
    50: 'opacity-50',
    60: 'opacity-60',
    70: 'opacity-70',
    80: 'opacity-80',
    90: 'opacity-90',
    100: 'opacity-100',
  }
  protected static marginBottom: Spacing = {
    '0': 'mb-0',
    '3xs': 'mb-3xs',
    '2xs': 'mb-2xs',
    xs: 'mb-xs',
    sm: 'mb-sm',
    md: 'mb-md',
    lg: 'mb-lg',
    xl: 'mb-xl',
    '2xl': 'mb-2xl',
    '3xl': 'mb-3xl',
  }
}

export default MCLTheme
