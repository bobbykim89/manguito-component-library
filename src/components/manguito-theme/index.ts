import type { ClassType, InputType } from './theme/index.js'
import GenerateMCLClass, {
  borderWidthType,
  colorType,
  scaleType,
  textType,
} from './theme/index.js'
// base components
import Collapse from './lib/collapse/Collapse.vue'
import DropdownContainer from './lib/dropdown/DropdownContainer.vue'
import DropdownContent from './lib/dropdown/DropdownContent.vue'
import HeaderHorizontal from './lib/header/HeaderHorizontal.vue'
import Modal from './lib/modal/Modal.vue'
import Sidebar from './lib/sidebar/Sidebar.vue'

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

export * from './lib/collapse/index.types.js'
export * from './lib/directives/index.js'
export * from './lib/header/index.types.js'
export * from './theme/theme.types.js'
export {
  Collapse,
  DropdownContainer,
  DropdownContent,
  HeaderHorizontal,
  Modal,
  Sidebar,
}
