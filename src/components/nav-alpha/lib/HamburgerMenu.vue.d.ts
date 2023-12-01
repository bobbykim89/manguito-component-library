import type { ColorPalette } from '@bobbykim/manguito-theme';
declare const _default: import("vue").DefineComponent<{
    color: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    toggle: {
        type: import("vue").PropType<boolean>;
        required: true;
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
    color: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    toggle: {
        type: import("vue").PropType<boolean>;
        required: true;
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
