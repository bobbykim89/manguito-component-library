import type {
  BodyText,
  ColorPalette,
  FontWeight,
  HeadingSize,
  OpacityRange,
  SpacingLevel,
  Range,
  Alignment,
} from '../static/theme.types'
import type { ClassType, InputType, ColorClassType } from '../mcl-theme'
import { typeGroup } from '../mcl-theme'

type InputOptions =
  | ColorPalette
  | HeadingSize
  | BodyText
  | FontWeight
  | Range<1, 12>
  | OpacityRange
  | SpacingLevel
  | Alignment

export class ValidateMclClass<T extends ClassType> {
  classType: T
  constructor(type: T) {
    this.classType = type
  }
  public validateColorType(arg: InputOptions): arg is ColorPalette {
    const validatorRe =
      /(primary|secondary|success|info|warning|danger|light-1|light-2|light-3|light-4|dark-1|dark-2|dark-3|dark-4|black|white|transparent)/
    if (typeof arg !== 'string') {
      return false
    }
    if (!validatorRe.test(arg)) {
      return false
    }
    return (typeGroup.colorType as readonly string[]).includes(this.classType)
  }
  public validateSpaceType(arg: InputOptions): arg is SpacingLevel {
    const validatorRe = /(0|3xs|2xs|xs|sm|md|lg|xl|2xl|3xl)/
    if (typeof arg !== 'string') {
      return false
    }
    if (!validatorRe.test(arg)) {
      return false
    }
    return (typeGroup.spacingType as readonly string[]).includes(this.classType)
  }
  public validateHeadingTextSizeType(arg: InputOptions): arg is HeadingSize {
    const validatorRe = /(sm|md|lg|xl)/
    if (typeof arg !== 'string') {
      return false
    }
    if (!validatorRe.test(arg)) {
      return false
    }
    return (typeGroup.headingSizeType as readonly string[]).includes(
      this.classType
    )
  }
  validateBodyTextSizeType(arg: InputOptions): arg is BodyText {
    const validatorRe = /(xs|sm|md|lg|xl)/
    if (typeof arg !== 'string') {
      return false
    }
    if (!validatorRe.test(arg)) {
      return false
    }
    return (typeGroup.textType as readonly string[]).includes(this.classType)
  }
  validateFontWeightType(arg: InputOptions): arg is FontWeight {
    const validatorRe = /(light|normal|bold)/
    if (typeof arg !== 'string') {
      return false
    }
    if (!validatorRe.test(arg)) {
      return false
    }
    return (typeGroup.fontWeightType as readonly string[]).includes(
      this.classType
    )
  }
  validateOpacityType(arg: InputOptions): arg is OpacityRange {
    const validatorRe = /\b(0|[1-9]0|100)\b/
    if (typeof arg !== 'number') {
      return false
    }
    if (!validatorRe.test(arg.toString())) {
      return false
    }
    return (typeGroup.scaleType as readonly string[]).includes(this.classType)
  }
  validateRangeType(arg: InputOptions): arg is Range<1, 12> {
    const validatorRe = /\b([1-9]|1[0-2])\b/
    if (typeof arg !== 'number') {
      return false
    }
    if (!validatorRe.test(arg.toString())) {
      return false
    }
    return (typeGroup.borderWidthType as readonly string[]).includes(
      this.classType
    )
  }
  validateAlignment(arg: InputOptions): arg is Alignment {
    const validatorRe = /(left|center|right)/
    if (typeof arg !== 'string') {
      return false
    }
    if (!validatorRe.test(arg)) {
      return false
    }
    return (typeGroup.textAlignType as readonly string[]).includes(
      this.classType
    )
  }
}
