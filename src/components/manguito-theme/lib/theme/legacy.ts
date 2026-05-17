import {
  activeBgColorVariant,
  activeOutlineColorVariant,
  activeRingColorVariant,
  afterBgColorVariant,
  beforeBgColorVariant,
  bgOpacityVariant,
  borderBottomColorVariant,
  borderBottomWidthVariant,
  borderColorVariant,
  borderLeftColorVariant,
  borderLeftWidthVariant,
  borderRightColorVariant,
  borderRightWidthVariant,
  borderTopColorVariant,
  borderTopWidthVariant,
  borderWidthVariant,
  borderXColorVariant,
  borderXWidthVariant,
  borderYColorVariant,
  borderYWidthVariant,
  bodyTextVariant,
  btnColorVariant,
  disabledTextColorVariant,
  focusBgColorVariant,
  focusOutlineColorVariant,
  focusRingColorVariant,
  focusTextColorVariant,
  fontWeightVariant,
  gapVariant,
  h1Variant,
  h2Variant,
  h3Variant,
  h4Variant,
  hoverBgColorVariant,
  hoverTextColorVariant,
  listColorVariant,
  marginBottomVariant,
  marginLeftVariant,
  marginRightVariant,
  marginTopVariant,
  marginVariant,
  marginXVariant,
  marginYVariant,
  opacityVariant,
  outlineColorVariant,
  outlineOpacityVariant,
  paddingBottomVariant,
  paddingLeftVariant,
  paddingRightVariant,
  paddingTopVariant,
  paddingVariant,
  paddingXVariant,
  paddingYVariant,
  ringColorVariant,
  ringOffsetColorVariant,
  svgFillColorVariant,
  textAlignVariant,
  textColorVariant,
  bgColorVariant,
} from './index'
import type {
  Alignment,
  BodyText,
  ColorPalette,
  FontWeight,
  HeadingSize,
  OpacityRange,
  Range,
  SpacingLevel,
} from './static/theme.types'

type ColorClassType =
  | 'BGCOLOR'
  | 'BEFOREBG'
  | 'AFTERBG'
  | 'HVBGCOLOR'
  | 'FCBGCOLOR'
  | 'ACTIVEBG'
  | 'TEXTCOLOR'
  | 'HVTEXTCOLOR'
  | 'FCTEXTCOLOR'
  | 'DISABLEDTEXTCOLOR'
  | 'SVGFILL'
  | 'RINGCOLOR'
  | 'FOCUSRING'
  | 'ACTIVERING'
  | 'OFFSETRING'
  | 'OUTLINE'
  | 'FOCUSOUTLINE'
  | 'ACTIVEOUTLINE'
  | 'BTNCOLOR'
  | 'LISTCOLOR'
  | 'BORDER'
  | 'BORDERX'
  | 'BORDERY'
  | 'BORDERT'
  | 'BORDERB'
  | 'BORDERL'
  | 'BORDERR'
type HeadingClassType = 'H1' | 'H2' | 'H3' | 'H4'
type TextClassType = 'BODYTEXT'
type FontWeightClassType = 'FONTWEIGHT'
type TextAlignClassType = 'TEXTALIGN'
type BorderWidthClassType =
  | 'BORDERW'
  | 'BORDERXW'
  | 'BORDERYW'
  | 'BORDERTW'
  | 'BORDERBW'
  | 'BORDERLW'
  | 'BORDERRW'
type ScaleClassType = 'OPACITY' | 'BGOPACITY' | 'OUTLINEOPACITY'
type SpacingClassType =
  | 'MARGIN'
  | 'MARGINX'
  | 'MARGINY'
  | 'MARGINT'
  | 'MARGINB'
  | 'MARGINL'
  | 'MARGINR'
  | 'PADDING'
  | 'PADDINGX'
  | 'PADDINGY'
  | 'PADDINGT'
  | 'PADDINGB'
  | 'PADDINGL'
  | 'PADDINGR'
  | 'GAP'

export type ClassType =
  | ColorClassType
  | HeadingClassType
  | TextClassType
  | FontWeightClassType
  | TextAlignClassType
  | BorderWidthClassType
  | ScaleClassType
  | SpacingClassType

export type InputType<T extends ClassType> = T extends ColorClassType
  ? ColorPalette
  : T extends HeadingClassType
    ? HeadingSize
    : T extends TextClassType
      ? BodyText
      : T extends FontWeightClassType
        ? FontWeight
        : T extends TextAlignClassType
          ? Alignment
          : T extends BorderWidthClassType
            ? Range<1, 12>
            : T extends ScaleClassType
              ? OpacityRange
              : T extends SpacingClassType
                ? SpacingLevel
                : never

/** @deprecated Use `import { generateClass } from '@bobbykim/manguito-theme'` instead. Will be removed in the next major version. */
export const generateClassLegacy = <T extends ClassType>(
  type: T,
  value: InputType<T>,
): string => {
  switch (type) {
    case 'BGCOLOR':
      return bgColorVariant({ color: value as ColorPalette })
    case 'HVBGCOLOR':
      return hoverBgColorVariant({ color: value as ColorPalette })
    case 'FCBGCOLOR':
      return focusBgColorVariant({ color: value as ColorPalette })
    case 'BEFOREBG':
      return beforeBgColorVariant({ color: value as ColorPalette })
    case 'AFTERBG':
      return afterBgColorVariant({ color: value as ColorPalette })
    case 'ACTIVEBG':
      return activeBgColorVariant({ color: value as ColorPalette })
    case 'TEXTCOLOR':
      return textColorVariant({ color: value as ColorPalette })
    case 'HVTEXTCOLOR':
      return hoverTextColorVariant({ color: value as ColorPalette })
    case 'FCTEXTCOLOR':
      return focusTextColorVariant({ color: value as ColorPalette })
    case 'DISABLEDTEXTCOLOR':
      return disabledTextColorVariant({ color: value as ColorPalette })
    case 'SVGFILL':
      return svgFillColorVariant({ color: value as ColorPalette })
    case 'RINGCOLOR':
      return ringColorVariant({ color: value as ColorPalette })
    case 'FOCUSRING':
      return focusRingColorVariant({ color: value as ColorPalette })
    case 'ACTIVERING':
      return activeRingColorVariant({ color: value as ColorPalette })
    case 'OFFSETRING':
      return ringOffsetColorVariant({ color: value as ColorPalette })
    case 'OUTLINE':
      return outlineColorVariant({ color: value as ColorPalette })
    case 'FOCUSOUTLINE':
      return focusOutlineColorVariant({ color: value as ColorPalette })
    case 'ACTIVEOUTLINE':
      return activeOutlineColorVariant({ color: value as ColorPalette })
    case 'BTNCOLOR':
      return btnColorVariant({ color: value as ColorPalette })
    case 'LISTCOLOR':
      return listColorVariant({ color: value as ColorPalette })
    case 'BORDER':
      return borderColorVariant({ color: value as ColorPalette })
    case 'BORDERX':
      return borderXColorVariant({ color: value as ColorPalette })
    case 'BORDERY':
      return borderYColorVariant({ color: value as ColorPalette })
    case 'BORDERT':
      return borderTopColorVariant({ color: value as ColorPalette })
    case 'BORDERB':
      return borderBottomColorVariant({ color: value as ColorPalette })
    case 'BORDERL':
      return borderLeftColorVariant({ color: value as ColorPalette })
    case 'BORDERR':
      return borderRightColorVariant({ color: value as ColorPalette })
    case 'H1':
      return h1Variant({ size: value as HeadingSize })
    case 'H2':
      return h2Variant({ size: value as HeadingSize })
    case 'H3':
      return h3Variant({ size: value as HeadingSize })
    case 'H4':
      return h4Variant({ size: value as HeadingSize })
    case 'BODYTEXT':
      return bodyTextVariant({ size: value as BodyText })
    case 'FONTWEIGHT':
      return fontWeightVariant({ weight: value as FontWeight })
    case 'TEXTALIGN':
      return textAlignVariant({ align: value as Alignment })
    case 'BORDERW':
      return borderWidthVariant({ width: value as Range<1, 12> })
    case 'BORDERXW':
      return borderXWidthVariant({ width: value as Range<1, 12> })
    case 'BORDERYW':
      return borderYWidthVariant({ width: value as Range<1, 12> })
    case 'BORDERTW':
      return borderTopWidthVariant({ width: value as Range<1, 12> })
    case 'BORDERBW':
      return borderBottomWidthVariant({ width: value as Range<1, 12> })
    case 'BORDERLW':
      return borderLeftWidthVariant({ width: value as Range<1, 12> })
    case 'BORDERRW':
      return borderRightWidthVariant({ width: value as Range<1, 12> })
    case 'OPACITY':
      return opacityVariant({ opacity: value as OpacityRange })
    case 'BGOPACITY':
      return bgOpacityVariant({ opacity: value as OpacityRange })
    case 'OUTLINEOPACITY':
      return outlineOpacityVariant({ opacity: value as OpacityRange })
    case 'MARGIN':
      return marginVariant({ spacing: value as SpacingLevel })
    case 'MARGINX':
      return marginXVariant({ spacing: value as SpacingLevel })
    case 'MARGINY':
      return marginYVariant({ spacing: value as SpacingLevel })
    case 'MARGINT':
      return marginTopVariant({ spacing: value as SpacingLevel })
    case 'MARGINB':
      return marginBottomVariant({ spacing: value as SpacingLevel })
    case 'MARGINL':
      return marginLeftVariant({ spacing: value as SpacingLevel })
    case 'MARGINR':
      return marginRightVariant({ spacing: value as SpacingLevel })
    case 'PADDING':
      return paddingVariant({ spacing: value as SpacingLevel })
    case 'PADDINGX':
      return paddingXVariant({ spacing: value as SpacingLevel })
    case 'PADDINGY':
      return paddingYVariant({ spacing: value as SpacingLevel })
    case 'PADDINGT':
      return paddingTopVariant({ spacing: value as SpacingLevel })
    case 'PADDINGB':
      return paddingBottomVariant({ spacing: value as SpacingLevel })
    case 'PADDINGL':
      return paddingLeftVariant({ spacing: value as SpacingLevel })
    case 'PADDINGR':
      return paddingRightVariant({ spacing: value as SpacingLevel })
    case 'GAP':
      return gapVariant({ spacing: value as SpacingLevel })
    default:
      return ''
  }
}
