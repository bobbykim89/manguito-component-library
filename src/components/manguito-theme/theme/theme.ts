/**
 * @TailwindCSS - Good practice is to let all of used classes to be in full instead of generated dynamically using methods such as string literal.
 * @Interface - Classes for color, header text, body text, border color, border width(top, left).
 * @Export RDSTheme - an abstract class
 */
import type {
  ColorPalette,
  HeadingSize,
  BodyText,
  FontWeight,
  Range,
  OpacityRange,
  SpacingLevel,
  Position,
} from './theme.types'

export type ColorClass = {
  [key in ColorPalette]: string
}
export type HeaderSizeClass = {
  [key in HeadingSize]: string
}
export type BodyTextClass = {
  [key in BodyText]: string
}
export type FontWeightClass = {
  [key in FontWeight]: string
}
export type BorderWidth = {
  [key in Range<1, 12>]: string
}
export type Opacity = {
  [key in OpacityRange]: string
}
export type Spacing = {
  [key in SpacingLevel]: string
}
export type Alignment = {
  [key in Position]: string
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
    transparent: 'bg-transparent',
  }
  // hover: bg color class
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
    transparent: 'hover:bg-transparent',
  }
  // focus: bg color class
  protected static focusBgColor: ColorClass = {
    primary: 'focus:bg-primary',
    secondary: 'focus:bg-secondary',
    success: 'focus:bg-success',
    danger: 'focus:bg-danger',
    info: 'focus:bg-info',
    warning: 'focus:bg-warning',
    'light-1': 'focus:bg-light-1',
    'light-2': 'focus:bg-light-2',
    'light-3': 'focus:bg-light-3',
    'light-4': 'focus:bg-light-4',
    'dark-1': 'focus:bg-dark-1',
    'dark-2': 'focus:bg-dark-2',
    'dark-3': 'focus:bg-dark-3',
    'dark-4': 'focus:bg-dark-4',
    black: 'focus:bg-black',
    white: 'focus:bg-white',
    transparent: 'focus:bg-transparent',
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
    transparent: 'before:bg-transparent',
  }
  // ::after bg color class
  protected static afterBgColor: ColorClass = {
    primary: 'after:bg-primary',
    secondary: 'after:bg-secondary',
    success: 'after:bg-success',
    danger: 'after:bg-danger',
    info: 'after:bg-info',
    warning: 'after:bg-warning',
    'light-1': 'after:bg-light-1',
    'light-2': 'after:bg-light-2',
    'light-3': 'after:bg-light-3',
    'light-4': 'after:bg-light-4',
    'dark-1': 'after:bg-dark-1',
    'dark-2': 'after:bg-dark-2',
    'dark-3': 'after:bg-dark-3',
    'dark-4': 'after:bg-dark-4',
    black: 'after:bg-black',
    white: 'after:bg-white',
    transparent: 'after:bg-transparent',
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
    transparent: 'active:bg-transparent',
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
    transparent: 'text-transparent',
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
    transparent: 'hover:text-transparent',
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
    transparent: 'disabled:text-transparent',
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
    transparent: 'fill-transparent',
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
    transparent: 'ring-transparent',
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
    transparent: 'focus:ring-transparent',
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
    transparent: 'active:ring-transparent',
  }
  // ring-offset color class
  protected static ringOffsetColor: ColorClass = {
    primary: 'ring-offset-primary',
    secondary: 'ring-offset-secondary',
    success: 'ring-offset-success',
    danger: 'ring-offset-danger',
    info: 'ring-offset-info',
    warning: 'ring-offset-warning',
    'light-1': 'ring-offset-light-1',
    'light-2': 'ring-offset-light-2',
    'light-3': 'ring-offset-light-3',
    'light-4': 'ring-offset-light-4',
    'dark-1': 'ring-offset-dark-1',
    'dark-2': 'ring-offset-dark-2',
    'dark-3': 'ring-offset-dark-3',
    'dark-4': 'ring-offset-dark-4',
    black: 'ring-offset-black',
    white: 'ring-offset-white',
    transparent: 'ring-offset-transparent',
  }
  protected static dummyColor: ColorClass = {
    primary: 'ring-offset-primary',
    secondary: 'ring-offset-secondary',
    success: 'ring-offset-success',
    danger: 'ring-offset-danger',
    info: 'ring-offset-info',
    warning: 'ring-offset-warning',
    'light-1': 'ring-offset-light-1',
    'light-2': 'ring-offset-light-2',
    'light-3': 'ring-offset-light-3',
    'light-4': 'ring-offset-light-4',
    'dark-1': 'ring-offset-dark-1',
    'dark-2': 'ring-offset-dark-2',
    'dark-3': 'ring-offset-dark-3',
    'dark-4': 'ring-offset-dark-4',
    black: 'ring-offset-black',
    white: 'ring-offset-white',
    transparent: 'ring-offset-transparent',
  }
  // btn color class
  protected static btnColor: ColorClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    info: 'btn-info',
    warning: 'btn-warning',
    'light-1': 'btn-light-1',
    'light-2': 'btn-light-2',
    'light-3': 'btn-light-3',
    'light-4': 'btn-light-4',
    'dark-1': 'btn-dark-1',
    'dark-2': 'btn-dark-2',
    'dark-3': 'btn-dark-3',
    'dark-4': 'btn-dark-4',
    black: 'btn-black',
    white: 'btn-white',
    transparent: 'btn-transparent',
  }
  // list color class
  protected static listColor: ColorClass = {
    primary: 'mcl-list-primary',
    secondary: 'mcl-list-secondary',
    success: 'mcl-list-success',
    danger: 'mcl-list-danger',
    info: 'mcl-list-info',
    warning: 'mcl-list-warning',
    'light-1': 'mcl-list-light-1',
    'light-2': 'mcl-list-light-2',
    'light-3': 'mcl-list-light-3',
    'light-4': 'mcl-list-light-4',
    'dark-1': 'mcl-list-dark-1',
    'dark-2': 'mcl-list-dark-2',
    'dark-3': 'mcl-list-dark-3',
    'dark-4': 'mcl-list-dark-4',
    black: 'mcl-list-black',
    white: 'mcl-list-white',
    transparent: 'mcl-list-transparent',
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
    transparent: 'border-transparent',
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
    transparent: 'border-x-transparent',
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
    transparent: 'border-y-transparent',
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
    transparent: 'border-t-transparent',
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
    transparent: 'border-b-transparent',
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
    transparent: 'border-l-transparent',
  }
  protected static borderRightColor: ColorClass = {
    primary: 'border-r-primary',
    secondary: 'border-r-secondary',
    success: 'border-r-success',
    danger: 'border-r-danger',
    info: 'border-r-info',
    warning: 'border-r-warning',
    'light-1': 'border-r-light-1',
    'light-2': 'border-r-light-2',
    'light-3': 'border-r-light-3',
    'light-4': 'border-r-light-4',
    'dark-1': 'border-r-dark-1',
    'dark-2': 'border-r-dark-2',
    'dark-3': 'border-r-dark-3',
    'dark-4': 'border-r-dark-4',
    black: 'border-r-black',
    white: 'border-r-white',
    transparent: 'border-r-transparent',
  }
  // Border width class
  protected static borderWidth: BorderWidth = {
    1: 'border-[1px]',
    2: 'border-[2px]',
    3: 'border-[3px]',
    4: 'border-[4px]',
    5: 'border-[5px]',
    6: 'border-[6px]',
    7: 'border-[7px]',
    8: 'border-[8px]',
    9: 'border-[9px]',
    10: 'border-[10px]',
    11: 'border-[11px]',
    12: 'border-[12px]',
  }
  protected static borderXWidth: BorderWidth = {
    1: 'border-x-[1px]',
    2: 'border-x-[2px]',
    3: 'border-x-[3px]',
    4: 'border-x-[4px]',
    5: 'border-x-[5px]',
    6: 'border-x-[6px]',
    7: 'border-x-[7px]',
    8: 'border-x-[8px]',
    9: 'border-x-[9px]',
    10: 'border-x-[10px]',
    11: 'border-x-[11px]',
    12: 'border-x-[12px]',
  }
  protected static borderYWidth: BorderWidth = {
    1: 'border-y-[1px]',
    2: 'border-y-[2px]',
    3: 'border-y-[3px]',
    4: 'border-y-[4px]',
    5: 'border-y-[5px]',
    6: 'border-y-[6px]',
    7: 'border-y-[7px]',
    8: 'border-y-[8px]',
    9: 'border-y-[9px]',
    10: 'border-y-[10px]',
    11: 'border-y-[11px]',
    12: 'border-y-[12px]',
  }
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
  protected static borderBottomWidth: BorderWidth = {
    1: 'border-b-[1px]',
    2: 'border-b-[2px]',
    3: 'border-b-[3px]',
    4: 'border-b-[4px]',
    5: 'border-b-[5px]',
    6: 'border-b-[6px]',
    7: 'border-b-[7px]',
    8: 'border-b-[8px]',
    9: 'border-b-[9px]',
    10: 'border-b-[10px]',
    11: 'border-b-[11px]',
    12: 'border-b-[12px]',
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
  protected static borderRightWidth: BorderWidth = {
    1: 'border-r-[1px]',
    2: 'border-r-[2px]',
    3: 'border-r-[3px]',
    4: 'border-r-[4px]',
    5: 'border-r-[5px]',
    6: 'border-r-[6px]',
    7: 'border-r-[7px]',
    8: 'border-r-[8px]',
    9: 'border-r-[9px]',
    10: 'border-r-[10px]',
    11: 'border-r-[11px]',
    12: 'border-r-[12px]',
  }
  // opacity
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
  // spacing: margin
  protected static margin: Spacing = {
    '0': 'm-0',
    '3xs': 'm-3xs',
    '2xs': 'm-2xs',
    xs: 'm-xs',
    sm: 'm-sm',
    md: 'm-md',
    lg: 'm-lg',
    xl: 'm-xl',
    '2xl': 'm-2xl',
    '3xl': 'm-3xl',
  }
  protected static marginX: Spacing = {
    '0': 'mx-0',
    '3xs': 'mx-3xs',
    '2xs': 'mx-2xs',
    xs: 'mx-xs',
    sm: 'mx-sm',
    md: 'mx-md',
    lg: 'mx-lg',
    xl: 'mx-xl',
    '2xl': 'mx-2xl',
    '3xl': 'mx-3xl',
  }
  protected static marginY: Spacing = {
    '0': 'my-0',
    '3xs': 'my-3xs',
    '2xs': 'my-2xs',
    xs: 'my-xs',
    sm: 'my-sm',
    md: 'my-md',
    lg: 'my-lg',
    xl: 'my-xl',
    '2xl': 'my-2xl',
    '3xl': 'my-3xl',
  }
  protected static marginTop: Spacing = {
    '0': 'mt-0',
    '3xs': 'mt-3xs',
    '2xs': 'mt-2xs',
    xs: 'mt-xs',
    sm: 'mt-sm',
    md: 'mt-md',
    lg: 'mt-lg',
    xl: 'mt-xl',
    '2xl': 'mt-2xl',
    '3xl': 'mt-3xl',
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
  protected static marginLeft: Spacing = {
    '0': 'ml-0',
    '3xs': 'ml-3xs',
    '2xs': 'ml-2xs',
    xs: 'ml-xs',
    sm: 'ml-sm',
    md: 'ml-md',
    lg: 'ml-lg',
    xl: 'ml-xl',
    '2xl': 'ml-2xl',
    '3xl': 'ml-3xl',
  }
  protected static marginRight: Spacing = {
    '0': 'mr-0',
    '3xs': 'mr-3xs',
    '2xs': 'mr-2xs',
    xs: 'mr-xs',
    sm: 'mr-sm',
    md: 'mr-md',
    lg: 'mr-lg',
    xl: 'mr-xl',
    '2xl': 'mr-2xl',
    '3xl': 'mr-3xl',
  }
  // spacing: padding
  protected static padding: Spacing = {
    '0': 'p-0',
    '3xs': 'p-3xs',
    '2xs': 'p-2xs',
    xs: 'p-xs',
    sm: 'p-sm',
    md: 'p-md',
    lg: 'p-lg',
    xl: 'p-xl',
    '2xl': 'p-2xl',
    '3xl': 'p-3xl',
  }
  protected static paddingX: Spacing = {
    '0': 'px-0',
    '3xs': 'px-3xs',
    '2xs': 'px-2xs',
    xs: 'px-xs',
    sm: 'px-sm',
    md: 'px-md',
    lg: 'px-lg',
    xl: 'px-xl',
    '2xl': 'px-2xl',
    '3xl': 'px-3xl',
  }
  protected static paddingY: Spacing = {
    '0': 'py-0',
    '3xs': 'py-3xs',
    '2xs': 'py-2xs',
    xs: 'py-xs',
    sm: 'py-sm',
    md: 'py-md',
    lg: 'py-lg',
    xl: 'py-xl',
    '2xl': 'py-2xl',
    '3xl': 'py-3xl',
  }
  protected static paddingTop: Spacing = {
    '0': 'pt-0',
    '3xs': 'pt-3xs',
    '2xs': 'pt-2xs',
    xs: 'pt-xs',
    sm: 'pt-sm',
    md: 'pt-md',
    lg: 'pt-lg',
    xl: 'pt-xl',
    '2xl': 'pt-2xl',
    '3xl': 'pt-3xl',
  }
  protected static paddingBottom: Spacing = {
    '0': 'pb-0',
    '3xs': 'pb-3xs',
    '2xs': 'pb-2xs',
    xs: 'pb-xs',
    sm: 'pb-sm',
    md: 'pb-md',
    lg: 'pb-lg',
    xl: 'pb-xl',
    '2xl': 'pb-2xl',
    '3xl': 'pb-3xl',
  }
  protected static paddingLeft: Spacing = {
    '0': 'pl-0',
    '3xs': 'pl-3xs',
    '2xs': 'pl-2xs',
    xs: 'pl-xs',
    sm: 'pl-sm',
    md: 'pl-md',
    lg: 'pl-lg',
    xl: 'pl-xl',
    '2xl': 'pl-2xl',
    '3xl': 'pl-3xl',
  }
  protected static paddingRight: Spacing = {
    '0': 'pr-0',
    '3xs': 'pr-3xs',
    '2xs': 'pr-2xs',
    xs: 'pr-xs',
    sm: 'pr-sm',
    md: 'pr-md',
    lg: 'pr-lg',
    xl: 'pr-xl',
    '2xl': 'pr-2xl',
    '3xl': 'pr-3xl',
  }
  // spacing gap class for flex/grid
  protected static gap: Spacing = {
    '0': 'gap-0',
    '3xs': 'gap-3xs',
    '2xs': 'gap-2xs',
    xs: 'gap-xs',
    sm: 'gap-sm',
    md: 'gap-md',
    lg: 'gap-lg',
    xl: 'gap-xl',
    '2xl': 'gap-2xl',
    '3xl': 'gap-3xl',
  }
  // text alignment
  protected static textAlign: Alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
}

export default MCLTheme
