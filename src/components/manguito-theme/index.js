import GenerateMCLClass, { colorType, textType, borderWidthType, scaleType, } from './theme';
// base components
import DropdownContainer from './lib/dropdown/DropdownContainer.vue';
import DropdownContent from './lib/dropdown/DropdownContent.vue';
import Collapse from './lib/collapse/Collapse.vue';
import Sidebar from './lib/sidebar/Sidebar.vue';
import Modal from './lib/modal/Modal.vue';
import HamburgerMenu from './lib/nav/HamburgerMenu.vue';
const generateClass = (type, value) => {
    const mclGenerate = new GenerateMCLClass(type, value);
    if (colorType.includes(type)) {
        return mclGenerate.generateColorClass();
    }
    if (textType.includes(type)) {
        return mclGenerate.generateTextClass();
    }
    if (borderWidthType.includes(type)) {
        return mclGenerate.generateBorderWidthClass();
    }
    if (scaleType.includes(type)) {
        return mclGenerate.generateScaleClass();
    }
    // return spacing type if all of above is false
    return mclGenerate.generateSpacingClass();
};
export default generateClass;
export { DropdownContainer, DropdownContent, Collapse, HamburgerMenu, Sidebar, Modal, };
export * from './lib/directives';
export * from './theme/theme.types';
export * from './lib/collapse/index.types';
//# sourceMappingURL=index.js.map