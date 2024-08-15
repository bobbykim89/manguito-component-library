import type { BodyText, FontWeight, Alignment } from './theme.types'

export type BodyTextClass = {
  [key in BodyText]: string
}
export type FontWeightClass = {
  [key in FontWeight]: string
}
export type TextAlignment = {
  [key in Alignment]: string
}

export class MclText {
  // body text class
  public bodyText: BodyTextClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  // font weight class
  public fontweight: FontWeightClass = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  }
  // text alignment
  public textAlign: TextAlignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
}
