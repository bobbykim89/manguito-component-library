import GenerateMCLClass, {
  colorType,
  textType,
  borderWidthType,
  scaleType,
} from './theme'
import type { ClassType, InputType } from './theme/index.js'

const generateClass = (type: ClassType, value: InputType): string => {
  console.log('running generate class')
  const mclGenerate = new GenerateMCLClass(type, value)
  if ((<string[]>(<unknown>colorType)).includes(type)) {
    return mclGenerate.generateColorClass()
  }
  if ((<string[]>(<unknown>textType)).includes(type)) {
    return mclGenerate.generateTextClass()
  }
  if ((<string[]>(<unknown>borderWidthType)).includes(type)) {
    return mclGenerate.generateBorderWidthClass()
  }
  if ((<string[]>(<unknown>scaleType)).includes(type)) {
    return mclGenerate.generateScaleClass()
  }
  // return spacing type if all of above is false
  return mclGenerate.generateSpacingClass()
}

export default generateClass
