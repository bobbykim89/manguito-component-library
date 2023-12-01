import type { ColorPalette, HeadingSize } from '@bobbykim/manguito-theme';
import type { ContentType } from './index.type';
declare const _default: import("vue").DefineComponent<{
    content: {
        type: import("vue").PropType<ContentType[]>;
        required: true;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    tabColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    activeTitleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    inactiveTitleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "tab-click": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    content: {
        type: import("vue").PropType<ContentType[]>;
        required: true;
    };
    borderColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    bgColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    tabColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    titleSize: {
        type: import("vue").PropType<HeadingSize>;
        default: string;
    };
    activeTitleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    inactiveTitleColor: {
        type: import("vue").PropType<ColorPalette>;
        default: string;
    };
    displayShadow: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    rounded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
    "onTab-click"?: ((...args: any[]) => any) | undefined;
}, {
    borderColor: ColorPalette;
    bgColor: ColorPalette;
    tabColor: ColorPalette;
    titleSize: HeadingSize;
    activeTitleColor: ColorPalette;
    inactiveTitleColor: ColorPalette;
    displayShadow: boolean;
    rounded: boolean;
}, {}>;
export default _default;
