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
// Available spacings
export type SpacingLevel =
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
// border positions
export type Position = 'left' | 'right'
// link targets
export type CtaTarget = '_self' | '_blank'
// Highlight positions
export type Location = 'left' | 'top'
// available ranges
export type Range<T extends number> = number extends T ? number : _Range<T, []>
export type _Range<
  T extends number,
  R extends unknown[]
> = R['length'] extends T ? R['length'] : R['length'] | _Range<T, [T, ...R]>
export type ButtonSize = 'small' | 'medium' | 'large'
export type OpacityRange = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
export type Directions = 'left' | 'right'
export type ColumnWidth = 25 | 50 | 75 | 100
