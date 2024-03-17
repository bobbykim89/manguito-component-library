import GenerateMCLClass, { borderWidthType, colorType, scaleType, textType, } from './theme/index.js';
// base components
import Collapse from './lib/collapse/Collapse.vue';
import DropdownContainer from './lib/dropdown/DropdownContainer.vue';
import DropdownContent from './lib/dropdown/DropdownContent.vue';
import HeaderHorizontal from './lib/header/HeaderHorizontal.vue';
import HeaderVertical from './lib/header/HeaderVertical.vue';
import Modal from './lib/modal/Modal.vue';
import Sidebar from './lib/sidebar/Sidebar.vue';
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
export * from './lib/collapse/index.types.js';
export * from './lib/directives/index.js';
export * from './lib/header/index.types.js';
export * from './theme/theme.types.js';
export { Collapse, DropdownContainer, DropdownContent, HeaderHorizontal, HeaderVertical, Modal, Sidebar, };
