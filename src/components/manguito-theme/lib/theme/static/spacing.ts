import type { SpacingLevel } from './theme.types'

export type Spacing = {
  [key in SpacingLevel]: string
}

export class MclSpacingClass {
  // spacing: margin
  public margin: Spacing = {
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
  public marginX: Spacing = {
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
  public marginY: Spacing = {
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
  public marginTop: Spacing = {
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
  public marginBottom: Spacing = {
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
  public marginLeft: Spacing = {
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
  public marginRight: Spacing = {
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
  public padding: Spacing = {
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
  public paddingX: Spacing = {
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
  public paddingY: Spacing = {
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
  public paddingTop: Spacing = {
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
  public paddingBottom: Spacing = {
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
  public paddingLeft: Spacing = {
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
  public paddingRight: Spacing = {
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
  public gap: Spacing = {
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
}
