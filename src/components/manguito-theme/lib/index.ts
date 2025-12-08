// generate class function
import { generateClass } from './theme'
// base components
import Alert from './alert/Alert.vue'
import Card from './card/Card.vue'
import CarouselContainer from './carousel/CarouselContainer.vue'
import CarouselContent from './carousel/CarouselContent.vue'
import Collapse from './collapse/Collapse.vue'
import type { TooltipValueObjectType } from './directives'
import { vClickOutside, vCollapse, vToggle, vTooltip } from './directives'
import DropdownContainer from './dropdown/DropdownContainer.vue'
import DropdownContent from './dropdown/DropdownContent.vue'
import HeaderHorizontal from './header/HeaderHorizontal.vue'
import HeaderVertical from './header/HeaderVertical.vue'
import Modal from './modal/Modal.vue'
import Sidebar from './sidebar/Sidebar.vue'
import TabContainer from './tabs/TabContainer.vue'
import TabContent from './tabs/TabContent.vue'

// utility components
export * from './util'
// composables
export * from './composables'
// types
export * from './header/index.types'
export * from './theme/static/theme.types'

// export components
export {
  Alert,
  Card,
  CarouselContainer,
  CarouselContent,
  Collapse,
  DropdownContainer,
  DropdownContent,
  HeaderHorizontal,
  HeaderVertical,
  Modal,
  Sidebar,
  TabContainer,
  TabContent,
  // directives
  TooltipValueObjectType,
  vClickOutside,
  vCollapse,
  vToggle,
  vTooltip
}

export default generateClass
