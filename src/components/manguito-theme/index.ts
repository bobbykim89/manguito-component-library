import type { ClassType, InputType } from './theme'
import GenerateMCLClass, {
  borderWidthType,
  colorType,
  scaleType,
  textType,
} from './theme'
// base components
import Collapse from './lib/collapse/Collapse.vue'
import DropdownContainer from './lib/dropdown/DropdownContainer.vue'
import DropdownContent from './lib/dropdown/DropdownContent.vue'
import HeaderHorizontal from './lib/header/HeaderHorizontal.vue'
import HeaderVertical from './lib/header/HeaderVertical.vue'
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

export * from './lib/directives'
export * from './lib/header/index.types'
export * from './theme/theme.types'
export {
  Collapse,
  DropdownContainer,
  DropdownContent,
  HeaderHorizontal,
  HeaderVertical,
  Modal,
  Sidebar,
}
