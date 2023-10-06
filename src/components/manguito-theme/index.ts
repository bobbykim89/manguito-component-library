import GenerateMCLClass, {
  colorType,
  textType,
  borderWidthType,
  scaleType,
} from './theme'
import type { ClassType, InputType } from './theme/index.js'
// base components
import DropdownContainer from './lib/dropdown/DropdownContainer.vue'
import DropdownContent from './lib/dropdown/DropdownContent.vue'
import Collapse from './lib/collapse/Collapse.vue'

const generateClass = (type: ClassType, value: InputType): string => {
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

export { DropdownContainer, DropdownContent, Collapse }
export * from './lib/directives'
