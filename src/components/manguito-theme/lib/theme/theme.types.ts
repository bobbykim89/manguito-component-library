// Colors for bg-color and font-color
export type ColorPalette =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light-1'
  | 'light-2'
  | 'light-3'
  | 'light-4'
  | 'dark-1'
  | 'dark-2'
  | 'dark-3'
  | 'dark-4'
  | 'black'
  | 'white'
  | 'transparent'
// Available spacings
export type SpacingLevel =
  | '0'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
// Available heading levels
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
// Available heading sizes
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl'
// Available body text sizes
export type BodyText = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
// Font weight
export type FontWeight = 'light' | 'normal' | 'bold'
// alignment
export type Alignment = 'left' | 'center' | 'right'
export type VerticalAlignment = 'top' | 'center' | 'bottom'
// link targets
export type CtaTarget = '_self' | '_blank'
// Highlight positions
export type Direction = 'left' | 'right' | 'top' | 'bottom'
export type DirectionY = 'top' | 'bottom'
export type DirectionX = 'left' | 'right'
// available ranges
type _RangeArray<
  T extends number,
  R extends unknown[] = []
> = R['length'] extends T ? R : _RangeArray<T, [...R, 1]>
type IntRange<
  T extends number[],
  E extends number,
  R extends number = never
> = T['length'] extends E ? R | E : IntRange<[...T, 1], E, R | T['length']>
export type Range<T extends number, R extends number> = IntRange<
  _RangeArray<T>,
  R
>

export type ButtonSize = 'small' | 'medium' | 'large'
export type OpacityRange = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
export type ColumnWidth = 25 | 50 | 75 | 100
export type CrossOrigin = 'use-credentials' | 'anonymous'
export type InputType = 'text' | 'email' | 'password'
