import type { HeadingSize } from './theme.types'

export type HeaderSizeClass = {
  [key in HeadingSize]: string
}

export class MclHeadingSize {
  // h1 class
  public heading1: HeaderSizeClass = {
    sm: 'h1-sm',
    md: 'h1-md',
    lg: 'h1-lg',
    xl: 'h1-xl',
  }
  // h2 class
  public heading2: HeaderSizeClass = {
    sm: 'h2-sm',
    md: 'h2-md',
    lg: 'h2-lg',
    xl: 'h2-xl',
  }
  // h3 class
  public heading3: HeaderSizeClass = {
    sm: 'h3-sm',
    md: 'h3-md',
    lg: 'h3-lg',
    xl: 'h3-xl',
  }
  // h4 class
  public heading4: HeaderSizeClass = {
    sm: 'h4-sm',
    md: 'h4-md',
    lg: 'h4-lg',
    xl: 'h4-xl',
  }
}
