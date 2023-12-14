import {
  colors,
  spacingOptions,
  bodyTextSize,
  headingTextSize,
  directionsX,
  headingTextLevel,
  targetOption,
  columnWidth,
  corsOptions,
  inputOptions,
  switchSizeOptions,
  fontWeightOptions,
} from '../options'
import type {
  BodyText,
  ColorPalette,
  ColumnWidth,
  CrossOrigin,
  CtaTarget,
  DirectionX,
  FontWeight,
  HeadingLevel,
  HeadingSize,
  InputType,
  SpacingLevel,
} from '@/components/manguito-theme'

interface ControllerGenericInput {
  name: string
  required: boolean
  description?: string
  category: string
}
interface RangeControllerControlOption {
  min: number
  max: number
  step: number
}
interface ControllerColorType extends ControllerGenericInput {
  defaultValue?: ColorPalette
}
interface ControllerSpacingType extends ControllerGenericInput {
  defaultValue?: SpacingLevel
}
interface ControllerBodyTextType extends ControllerGenericInput {
  defaultValue?: BodyText
}
interface ControllerHeadingTextType extends ControllerGenericInput {
  defaultValue?: HeadingSize
}
interface ControllerHeadingLevelType extends ControllerGenericInput {
  defaultValue?: HeadingLevel
}
interface ControllerXDirType extends ControllerGenericInput {
  defaultValue?: DirectionX
}
interface ControllerTargetOptionType extends ControllerGenericInput {
  defaultValue?: CtaTarget
}
interface ControllerColWidthType extends ControllerGenericInput {
  defaultValue?: ColumnWidth
}
interface ControllerCorsType extends ControllerGenericInput {
  defaultValue?: CrossOrigin
}
interface ControllerInputType extends ControllerGenericInput {
  defaultValue?: InputType
}
interface ControllerSwitchSizeType extends ControllerGenericInput {
  defaultValue?: 'sm' | 'md' | 'lg'
}
interface ControllerFontWeightType extends ControllerGenericInput {
  defaultValue?: FontWeight
}
interface ControllerBooleanType extends ControllerGenericInput {
  defaultValue?: boolean
}
interface ControllerTextType extends ControllerGenericInput {
  defaultValue?: string
}
interface ControllerRangeType extends ControllerGenericInput {
  defaultValue?: number
  controlOption: RangeControllerControlOption
}
interface ControllerWildCard extends ControllerGenericInput {
  defaultValue: any
}

// select controllers
export const colorControllers = (arg: ControllerColorType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(colors),
  }
}

export const spacingControllers = (arg: ControllerSpacingType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(spacingOptions),
  }
}

export const bodyTextControllers = (arg: ControllerBodyTextType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(bodyTextSize),
  }
}

export const headingTextControllers = (arg: ControllerHeadingTextType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(headingTextSize),
  }
}

export const headingLevelControllers = (
  arg: ControllerHeadingLevelType
): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(headingTextLevel),
  }
}

export const xDirControllers = (arg: ControllerXDirType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(directionsX),
  }
}

export const targetOptionControllers = (
  arg: ControllerTargetOptionType
): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(targetOption),
  }
}

export const columnWidthControllers = (arg: ControllerColWidthType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'Number' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(columnWidth),
  }
}

export const corsOptionControllers = (arg: ControllerCorsType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(corsOptions),
  }
}

export const inputTypeControllers = (arg: ControllerInputType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(inputOptions),
  }
}

export const switchSizeControllers = (arg: ControllerSwitchSizeType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(switchSizeOptions),
  }
}

export const fontWeightControllers = (arg: ControllerFontWeightType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'select' },
    options: Object.values(fontWeightOptions),
  }
}

// boolean controllers
export const booleanControllers = (arg: ControllerBooleanType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'boolean', required },
    description,
    table: {
      type: { summary: 'Boolean' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'boolean' },
  }
}

// text controllers
export const textControllers = (arg: ControllerTextType): any => {
  const { name, required, description, defaultValue, category } = arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'String' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: { type: 'text' },
  }
}

// range controllers
export const rangeControllers = (arg: ControllerRangeType): any => {
  const { name, required, description, defaultValue, controlOption, category } =
    arg
  return {
    name,
    type: { name: 'string', required },
    description,
    table: {
      type: { summary: 'Number' },
      defaultValue: { summary: defaultValue },
      category,
    },
    control: {
      type: 'range',
      min: controlOption.min,
      max: controlOption.max,
      step: controlOption.step,
    },
  }
}
