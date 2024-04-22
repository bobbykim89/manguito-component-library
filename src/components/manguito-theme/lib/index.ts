// generate class function
import { generateClass } from './theme/generateClass'
// base components
import Alert from './alert/Alert.vue'
import Collapse from './collapse/Collapse.vue'
import DropdownContainer from './dropdown/DropdownContainer.vue'
import DropdownContent from './dropdown/DropdownContent.vue'
import HeaderHorizontal from './header/HeaderHorizontal.vue'
import HeaderVertical from './header/HeaderVertical.vue'
import Modal from './modal/Modal.vue'
import Sidebar from './sidebar/Sidebar.vue'
import TabContainer from './tabs/TabContainer.vue'
import TabContent from './tabs/TabContent.vue'

// directives
export * from './directives'
// utility components
export * from './util'
// types
export * from './header/index.types'
export * from './theme/theme.types'

// export components
export {
  Alert,
  Collapse,
  DropdownContainer,
  DropdownContent,
  HeaderHorizontal,
  HeaderVertical,
  Modal,
  Sidebar,
  TabContainer,
  TabContent,
}

export default generateClass
