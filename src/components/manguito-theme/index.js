// generate class function
import { generateClass } from './lib/theme/generateClass';
// base components
import Alert from './lib/alert/Alert.vue';
import Collapse from './lib/collapse/Collapse.vue';
import DropdownContainer from './lib/dropdown/DropdownContainer.vue';
import DropdownContent from './lib/dropdown/DropdownContent.vue';
import HeaderHorizontal from './lib/header/HeaderHorizontal.vue';
import HeaderVertical from './lib/header/HeaderVertical.vue';
import Modal from './lib/modal/Modal.vue';
import Sidebar from './lib/sidebar/Sidebar.vue';
// directives
export * from './lib/directives';
// types
export * from './lib/header/index.types';
export * from './lib/theme/theme.types';
// export components
export { Alert, Collapse, DropdownContainer, DropdownContent, HeaderHorizontal, HeaderVertical, Modal, Sidebar, };
export default generateClass;
