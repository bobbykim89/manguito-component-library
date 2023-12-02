import type { ColorPalette } from '../../index.js';
declare const _default: import("vue").DefineComponent<{
    toggle: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    color: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    navColor: {
        type: import("vue").PropType<ColorPalette>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "hbg-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    toggle: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    color: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayBorder: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    navColor: {
        type: import("vue").PropType<ColorPalette>;
        required: true;
    };
}>> & {
    "onHbg-click"?: ((...args: any[]) => any) | undefined;
}, {
    color: ColorPalette;
    displayBorder: boolean;
}, {}>;
export default _default;
